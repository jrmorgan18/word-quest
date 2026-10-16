/**
 * Helpers for curriculum text where the vocabulary word is marked with braces:
 * "The goalie {anticipated} where the ball would go."
 */
export interface TextPart {
  text: string;
  marked: boolean;
}

export function parseMarked(text: string): TextPart[] {
  const parts: TextPart[] = [];
  const re = /\{([^}]+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), marked: false });
    parts.push({ text: m[1], marked: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), marked: false });
  return parts;
}

/** Plain text with braces removed. */
export function plain(text: string): string {
  return text.replace(/\{([^}]+)\}/g, '$1');
}

/** Text with the marked word replaced by a blank. */
export function blanked(text: string, blank = '_____'): string {
  return text.replace(/\{([^}]+)\}/g, blank);
}

export function countMarks(text: string): number {
  return (text.match(/\{[^}]+\}/g) ?? []).length;
}

export function lowerFirst(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** If a sentence lacks braces, mark the first occurrence of the word (any suffix) so it can be blanked. */
export function autoMark(sentence: string, word: string): string {
  if (countMarks(sentence) > 0) return sentence;
  const stem = word.toLowerCase().replace(/e$/, '');
  const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\b(${escaped}[a-z]*)\\b`, 'i');
  return re.test(sentence) ? sentence.replace(re, '{$1}') : sentence;
}
