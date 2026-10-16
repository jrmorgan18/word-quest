import { useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { StickerSvg } from '../art/stickers';
import { stickerCatalog } from '../engine/rewards';
import { findWeek } from '../engine/progress';
import { go, routes } from '../lib/router';
import { play } from '../lib/sound';
import { act, useAppState } from '../store/game';
import { Button, Modal } from './ui';
import { Confetti } from './Confetti';

/** Shows queued celebrations (new stickers, achievements, conquered weeks) one at a time. */
export function CelebrationLayer() {
  const s = useAppState();
  const c = s.celebrations[0];
  const catalog = useMemo(() => stickerCatalog(s), [s.curriculum]);

  useEffect(() => {
    if (c) play('reward');
  }, [c]);

  if (!c) return null;
  const dismiss = () => act((d) => void d.celebrations.shift());

  let title = '';
  let subtitle = '';
  let art: React.ReactNode = null;
  let canDecorate = false;

  if (c.kind === 'sticker') {
    const def = catalog.find((x) => x.id === c.stickerId);
    title = 'New sticker unlocked!';
    subtitle = def ? (def.kind === 'word' ? `You learned “${def.name}”!` : def.name) : '';
    art = <StickerSvg id={c.stickerId} label={def?.name} title={def?.name} />;
    canDecorate = true;
  } else if (c.kind === 'achievement') {
    const a = s.achievements[c.achievementId];
    title = 'Achievement earned!';
    subtitle = a?.title ?? '';
    art = (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-sun-light text-[7rem]" aria-hidden>
        🏅
      </div>
    );
  } else {
    const w = findWeek(s, c.weekId);
    title = 'Week conquered!';
    subtitle = w ? `${w.title} is complete. A new adventure is unlocked!` : '';
    art = (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-good-light text-[7rem]" aria-hidden>
        🏆
      </div>
    );
  }

  return (
    <>
      <Confetti key={JSON.stringify(c)} />
      <Modal open onClose={dismiss} labelledBy="celebrate-title">
        <div className="flex flex-col items-center text-center" data-testid="celebration">
          <motion.div
            className="h-48 w-48 sm:h-56 sm:w-56"
            initial={{ scale: 0.2, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 12 }}
          >
            {art}
          </motion.div>
          <h2 id="celebrate-title" className="mt-3 text-3xl font-bold text-grape">
            {title}
          </h2>
          <p className="mt-1 text-xl">{subtitle}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {canDecorate && (
              <Button
                variant="secondary"
                onClick={() => {
                  dismiss();
                  go(routes.decorate());
                }}
              >
                Decorate a world
              </Button>
            )}
            <Button variant="good" size="lg" onClick={dismiss} data-testid="celebration-ok">
              Awesome!
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
