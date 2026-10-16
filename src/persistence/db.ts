/**
 * IndexedDB persistence. The whole game state is one versioned JSON document stored under a single
 * key — it's small (well under 1 MB) and this keeps saves atomic. Falls back to localStorage if
 * IndexedDB is unavailable (e.g. some private-browsing modes).
 *
 * Progress is stored per browser, per device. Different tablets do NOT sync automatically; use the
 * parent dashboard's Export/Import to move progress between devices.
 */
import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'word-quest';
const DB_VERSION = 1;
const STORE = 'kv';
const KEY = 'state';
const LS_KEY = 'word-quest-state';

let dbPromise: Promise<IDBPDatabase> | null = null;

function db(): Promise<IDBPDatabase> {
  dbPromise ??= openDB(DB_NAME, DB_VERSION, {
    upgrade(database, oldVersion) {
      // IndexedDB structural migrations go here (document-level migrations live in engine/migrations.ts).
      if (oldVersion < 1) database.createObjectStore(STORE);
    },
  });
  return dbPromise;
}

function hasIDB(): boolean {
  return typeof indexedDB !== 'undefined';
}

export async function loadDoc(): Promise<unknown | null> {
  if (hasIDB()) {
    try {
      const v = await (await db()).get(STORE, KEY);
      if (v) return v;
    } catch (e) {
      console.warn('[WordQuest] IndexedDB read failed, trying localStorage', e);
    }
  }
  try {
    const raw = globalThis.localStorage?.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveDoc(doc: unknown): Promise<void> {
  if (hasIDB()) {
    try {
      await (await db()).put(STORE, doc, KEY);
      return;
    } catch (e) {
      console.warn('[WordQuest] IndexedDB write failed, using localStorage', e);
    }
  }
  try {
    globalThis.localStorage?.setItem(LS_KEY, JSON.stringify(doc));
  } catch (e) {
    console.error('[WordQuest] Could not save progress', e);
  }
}

export async function clearDoc(): Promise<void> {
  if (hasIDB()) {
    try {
      await (await db()).delete(STORE, KEY);
    } catch {
      /* ignore */
    }
  }
  try {
    globalThis.localStorage?.removeItem(LS_KEY);
  } catch {
    /* ignore */
  }
}

/** Ask the browser not to evict our storage (helps on iOS when installed to the home screen). */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    return (await navigator.storage?.persist?.()) ?? false;
  } catch {
    return false;
  }
}

/** Test helper: forget the cached connection. */
export function _resetDbConnection(): void {
  dbPromise = null;
}
