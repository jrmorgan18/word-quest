/** Short, specific, encouraging feedback. No punishment, no pressure. */
const CORRECT = [
  'Great thinking! You used the clues!',
  'Yes! Your vocabulary power is growing!',
  'You got it! Super word detective work!',
  'Nice! You really understand that word.',
  'Exactly right! Brain power!',
];

const TRY_AGAIN = [
  'Almost! Let’s investigate that word again.',
  'Good try! Read the clue one more time.',
  'Not quite — you can do this!',
  'Hmm, let’s look closer. Try another one!',
];

const QUIZ_WRONG = ['Good try! Here’s the answer:', 'Not this time — now you know!', 'Let’s learn from this one:'];

let i = 0;
const next = (list: string[]) => list[i++ % list.length];

export const feedback = {
  correct: () => next(CORRECT),
  tryAgain: () => next(TRY_AGAIN),
  quizWrong: () => next(QUIZ_WRONG),
};
