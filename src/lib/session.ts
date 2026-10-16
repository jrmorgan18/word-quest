/**
 * In-memory session tracker (not persisted). Used to suggest a natural stopping point after a
 * short session instead of encouraging endless play.
 */
import { create } from 'zustand';

interface SessionStore {
  startedAt: number;
  completed: number;
  quizDone: boolean;
  dismissedStop: boolean;
  complete: (opts?: { quiz?: boolean }) => void;
  dismissStop: () => void;
}

export const STOPPING_POINT_ACTIVITIES = 4;

export const useSession = create<SessionStore>((set) => ({
  startedAt: Date.now(),
  completed: 0,
  quizDone: false,
  dismissedStop: false,
  complete: (opts) => set((s) => ({ completed: s.completed + 1, quizDone: s.quizDone || Boolean(opts?.quiz) })),
  dismissStop: () => set({ dismissedStop: true }),
}));

export function atStoppingPoint(s: Pick<SessionStore, 'completed' | 'quizDone' | 'dismissedStop'>): boolean {
  return !s.dismissedStop && (s.quizDone || s.completed >= STOPPING_POINT_ACTIVITIES);
}
