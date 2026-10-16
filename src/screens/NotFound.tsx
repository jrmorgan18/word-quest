import { Button, Screen } from '../components/ui';
import { go, routes } from '../lib/router';

export function NotFound() {
  return (
    <Screen className="flex flex-col items-center gap-4 pt-16 text-center">
      <span className="text-7xl" aria-hidden>
        🧭
      </span>
      <h1 className="text-3xl font-bold">Oops, this path is a mystery!</h1>
      <Button size="lg" onClick={() => go(routes.home())}>
        Go home
      </Button>
    </Screen>
  );
}
