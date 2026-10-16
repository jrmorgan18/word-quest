import { useEffect, useState } from 'react';
import { Button, ConfirmDialog } from '../../components/ui';
import type { Theme, Word } from '../../data/types';
import { parentAddWeek, parentAddWord, parentReplaceWord, parentUpdateWeek, parentUpdateWord, type NewWordInput } from '../../engine/parent';
import { sortedWeeks, weekWords } from '../../engine/progress';
import { act, useAppState } from '../../store/game';
import { Section } from './ParentDashboard';

const lines = (a?: string[]) => (a ?? []).join('\n');
const split = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean);

function Field({ label, value, onChange, rows = 1, hint, testId }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string; testId?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-semibold">
        {label} {hint && <span className="text-sm font-normal text-ink-soft">— {hint}</span>}
      </span>
      {rows > 1 ? (
        <textarea data-testid={testId} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="rounded-xl border-2 border-ink/15 p-2" />
      ) : (
        <input data-testid={testId} value={value} onChange={(e) => onChange(e.target.value)} className="min-h-12 rounded-xl border-2 border-ink/15 px-3" />
      )}
    </label>
  );
}

export function CurriculumPanel() {
  const s = useAppState();
  const weeks = sortedWeeks(s);
  const [weekId, setWeekId] = useState(weeks[2]?.id ?? weeks[0]?.id);
  const week = weeks.find((w) => w.id === weekId) ?? weeks[0];
  const [wordId, setWordId] = useState<string | null>(null);
  const [mode, setMode] = useState<'edit' | 'add' | 'replace' | null>(null);

  useEffect(() => {
    setWordId(null);
    setMode(null);
  }, [weekId]);

  return (
    <div className="flex flex-col gap-5">
      <Section title="Choose a week">
        <div className="flex flex-wrap gap-2">
          {weeks.map((w) => (
            <Button key={w.id} variant={w.id === week?.id ? 'primary' : 'secondary'} onClick={() => setWeekId(w.id)}>
              Week {w.number}
            </Button>
          ))}
        </div>
        {week && <WeekEditor key={week.id} weekId={week.id} />}
      </Section>

      {week && (
        <Section title={`Words in Week ${week.number}`}>
          <p className="text-sm text-ink-soft">Editing words never changes learning history. Edited words are protected from future built-in content updates.</p>
          <div className="flex flex-wrap gap-2">
            {weekWords(s, week).map((w) => (
              <Button
                key={w.id}
                variant={wordId === w.id ? 'primary' : 'secondary'}
                data-testid={`edit-word-${w.id}`}
                onClick={() => {
                  setWordId(w.id);
                  setMode('edit');
                }}
              >
                {w.text}
                {w.customized ? ' ✏️' : ''}
              </Button>
            ))}
            <Button variant="good" onClick={() => (setMode('add'), setWordId(null))} data-testid="add-word">
              ➕ Add word
            </Button>
          </div>
          {mode === 'edit' && wordId && s.curriculum.words[wordId] && (
            <WordEditor key={wordId} word={s.curriculum.words[wordId]} onReplace={() => setMode('replace')} onDone={() => setMode(null)} />
          )}
          {(mode === 'add' || mode === 'replace') && (
            <NewWordForm
              title={mode === 'add' ? `Add a word to Week ${week.number}` : `Replace “${s.curriculum.words[wordId!]?.text}”`}
              onCancel={() => setMode(null)}
              onSubmit={(input) => {
                const id = act((d) => (mode === 'add' ? parentAddWord(d, week.id, input) : parentReplaceWord(d, week.id, wordId!, input)));
                if (id) {
                  setWordId(id);
                  setMode('edit');
                }
              }}
            />
          )}
        </Section>
      )}

      <AddWeek />
    </div>
  );
}

function WeekEditor({ weekId }: { weekId: string }) {
  const s = useAppState();
  const week = s.curriculum.weeks.find((w) => w.id === weekId)!;
  const [title, setTitle] = useState(week.title);
  const [tagline, setTagline] = useState(week.tagline);
  const [theme, setTheme] = useState<Theme>(week.theme);
  const dirty = title !== week.title || tagline !== week.tagline || theme !== week.theme;
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Field label="Week title" value={title} onChange={setTitle} />
      <Field label="Tagline" value={tagline} onChange={setTagline} />
      <label className="flex flex-col gap-1">
        <span className="font-semibold">World</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)} className="min-h-12 rounded-xl border-2 border-ink/15 px-3">
          <option value="dino">Dinosaur</option>
          <option value="space">Space</option>
          <option value="arcade">Arcade</option>
        </select>
      </label>
      {dirty && (
        <div className="sm:col-span-3">
          <Button onClick={() => act((d) => parentUpdateWeek(d, weekId, { title: title.trim() || week.title, tagline, theme }))}>Save week</Button>
        </div>
      )}
    </div>
  );
}

