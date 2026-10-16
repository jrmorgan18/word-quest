import { useMemo, useState } from 'react';
import { create } from 'zustand';
import { Button, Card, Screen, TopBar } from '../../components/ui';
import { go, routes } from '../../lib/router';

/** Session-only unlock flag. This is a simple "grown-ups only" gate, not real security. */
export const useParentGate = create<{ open: boolean; setOpen: (v: boolean) => void }>((set) => ({ open: false, setOpen: (open) => set({ open }) }));

export function ParentGate() {
  const setOpen = useParentGate((g) => g.setOpen);
  const [a, b] = useMemo(() => [6 + Math.floor(Math.random() * 4), 6 + Math.floor(Math.random() * 4)], []);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  return (
    <div className="paper-bg min-h-screen">
      <TopBar title="🔒 Grown-ups only" onBack={() => go(routes.home())} />
      <Screen>
        <Card className="mx-auto flex max-w-md flex-col gap-4">
          <p className="text-lg">This area is for parents. Please answer to continue.</p>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (Number(value) === a * b) setOpen(true);
              else {
                setError(true);
                setValue('');
              }
            }}
          >
            <label className="font-display text-2xl font-semibold" htmlFor="gate-answer">
              What is {a} × {b}?
            </label>
            <input
              id="gate-answer"
              data-testid="gate-answer"
              inputMode="numeric"
              autoComplete="off"
              value={value}
              onChange={(e) => {
                setValue(e.target.value.replace(/\D/g, ''));
                setError(false);
              }}
              className="min-h-14 rounded-2xl border-4 border-ink/10 px-4 text-2xl focus:border-grape focus:outline-none"
            />
            {error && <p className="font-semibold text-oops">That’s not quite right. Try again.</p>}
            <Button type="submit" size="lg" data-testid="gate-submit">
              Enter
            </Button>
          </form>
          <p className="text-sm text-ink-soft">Note: this is a simple gate to keep little fingers out — not a password.</p>
        </Card>
      </Screen>
    </div>
  );
}
