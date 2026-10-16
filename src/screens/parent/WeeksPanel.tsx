import { useState } from 'react';
import { Button, ConfirmDialog, Pill } from '../../components/ui';
import { whenText } from '../../components/nextStep';
import { parentMarkWeekComplete, parentMarkWordMastered, parentResetQuizProgress, parentSetWeekLocked, parentSkipWait } from '../../engine/parent';
import { currentWeek, practiceDone, sortedWeeks, weekProgress, weekWords, wordProgress, wordStatus } from '../../engine/progress';
import { weekAttempts } from '../../engine/quiz';
import type { Week } from '../../data/types';
import { now } from '../../lib/clock';
import { act, useAppState } from '../../store/game';
import { STATUS_UI } from '../Home';
import { Section } from './ParentDashboard';

type Pending = { title: string; body: string; run: () => void; danger?: boolean } | null;

const fmt = (t: number | null | undefined) => (t ? new Date(t).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—');

export function WeeksPanel() {
  const s = useAppState();
  const cur = currentWeek(s);
  const [openId, setOpenId] = useState<string | null>(cur?.id ?? null);
  const [pending, setPending] = useState<Pending>(null);

  return (
    <div className="flex flex-col gap-4">
      {sortedWeeks(s).map((w) => (
        <WeekRow key={w.id} week={w} open={openId === w.id} onToggle={() => setOpenId(openId === w.id ? null : w.id)} confirm={setPending} isCurrent={cur?.id === w.id} />
      ))}
      <ConfirmDialog
        open={Boolean(pending)}
        title={pending?.title ?? ''}
        body={pending?.body}
        danger={pending?.danger}
        confirmLabel="Confirm"
        onCancel={() => setPending(null)}
        onConfirm={() => {
          pending?.run();
          setPending(null);
        }}
      />
    </div>
  );
}

function WeekRow({ week, open, onToggle, confirm, isCurrent }: { week: Week; open: boolean; onToggle: () => void; confirm: (p: Pending) => void; isCurrent: boolean }) {
  const s = useAppState();
  const t = now();
  const wp = weekProgress(s, week.id);
  const attempts = weekAttempts(s, week.id);
  const status = wp.mastered ? (wp.completionSource === 'parent-confirmed' ? 'Completed (parent-confirmed, before app)' : wp.completionSource === 'parent-override' ? 'Completed (parent override)' : 'Mastered') : !wp.unlocked ? 'Locked' : wp.initialPassedAt ? 'Quiz passed — Memory Check pending' : 'In progress';

  return (
    <Section
      title={`Week ${week.number}: ${week.title}`}
      right={
        <div className="flex items-center gap-2">
          {isCurrent && <Pill className="bg-sun text-ink">Current</Pill>}
          <Pill className={wp.mastered ? 'bg-good-light text-good' : wp.unlocked ? 'bg-grape-light text-grape' : 'bg-ink/10 text-ink-soft'}>{status}</Pill>
          <Button variant="secondary" onClick={onToggle} aria-expanded={open} data-testid={`expand-${week.id}`}>
            {open ? 'Hide' : 'Details'}
          </Button>
        </div>
      }
    >
      {open && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {!wp.unlocked ? (
              <Button data-testid={`unlock-${week.id}`} onClick={() => act((d) => parentSetWeekLocked(d, week.id, false))}>
                🔓 Unlock week
              </Button>
            ) : (
              !wp.mastered && (
                <Button
                  variant="secondary"
                  onClick={() => confirm({ title: `Lock Week ${week.number}?`, body: 'Progress is kept; the week just becomes unavailable until unlocked again.', run: () => act((d) => parentSetWeekLocked(d, week.id, true)) })}
                >
                  🔒 Relock week
                </Button>
              )
            )}
            {!wp.mastered && week.wordIds.length > 0 && (
              <Button
                variant="good"
                data-testid={`complete-${week.id}`}
                onClick={() =>
                  confirm({
                    title: `Mark Week ${week.number} complete?`,
                    body: 'All its words become mastered (marked as a parent override), its stickers are granted, and the next week unlocks.',
                    run: () => act((d, now) => parentMarkWeekComplete(d, week.id, now)),
                  })
                }
              >
                ✅ Mark week complete
              </Button>
            )}
            {wp.initialPassedAt && !wp.delayedPassedAt && wp.delayedAvailableAt && wp.delayedAvailableAt > t && (
              <Button variant="sun" data-testid={`skip-wait-${week.id}`} onClick={() => act((d, now) => parentSkipWait(d, week.id, now))}>
                ⏩ Open Memory Check now
              </Button>
            )}
            {(wp.initialPassedAt || attempts.length > 0) && (
              <Button
                variant="danger"
                onClick={() =>
                  confirm({
                    title: `Reset Week ${week.number} quiz progress?`,
                    body: 'Quiz passes and mastery for this week are cleared so the quizzes can be taken again. Past attempts stay in history (marked reset). Stickers are kept. Practice history is kept.',
                    danger: true,
                    run: () => act((d) => parentResetQuizProgress(d, week.id)),
                  })
                }
              >
                ↺ Reset quiz progress
              </Button>
            )}
          </div>
          {wp.note && <p className="text-ink-soft">{wp.note}</p>}
          {wp.initialPassedAt && !wp.delayedPassedAt && (
            <p>
              Memory Check: {wp.delayedAvailableAt && wp.delayedAvailableAt <= t ? 'available now' : `opens ${whenText(wp.delayedAvailableAt ?? t, t)} (${fmt(wp.delayedAvailableAt)})`}
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="text-sm text-ink-soft">
                <tr>
                  <th className="py-1">Word</th>
                  <th>Status</th>
                  <th>Practice games</th>
                  <th>Struggle</th>
                  <th>Next review</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {weekWords(s, week).map((word) => {
                  const p = wordProgress(s, word.id);
                  const st = STATUS_UI[wordStatus(p)];
                  return (
                    <tr key={word.id} className="border-t border-ink/10">
                      <td className="py-2 font-display text-lg font-semibold">{word.text}</td>
                      <td>
                        <span className={`rounded-full px-2 py-0.5 text-sm font-bold ${st.cls}`}>
                          {st.icon} {st.label}
                        </span>
                        {p.masterySource && p.masterySource !== 'earned' && <span className="ml-1 text-xs text-ink-soft">({p.masterySource})</span>}
                      </td>
                      <td>{[...practiceDone(p)].join(', ') || '—'}</td>
                      <td>{p.struggle ? p.struggle.toFixed(1) : '0'}</td>
                      <td>{p.review ? (p.review.dueAt <= t ? 'due now' : fmt(p.review.dueAt)) : '—'}</td>
                      <td className="text-right">
                        {!p.mastered && (
                          <Button
                            variant="secondary"
                            onClick={() =>
                              confirm({
                                title: `Mark “${word.text}” mastered?`,
                                body: 'The word is marked mastered (parent override), its sticker is granted, and reviews are scheduled.',
                                run: () => act((d, now) => parentMarkWordMastered(d, word.id, now)),
                              })
                            }
                          >
                            Mark mastered
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Quiz attempts</h3>
            {attempts.length === 0 ? (
              <p className="text-ink-soft">{wp.completionSource === 'parent-confirmed' ? 'Completed before Word Quest — no quiz records.' : 'No attempts yet.'}</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {attempts.map((a) => (
                  <li key={a.id} className={a.voided ? 'text-ink-soft line-through' : ''}>
                    {fmt(a.completedAt)} — {a.quizType === 'initial' ? 'Weekly quiz' : 'Memory Check'}: <strong>{a.score}/{a.total}</strong> {a.passed ? '✅ passed' : '— not yet'}{' '}
                    <span className="text-sm text-ink-soft">
                      ({Object.entries(a.perWord)
                        .map(([id, v]) => `${s.curriculum.words[id]?.text ?? id} ${v.correct}/${v.total}`)
                        .join(', ')}
                      ){a.voided ? ' [reset]' : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
