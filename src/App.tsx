import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { CelebrationLayer } from './components/Celebration';
import { PipArt } from './components/Mascot';
import { Button } from './components/ui';
import type { SceneId } from './engine/types';
import { useRoute } from './lib/router';
import { setSoundEnabled } from './lib/sound';
import { useGame } from './store/game';
import { ConnectionsScreen } from './screens/ConnectionsScreen';
import { CreativeScreen } from './screens/CreativeScreen';
import { DiscoveryScreen } from './screens/DiscoveryScreen';
import { Home } from './screens/Home';
import { MapScreen } from './screens/MapScreen';
import { MemoryMission } from './screens/MemoryMission';
import { NotFound } from './screens/NotFound';
import { ParentArea } from './screens/parent/ParentDashboard';
import { PracticeScreen } from './screens/PracticeScreen';
import { QuizScreen } from './screens/QuizScreen';
import { SceneEditor, ScenePicker } from './screens/SceneEditor';
import { StickerBook } from './screens/StickerBook';
import { WeekScreen } from './screens/WeekScreen';

function Router() {
  const r = useRoute();
  const [a, b, c, d] = r;
  if (!a) return <Home />;
  if (a === 'map') return <MapScreen />;
  if (a === 'stickers') return <StickerBook />;
  if (a === 'memory') return <MemoryMission />;
  if (a === 'parent') return <ParentArea />;
  if (a === 'decorate') return b && ['dino', 'space', 'arcade'].includes(b) ? <SceneEditor key={b} sceneId={b as SceneId} /> : <ScenePicker />;
  if (a === 'week' && b) {
    if (!c) return <WeekScreen weekId={b} />;
    if (c === 'discover' && d) return <DiscoveryScreen weekId={b} wordId={d} />;
    if (c === 'quiz' && (d === 'initial' || d === 'delayed')) return <QuizScreen key={`${b}-${d}`} weekId={b} quizType={d} />;
    if (c === 'play') {
      if (d === 'choose' || d === 'story' || d === 'detective' || d === 'refresher') return <PracticeScreen key={`${b}-${d}`} weekId={b} kind={d} />;
      if (d === 'connections') return <ConnectionsScreen key={b} weekId={b} />;
      if (d === 'creative') return <CreativeScreen key={b} weekId={b} />;
    }
  }
  return <NotFound />;
}

export function App() {
  const state = useGame((g) => g.state);
  const error = useGame((g) => g.error);
  const init = useGame((g) => g.init);
  const resetAll = useGame((g) => g.resetAll);
  const rawDoc = useGame((g) => g.rawDoc);

  useEffect(() => {
    void init();
  }, [init]);

  const motion = state?.settings.motion ?? 'system';
  useEffect(() => {
    document.documentElement.classList.toggle('motion-reduced', motion === 'reduced');
    document.documentElement.classList.toggle('motion-full', motion === 'full');
  }, [motion]);
  useEffect(() => setSoundEnabled(state?.settings.soundOn ?? true), [state?.settings.soundOn]);

  if (error) {
    return (
      <main className="mx-auto flex max-w-xl flex-col items-center gap-4 p-8 text-center">
        <PipArt className="w-32" mood="surprised" />
        <h1 className="text-3xl font-bold">Word Quest couldn’t load the saved game</h1>
        <p className="text-ink-soft">{error}</p>
        {rawDoc != null && (
          <Button
            variant="secondary"
            onClick={() => {
              const a = document.createElement('a');
              a.href = URL.createObjectURL(new Blob([JSON.stringify(rawDoc)], { type: 'application/json' }));
              a.download = 'word-quest-unreadable-save.json';
              a.click();
            }}
          >
            Download the saved data
          </Button>
        )}
        <Button variant="danger" onClick={() => window.confirm('Start fresh? Saved progress on this device will be replaced.') && void resetAll()}>
          Start fresh
        </Button>
      </main>
    );
  }

  if (!state) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4" aria-busy="true">
        <PipArt className="w-28 animate-gentle-pulse" />
        <p className="font-display text-2xl text-grape">Loading your adventure…</p>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion={motion === 'reduced' ? 'always' : motion === 'full' ? 'never' : 'user'}>
      <Router />
      <CelebrationLayer />
    </MotionConfig>
  );
}
