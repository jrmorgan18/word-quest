import { parseMarked } from '../lib/text';

/** Renders curriculum text, highlighting the {marked} word or replacing it with a blank. */
export function MarkedText({ text, mode = 'highlight', fill }: { text: string; mode?: 'highlight' | 'blank' | 'plain'; fill?: boolean }) {
  return (
    <>
      {parseMarked(text).map((p, i) => {
        if (!p.marked) return <span key={i}>{p.text}</span>;
        if (mode === 'plain') return <span key={i}>{p.text}</span>;
        if (mode === 'blank' && !fill)
          return (
            <span key={i} className="mx-1 inline-block min-w-24 border-b-4 border-dashed border-grape/60 align-baseline" aria-label="blank">
              &nbsp;
            </span>
          );
        return (
          <mark key={i} className="rounded-lg bg-sun-light px-1 font-bold text-grape-dark">
            {p.text}
          </mark>
        );
      })}
    </>
  );
}