function WordEditor({ word, onReplace, onDone }: { word: Word; onReplace: () => void; onDone: () => void }) {
  const [f, setF] = useState({
    text: word.text,
    pronunciation: word.pronunciation,
    definition: word.definition,
    examples: lines(word.examples),
    synonyms: lines(word.synonyms),
    antonyms: lines(word.antonyms),
    misconceptions: lines(word.misconceptions),
    contexts: lines(word.contexts),
    discussionPrompts: lines(word.discussionPrompts),
    creativePrompts: lines(word.creativePrompts),
  });
  const [saved, setSaved] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const save = () => {
    act((d) =>
      parentUpdateWord(d, word.id, {
        text: f.text.trim() || word.text,
        pronunciation: f.pronunciation,
        definition: f.definition.trim() || word.definition,
        examples: split(f.examples),
        synonyms: split(f.synonyms),
        antonyms: split(f.antonyms),
        misconceptions: split(f.misconceptions),
        contexts: split(f.contexts),
        discussionPrompts: split(f.discussionPrompts),
        creativePrompts: split(f.creativePrompts),
      }),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#f6f4fb] p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Word" value={f.text} onChange={set('text')} />
        <Field label="Pronunciation" value={f.pronunciation} onChange={set('pronunciation')} hint="e.g. per-SIS-tunt" />
        <Field label="Definition" value={f.definition} onChange={set('definition')} testId="word-definition" />
      </div>
      <Field label="Example sentences" value={f.examples} onChange={set('examples')} rows={4} hint="one per line; wrap the word in {braces}. First two show on the discovery card; others are used in quizzes." />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Synonyms" value={f.synonyms} onChange={set('synonyms')} rows={2} hint="one per line" />
        <Field label="Antonyms" value={f.antonyms} onChange={set('antonyms')} rows={2} hint="one per line" />
        <Field label="Plausible wrong meanings" value={f.misconceptions} onChange={set('misconceptions')} rows={2} hint="used as quiz distractors" />
        <Field label="Situations showing the word" value={f.contexts} onChange={set('contexts')} rows={3} />
        <Field label="Discussion prompts" value={f.discussionPrompts} onChange={set('discussionPrompts')} rows={2} />
        <Field label="Creative challenge prompts" value={f.creativePrompts} onChange={set('creativePrompts')} rows={2} />
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setConfirmSave(true)} data-testid="save-word">
          Save word
        </Button>
        <Button variant="secondary" onClick={onReplace}>
          Replace with a new word…
        </Button>
        <Button variant="ghost" onClick={onDone}>
          Close
        </Button>
        {saved && <span className="self-center font-semibold text-good">Saved!</span>}
      </div>
      <ConfirmDialog
        open={confirmSave}
        title={`Save changes to “${word.text}”?`}
        body="Learning history is not affected. This word will no longer receive built-in content updates."
        confirmLabel="Save"
        onCancel={() => setConfirmSave(false)}
        onConfirm={() => {
          save();
          setConfirmSave(false);
        }}
      />
    </div>
  );
}

function NewWordForm({ title, onSubmit, onCancel }: { title: string; onSubmit: (i: NewWordInput) => void; onCancel: () => void }) {
  const [f, setF] = useState({ text: '', definition: '', pronunciation: '', examples: '', synonyms: '', antonyms: '', misconceptions: '', contexts: '' });
  const set = (k: keyof typeof f) => (v: string) => setF({ ...f, [k]: v });
  const examples = split(f.examples);
  const valid = f.text.trim() && f.definition.trim() && examples.length >= 2;
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-[#f6f4fb] p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Word *" value={f.text} onChange={set('text')} testId="new-word-text" />
        <Field label="Definition *" value={f.definition} onChange={set('definition')} testId="new-word-def" />
        <Field label="Pronunciation" value={f.pronunciation} onChange={set('pronunciation')} />
      </div>
      <Field label="Example sentences *" value={f.examples} onChange={set('examples')} rows={3} hint="at least 2, one per line; wrap the word in {braces} if you can" testId="new-word-examples" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Synonyms" value={f.synonyms} onChange={set('synonyms')} rows={2} />
        <Field label="Antonyms" value={f.antonyms} onChange={set('antonyms')} rows={2} />
        <Field label="Plausible wrong meanings" value={f.misconceptions} onChange={set('misconceptions')} rows={2} hint="two recommended" />
        <Field label="Situations showing the word" value={f.contexts} onChange={set('contexts')} rows={2} />
      </div>
      <p className="text-sm text-ink-soft">New words get a colorful star sticker and use built-in question templates generated from these fields.</p>
      <div className="flex gap-3">
        <Button
          disabled={!valid}
          data-testid="submit-new-word"
          onClick={() =>
            onSubmit({
              text: f.text,
              definition: f.definition,
              pronunciation: f.pronunciation,
              examples,
              synonyms: split(f.synonyms),
              antonyms: split(f.antonyms),
              misconceptions: split(f.misconceptions),
              contexts: split(f.contexts),
            })
          }
        >
          Save new word
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

function AddWeek() {
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState<Theme>('space');
  const [msg, setMsg] = useState('');
  return (
    <Section title="Add a new week">
      <p className="text-ink-soft">New weeks appear at the end of the adventure map. They unlock after the previous week is mastered (or you can unlock them in Weeks & Words).</p>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Title" value={title} onChange={setTitle} testId="new-week-title" />
        <label className="flex flex-col gap-1">
          <span className="font-semibold">World</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)} className="min-h-12 rounded-xl border-2 border-ink/15 px-3">
            <option value="dino">Dinosaur</option>
            <option value="space">Space</option>
            <option value="arcade">Arcade</option>
          </select>
        </label>
        <div className="flex items-end">
          <Button
            data-testid="add-week"
            onClick={() => {
              const id = act((d) => parentAddWeek(d, title, theme));
              setMsg(`Added ${id.replace('week-', 'Week ')}. Choose it above to add words.`);
              setTitle('');
            }}
          >
            ➕ Add week
          </Button>
        </div>
      </div>
      {msg && <p className="font-semibold text-good">{msg}</p>}
    </Section>
  );
}
