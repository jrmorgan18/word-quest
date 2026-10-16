import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button, Card, ConfirmDialog, Screen, TopBar } from '../../components/ui';
import { whenText } from '../../components/nextStep';
import { exportCurriculum, exportFull, importCurriculumInto, importFull, parseBackup } from '../../engine/backup';
import { DEFAULT_CONFIG } from '../../engine/config';
import { parentUpdateConfig } from '../../engine/parent';
import { countLearned, countMastered, currentWeek, sortedWeeks, weekProgress } from '../../engine/progress';
import { dueReviewWordIds } from '../../engine/review';
import { stickerCatalog } from '../../engine/rewards';
import type { MasteryConfig } from '../../engine/types';
import { now } from '../../lib/clock';
import { hashPin, PIN_MAX, PIN_MIN, validPin } from '../../lib/pin';
import { go, routes } from '../../lib/router';
import { requestPersistentStorage } from '../../persistence/db';
import { act, useAppState, useGame } from '../../store/game';
import { CurriculumPanel } from './CurriculumPanel';
import { ParentGate, useParentGate } from './ParentGate';
import { WeeksPanel } from './WeeksPanel';

type Tab = 'overview' | 'weeks' | 'curriculum' | 'settings' | 'backup';
const TABS: { id: Tab; label: string }[] = [
  { id: 'overview', label: '📊 Overview' },
  { id: 'weeks', label: '📅 Weeks & Words' },
  { id: 'curriculum', label: '✏️ Curriculum' },
  { id: 'settings', label: '⚙️ Settings' },
  { id: 'backup', label: '💾 Backup' },
];

export function ParentArea() {
  const open = useParentGate((g) => g.open);
  return open ? <ParentDashboard /> : <ParentGate />;
}

function ParentDashboard() {
  const [tab, setTab] = useState<Tab>('overview');
  return (
    <div className="min-h-screen bg-[#f6f4fb]">
      <TopBar title="Grown-ups Dashboard" onBack={() => go(routes.home())} />
      <Screen className="flex flex-col gap-5 font-body">
        <nav className="flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Dashboard sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              data-testid={`tab-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`min-h-12 shrink-0 rounded-2xl px-4 font-display text-lg font-semibold ${tab === t.id ? 'bg-grape text-white' : 'bg-white text-ink'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
        {tab === 'overview' && <Overview />}
        {tab === 'weeks' && <WeeksPanel />}
        {tab === 'curriculum' && <CurriculumPanel />}
        {tab === 'settings' && <SettingsPanel />}
        {tab === 'backup' && <BackupPanel />}
      </Screen>
    </div>
  );
}

export function Section({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <h2 className="flex-1 text-2xl font-semibold">{title}</h2>
        {right}
      </div>
      {children}
    </Card>
  );
}

