import type { Word } from '../types';

export const WORDS_07_10: Word[] = [
  // ───────────────────────────── Week 7 ─────────────────────────────
  {
    id: 'deliberate',
    week: 7,
    text: 'Deliberate',
    pronunciation: 'dih-LIB-er-it',
    partOfSpeech: 'adjective',
    definition: 'Done carefully and intentionally',
    examples: [
      'The artist made {deliberate} brushstrokes to paint each tiny leaf.',
      'Bumping into you was an accident, not a {deliberate} push.',
      'The chess player made a slow, {deliberate} move with her knight.',
      'The robot took {deliberate} steps across the narrow beam.',
    ],
    synonyms: ['intentional', 'planned'],
    antonyms: ['accidental'],
    discussionPrompts: [
      'What is the difference between a deliberate choice and an accident?',
      'When is it a good idea to be slow and deliberate?',
    ],
    contexts: [
      'Choosing each word carefully when writing a thank-you note.',
      'Lining up your shot slowly and on purpose before you throw the ball.',
      'Placing each domino exactly where you planned it.',
    ],
    misconceptions: ['Done by accident', 'Done super fast without thinking'],
    wordFamily: [
      { form: 'deliberately', partOfSpeech: 'adverb', example: 'The cat {deliberately} knocked the pencil off the table.' },
    ],
    illustration: 'A focused robot carefully stacking a tower of colorful blocks.',
    stickerId: 'stk-deliberate',
    discovery: {
      scene: 'A robot carefully places each block exactly where it planned.',
      question: 'Why are the robot’s moves deliberate?',
      choices: [
        'It moves carefully and on purpose',
        'It knocks blocks over by accident',
        'It is moving without looking',
      ],
      explanation: 'The robot plans each move and does it on purpose. That is deliberate!',
    },
    stories: [
      { context: 'dino', text: 'The mother dinosaur placed each egg in the nest with slow, {deliberate} care.' },
      { context: 'sports', text: 'The archer took a {deliberate} breath, aimed carefully, and hit the bullseye.' },
      { context: 'arcade', text: 'Jumping onto the tiny platforms needed {deliberate} timing, so Leo waited for the perfect moment.' },
      { context: 'everyday', text: 'Dad wrote the birthday message in slow, {deliberate} letters so it would look perfect.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Ana didn’t trip over the toy by accident. She stepped on it in a {deliberate} way to make it squeak and make her baby brother laugh.',
        question: 'What does "deliberate" mean in this story?',
        options: ['Done on purpose', 'Done by accident', 'Done while sleeping'],
        explanation: 'Ana stepped on it on purpose to make her brother laugh. That’s deliberate.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "deliberate" correctly?',
        options: [
          'The surgeon made deliberate, careful movements.',
          'I deliberate my milk every morning.',
          'The deliberate rain fell by accident.',
        ],
        explanation: 'A surgeon moving carefully and on purpose is being deliberate.',
      },
      {
        kind: 'character',
        passage: 'When his friend’s tower fell, Omar said, "I’m so sorry! It wasn’t {deliberate}. My elbow slipped."',
        question: 'What did Omar probably mean?',
        options: ['He didn’t knock it over on purpose', 'He planned to knock it over', 'He liked the tower'],
        explanation: 'Omar meant it was an accident, not on purpose.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which action is deliberate?',
        options: [
          'Carefully planting seeds in neat rows',
          'Sneezing during a movie',
          'Tripping over a shoelace',
        ],
        explanation: 'Planting seeds carefully is done on purpose. Sneezing and tripping are accidents.',
      },
      {
        prompt: 'A space pilot makes a deliberate turn around an asteroid. How did she turn?',
        options: ['Carefully and on purpose', 'By accident', 'Without looking'],
        explanation: 'Deliberate means careful and intentional.',
      },
      {
        prompt: 'Which word is the OPPOSITE of deliberate?',
        options: ['Accidental', 'Intentional', 'Planned'],
        explanation: 'Accidental means not on purpose — the opposite of deliberate.',
      },
      {
        prompt: 'Why would a builder make deliberate measurements?',
        options: ['So everything fits exactly right', 'To finish as fast as possible', 'Because she wants it to fall down'],
        explanation: 'Being careful and intentional helps things fit correctly.',
      },
    ],
    creativePrompts: [
      'Describe a deliberate plan to build the tallest sandcastle ever.',
      'Tell about something you did deliberately that you are proud of.',
    ],
    nuance: {
      versus: 'accidental',
      versusDefinition: 'Happening by chance, not on purpose',
      explanation: 'Deliberate actions are planned and on purpose. Accidental ones just happen.',
      sentences: [
        { text: 'Nora carefully poured the juice right to the line.', answer: 'word' },
        { text: 'Oops! Juice spilled when the cup slipped.', answer: 'versus' },
        { text: 'The goalie chose to dive left because she studied the kicker.', answer: 'word' },
      ],
    },
  },
  {
    id: 'examine',
    week: 7,
    text: 'Examine',
    pronunciation: 'ig-ZAM-in',
    partOfSpeech: 'verb',
    definition: 'To look at something very carefully',
    examples: [
      'The doctor will {examine} your ears to make sure they are healthy.',
      'The detective {examined} the footprint with a magnifying glass.',
      'Scientists {examine} moon rocks to learn about space.',
      'Before buying the bike, Mom {examined} the tires and the brakes.',
    ],
    synonyms: ['inspect', 'study'],
    antonyms: ['overlook'],
    discussionPrompts: [
      'What would you like to examine under a microscope?',
      'Why does a doctor examine you at a checkup?',
    ],
    contexts: [
      'Looking closely at a leaf to count its tiny veins.',
      'Turning a seashell over in your hands to look at every side.',
      'Checking a toy carefully for cracks before you buy it.',
    ],
    misconceptions: ['To take a quick test at school', 'To throw something away'],
    wordFamily: [
      { form: 'examination', partOfSpeech: 'noun', example: 'The vet gave our puppy a full {examination}.' },
    ],
    illustration: 'A shiny microscope with a glowing slide.',
    stickerId: 'stk-examine',
    discovery: {
      scene: 'A scientist peers through a microscope at a tiny drop of pond water.',
      question: 'What is the scientist doing when she examines the water?',
      choices: ['Looking at it very carefully', 'Drinking it', 'Pouring it down the drain'],
      explanation: 'A microscope helps you look very closely. That’s examining!',
    },
    stories: [
      { context: 'dino', text: 'The paleontologist used a tiny brush and a magnifying glass to {examine} the dinosaur tooth.' },
      { context: 'space', text: 'The robot rover stopped to {examine} a strange red rock on Mars.' },
      { context: 'everyday', text: 'Before eating the apple, Ben {examined} it closely to make sure there were no worms.' },
      { context: 'sports', text: 'The referee stopped the game to {examine} the replay and see if the ball crossed the line.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The jeweler held the ring up to the light. She turned it slowly and {examined} every tiny sparkle.',
        question: 'What does "examined" mean in this story?',
        options: ['Looked at very carefully', 'Bought quickly', 'Hid in a box'],
        explanation: 'She turned it slowly and looked at every sparkle — she examined it.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "examine" correctly?',
        options: [
          'Let’s examine this map to find the best path.',
          'I examined so loudly that the dog woke up.',
          'The examine bird sang a song.',
        ],
        explanation: 'Looking carefully at a map is examining it.',
      },
      {
        kind: 'character',
        passage: 'The mechanic popped open the car hood and said, "I need to {examine} the engine before I can fix it."',
        question: 'What did the mechanic probably mean?',
        options: ['Look closely at the engine', 'Drive the car away', 'Paint the engine'],
        explanation: 'The mechanic needed to look carefully to find the problem.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is examining something?',
        options: [
          'Rosa, who looks at a butterfly’s wing with a magnifying glass',
          'Kai, who is running in a race',
          'Ella, who is singing a song',
        ],
        explanation: 'Rosa is looking very carefully. That is examining.',
      },
      {
        prompt: 'A space explorer finds a glowing crystal. How would she examine it?',
        options: ['Look at it closely from every side', 'Kick it far away', 'Close her eyes'],
        explanation: 'Examining means looking at something very carefully.',
      },
      {
        prompt: 'Which word means almost the SAME as examine?',
        options: ['Inspect', 'Ignore', 'Forget'],
        explanation: 'Inspect and examine both mean to look closely.',
      },
      {
        prompt: 'Why does a vet examine a sick dog?',
        options: ['To look carefully and find out what is wrong', 'To give it a bath', 'To teach it tricks'],
        explanation: 'Looking carefully helps the vet find the problem.',
      },
    ],
    creativePrompts: [
      'You find a mysterious egg in the forest. Examine it! What do you notice?',
      'Pick an object near you and examine it closely. Describe three details.',
    ],
    nuance: {
      versus: 'observe',
      versusDefinition: 'To watch or notice carefully',
      explanation: 'These words are close cousins! You often observe something as it happens, like birds flying. You examine something by looking closely at it, often up close or with tools.',
      sentences: [
        { text: 'The doctor looked closely inside the patient’s mouth with a tiny light.', answer: 'word' },
        { text: 'We sat on the porch and watched the birds visit the feeder all morning.', answer: 'versus' },
        { text: 'Grandpa held the old coin under a magnifying glass to read the tiny date.', answer: 'word' },
      ],
    },
  },
  {
    id: 'significant',
    week: 7,
    text: 'Significant',
    pronunciation: 'sig-NIF-ih-kunt',
    partOfSpeech: 'adjective',
    definition: 'Important or large enough to matter',
    examples: [
      'Losing her first tooth was a {significant} day for Emma.',
      'The rain made a {significant} difference, and the garden turned green again.',
      'Finding the dinosaur skull was a {significant} discovery for the museum.',
      'Practicing every day led to a {significant} improvement in Jake’s reading.',
    ],
    synonyms: ['important', 'meaningful'],
    antonyms: ['minor'],
    discussionPrompts: [
      'What is one of the most significant days of your life so far?',
      'Can something small be significant? Give an example.',
    ],
    contexts: [
      'Winning the championship trophy after a whole season of practice.',
      'Your family moving to a brand-new city.',
      'Learning to read a whole chapter book for the first time.',
    ],
    misconceptions: ['Very tiny and unimportant', 'Shaped like a sign'],
    wordFamily: [
      { form: 'significance', partOfSpeech: 'noun', example: 'The museum explained the {significance} of the old map.' },
      { form: 'significantly', partOfSpeech: 'adverb', example: 'The puppy grew {significantly} in just one month.' },
    ],
    illustration: 'A giant golden key with a sparkling star on the handle.',
    stickerId: 'stk-significant',
    discovery: {
      scene: 'A giant golden key can unlock the most important door in the kingdom.',
      question: 'Why is this key significant?',
      choices: ['It is important and makes a big difference', 'It doesn’t matter at all', 'It is just a regular toy'],
      explanation: 'The key matters a lot, so it is significant!',
    },
    stories: [
      { context: 'space', text: 'Landing on the moon for the first time was a {significant} moment in history.' },
      { context: 'arcade', text: 'Finding the golden key was {significant}, because without it nobody could open the final door.' },
      { context: 'sports', text: 'Winning the last game was {significant} for the team. It meant they were the champions!' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The town was worried about the river. After weeks of no rain, a {significant} storm finally filled it back up.',
        question: 'What does "significant" mean in this story?',
        options: ['Big enough to make a difference', 'Very tiny', 'Pretend'],
        explanation: 'The storm was big enough to fill the river. It mattered — it was significant.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "significant" correctly?',
        options: [
          'Graduating from high school is a significant event.',
          'I significant my name on the paper.',
          'A single crumb on the floor is the most significant problem in the world.',
        ],
        explanation: 'Graduating is important and matters a lot — significant!',
      },
      {
        kind: 'character',
        passage: 'The museum director held up the old letter and said, "This is very {significant}. It tells us who built the castle!"',
        question: 'What did the director probably mean?',
        options: ['The letter is important', 'The letter is boring', 'The letter is fake'],
        explanation: 'The director meant the letter mattered a lot because it answered a big question.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which event is most significant?',
        options: ['A new baby joining the family', 'Finding a penny on the floor', 'Eating a cracker'],
        explanation: 'A new baby changes a family in a big way. It matters a lot.',
      },
      {
        prompt: 'The scientist said the new fossil was significant. What did she mean?',
        options: ['It is important and teaches something big', 'It is the same as every other fossil', 'It doesn’t matter'],
        explanation: 'Significant means important enough to matter.',
      },
      {
        prompt: 'Which word is the OPPOSITE of significant?',
        options: ['Minor', 'Important', 'Major'],
        explanation: 'Minor means small and not very important — the opposite of significant.',
      },
      {
        prompt: 'A coach said practice made a significant difference. What happened?',
        options: ['The team got much better', 'Nothing changed', 'The team forgot how to play'],
        explanation: 'A significant difference is big enough to notice and matter.',
      },
    ],
    creativePrompts: [
      'Invent a significant discovery a space explorer could make. Why does it matter?',
      'Tell about a significant moment in your life.',
    ],
    nuance: {
      versus: 'large',
      versusDefinition: 'Big in size',
      explanation: 'Large means big in size. Significant means important or big enough to matter — even something small can be significant, like a tiny key that opens a treasure chest!',
      sentences: [
        { text: 'This tiny seed is the last one of its kind. Saving it really matters.', answer: 'word' },
        { text: 'The elephant was huge and took up the whole picture.', answer: 'versus' },
        { text: 'Learning to swim was an important step that kept Ava safe at the lake.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 8 ─────────────────────────────
  {
    id: 'conceal',
    week: 8,
    text: 'Conceal',
    pronunciation: 'kun-SEEL',
    partOfSpeech: 'verb',
    definition: 'To hide something',
    examples: [
      'The pirate tried to {conceal} the treasure map inside his boot.',
      'An octopus can {conceal} itself by changing color to match the rocks.',
      'Mia {concealed} the birthday present behind her back.',
      'The secret door was {concealed} behind a tall bookshelf.',
    ],
    synonyms: ['hide', 'cover'],
    antonyms: ['reveal'],
    discussionPrompts: [
      'Where is a good place to conceal a surprise gift?',
      'Why might animals need to conceal themselves?',
    ],
    contexts: [
      'Putting your sister’s birthday gift under your bed so she won’t see it.',
      'A rabbit hiding in tall grass so the fox can’t find it.',
      'Covering a treasure chest with leaves and branches.',
    ],
    misconceptions: ['To show something to everyone', 'To break something into pieces'],
    wordFamily: [
      { form: 'concealed', partOfSpeech: 'adjective', example: 'The explorers found a {concealed} tunnel under the castle.' },
    ],
    illustration: 'A sneaky little alien peeking out from behind a moon crater.',
    stickerId: 'stk-conceal',
    discovery: {
      scene: 'A little alien is hiding behind a crater. Can you spot it?',
      question: 'How is the alien concealing itself?',
      choices: ['It is hiding behind the crater so no one sees it', 'It is waving and shouting hello', 'It is dancing on top of the rock'],
      explanation: 'The alien is hiding itself — that’s concealing!',
    },
    stories: [
      { context: 'dino', text: 'The baby dinosaur tried to {conceal} itself behind a giant fern so its brother wouldn’t find it.' },
      { context: 'arcade', text: 'The game designers {concealed} a secret coin behind the waterfall.' },
      { context: 'everyday', text: 'Dad {concealed} the cookies on the top shelf, behind the cereal boxes.' },
      { context: 'space', text: 'The space station had a {concealed} door that only opened with a secret code.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The snowy owl has white feathers. When it sits in the snow, its color helps it {conceal} itself from other animals.',
        question: 'What does "conceal" mean in this story?',
        options: ['To hide', 'To fly', 'To sing loudly'],
        explanation: 'The white feathers help the owl blend in and hide. That is concealing.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "conceal" correctly?',
        options: [
          'The magician concealed the coin in his hand.',
          'I concealed my dinner because I was hungry.',
          'The conceal sun was bright and hot.',
        ],
        explanation: 'The magician hid the coin — he concealed it.',
      },
      {
        kind: 'character',
        passage: 'Sam whispered, "Quick, {conceal} the cake! Grandma is coming and it’s a surprise!"',
        question: 'What did Sam probably mean?',
        options: ['Hide the cake', 'Eat the cake', 'Show Grandma the cake'],
        explanation: 'Sam wanted to hide the cake so the surprise wouldn’t be ruined.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is concealing something?',
        options: [
          'Leah, who tucks her diary under her pillow so no one will read it',
          'Max, who shows his drawing to the whole class',
          'Zoe, who reads a book aloud',
        ],
        explanation: 'Leah is hiding her diary. That is concealing.',
      },
      {
        prompt: 'A spy robot wants to conceal itself in a toy store. What would it do?',
        options: ['Stand very still on a shelf so it looks like a toy', 'Flash its lights and beep', 'Roll into the middle of the floor'],
        explanation: 'To conceal means to hide.',
      },
      {
        prompt: 'Which word is the OPPOSITE of conceal?',
        options: ['Reveal', 'Hide', 'Cover'],
        explanation: 'Reveal means to show — the opposite of conceal.',
      },
      {
        prompt: 'Why might a fox conceal its food?',
        options: ['So other animals can’t find it', 'So it can show it off', 'So the food grows bigger'],
        explanation: 'Hiding food keeps other animals from taking it.',
      },
    ],
    creativePrompts: [
      'Where would you conceal a treasure on a pirate ship? Explain your clever plan!',
      'Invent an animal that is amazing at concealing itself. How does it hide?',
    ],
    nuance: {
      versus: 'lose',
      versusDefinition: 'To not know where something is',
      explanation: 'When you conceal something, you hide it on purpose and you know where it is. When you lose something, you don’t know where it went!',
      sentences: [
        { text: 'Ella put the surprise gift in the back of her closet so her brother wouldn’t see it.', answer: 'word' },
        { text: 'Ella looked everywhere but couldn’t find her other shoe.', answer: 'versus' },
        { text: 'The squirrel buried its acorn under the leaves to keep it safe.', answer: 'word' },
      ],
    },
  },
  {
    id: 'transform',
    week: 8,
    text: 'Transform',
    pronunciation: 'trans-FORM',
    partOfSpeech: 'verb',
    definition: 'To change something greatly',
    examples: [
      'A caterpillar {transforms} into a butterfly.',
      'We {transformed} the empty box into a race car with paint and paper plates.',
      'The snowstorm {transformed} the playground into a sparkling white world.',
      'In the game, the hero can {transform} into a dragon by collecting five gems.',
    ],
    synonyms: ['convert', 'reshape'],
    antonyms: ['preserve'],
    discussionPrompts: [
      'If you could transform into any animal for a day, which would you choose?',
      'How could you transform your bedroom into a spaceship?',
    ],
    contexts: [
      'A tadpole slowly becoming a frog.',
      'Turning a plain cardboard box into a castle with towers.',
      'A small seed growing into a giant tree.',
    ],
    misconceptions: ['To keep something exactly the same', 'To carry something to a new place'],
    wordFamily: [
      { form: 'transformation', partOfSpeech: 'noun', example: 'The garden went through an amazing {transformation} in the spring.' },
    ],
    illustration: 'A pixel egg cracking open as a small, bright dragon bursts out with sparkles.',
    stickerId: 'stk-transform',
    discovery: {
      scene: 'A caterpillar wraps up in a cocoon… and comes out as a butterfly!',
      question: 'How did the caterpillar transform?',
      choices: ['It changed into something very different', 'It stayed exactly the same', 'It moved to a new tree'],
      explanation: 'A caterpillar becoming a butterfly is a BIG change. That’s transforming!',
    },
    stories: [
      { context: 'dino', text: 'After the volcano erupted, the lava cooled and {transformed} the valley into a field of black rock.' },
      { context: 'arcade', text: 'When Leo grabbed the glowing star, his tiny hero {transformed} into a giant knight.' },
      { context: 'school', text: 'Our class {transformed} the hallway into an ocean, with paper fish and blue streamers everywhere.' },
      { context: 'everyday', text: 'Mom used a little flour, sugar, and eggs to {transform} the ingredients into a delicious cake.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The old, dusty attic was full of boxes. After a week of painting and cleaning, the family had {transformed} it into a cozy reading room.',
        question: 'What does "transformed" mean in this story?',
        options: ['Changed it in a big way', 'Locked it up', 'Left it the same'],
        explanation: 'The dusty attic became a cozy reading room — a big change!',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "transform" correctly?',
        options: [
          'Heat can transform water into steam.',
          'Please transform quietly in the library.',
          'The transform puppy wagged its tail.',
        ],
        explanation: 'Heat changes water into steam — a big change.',
      },
      {
        kind: 'character',
        passage: 'Looking at the messy, weedy yard, Grandma smiled and said, "Give me one month. I’ll {transform} this place."',
        question: 'What did Grandma probably mean?',
        options: ['She would change the yard a lot', 'She would move away', 'She would leave it messy'],
        explanation: 'Grandma planned to change the yard in a big way.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which of these shows something being transformed?',
        options: ['A lump of clay becoming a beautiful vase', 'A cup sitting on a table', 'A cat taking a nap'],
        explanation: 'Clay becoming a vase is a big change.',
      },
      {
        prompt: 'A plain robot gets new wings, lights, and rockets. What happened to it?',
        options: ['It was transformed', 'It was concealed', 'It stayed the same'],
        explanation: 'The robot changed greatly — it was transformed.',
      },
      {
        prompt: 'Which word means almost the SAME as transform?',
        options: ['Convert', 'Keep', 'Stop'],
        explanation: 'Convert and transform both mean to change into something else.',
      },
      {
        prompt: 'Which is a better example of transform?',
        options: ['A seed growing into a huge sunflower', 'Moving a pencil to the other side of the desk', 'Tying your shoe'],
        explanation: 'A seed becoming a sunflower is a great change. Moving a pencil is just a small change of place.',
      },
    ],
    creativePrompts: [
      'Transform your bedroom into a dinosaur jungle. What would you add?',
      'Invent a creature that transforms when it hears music. What does it turn into?',
    ],
    nuance: {
      versus: 'change',
      versusDefinition: 'To make something different, big or small',
      explanation: 'Every transformation is a change, but not every change is a transformation. Transform means a BIG change.',
      sentences: [
        { text: 'The ugly, empty lot became a beautiful garden full of flowers.', answer: 'word' },
        { text: 'Lily put her hair in a ponytail instead of braids.', answer: 'versus' },
        { text: 'The tadpole grew legs, lost its tail, and became a frog.', answer: 'word' },
      ],
    },
  },
  {
    id: 'strategy',
    week: 8,
    text: 'Strategy',
    pronunciation: 'STRAT-uh-jee',
    partOfSpeech: 'noun',
    definition: 'A plan for achieving a goal',
    examples: [
      'Our {strategy} for winning tag was to hide behind the slide.',
      'The coach drew a new {strategy} on the whiteboard before the second half.',
      'A good {strategy} for remembering spelling words is to say them out loud.',
      'The space crew’s {strategy} was to use the moon’s gravity to speed up their rocket.',
    ],
    synonyms: ['plan', 'approach'],
    antonyms: [],
    discussionPrompts: [
      'What is your strategy for cleaning your room quickly?',
      'What strategy helps you when you get stuck on a hard problem?',
    ],
    contexts: [
      'Deciding to save the hardest puzzle pieces for last after doing the edges first.',
      'Planning which path to take in a maze before you start.',
      'Practicing your hardest piano part first while your brain is fresh.',
    ],
    misconceptions: ['A kind of board game piece', 'A lucky guess'],
    wordFamily: [
      { form: 'strategic', partOfSpeech: 'adjective', example: 'The knight made a {strategic} move to protect the king.' },
    ],
    illustration: 'A treasure map with a dotted path, arrows, and a big red X.',
    stickerId: 'stk-strategy',
    discovery: {
      scene: 'A treasure map shows a dotted path around the dragon’s cave to the big red X.',
      question: 'What is the strategy on this map?',
      choices: [
        'A plan to reach the treasure safely',
        'A picture of a random squiggle',
        'A grocery list',
      ],
      explanation: 'The map shows a plan to reach the goal — that is a strategy!',
    },
    stories: [
      { context: 'arcade', text: 'To beat the final boss, Mia’s {strategy} was to dodge three times and then jump on its tail.' },
      { context: 'sports', text: 'The team’s {strategy} was to pass the ball quickly so the other team couldn’t catch up.' },
      { context: 'dino', text: 'The pack of small dinosaurs had a clever {strategy} for staying safe: they always traveled together.' },
      { context: 'school', text: 'Our class made a {strategy} for keeping the classroom tidy: everyone cleans one spot.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Every time Grandpa played checkers, he won. His {strategy} was to keep his back row full so no one could get a king.',
        question: 'What does "strategy" mean in this story?',
        options: ['A plan to reach a goal', 'A lucky guess', 'A checker piece'],
        explanation: 'Grandpa had a plan to win the game. That plan is his strategy.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "strategy" correctly?',
        options: [
          'Her strategy for the spelling bee was to practice ten words every night.',
          'I put a strategy in my lunchbox.',
          'The dog strategy across the yard.',
        ],
        explanation: 'Practicing ten words every night is a plan — a strategy.',
      },
      {
        kind: 'character',
        passage: 'Before the snowball fight, Ava gathered her team and said, "We need a {strategy}. Two of us build the fort, and two make snowballs."',
        question: 'What did Ava probably mean?',
        options: ['They needed a plan', 'They needed more snow', 'They should give up'],
        explanation: 'Ava wanted a plan for the snowball fight.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which is an example of a strategy?',
        options: [
          'Planning to do your hardest homework first, while you have the most energy',
          'Sneezing',
          'A sunny day',
        ],
        explanation: 'A strategy is a plan to reach a goal.',
      },
      {
        prompt: 'An astronaut needs to land on a bumpy planet. Which shows a good strategy?',
        options: ['Use the map to choose a flat spot, then land slowly', 'Close her eyes and hope', 'Land anywhere really fast'],
        explanation: 'A strategy is a thoughtful plan.',
      },
      {
        prompt: 'Which word means almost the SAME as strategy?',
        options: ['Plan', 'Accident', 'Snack'],
        explanation: 'A strategy is a plan.',
      },
      {
        prompt: 'Why is it useful to have a strategy in a maze?',
        options: ['It helps you reach the end without getting lost', 'It makes the maze longer', 'It hides the exit'],
        explanation: 'A plan helps you reach your goal.',
      },
    ],
    creativePrompts: [
      'You need to sneak past a sleeping dragon to get its golden egg. What is your strategy?',
      'What strategy would you use to win a game of hide-and-seek?',
    ],
    nuance: {
      versus: 'wish',
      versusDefinition: 'Something you want to happen',
      explanation: 'A wish is just wanting something. A strategy is a plan with steps to make it happen.',
      sentences: [
        { text: 'To save money for a bike, Tom puts two dollars in his jar every week.', answer: 'word' },
        { text: 'Tom really, really wants a new bike someday.', answer: 'versus' },
        { text: 'Our team decided that the fastest runner would go last in the relay.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 9 ─────────────────────────────
  {
    id: 'distinguish',
    week: 9,
    text: 'Distinguish',
    pronunciation: 'dih-STING-gwish',
    partOfSpeech: 'verb',
    definition: 'To recognize the difference between things',
    examples: [
      'Can you {distinguish} between a frog and a toad?',
      'The twins look so alike that it’s hard to {distinguish} one from the other.',
      'Our dog can {distinguish} the sound of Dad’s car from all the other cars.',
      'The bird expert could {distinguish} more than fifty different bird songs.',
    ],
    synonyms: ['tell apart', 'recognize'],
    antonyms: ['confuse'],
    discussionPrompts: [
      'How do you distinguish between your backpack and a classmate’s?',
      'What helps you distinguish a real smile from a fake one?',
    ],
    contexts: [
      'Knowing which of the two identical-looking cups is yours by the little chip on the handle.',
      'Telling a bee from a fly by looking at its stripes.',
      'Recognizing your best friend’s voice in a crowded room.',
    ],
    misconceptions: ['To put out a fire', 'To mix things together'],
    wordFamily: [
      { form: 'distinguishable', partOfSpeech: 'adjective', example: 'The two paintings were barely {distinguishable}.' },
    ],
    illustration: 'Two nearly identical robots, one with a tiny heart on its antenna, under a magnifying glass.',
    stickerId: 'stk-distinguish',
    discovery: {
      scene: 'Two robots look almost the same, but one has a tiny heart on its antenna.',
      question: 'How can you distinguish between these two robots?',
      choices: [
        'By noticing the small difference — the heart on the antenna',
        'You can’t — they are exactly the same in every way',
        'By closing your eyes',
      ],
      explanation: 'Finding the difference lets you tell them apart. That’s distinguishing!',
    },
    stories: [
      { context: 'dino', text: 'The young paleontologist learned to {distinguish} a dinosaur bone from an ordinary rock by its tiny holes.' },
      { context: 'space', text: 'From far away, it’s hard to {distinguish} a planet from a star, but planets don’t twinkle.' },
      { context: 'everyday', text: 'Grandma can {distinguish} fresh bread from old bread just by smelling it.' },
      { context: 'arcade', text: 'To win, you must {distinguish} the real treasure chest from the fake one that bites!' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'All the penguins looked the same to Ella. But the zookeeper could {distinguish} each one by the shape of the spots on its chest.',
        question: 'What does "distinguish" mean in this story?',
        options: ['To tell things apart', 'To feed animals', 'To count to ten'],
        explanation: 'The zookeeper could tell the penguins apart by their spots.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "distinguish" correctly?',
        options: [
          'It’s easy to distinguish a zebra from a horse because of the stripes.',
          'I distinguished my juice all over the floor.',
          'The distinguish cookie was delicious.',
        ],
        explanation: 'Stripes help you tell a zebra from a horse.',
      },
      {
        kind: 'character',
        passage: 'Looking at two leaves, the park ranger said, "To {distinguish} poison ivy, look for groups of three leaves."',
        question: 'What did the ranger probably mean?',
        options: ['How to tell poison ivy apart from other plants', 'How to pick poison ivy', 'How to grow poison ivy'],
        explanation: 'The ranger was explaining how to recognize the difference.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is distinguishing between two things?',
        options: [
          'Nina, who can tell which shell is a clam and which is a snail',
          'Leo, who is eating cereal',
          'Ava, who is doing a cartwheel',
        ],
        explanation: 'Nina recognizes the difference between the shells.',
      },
      {
        prompt: 'An alien sees two red balls. One is a tomato and one is a rubber ball. How could it distinguish them?',
        options: ['Squeeze them to feel which one is soft and juicy', 'Paint them both blue', 'Throw them in the trash'],
        explanation: 'Noticing differences helps you distinguish things.',
      },
      {
        prompt: 'Which word means the OPPOSITE of distinguish?',
        options: ['Confuse', 'Recognize', 'Notice'],
        explanation: 'When you confuse two things, you mix them up — the opposite of distinguishing.',
      },
      {
        prompt: 'Why is it important to distinguish between a real snake and a toy snake?',
        options: ['So you know if you need to be careful', 'So you can buy more toys', 'It isn’t important'],
        explanation: 'Telling things apart can keep you safe.',
      },
    ],
    creativePrompts: [
      'Invent two dinosaurs that look almost the same. How could someone distinguish them?',
      'How do you distinguish between a good idea and a silly one?',
    ],
    nuance: {
      versus: 'see',
      versusDefinition: 'To notice with your eyes',
      explanation: 'You can see two things without telling them apart. When you distinguish, you notice what makes them different.',
      sentences: [
        { text: 'Sam could tell his twin cousins apart because one had a freckle on her nose.', answer: 'word' },
        { text: 'Sam looked out the window at the falling snow.', answer: 'versus' },
        { text: 'By listening carefully, Mia knew which bird was the robin and which was the blue jay.', answer: 'word' },
      ],
    },
  },
  {
    id: 'gradual',
    week: 9,
    text: 'Gradual',
    pronunciation: 'GRAJ-oo-ul',
    partOfSpeech: 'adjective',
    definition: 'Happening slowly over time',
    examples: [
      'The {gradual} change of the leaves from green to orange took several weeks.',
      'There was a {gradual} slope up the hill, so the climb was easy.',
      'Learning to read is a {gradual} process that happens a little bit each day.',
      'The puppy made {gradual} progress learning to sit and stay.',
    ],
    synonyms: ['slow', 'steady'],
    antonyms: ['sudden'],
    discussionPrompts: [
      'What is something about you that has changed gradually?',
      'Why are some changes gradual instead of sudden?',
    ],
    contexts: [
      'A plant growing a tiny bit taller every day.',
      'The sky slowly getting darker as the sun sets.',
      'Your hair growing longer over many months.',
    ],
    misconceptions: ['Happening all at once', 'Going up and down steps'],
    wordFamily: [
      { form: 'gradually', partOfSpeech: 'adverb', example: 'The snow {gradually} melted in the spring sun.' },
    ],
    illustration: 'A row of three plants showing a seed, a sprout, and a big flower.',
    stickerId: 'stk-gradual',
    discovery: {
      scene: 'A seed becomes a sprout, then a flower — a little bit each day.',
      question: 'Why is this flower’s growth gradual?',
      choices: [
        'It grows slowly, little by little, over time',
        'It pops up in one second',
        'It never grows at all',
      ],
      explanation: 'Little by little over time — that’s gradual!',
    },
    stories: [
      { context: 'dino', text: 'Over millions of years, there was a {gradual} change as some dinosaurs developed feathers.' },
      { context: 'space', text: 'The rocket’s climb into the sky looked {gradual} at first, but then it zoomed faster and faster.' },
      { context: 'sports', text: 'Coach said getting stronger is {gradual}: you improve a little with every practice.' },
      { context: 'everyday', text: 'The ice cube’s melting was {gradual}, getting smaller drip by drip.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'At first, the pond was frozen solid. Each day, the ice got a little thinner. The {gradual} melting took the whole month of March.',
        question: 'What does "gradual" mean in this story?',
        options: ['Happening slowly over time', 'Happening all at once', 'Very cold'],
        explanation: 'The ice melted a little each day — slowly over time.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "gradual" correctly?',
        options: [
          'The gradual rise of the tide covered the sand bit by bit.',
          'The balloon popped with a gradual BANG in one instant!',
          'I gradual my teeth every morning.',
        ],
        explanation: 'The tide rising bit by bit is gradual. A sudden bang is not!',
      },
      {
        kind: 'character',
        passage: 'The doctor said, "Your broken arm will heal, but it will be {gradual}. Be patient."',
        question: 'What did the doctor probably mean?',
        options: ['It will heal slowly over time', 'It will heal by tomorrow', 'It will never heal'],
        explanation: 'The doctor meant healing will happen little by little.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which is an example of a gradual change?',
        options: ['A baby growing into a grown-up', 'A light switch turning off', 'A balloon popping'],
        explanation: 'Growing up happens slowly over many years.',
      },
      {
        prompt: 'In a video game, a hero’s power meter fills up a tiny bit every time she finds a gem. How does her power grow?',
        options: ['Gradually', 'Suddenly', 'Not at all'],
        explanation: 'A tiny bit at a time is gradual.',
      },
      {
        prompt: 'Which word is the OPPOSITE of gradual?',
        options: ['Sudden', 'Slow', 'Steady'],
        explanation: 'Sudden means all at once — the opposite of gradual.',
      },
      {
        prompt: 'Why would a hiker like a gradual path instead of a steep one?',
        options: ['It goes up slowly, so it’s easier to climb', 'It goes straight up a cliff', 'It is shorter'],
        explanation: 'A gradual slope rises slowly, little by little.',
      },
    ],
    creativePrompts: [
      'Tell the story of a tiny dinosaur egg that gradually becomes a giant dinosaur.',
      'What is something you are gradually getting better at?',
    ],
    nuance: {
      versus: 'sudden',
      versusDefinition: 'Happening quickly and without warning',
      explanation: 'Gradual changes happen slowly, little by little. Sudden changes happen all at once.',
      sentences: [
        { text: 'The candle got shorter and shorter over the evening.', answer: 'word' },
        { text: 'BOOM! The thunder crashed out of nowhere.', answer: 'versus' },
        { text: 'Day by day, the puppy got better at catching the ball.', answer: 'word' },
      ],
    },
  },
  {
    id: 'absurd',
    week: 9,
    text: 'Absurd',
    pronunciation: 'ub-SURD',
    partOfSpeech: 'adjective',
    definition: 'Extremely silly or unreasonable',
    examples: [
      'The idea of a cat driving a school bus is {absurd}.',
      'It would be {absurd} to wear a winter coat to the beach in July.',
      'The clown told an {absurd} story about a pickle who became king.',
      'Trying to fit an elephant into a shoebox is an {absurd} plan.',
    ],
    synonyms: ['ridiculous', 'silly'],
    antonyms: ['sensible'],
    discussionPrompts: [
      'What is the most absurd idea you can think of?',
      'Why do people laugh at absurd jokes?',
    ],
    contexts: [
      'A dog wearing sunglasses and roller skates while reading a newspaper.',
      'Trying to eat soup with a fork.',
      'Using a banana as a telephone.',
    ],
    misconceptions: ['Very serious and sensible', 'Hard to hear'],
    wordFamily: [
      { form: 'absurdly', partOfSpeech: 'adverb', example: 'The tiny dog had an {absurdly} loud bark.' },
    ],
    illustration: 'A dinosaur wearing roller skates, a party hat, and a bow tie.',
    stickerId: 'stk-absurd',
    discovery: {
      scene: 'A dinosaur is roller-skating in a party hat and a bow tie!',
      question: 'Why is this picture absurd?',
      choices: [
        'Because it is extremely silly',
        'Because it happens every day',
        'Because it is very serious',
      ],
      explanation: 'A dinosaur on roller skates in a party hat is super silly — absurd!',
    },
    stories: [
      { context: 'space', text: 'The astronaut laughed at the {absurd} idea of a cow jumping over the moon.' },
      { context: 'school', text: 'Bringing a pet giraffe to school for show-and-tell would be {absurd}!' },
      { context: 'arcade', text: 'In this {absurd} game, you fight a giant rubber duck using a water balloon launcher.' },
      { context: 'everyday', text: 'Wearing flippers to climb a tree would be {absurd}.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Max said he could eat 500 pancakes in one minute. Everyone laughed because it was such an {absurd} thing to say.',
        question: 'What does "absurd" mean in this story?',
        options: ['Extremely silly and not reasonable', 'Very true', 'Very hungry'],
        explanation: 'Eating 500 pancakes in a minute is impossible and silly — absurd.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "absurd" correctly?',
        options: [
          'It’s absurd to think a goldfish could climb a mountain.',
          'Wearing a helmet while riding a bike is absurd.',
          'I absurd my homework yesterday.',
        ],
        explanation: 'A goldfish climbing a mountain is ridiculous. Wearing a helmet is sensible, not absurd!',
      },
      {
        kind: 'character',
        passage: 'When her brother said he would sleep on the roof, Mia laughed, "That’s {absurd}! You’d roll off!"',
        question: 'What did Mia probably mean?',
        options: ['The idea was ridiculous', 'The idea was smart', 'The idea was scary'],
        explanation: 'Mia thought the idea was silly and unreasonable.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which idea is absurd?',
        options: ['Using a spaghetti noodle as a jump rope', 'Using a jump rope to jump', 'Using a cup to drink water'],
        explanation: 'A spaghetti noodle jump rope is ridiculously silly.',
      },
      {
        prompt: 'A robot suggests cooling down a volcano with one ice cube. What kind of plan is that?',
        options: ['Absurd', 'Sensible', 'Gradual'],
        explanation: 'One ice cube can’t cool a volcano — the plan is ridiculous.',
      },
      {
        prompt: 'Which word is the OPPOSITE of absurd?',
        options: ['Sensible', 'Silly', 'Ridiculous'],
        explanation: 'Sensible means reasonable — the opposite of absurd.',
      },
      {
        prompt: 'Why might a story about a pig flying a jet be called absurd?',
        options: ['Because it is extremely silly and couldn’t really happen', 'Because it is true', 'Because it is boring'],
        explanation: 'Absurd means extremely silly or unreasonable.',
      },
    ],
    creativePrompts: [
      'Invent the most absurd sandwich ever. What’s in it?',
      'Tell an absurd story about a dinosaur who wants to be a ballerina.',
    ],
    nuance: {
      versus: 'funny',
      versusDefinition: 'Makes you laugh',
      explanation: 'Absurd things are often funny, but absurd means it doesn’t make sense. Something can be funny and still make sense, like a good joke.',
      sentences: [
        { text: 'The plan was to catch the moon with a butterfly net.', answer: 'word' },
        { text: 'The puppy tripped on its own big ears and everyone giggled.', answer: 'versus' },
        { text: 'He tried to mail an elephant in a tiny envelope.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 10 ─────────────────────────────
  {
    id: 'infer',
    week: 10,
    text: 'Infer',
    pronunciation: 'in-FUR',
    partOfSpeech: 'verb',
    definition: 'To figure something out using clues and evidence',
    examples: [
      'When I saw muddy paw prints on the couch, I {inferred} that the dog had been there.',
      'From the smell of smoke, the firefighter {inferred} that something was burning.',
      'You can {infer} that it’s cold outside if everyone is wearing coats and hats.',
      'Because the cookie jar was empty and my brother had crumbs on his shirt, I {inferred} what happened.',
    ],
    synonyms: ['conclude', 'deduce'],
    antonyms: ['overlook'],
    discussionPrompts: [
      'If you see a friend smiling and holding a trophy, what can you infer?',
      'How do detectives infer things?',
    ],
    contexts: [
      'Seeing wet umbrellas by the door and figuring out it must be raining outside.',
      'Hearing a crowd cheering loudly and figuring out a team just scored.',
      'Noticing your mom’s car keys are gone and figuring out she went to the store.',
    ],
    misconceptions: ['To guess without any clues', 'To ask someone else for the answer'],
    wordFamily: [
      { form: 'inference', partOfSpeech: 'noun', example: 'Using the clues, Maya made a smart {inference} about the mystery.' },
    ],
    illustration: 'Muddy dinosaur footprints leading to a toppled cookie jar, with a question mark.',
    stickerId: 'stk-infer',
    discovery: {
      scene: 'Muddy dinosaur footprints lead straight to an empty cookie jar…',
      question: 'What can you infer from these clues?',
      choices: [
        'A dinosaur probably ate the cookies',
        'The cookies were never there',
        'It is your birthday',
      ],
      explanation: 'You used the footprint clues to figure it out. That’s inferring!',
    },
    stories: [
      { context: 'space', text: 'The astronauts found tracks in the moon dust. They {inferred} that the rover had driven that way.' },
      { context: 'school', text: 'The teacher was holding a box of party hats. From that clue, we {inferred} there would be a celebration.' },
      { context: 'dino', text: 'The scientists found huge teeth, so they {inferred} that the dinosaur ate meat.' },
      { context: 'arcade', text: 'Because the door was glowing, Leo {inferred} that it led to the next level.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Ana’s mom came home with sand on her shoes and a sunburn on her nose. Ana {inferred} that her mom had been at the beach.',
        question: 'What does "inferred" mean in this story?',
        options: ['Figured out using clues', 'Asked a question', 'Forgot something'],
        explanation: 'Ana used the clues — sand and sunburn — to figure it out.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "infer" correctly?',
        options: [
          'From the dark clouds, I can infer that a storm is coming.',
          'Please infer the ball to me.',
          'The infer kitten was sleeping.',
        ],
        explanation: 'Using dark clouds as a clue to figure out a storm is coming is inferring.',
      },
      {
        kind: 'character',
        passage: 'Detective Dina looked at the open window and the wet floor. "I {infer}," she said, "that someone came in from the rain."',
        question: 'What did Detective Dina probably mean?',
        options: ['She figured it out from the clues', 'She saw it happen', 'She made a wild guess'],
        explanation: 'She used clues — the open window and wet floor — to figure it out.',
      },
    ],
    quizItems: [
      {
        prompt: 'Your friend comes to school yawning and says she was up late. What can you infer?',
        options: ['She is probably tired', 'She is probably a dinosaur', 'She probably slept twelve hours'],
        explanation: 'Yawning and staying up late are clues that she is tired.',
      },
      {
        prompt: 'Which kid is inferring?',
        options: [
          'Leo, who sees birthday balloons on a door and figures out there is a party inside',
          'Ava, who reads the word "party" on a sign',
          'Max, who is jumping on a trampoline',
        ],
        explanation: 'Leo used clues to figure something out that nobody told him.',
      },
      {
        prompt: 'Which word means almost the SAME as infer?',
        options: ['Conclude', 'Shout', 'Ignore'],
        explanation: 'To conclude means to decide something from clues — like inferring.',
      },
      {
        prompt: 'What do you need in order to infer something?',
        options: ['Clues', 'A cookie', 'A loud voice'],
        explanation: 'You infer by using clues and evidence.',
      },
    ],
    creativePrompts: [
      'You find a giant feather, a broken eggshell, and huge footprints. What can you infer? Tell the story!',
      'Look at someone’s face in a picture. What can you infer about how they feel? What are your clues?',
    ],
    nuance: {
      versus: 'guess',
      versusDefinition: 'To pick an answer without clues',
      explanation: 'A guess doesn’t need any clues. When you infer, you use clues and evidence to figure something out.',
      sentences: [
        { text: 'I see snow on Dad’s boots, so I think it’s snowing outside.', answer: 'word' },
        { text: 'I think the mystery number is seven, just because I like seven.', answer: 'versus' },
        { text: 'The dog is wagging its tail and holding a leash, so it must want a walk.', answer: 'word' },
      ],
    },
  },
  {
    id: 'evidence',
    week: 10,
    text: 'Evidence',
    pronunciation: 'EV-ih-dunce',
    partOfSpeech: 'noun',
    definition: 'Facts or information that help show something is true',
    examples: [
      'The chocolate on his face was {evidence} that he ate the cupcake.',
      'Scientists found {evidence} that dinosaurs once lived in this desert.',
      'The detective collected {evidence}, like fingerprints and footprints.',
      'Wet grass in the morning is {evidence} that dew formed overnight.',
    ],
    synonyms: ['proof', 'clues'],
    antonyms: [],
    discussionPrompts: [
      'What evidence shows that a tree is alive?',
      'Why is it important to have evidence before you blame someone?',
    ],
    contexts: [
      'Finding cookie crumbs in someone’s bed after the cookies went missing.',
      'A photo that shows the fish you caught really was that big.',
      'Fossils that prove dinosaurs lived long ago.',
    ],
    misconceptions: ['A guess that someone makes up', 'Something that is a secret'],
    wordFamily: [
      { form: 'evident', partOfSpeech: 'adjective', example: 'It was {evident} from her big smile that she loved the gift.' },
    ],
    illustration: 'A detective evidence bag with a giant feather and a magnifying glass.',
    stickerId: 'stk-evidence',
    discovery: {
      scene: 'A detective holds up a bag with a giant green feather inside.',
      question: 'Why is the feather evidence?',
      choices: [
        'It is a fact that helps show what really happened',
        'It is just a decoration',
        'It is a made-up story',
      ],
      explanation: 'The feather helps prove something is true. That’s evidence!',
    },
    stories: [
      { context: 'space', text: 'The rover found ice on Mars. Scientists said it was {evidence} that there was once water there.' },
      { context: 'dino', text: 'The giant footprints in the rock were {evidence} that a huge dinosaur walked here long ago.' },
      { context: 'everyday', text: 'The muddy tracks across the kitchen floor were {evidence} that the dog had come inside.' },
      { context: 'sports', text: 'The video replay was {evidence} that the ball really did go into the goal.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Someone had been eating the strawberries in the garden. Grandpa found little bite marks and a trail of red juice. That {evidence} pointed to the bunny!',
        question: 'What does "evidence" mean in this story?',
        options: ['Clues that help show what really happened', 'A kind of fruit', 'A type of garden tool'],
        explanation: 'The bite marks and juice helped prove the bunny did it.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "evidence" correctly?',
        options: [
          'The broken shell was evidence that the chick had hatched.',
          'I evidence my dog every day.',
          'My favorite evidence is blue.',
        ],
        explanation: 'A broken shell helps show that a chick hatched.',
      },
      {
        kind: 'character',
        passage: 'The judge said, "I can’t decide who is right until I see the {evidence}."',
        question: 'What did the judge probably mean?',
        options: ['She needs facts that show what is true', 'She needs a snack', 'She wants to go home'],
        explanation: 'The judge wanted proof before deciding.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which is the best evidence that it rained last night?',
        options: ['Puddles all over the sidewalk', 'A sunny sky right now', 'A dog barking'],
        explanation: 'Puddles help show that it rained.',
      },
      {
        prompt: 'Mia says she planted a sunflower. What would be good evidence?',
        options: ['A photo of her planting the seed and the sunflower growing', 'Her favorite color is yellow', 'She likes the summer'],
        explanation: 'Evidence is information that shows something is true.',
      },
      {
        prompt: 'Which word means almost the SAME as evidence?',
        options: ['Proof', 'Guess', 'Wish'],
        explanation: 'Evidence and proof both help show something is true.',
      },
      {
        prompt: 'Why do scientists look for evidence?',
        options: ['To find out what is really true', 'To make up stories', 'To hide answers'],
        explanation: 'Evidence helps people know what is true.',
      },
    ],
    creativePrompts: [
      'Someone ate the king’s royal cake! What evidence would you look for?',
      'Prove that you are a great helper. What evidence could you show?',
    ],
    nuance: {
      versus: 'opinion',
      versusDefinition: 'What someone thinks or feels',
      explanation: 'An opinion is what someone thinks. Evidence is facts or information that show something is true.',
      sentences: [
        { text: 'The thermometer says it’s 95 degrees outside.', answer: 'word' },
        { text: 'I think summer is the best season.', answer: 'versus' },
        { text: 'The footprints in the snow lead right to the back door.', answer: 'word' },
      ],
    },
  },
  {
    id: 'perspective',
    week: 10,
    text: 'Perspective',
    pronunciation: 'per-SPEK-tiv',
    partOfSpeech: 'noun',
    definition: 'A way of thinking about or looking at something',
    examples: [
      'From an ant’s {perspective}, a puddle might look like a giant lake.',
      'Grandma and I have different {perspectives} about which music is best.',
      'Reading a story told from the wolf’s {perspective} made me think differently about the three little pigs.',
      'From the top of the mountain, the hikers had a whole new {perspective} on the town below.',
    ],
    synonyms: ['viewpoint', 'point of view'],
    antonyms: [],
    discussionPrompts: [
      'How might a dog’s perspective on a thunderstorm be different from yours?',
      'Why is it helpful to understand someone else’s perspective?',
    ],
    contexts: [
      'Thinking about how your little brother feels when you won’t share.',
      'Imagining how a bird sees the world from high in the sky.',
      'Hearing both sides of an argument before deciding who is right.',
    ],
    misconceptions: ['A pair of glasses for reading', 'A perfect answer that everyone agrees on'],
    illustration: 'An eagle soaring above a tiny town, seeing everything from high up.',
    stickerId: 'stk-perspective',
    discovery: {
      scene: 'An eagle flies high above a tiny town. The houses look like little blocks!',
      question: 'What is the eagle’s perspective on the town?',
      choices: [
        'It sees the town from high above, so everything looks small',
        'It sees the town from inside a house',
        'It can’t see the town at all',
      ],
      explanation: 'The eagle’s way of looking at the town is from way up high. That is its perspective!',
    },
    stories: [
      { context: 'dino', text: 'From a tiny lizard’s {perspective}, the giant brachiosaurus looked as tall as a mountain.' },
      { context: 'space', text: 'Seeing Earth from space gave the astronauts a new {perspective}. Our whole planet looked so small!' },
      { context: 'school', text: 'When we read the story from the giant’s {perspective}, we understood why he was so grumpy.' },
      { context: 'sports', text: 'From the goalie’s {perspective}, the game looked very different than it did from the stands.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Leo thought the rainy day was terrible because recess was inside. But from the farmer’s {perspective}, the rain was wonderful for the crops.',
        question: 'What does "perspective" mean in this story?',
        options: ['A way of looking at something', 'A kind of weather', 'A garden tool'],
        explanation: 'Leo and the farmer looked at the rain in different ways — different perspectives.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "perspective" correctly?',
        options: [
          'Try to see the problem from your friend’s perspective.',
          'I perspective my shoes every morning.',
          'The perspective dog ran across the yard.',
        ],
        explanation: 'Seeing a problem the way your friend sees it is understanding their perspective.',
      },
      {
        kind: 'character',
        passage: 'When the twins argued, Dad said, "Let’s hear each of your {perspectives} before we decide."',
        question: 'What did Dad probably mean?',
        options: ['Let each twin explain how they see the problem', 'Let’s eat dinner', 'Let’s go to sleep'],
        explanation: 'Dad wanted to hear how each twin was thinking about it.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which shows someone thinking about another person’s perspective?',
        options: [
          'Mia wonders how the new kid feels on his first day',
          'Mia eats a sandwich',
          'Mia ties her shoes',
        ],
        explanation: 'Thinking about how someone else sees things is understanding their perspective.',
      },
      {
        prompt: 'A tiny mouse and a tall giraffe look at the same tree. Why do they see it differently?',
        options: ['They have different perspectives', 'One of them is wrong', 'The tree is moving'],
        explanation: 'Where you are and who you are changes your perspective.',
      },
      {
        prompt: 'Which word means almost the SAME as perspective?',
        options: ['Viewpoint', 'Mistake', 'Snack'],
        explanation: 'A viewpoint is a way of looking at something — a perspective.',
      },
      {
        prompt: 'Why is it helpful to understand someone else’s perspective?',
        options: ['It helps you understand how they think and feel', 'It makes you always right', 'It helps you run faster'],
        explanation: 'Understanding other perspectives helps you get along and solve problems.',
      },
    ],
    creativePrompts: [
      'Tell the story of a soccer game from the soccer ball’s perspective!',
      'How would a dinosaur’s perspective on our modern city be different from yours?',
    ],
    nuance: {
      versus: 'fact',
      versusDefinition: 'Something that is true for everyone',
      explanation: 'A fact is true no matter who you are. A perspective is how one person sees or thinks about something — and people can have different ones!',
      sentences: [
        { text: 'To the little ant, the sidewalk crack looks like a giant canyon.', answer: 'word' },
        { text: 'Water freezes when it gets cold enough.', answer: 'versus' },
        { text: 'The wolf thinks the pigs’ houses are too hard to blow down; the pigs think their houses are just right.', answer: 'word' },
      ],
    },
  },
];
