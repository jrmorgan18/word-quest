/** Read-aloud via the browser's built-in speech synthesis. Degrades gracefully when unavailable. */
import { plain } from './text';

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
}

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith('en'));
  const preferred = ['Samantha', 'Google US English', 'Karen', 'Moira', 'Daniel', 'Microsoft Aria', 'Microsoft Jenny'];
  cachedVoice = preferred.map((n) => en.find((v) => v.name.includes(n))).find(Boolean) ?? en.find((v) => v.localService) ?? en[0] ?? null;
  return cachedVoice;
}

if (speechSupported()) {
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoice = undefined;
  };
}

export function speak(text: string, rate = 0.9): boolean {
  if (!speechSupported()) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(plain(text));
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v?.lang ?? 'en-US';
    u.rate = rate;
    u.pitch = 1.05;
    window.speechSynthesis.speak(u);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking(): void {
  if (speechSupported()) window.speechSynthesis.cancel();
}