function Overview() {
  const s = useAppState();
  const t = now();
  const cur = currentWeek(s);
  const weeks = sortedWeeks(s);
  const due = dueReviewWordIds(s, t);
  const struggling = Object.values(s.wordProgress)
    .filter((p) => p.struggle >= 2 && s.curriculum.words[p.wordId])
    .sort((a, b) => b.struggle - a.struggle);
  const pendingDelayed = weeks.filter((w) => {
    const wp = weekProgress(s, w.id);
    return wp.initialPassedAt && !wp.delayedPassedAt;
  });
  const [persisted, setPersisted] = useState<boolean | null>(null);
  useEffect(() => {
    void navigator.storage?.persisted?.().then(setPersisted).catch(() => setPersisted(null));
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {!s.settings.parentPinHash && (
        <Card className="flex flex-col gap-2 border-4 border-sun md:col-span-2" data-testid="pin-reminder">
          <h2 className="text-2xl font-semibold">🔑 Set a grown-ups PIN</h2>
          <p className="text-lg">Without a PIN, this area is protected only by a math question — and some kids are very good at math! Set a PIN in Settings.</p>
        </Card>
      )}
      <Section title="At a glance">
        <ul className="flex flex-col gap-1 text-lg">
          <li>
            Current week: <strong>{cur ? `Week ${cur.number} — ${cur.title}` : 'none'}</strong>
          </li>
          <li>
            Weeks completed: <strong>{weeks.filter((w) => weekProgress(s, w.id).mastered).length}</strong> of {weeks.length}
          </li>
          <li>
            Words learned (passed weekly quiz or mastered): <strong>{countLearned(s)}</strong>
          </li>
          <li>
            Words fully mastered: <strong>{countMastered(s)}</strong>
          </li>
          <li>
            Stickers: <strong>{Object.keys(s.stickers).length}</strong> of {stickerCatalog(s).length}
          </li>
          <li>
            Memory Missions done: <strong>{s.stats.memoryMissions}</strong> ({s.stats.reviewsCorrect}/{s.stats.reviewsDone} review answers correct)
          </li>
          <li>
            Creative Challenges: <strong>{s.stats.creativeDone}</strong>
          </li>
        </ul>
      </Section>
      <Section title="Delayed Memory Checks">
        {pendingDelayed.length ? (
          <ul className="text-lg">
            {pendingDelayed.map((w) => {
              const wp = weekProgress(s, w.id);
              return (
                <li key={w.id}>
                  Week {w.number}: {wp.delayedAvailableAt && wp.delayedAvailableAt <= t ? <strong className="text-good">available now</strong> : `opens ${whenText(wp.delayedAvailableAt ?? t, t)}`}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-ink-soft">No Memory Checks waiting.</p>
        )}
      </Section>
      <Section title="Words to review">
        {due.length ? (
          <p className="text-lg">
            Due now: <strong>{due.map((id) => s.curriculum.words[id]?.text).join(', ')}</strong>
          </p>
        ) : (
          <p className="text-ink-soft">No reviews due right now.</p>
        )}
        {struggling.length > 0 && (
          <p className="text-lg">
            Needs extra attention: <strong>{struggling.slice(0, 6).map((p) => s.curriculum.words[p.wordId].text).join(', ')}</strong>
          </p>
        )}
      </Section>
      <Section title="Where progress is saved">
        <p>
          Progress is saved <strong>only in this browser on this device</strong> (IndexedDB). Other tablets do <strong>not</strong> sync automatically. To move progress, use{' '}
          <em>Backup → Export</em> here and <em>Import</em> on the other device.
        </p>
        <p className="text-ink-soft">
          Tip for iPad: tap Share → <em>Add to Home Screen</em>. Safari may clear website data for sites not used for a while; installed home-screen apps are kept. Export a backup now and then.
        </p>
        <p className="text-sm">
          Persistent storage: {persisted === null ? 'unknown' : persisted ? '✅ granted' : 'not granted'}{' '}
          {!persisted && (
            <button type="button" className="underline" onClick={() => void requestPersistentStorage().then(setPersisted)}>
              Request it
            </button>
          )}
        </p>
      </Section>
    </div>
  );
}

function NumberField({ label, value, onChange, min = 0, max = 99, testId }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; testId?: string }) {
  return (
    <label className="flex items-center justify-between gap-3 text-lg">
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        data-testid={testId}
        onChange={(e) => onChange(Number(e.target.value))}
        className="min-h-12 w-24 rounded-xl border-2 border-ink/15 px-3 text-lg"
      />
    </label>
  );
}

function SettingsPanel() {
  const s = useAppState();
  const [cfg, setCfg] = useState<MasteryConfig>(structuredClone(s.config));
  const [intervals, setIntervals] = useState(s.config.reviewIntervalsDays.join(', '));
  const [saved, setSaved] = useState(false);
  const setSetting = <K extends keyof typeof s.settings>(k: K, v: (typeof s.settings)[K]) => act((d) => void (d.settings[k] = v));

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <PinSection />
      <Section title="Child & accessibility">
        <label className="flex items-center justify-between gap-3 text-lg">
          <span>Child’s name</span>
          <input value={s.settings.childName} onChange={(e) => setSetting('childName', e.target.value.slice(0, 30))} className="min-h-12 w-48 rounded-xl border-2 border-ink/15 px-3" />
        </label>
        <Toggle label="Sound effects" value={s.settings.soundOn} onChange={(v) => setSetting('soundOn', v)} />
        <Toggle label="Read-aloud buttons" value={s.settings.speechOn} onChange={(v) => setSetting('speechOn', v)} />
        <label className="flex items-center justify-between gap-3 text-lg">
          <span>Reading speed</span>
          <input type="range" min={0.6} max={1.2} step={0.05} value={s.settings.speechRate} onChange={(e) => setSetting('speechRate', Number(e.target.value))} className="w-48" />
        </label>
        <label className="flex items-center justify-between gap-3 text-lg">
          <span>Animations</span>
          <select value={s.settings.motion} onChange={(e) => setSetting('motion', e.target.value as typeof s.settings.motion)} className="min-h-12 rounded-xl border-2 border-ink/15 px-3">
            <option value="system">Follow device setting</option>
            <option value="reduced">Calm (reduced motion)</option>
            <option value="full">Full</option>
          </select>
        </label>
      </Section>
      <Section title="Mastery rules">
        <p className="text-sm text-ink-soft">These defaults are product-design choices, not research-mandated cutoffs. Changing them doesn’t alter past results.</p>
        <NumberField label="Different practice games per word before the quiz" value={cfg.practiceActivitiesPerWord} max={4} onChange={(n) => setCfg({ ...cfg, practiceActivitiesPerWord: n })} />
        <NumberField label={`Weekly quiz: correct needed (of ${cfg.initial.questionsPerWord * 3})`} value={cfg.initial.passTotal} max={9} testId="cfg-initial-pass" onChange={(n) => setCfg({ ...cfg, initial: { ...cfg.initial, passTotal: n } })} />
        <NumberField label="Weekly quiz: minimum correct per word" value={cfg.initial.perWordMin} max={3} onChange={(n) => setCfg({ ...cfg, initial: { ...cfg.initial, perWordMin: n } })} />
        <NumberField label={`Memory Check: correct needed (of ${cfg.delayed.questionsPerWord * 3})`} value={cfg.delayed.passTotal} max={6} onChange={(n) => setCfg({ ...cfg, delayed: { ...cfg.delayed, passTotal: n } })} />
        <NumberField label="Memory Check: minimum correct per word" value={cfg.delayed.perWordMin} max={2} onChange={(n) => setCfg({ ...cfg, delayed: { ...cfg.delayed, perWordMin: n } })} />
        <NumberField label="Hours before the Memory Check opens" value={cfg.delayed.delayHours} max={336} testId="cfg-delay" onChange={(n) => setCfg({ ...cfg, delayed: { ...cfg.delayed, delayHours: n } })} />
        <label className="flex flex-col gap-1 text-lg">
          <span>Review intervals (days, comma-separated)</span>
          <input value={intervals} onChange={(e) => setIntervals(e.target.value)} className="min-h-12 rounded-xl border-2 border-ink/15 px-3" />
        </label>
        <div className="flex flex-wrap gap-3">
          <Button
            data-testid="save-config"
            onClick={() => {
              const iv = intervals.split(/[,\s]+/).map(Number).filter((n) => n > 0);
              act((d) => parentUpdateConfig(d, { ...cfg, reviewIntervalsDays: iv }));
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            Save rules
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setCfg(structuredClone(DEFAULT_CONFIG));
              setIntervals(DEFAULT_CONFIG.reviewIntervalsDays.join(', '));
            }}
          >
            Restore defaults
          </Button>
          {saved && <span className="self-center font-semibold text-good">Saved!</span>}
        </div>
      </Section>
    </div>
  );
}

function PinSection() {
  const s = useAppState();
  const hasPin = Boolean(s.settings.parentPinHash);
  const [pin, setPin] = useState('');
  const [again, setAgain] = useState('');
  const [msg, setMsg] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(false);
  const digits = (v: string) => v.replace(/\D/g, '').slice(0, PIN_MAX);
  const save = () => {
    if (!validPin(pin)) return setMsg(`Use ${PIN_MIN}–${PIN_MAX} digits.`);
    if (pin !== again) return setMsg('The two PINs don’t match.');
    act((d) => void (d.settings.parentPinHash = hashPin(pin)));
    setPin('');
    setAgain('');
    setMsg('✅ PIN saved. You’ll need it to open this area.');
  };
  return (
    <Section title="🔑 Grown-ups PIN">
      <p>{hasPin ? 'A PIN is set. You can change or remove it here.' : 'No PIN yet — the gate uses a math question instead.'} Pick digits your child won’t guess (not a birthday or 1234).</p>
      <div className="flex flex-wrap gap-3">
        <input type="password" inputMode="numeric" autoComplete="new-password" placeholder={hasPin ? 'New PIN' : 'PIN'} aria-label="New PIN" data-testid="pin-new" value={pin} onChange={(e) => (setPin(digits(e.target.value)), setMsg(''))} className="min-h-12 w-36 rounded-xl border-2 border-ink/15 px-3 text-lg tracking-widest" />
        <input type="password" inputMode="numeric" autoComplete="new-password" placeholder="Repeat PIN" aria-label="Repeat PIN" data-testid="pin-repeat" value={again} onChange={(e) => (setAgain(digits(e.target.value)), setMsg(''))} className="min-h-12 w-36 rounded-xl border-2 border-ink/15 px-3 text-lg tracking-widest" />
        <Button onClick={save} disabled={!pin || !again} data-testid="pin-save">
          {hasPin ? 'Change PIN' : 'Set PIN'}
        </Button>
        {hasPin && (
          <Button variant="secondary" onClick={() => setConfirmRemove(true)}>
            Remove PIN
          </Button>
        )}
      </div>
      {msg && <p className="font-semibold" data-testid="pin-msg">{msg}</p>}
      <p className="text-sm text-ink-soft">Forgot it? The gate has a “Forgot the PIN?” link with a much harder math problem that removes the PIN. Progress is never affected.</p>
      <ConfirmDialog
        open={confirmRemove}
        title="Remove the PIN?"
        body="The gate will go back to a math question."
        confirmLabel="Remove"
        onCancel={() => setConfirmRemove(false)}
        onConfirm={() => {
          act((d) => void (d.settings.parentPinHash = null));
          setConfirmRemove(false);
          setMsg('PIN removed.');
        }}
      />
    </Section>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-12 items-center justify-between gap-3 text-lg">
      <span>{label}</span>
      <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} className="h-7 w-7 accent-[#5b3cc4]" />
    </label>
  );
}

export function downloadText(text: string, filename: string) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

function BackupPanel() {
  const s = useAppState();
  const replaceState = useGame((g) => g.replaceState);
  const resetAll = useGame((g) => g.resetAll);
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<ReturnType<typeof parseBackup> | null>(null);
  const [msg, setMsg] = useState('');
  const [confirmReset, setConfirmReset] = useState(0);
  const stamp = new Date(now()).toISOString().slice(0, 10);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <Section title="Export">
        <p>Save a file you can keep safe or move to another device.</p>
        <div className="flex flex-wrap gap-3">
          <Button data-testid="export-full" onClick={() => downloadText(exportFull(s, now()), `word-quest-backup-${stamp}.json`)}>
            Export progress + curriculum
          </Button>
          <Button variant="secondary" onClick={() => downloadText(exportCurriculum(s, now()), `word-quest-curriculum-${stamp}.json`)}>
            Export curriculum only
          </Button>
        </div>
      </Section>
      <Section title="Import">
        <p>Load a file exported from Word Quest. You’ll be asked to confirm before anything changes.</p>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          data-testid="import-file"
          className="text-lg"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = '';
            if (!f) return;
            try {
              setPending(parseBackup(await f.text()));
              setMsg('');
            } catch (err) {
              setMsg((err as Error).message);
            }
          }}
        />
        {msg && <p className="font-semibold text-oops" data-testid="import-msg">{msg}</p>}
      </Section>
      <Section title="Start over">
        <p>Erase all progress on this device and return to the starting point (Weeks 1–2 complete, Week 3 ready). Export a backup first!</p>
        <Button variant="danger" onClick={() => setConfirmReset(1)}>
          Reset everything…
        </Button>
      </Section>

      <ConfirmDialog
        open={Boolean(pending)}
        title={pending?.kind === 'full' ? 'Replace all progress?' : 'Import curriculum?'}
        body={
          pending?.kind === 'full' ? (
            <>
              This replaces everything on this device with the backup from <strong>{pending.exportedAt?.slice(0, 10)}</strong>. Current progress will be lost unless you exported it.
            </>
          ) : (
            'Word content and week lists will be replaced. All learning history and stickers on this device are kept.'
          )
        }
        confirmLabel="Import"
        danger={pending?.kind === 'full'}
        onCancel={() => setPending(null)}
        onConfirm={() => {
          try {
            if (pending?.kind === 'full') replaceState(importFull(pending, now()));
            else if (pending) act((d) => importCurriculumInto(d, pending));
            setMsg('✅ Import complete.');
          } catch (err) {
            setMsg((err as Error).message);
          }
          setPending(null);
        }}
      />
      <ConfirmDialog
        open={confirmReset === 1}
        title="Reset everything?"
        body="All quiz results, stickers earned in Word Quest, and decorated worlds on this device will be erased."
        confirmLabel="Continue"
        danger
        onCancel={() => setConfirmReset(0)}
        onConfirm={() => setConfirmReset(2)}
      />
      <ConfirmDialog
        open={confirmReset === 2}
        title="Are you completely sure?"
        body="This cannot be undone."
        confirmLabel="Yes, erase it all"
        danger
        onCancel={() => setConfirmReset(0)}
        onConfirm={() => {
          void resetAll();
          setConfirmReset(0);
          setMsg('Progress reset.');
        }}
      />
    </div>
  );
}

