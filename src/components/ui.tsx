import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'motion/react';
import type { Theme } from '../data/types';
import { back } from '../lib/router';
import { play, setSoundEnabled } from '../lib/sound';
import { speak, speechSupported } from '../lib/speech';
import { act, useAppState } from '../store/game';

export const THEME: Record<Theme, { name: string; emoji: string; bg: string; text: string; light: string; ring: string; shadow: string; grad: string }> = {
  dino: {
    name: 'Dinosaur Island',
    emoji: '🦕',
    bg: 'bg-dino',
    text: 'text-dino',
    light: 'bg-dino-light',
    ring: 'ring-dino',
    shadow: '#18734a',
    grad: 'from-[#c9f2d6] to-[#f1fbe9]',
  },
  space: {
    name: 'Space Explorer',
    emoji: '🚀',
    bg: 'bg-space',
    text: 'text-space',
    light: 'bg-space-light',
    ring: 'ring-space',
    shadow: '#33299a',
    grad: 'from-[#dcd8ff] to-[#f3f0ff]',
  },
  arcade: {
    name: 'Pixel Arcade',
    emoji: '🕹️',
    bg: 'bg-arcade',
    text: 'text-arcade',
    light: 'bg-arcade-light',
    ring: 'ring-arcade',
    shadow: '#ad2a30',
    grad: 'from-[#ffd9d6] to-[#fff4e8]',
  },
};

type Variant = 'primary' | 'secondary' | 'good' | 'sun' | 'dino' | 'space' | 'arcade' | 'ghost' | 'danger';

const VARIANTS: Record<Variant, { cls: string; shadow: string }> = {
  primary: { cls: 'bg-grape text-white', shadow: '#432a99' },
  secondary: { cls: 'bg-white text-ink border-2 border-ink/10', shadow: 'rgba(43,35,64,0.18)' },
  good: { cls: 'bg-good text-white', shadow: '#146b3a' },
  sun: { cls: 'bg-sun text-ink', shadow: '#c99400' },
  dino: { cls: 'bg-dino text-white', shadow: '#18734a' },
  space: { cls: 'bg-space text-white', shadow: '#33299a' },
  arcade: { cls: 'bg-arcade text-white', shadow: '#ad2a30' },
  ghost: { cls: 'bg-transparent text-ink', shadow: 'transparent' },
  danger: { cls: 'bg-[#c0392b] text-white', shadow: '#8e2a20' },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  sfx?: boolean;
}

export function Button({ variant = 'primary', size = 'md', icon, className = '', children, onClick, sfx = true, style, ...rest }: ButtonProps) {
  const v = VARIANTS[variant];
  const sz = size === 'xl' ? 'min-h-16 px-7 text-2xl rounded-3xl' : size === 'lg' ? 'min-h-14 px-6 text-xl rounded-2xl' : 'min-h-12 px-5 text-lg rounded-2xl';
  return (
    <button
      type="button"
      className={`btn-3d inline-flex items-center justify-center gap-2 font-semibold disabled:opacity-50 ${sz} ${v.cls} ${className}`}
      style={{ ['--btn-shadow' as string]: v.shadow, ...style }}
      onClick={(e) => {
        if (sfx) play('tap');
        onClick?.(e);
      }}
      {...rest}
    >
      {icon && <span aria-hidden className="text-[1.2em] leading-none">{icon}</span>}
      {children}
    </button>
  );
}

export function IconButton({ label, children, className = '', onClick, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`btn-3d inline-flex h-12 min-w-12 items-center justify-center rounded-2xl bg-white px-3 text-2xl text-ink ${className}`}
      style={{ ['--btn-shadow' as string]: 'rgba(43,35,64,0.18)' }}
      onClick={(e) => {
        play('tap');
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Card({ className = '', children, ...rest }: { className?: string; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded-3xl bg-white p-5 shadow-[0_6px_0_rgba(43,35,64,0.08),0_2px_12px_rgba(43,35,64,0.06)] ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function SoundToggle() {
  const s = useAppState();
  useEffect(() => setSoundEnabled(s.settings.soundOn), [s.settings.soundOn]);
  return (
    <IconButton
      label={s.settings.soundOn ? 'Turn sound off' : 'Turn sound on'}
      aria-pressed={s.settings.soundOn}
      onClick={() => act((d) => void (d.settings.soundOn = !d.settings.soundOn))}
    >
      {s.settings.soundOn ? '🔊' : '🔇'}
    </IconButton>
  );
}

export function TopBar({ title, onBack, right, theme }: { title?: ReactNode; onBack?: () => void; right?: ReactNode; theme?: Theme }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 bg-cream/90 px-4 py-3 backdrop-blur-sm sm:px-6">
      <IconButton label="Go back" onClick={onBack ?? (() => back())}>
        ←
      </IconButton>
      <h1 className={`min-w-0 flex-1 truncate text-2xl font-semibold sm:text-3xl ${theme ? THEME[theme].text : ''}`}>{title}</h1>
      {right}
      <SoundToggle />
    </header>
  );
}

export function SpeakButton({ text, label = 'Read aloud', className = '', size = 'md' }: { text: string; label?: string; className?: string; size?: 'md' | 'lg' }) {
  const s = useAppState();
  const [unavailable, setUnavailable] = useState(false);
  if (!s.settings.speechOn) return null;
  const supported = speechSupported();
  return (
    <button
      type="button"
      aria-label={label}
      title={supported ? label : 'Read-aloud isn’t available on this device'}
      onClick={() => {
        const ok = speak(text, s.settings.speechRate);
        if (!ok) setUnavailable(true);
      }}
      className={`btn-3d inline-flex shrink-0 items-center justify-center rounded-full bg-sun text-ink ${size === 'lg' ? 'h-16 w-16 text-3xl' : 'h-12 w-12 text-2xl'} ${unavailable || !supported ? 'opacity-50' : ''} ${className}`}
      style={{ ['--btn-shadow' as string]: '#c99400' }}
    >
      <span aria-hidden>🔈</span>
    </button>
  );
}

export function ProgressDots({ total, current, results }: { total: number; current: number; results?: (boolean | null)[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2" aria-label={`Question ${current + 1} of ${total}`} role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current + 1}>
      {Array.from({ length: total }).map((_, i) => {
        const r = results?.[i];
        const cls = i === current ? 'bg-grape scale-125' : r === true ? 'bg-good' : r === false ? 'bg-oops' : i < current ? 'bg-grape/60' : 'bg-ink/15';
        return <span key={i} className={`h-3 w-3 rounded-full transition-transform ${cls}`} />;
      })}
    </div>
  );
}

export function Modal({ open, onClose, children, labelledBy, wide }: { open: boolean; onClose?: () => void; children: ReactNode; labelledBy?: string; wide?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.querySelector<HTMLElement>('button, [href], input, textarea, select')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  // Enter-only animation: closing is instant so a stalled exit can never leave an overlay behind.
  if (!open) return null;
  return (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={(e) => e.target === e.currentTarget && onClose?.()}
        >
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={`max-h-[90vh] w-full overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ${wide ? 'max-w-2xl' : 'max-w-md'}`}
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            {children}
          </motion.div>
        </motion.div>
  );
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = 'Yes',
  cancelLabel = 'Cancel',
  danger,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  body?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} labelledBy="confirm-title">
      <h2 id="confirm-title" className="text-2xl font-semibold">
        {title}
      </h2>
      {body && <div className="mt-2 text-ink-soft">{body}</div>}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export function Pill({ children, className = '', ...rest }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold ${className}`} {...rest}>
      {children}
    </span>
  );
}

export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <main className={`mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 ${className}`}>{children}</main>;
}
