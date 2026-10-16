import type { Week } from '../data/types';
import { activityInfo } from '../engine/activities';
import type { NextStep } from '../engine/progress';
import type { AppState } from '../engine/types';
import { routes } from '../lib/router';

export function describeNextStep(s: AppState, week: Week, step: NextStep): { label: string; icon: string; route: string | null; detail: string } {
  switch (step.kind) {
    case 'discover': {
      const w = s.curriculum.words[step.wordId];
      return { label: `Discover “${w?.text}”`, icon: '🔍', route: routes.discover(week.id, step.wordId), detail: 'Meet a brand-new word!' };
    }
    case 'practice': {
      const a = activityInfo(step.activity);
      return { label: `Play ${a?.title}`, icon: a?.icon ?? '🎯', route: routes.play(week.id, step.activity), detail: 'Practice makes your word power stronger.' };
    }
    case 'refresher':
      return { label: 'Quick Refresher', icon: '✨', route: routes.play(week.id, 'refresher'), detail: 'A short warm-up for the words that were tricky.' };
    case 'quiz':
      return step.quizType === 'initial'
        ? { label: 'Take the Weekly Quiz!', icon: '🏁', route: routes.quiz(week.id, 'initial'), detail: 'Show what you know — 9 questions.' }
        : { label: 'Memory Check is ready!', icon: '🧠', route: routes.quiz(week.id, 'delayed'), detail: 'Six questions to lock in your words.' };
    case 'wait':
      return { label: 'Memory Check opens soon', icon: '🌙', route: null, detail: `Your brain is storing the words. Come back ${whenText(step.availableAt)}!` };
    case 'done':
      return { label: 'Week conquered!', icon: '🏆', route: routes.week(week.id), detail: 'Replay any activity whenever you like.' };
  }
}

/** Friendly, calm time text — never a ticking countdown. */
export function whenText(at: number, now = Date.now()): string {
  const d = new Date(at);
  const today = new Date(now);
  const tomorrow = new Date(now + 86400000);
  const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  if (at <= now) return 'now';
  if (d.toDateString() === today.toDateString()) return `later today (after ${time})`;
  if (d.toDateString() === tomorrow.toDateString()) return `tomorrow (after ${time})`;
  return `on ${d.toLocaleDateString([], { weekday: 'long' })}`;
}
