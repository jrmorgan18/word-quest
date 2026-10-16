import type { Word } from '../types';

export const WORDS_01_03: Word[] = [
  // ───────────────────────────── Week 1 ─────────────────────────────
  {
    id: 'peculiar',
    week: 1,
    text: 'Peculiar',
    pronunciation: 'pih-KYOOL-yer',
    partOfSpeech: 'adjective',
    definition: 'Strange or unusual',
    examples: [
      'A {peculiar} noise came from the attic.',
      'The scientist found a {peculiar} rock that glowed purple in the dark.',
      'Our cat has a {peculiar} habit of sleeping inside the bathtub.',
      'The robot made a {peculiar} beeping sound that nobody had heard before.',
    ],
    synonyms: ['strange', 'odd'],
    antonyms: ['ordinary'],
    discussionPrompts: [
      'What is the most peculiar food you have ever tasted?',
      'Can something be peculiar and wonderful at the same time? What would it be?',
    ],
    contexts: [
      'A dog that meows like a cat every morning.',
      'Finding a sock stuck to the ceiling with no idea how it got there.',
      'A snowman appearing on the beach in the middle of summer.',
    ],
    misconceptions: ['Very small and hard to see', 'Bright and colorful'],
    wordFamily: [
      { form: 'peculiarly', partOfSpeech: 'adverb', example: 'The parrot was acting {peculiarly} quiet today.' },
    ],
    illustration: 'A friendly green dinosaur with three blinking eyes and a curly tail.',
    stickerId: 'stk-peculiar',
    discovery: {
      scene: 'A dinosaur with THREE eyes is blinking at you.',
      question: 'Why would someone call this dinosaur peculiar?',
      choices: [
        'Because having three eyes is strange and unusual',
        'Because it is the biggest dinosaur on the island',
        'Because it is hungry for lunch',
      ],
      explanation: 'Most dinosaurs have two eyes. Three eyes is unusual, so this dino is peculiar!',
    },
    stories: [
      { context: 'dino', text: 'The explorers found a dinosaur egg that was square instead of round. Everyone agreed it was very {peculiar}.' },
      { context: 'everyday', text: 'Grandpa put ketchup on his ice cream. It was a {peculiar} snack, but he loved it.' },
      { context: 'arcade', text: 'In level four, the coins floated upward instead of falling down. What a {peculiar} level!' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The new kid wore one red boot and one green boot. Some kids thought his style was {peculiar}, but he said it made him happy.',
        question: 'What does "peculiar" mean in this story?',
        options: ['Different from what people usually see', 'Very expensive', 'Muddy and wet'],
        explanation: 'Wearing two different boots is unusual, so the clue tells us peculiar means strange or different.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "peculiar" correctly?',
        options: [
          'The pizza tasted peculiar because someone added pickles and marshmallows.',
          'I was so peculiar that I ate two sandwiches.',
          'Please peculiar the door before you leave.',
        ],
        explanation: 'Pickles and marshmallows on pizza is strange, so "peculiar" fits that sentence.',
      },
      {
        kind: 'character',
        passage: 'Maya looked at the cloud and said, "That cloud is {peculiar}. It looks exactly like a giraffe riding a bike!"',
        question: 'What did Maya probably mean?',
        options: ['The cloud had a very unusual shape', 'The cloud was about to rain', 'The cloud was boring'],
        explanation: 'A cloud shaped like a giraffe on a bike is unusual, so Maya meant it was strange in a fun way.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which of these would be the most peculiar thing to see at school?',
        options: ['A penguin sitting at the teacher’s desk', 'Kids lining up for lunch', 'A backpack hanging on a hook'],
        explanation: 'A penguin at school is very unusual. The other things happen every day.',
      },
      {
        prompt: 'Leo’s goldfish started swimming backward in circles. Leo said it was peculiar. What did he notice?',
        options: ['His fish was acting in an unusual way', 'His fish was very hungry', 'His fish was asleep'],
        explanation: 'Swimming backward in circles is strange behavior, so Leo called it peculiar.',
      },
      {
        prompt: 'If a sandwich tasted peculiar, how would it taste?',
        options: ['Strange and not like you expected', 'Exactly like it always does', 'Very spicy'],
        explanation: 'Peculiar means strange or unusual — not the normal taste.',
      },
      {
        prompt: 'Which word is the OPPOSITE of peculiar?',
        options: ['Normal', 'Weird', 'Curious'],
        explanation: 'Something peculiar is unusual. Something normal is the opposite.',
      },
    ],
    creativePrompts: [
      'Invent a peculiar dinosaur. What makes it unusual?',
      'Describe the most peculiar day you can imagine at school.',
    ],
    nuance: {
      versus: 'funny',
      versusDefinition: 'Makes you laugh',
      explanation: 'Peculiar things are unusual. Some peculiar things are funny, but some are just strange — like a mysterious noise at night.',
      sentences: [
        { text: 'A strange green light was shining from the empty barn.', answer: 'word' },
        { text: 'The clown told a joke that made everyone giggle.', answer: 'versus' },
        { text: 'The flowers in the garden turned blue overnight, and nobody knew why.', answer: 'word' },
      ],
    },
  },
  {
    id: 'reluctant',
    week: 1,
    text: 'Reluctant',
    pronunciation: 'rih-LUK-tunt',
    partOfSpeech: 'adjective',
    definition: 'Not wanting to do something',
    examples: [
      'He was {reluctant} to jump into the cold pool.',
      'The puppy was {reluctant} to take a bath, so it hid under the bed.',
      'I was {reluctant} to leave the party because I was having so much fun.',
      'The astronaut was {reluctant} to leave her friends behind on the space station.',
    ],
    synonyms: ['unwilling', 'hesitant'],
    antonyms: ['eager'],
    discussionPrompts: [
      'Tell about a time you felt reluctant to try something. What happened?',
      'How can a friend help someone who feels reluctant?',
    ],
    contexts: [
      'Slowly dipping one toe into a freezing lake instead of jumping in.',
      'Dragging your feet when it is time to clean your room.',
      'A cat backing away when someone tries to put it in a carrier.',
    ],
    misconceptions: ['Very tired and sleepy', 'Happy and excited to help'],
    wordFamily: [
      { form: 'reluctance', partOfSpeech: 'noun', example: 'She showed some {reluctance} before trying the spicy soup.' },
      { form: 'reluctantly', partOfSpeech: 'adverb', example: 'He {reluctantly} turned off the video game.' },
    ],
    illustration: 'A worried little dinosaur standing at the end of a high diving board.',
    stickerId: 'stk-reluctant',
    discovery: {
      scene: 'A small dinosaur stands at the edge of a diving board, holding on tight.',
      question: 'How can you tell this dinosaur is reluctant?',
      choices: [
        'It is holding back because it doesn’t want to jump yet',
        'It is cheering and running toward the water',
        'It is eating a snack',
      ],
      explanation: 'The dinosaur is holding on and not jumping. It doesn’t want to — it is reluctant!',
    },
    stories: [
      { context: 'space', text: 'The little alien had never ridden in a rocket before. It was {reluctant} to climb aboard until its friend held its hand.' },
      { context: 'school', text: 'Sam did not want to read his poem in front of the class. He was {reluctant} to stand up.' },
      { context: 'everyday', text: 'The baby bird looked down from the nest. It was {reluctant} to try flying for the first time.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Ava stood at the doctor’s door for a long time. She was {reluctant} to go in because she thought she might get a shot.',
        question: 'What does "reluctant" mean here?',
        options: ['Not wanting to do something', 'Feeling sick', 'Walking very fast'],
        explanation: 'Ava waited at the door because she didn’t want to go in. That is what reluctant means.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "reluctant" correctly?',
        options: [
          'Mia was reluctant to share her last cookie.',
          'The reluctant sun was shining brightly.',
          'We reluctant the ball across the field.',
        ],
        explanation: 'Mia didn’t want to give away her last cookie, so she was reluctant.',
      },
      {
        kind: 'character',
        passage: 'When Dad asked if he wanted to try sushi, Jamal said, "I’m a little {reluctant}... it looks so different!"',
        question: 'What did Jamal probably mean?',
        options: ['He wasn’t sure he wanted to try it', 'He was super excited to eat it', 'He was already full'],
        explanation: 'Jamal was unsure and didn’t really want to try it yet — he was reluctant.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is reluctant?',
        options: [
          'Zoe, who keeps saying "Do I have to?" before her swim lesson',
          'Ben, who runs to the pool and jumps right in',
          'Kai, who is sleeping on the couch',
        ],
        explanation: 'Zoe doesn’t want to go to her lesson. That is being reluctant.',
      },
      {
        prompt: 'A robot was reluctant to enter the dark cave. What did the robot do?',
        options: ['It stopped at the entrance and didn’t want to go in', 'It zoomed inside right away', 'It turned into a car'],
        explanation: 'Being reluctant means not wanting to do something, so the robot held back.',
      },
      {
        prompt: 'Which word means the OPPOSITE of reluctant?',
        options: ['Eager', 'Unwilling', 'Nervous'],
        explanation: 'Eager means really wanting to do something — the opposite of reluctant.',
      },
      {
        prompt: 'Nora was reluctant to stop reading her book at bedtime. Why?',
        options: ['She didn’t want to stop because the story was exciting', 'She wanted to stop because she was bored', 'She couldn’t find her book'],
        explanation: 'Nora didn’t want to stop. People can be reluctant to stop something fun, too!',
      },
    ],
    creativePrompts: [
      'Tell a story about a dragon who is reluctant to breathe fire. Why doesn’t it want to?',
      'What could you say to help a reluctant friend try something new?',
    ],
    nuance: {
      versus: 'refuse',
      versusDefinition: 'To say no and not do something at all',
      explanation: 'A reluctant person doesn’t want to do something, but they might still do it. When you refuse, you say no completely.',
      sentences: [
        { text: 'Theo didn’t want to try the broccoli, but he took one small bite anyway.', answer: 'word' },
        { text: 'Theo crossed his arms and said, "No broccoli. Not even one bite!"', answer: 'versus' },
        { text: 'The dog dragged its paws but finally walked into the bathtub.', answer: 'word' },
      ],
    },
  },
  {
    id: 'observe',
    week: 1,
    text: 'Observe',
    pronunciation: 'ub-ZURV',
    partOfSpeech: 'verb',
    definition: 'To watch or notice carefully',
    examples: [
      'We {observed} ants carrying food into their nest.',
      'The astronomer stayed up late to {observe} the moon through her telescope.',
      'If you {observe} the sky at sunset, you might see pink and orange clouds.',
      'The coach {observed} each player to see who was ready for the big game.',
    ],
    synonyms: ['watch', 'notice'],
    antonyms: ['ignore'],
    discussionPrompts: [
      'What could you observe if you sat quietly in your backyard for five minutes?',
      'Why do scientists need to observe things carefully?',
    ],
    contexts: [
      'Sitting very still to watch a bird build its nest.',
      'Looking closely at a caterpillar every day to see how it changes.',
      'Watching the clouds carefully to notice how they move.',
    ],
    misconceptions: ['To close your eyes and rest', 'To talk loudly about something'],
    wordFamily: [
      { form: 'observation', partOfSpeech: 'noun', example: 'Our class wrote down every {observation} about the tadpoles.' },
      { form: 'observant', partOfSpeech: 'adjective', example: 'The {observant} girl noticed the tiny spider first.' },
    ],
    illustration: 'A curious dinosaur peeking through a pair of binoculars.',
    stickerId: 'stk-observe',
    discovery: {
      scene: 'A dinosaur is looking through binoculars at a butterfly.',
      question: 'What is this dinosaur doing when it observes the butterfly?',
      choices: ['Watching it carefully to notice details', 'Chasing it away', 'Ignoring it and taking a nap'],
      explanation: 'Binoculars help you watch carefully. The dinosaur is observing!',
    },
    stories: [
      { context: 'space', text: 'The astronaut floated by the window to {observe} the Earth spinning far below.' },
      { context: 'dino', text: 'The paleontologist used a magnifying glass to {observe} the tiny scratches on the fossil.' },
      { context: 'sports', text: 'Before the race, Mia liked to {observe} the other runners to see how they stretched.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Every morning, Grandma sat by the window with her notebook to {observe} the birds at the feeder. She wrote down their colors and sizes.',
        question: 'What does "observe" mean in this story?',
        options: ['To watch carefully and notice details', 'To feed animals', 'To draw pictures'],
        explanation: 'Grandma watched closely and wrote down details. That is observing.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "observe" correctly?',
        options: [
          'We will observe how the ice cube melts in the sun.',
          'Please observe your shoes on the mat.',
          'The dog observed loudly at the mail carrier.',
        ],
        explanation: 'Watching an ice cube melt carefully is observing.',
      },
      {
        kind: 'character',
        passage: 'The detective whispered, "Let’s not touch anything yet. First, we {observe}."',
        question: 'What did the detective probably mean?',
        options: ['Look carefully before doing anything else', 'Run away quickly', 'Start cleaning the room'],
        explanation: 'The detective wanted everyone to watch and notice clues first.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is observing?',
        options: [
          'Ella, who watches a snail for ten minutes and draws its shell',
          'Max, who is singing loudly',
          'Ruby, who is running to the swings',
        ],
        explanation: 'Ella is watching carefully and noticing details. That is observing.',
      },
      {
        prompt: 'A scientist wants to observe a volcano. What will she do?',
        options: ['Watch it carefully and take notes', 'Climb inside it', 'Paint it purple'],
        explanation: 'To observe means to watch and notice carefully.',
      },
      {
        prompt: 'Which word means the OPPOSITE of observe?',
        options: ['Ignore', 'Watch', 'Study'],
        explanation: 'When you ignore something, you don’t pay attention to it — the opposite of observing.',
      },
      {
        prompt: 'Why would a nature guide ask you to be quiet and observe the deer?',
        options: ['So you can watch them carefully without scaring them', 'So you can catch them', 'So you can fall asleep'],
        explanation: 'Being quiet helps you watch carefully, which is what observe means.',
      },
    ],
    creativePrompts: [
      'Pretend you are a scientist on a new planet. What would you observe first?',
      'Observe something in the room right now for 10 seconds. What did you notice that you never noticed before?',
    ],
    nuance: {
      versus: 'glance',
      versusDefinition: 'To look at something quickly',
      explanation: 'A glance is a quick look. When you observe, you look carefully and take your time to notice details.',
      sentences: [
        { text: 'Lily studied the spider web for a long time and counted every strand.', answer: 'word' },
        { text: 'Jack looked at the clock for one second and kept running.', answer: 'versus' },
        { text: 'The scientist watched the tadpoles every day and wrote down how they changed.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 2 ─────────────────────────────
  {
    id: 'inevitable',
    week: 2,
    text: 'Inevitable',
    pronunciation: 'in-EV-ih-tuh-bul',
    partOfSpeech: 'adjective',
    definition: 'Certain to happen',
    examples: [
      'With dark clouds approaching, getting wet seemed {inevitable}.',
      'When you throw a ball up into the air, it is {inevitable} that it will come back down.',
      'After eating three bowls of ice cream, a tummy ache was {inevitable}.',
      'If you never charge a tablet, it is {inevitable} that the battery will run out.',
    ],
    synonyms: ['certain', 'unavoidable'],
    antonyms: ['unlikely'],
    discussionPrompts: [
      'What is something that is inevitable every single day?',
      'Is growing older inevitable? How do you know?',
    ],
    contexts: [
      'Knowing the sun will set tonight, just like it does every night.',
      'An ice cube left in the hot sun will melt.',
      'Leaving sandcastles near the waves means the tide will wash them away.',
    ],
    misconceptions: ['Impossible to see', 'Very exciting and fun'],
    wordFamily: [
      { form: 'inevitably', partOfSpeech: 'adverb', example: 'The puppy {inevitably} found the muddiest puddle in the park.' },
    ],
    illustration: 'A glowing meteor streaking toward a planet with a fiery tail.',
    stickerId: 'stk-inevitable',
    discovery: {
      scene: 'A meteor is zooming toward a planet. Nothing can stop it!',
      question: 'Why is the meteor landing inevitable?',
      choices: ['It is going to happen no matter what', 'It might change its mind and fly away', 'It is too small to matter'],
      explanation: 'Nothing can stop the meteor, so the landing is certain to happen. That is inevitable!',
    },
    stories: [
      { context: 'arcade', text: 'The game timer was almost at zero and the hero was far from the flag. Losing this round was {inevitable}.' },
      { context: 'everyday', text: 'Leaves fall off the trees every autumn. It is {inevitable}.' },
      { context: 'dino', text: 'The baby dinosaur kept growing and growing. It was {inevitable} that it would soon be too big for its nest.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Liam left his sandcastle right next to the waves. When the tide came in, losing the castle was {inevitable}.',
        question: 'What does "inevitable" mean in this story?',
        options: ['Sure to happen', 'Easy to fix', 'Hard to understand'],
        explanation: 'The waves were coming, so the castle would definitely be washed away. It was certain to happen.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "inevitable" correctly?',
        options: [
          'If you don’t water a plant for a month, it is inevitable that it will wilt.',
          'My inevitable shoes are blue.',
          'She inevitable the cake into slices.',
        ],
        explanation: 'A plant without water will definitely wilt, so that sentence uses inevitable correctly.',
      },
      {
        kind: 'character',
        passage: 'Looking at the huge pile of snow on the roof, Mom sighed, "Shoveling tomorrow is {inevitable}."',
        question: 'What did Mom probably mean?',
        options: ['They will definitely have to shovel', 'They might not need to shovel', 'Shoveling is fun'],
        explanation: 'Mom was sure they would have to shovel — it was certain to happen.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which of these is inevitable?',
        options: ['Night coming after day', 'Finding a dinosaur in your backyard', 'Winning every game'],
        explanation: 'Night always comes after day. It is certain to happen.',
      },
      {
        prompt: 'The robot’s battery was at 1% and there was no charger anywhere. What was inevitable?',
        options: ['The robot would run out of power', 'The robot would get stronger', 'The robot would find a charger'],
        explanation: 'With no charger, running out of power was certain.',
      },
      {
        prompt: 'If something is inevitable, it is…',
        options: ['Going to happen no matter what', 'Never going to happen', 'Maybe going to happen'],
        explanation: 'Inevitable means certain to happen.',
      },
      {
        prompt: 'Which word is the OPPOSITE of inevitable?',
        options: ['Unlikely', 'Certain', 'Sure'],
        explanation: 'Unlikely means probably won’t happen — the opposite of inevitable.',
      },
    ],
    creativePrompts: [
      'A giant snowball is rolling down a hill toward a snowman. Tell what is inevitable!',
      'Name three things that are inevitable on your birthday.',
    ],
    nuance: {
      versus: 'possible',
      versusDefinition: 'Might happen',
      explanation: 'Something possible might happen. Something inevitable will definitely happen.',
      sentences: [
        { text: 'The sun will rise tomorrow morning.', answer: 'word' },
        { text: 'Maybe it will snow next week.', answer: 'versus' },
        { text: 'A dropped egg falls to the floor because of gravity.', answer: 'word' },
      ],
    },
  },
  {
    id: 'resourceful',
    week: 2,
    text: 'Resourceful',
    pronunciation: 'rih-SORS-ful',
    partOfSpeech: 'adjective',
    definition: 'Good at finding clever ways to solve problems',
    examples: [
      'The {resourceful} astronaut repaired his spaceship using spare parts.',
      'When the power went out, our {resourceful} neighbor made a lamp out of a flashlight and a water jug.',
      'The {resourceful} squirrel figured out how to climb the slippery pole to reach the bird feeder.',
      'Our {resourceful} teacher turned old cereal boxes into puppets.',
    ],
    synonyms: ['clever', 'inventive'],
    antonyms: ['helpless'],
    discussionPrompts: [
      'What could you do to be resourceful if you forgot your lunch?',
      'Who is the most resourceful person you know? Why?',
    ],
    contexts: [
      'Using a paper clip to fix a broken zipper.',
      'Building a fort out of couch cushions and blankets when there is no tent.',
      'Using a spoon to dig in the sand when you forgot your shovel.',
    ],
    misconceptions: ['Having lots of money and toys', 'Very good at running fast'],
    wordFamily: [
      { form: 'resource', partOfSpeech: 'noun', example: 'Water is an important {resource} for every living thing.' },
      { form: 'resourcefulness', partOfSpeech: 'noun', example: 'Her {resourcefulness} helped the team finish the project.' },
    ],
    illustration: 'A smiling astronaut holding a toolbox and a wrench.',
    stickerId: 'stk-resourceful',
    discovery: {
      scene: 'An astronaut fixes a rocket using a toolbox full of spare parts.',
      question: 'What makes this astronaut resourceful?',
      choices: [
        'She finds a clever way to fix the rocket with what she has',
        'She waits for someone else to fix it',
        'She buys a brand-new rocket',
      ],
      explanation: 'She uses spare parts to solve the problem. That is resourceful!',
    },
    stories: [
      { context: 'dino', text: 'The young dinosaur couldn’t reach the tall leaves, so it stood on a rock. What a {resourceful} idea!' },
      { context: 'arcade', text: 'The hero had no key, so she used a coin to unscrew the lock. She was very {resourceful}.' },
      { context: 'school', text: 'When the glue ran out, Priya used tape and string to finish her project. She was {resourceful}.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The campers forgot their bowls, so Dad cut empty water bottles in half to make cups for soup. Everyone said he was {resourceful}.',
        question: 'What does "resourceful" mean here?',
        options: ['Good at finding clever ways to solve problems', 'Very hungry', 'Forgetful'],
        explanation: 'Dad found a clever solution using what they had. That is resourceful.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "resourceful" correctly?',
        options: [
          'The resourceful boy used a stick to reach the ball under the fence.',
          'The resourceful rain fell all day.',
          'I resourceful my bike to school.',
        ],
        explanation: 'Using a stick to reach the ball is a clever solution — resourceful!',
      },
      {
        kind: 'character',
        passage: 'Rosa’s kite was stuck in a tree. Her brother laughed, "Don’t worry, Rosa is {resourceful}. She’ll figure something out."',
        question: 'What did her brother probably mean?',
        options: ['Rosa is good at solving problems', 'Rosa is good at climbing trees', 'Rosa will cry'],
        explanation: 'He trusted Rosa to find a clever solution.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is being resourceful?',
        options: [
          'Omar, who uses a rubber band to hold his broken backpack together',
          'Lily, who throws away her backpack',
          'Finn, who cries because his backpack broke',
        ],
        explanation: 'Omar found a clever way to fix the problem with what he had.',
      },
      {
        prompt: 'An explorer’s flashlight broke in a cave. How could she be resourceful?',
        options: ['Use the glow from her watch to find her way', 'Sit down and give up', 'Shout until someone comes'],
        explanation: 'Using what she has to solve the problem is being resourceful.',
      },
      {
        prompt: 'Which word is the OPPOSITE of resourceful?',
        options: ['Helpless', 'Clever', 'Creative'],
        explanation: 'Helpless means not able to solve problems — the opposite of resourceful.',
      },
      {
        prompt: 'A resourceful person is someone who…',
        options: ['Thinks of clever ways to use what they have', 'Owns lots of things', 'Always asks others to help'],
        explanation: 'Resourceful people solve problems in clever ways.',
      },
    ],
    creativePrompts: [
      'Describe how an astronaut could be resourceful if her space boots broke.',
      'You are stuck on an island with a rope, a bucket, and a coconut. How could you be resourceful?',
    ],
    nuance: {
      versus: 'rich',
      versusDefinition: 'Having lots of money or things',
      explanation: 'Being rich means having a lot. Being resourceful means solving problems cleverly — even with very little!',
      sentences: [
        { text: 'She made a toy car from a juice box and bottle caps.', answer: 'word' },
        { text: 'He owns a giant house with three swimming pools.', answer: 'versus' },
        { text: 'When the bridge broke, the hikers used a log to cross the stream.', answer: 'word' },
      ],
    },
  },
  {
    id: 'astonished',
    week: 2,
    text: 'Astonished',
    pronunciation: 'uh-STON-isht',
    partOfSpeech: 'adjective',
    definition: 'Extremely surprised or amazed',
    examples: [
      'The scientists were {astonished} by the dinosaur fossil.',
      'Mom was {astonished} when she saw that I had cleaned my whole room.',
      'The crowd was {astonished} when the magician pulled a rabbit out of the hat.',
      'We were {astonished} to see a whale jump out of the ocean right next to our boat.',
    ],
    synonyms: ['amazed', 'stunned'],
    antonyms: ['unsurprised'],
    discussionPrompts: [
      'What is something that would make you astonished?',
      'What does your face look like when you are astonished?',
    ],
    contexts: [
      'Gasping when you open a present and find the exact toy you wanted.',
      'Your mouth dropping open when a magician makes a coin disappear.',
      'Seeing a rainbow and a shooting star at the same time.',
    ],
    misconceptions: ['A little bit sleepy', 'Angry and grumpy'],
    wordFamily: [
      { form: 'astonish', partOfSpeech: 'verb', example: 'The acrobat will {astonish} the audience with her flips.' },
      { form: 'astonishing', partOfSpeech: 'adjective', example: 'The view from the mountain was {astonishing}.' },
    ],
    illustration: 'A purple alien with wide eyes and an open mouth, totally amazed.',
    stickerId: 'stk-astonished',
    discovery: {
      scene: 'An alien’s eyes pop wide open and its mouth drops in surprise.',
      question: 'How do you know this alien is astonished?',
      choices: ['Its face shows it is super surprised', 'It looks bored', 'It is falling asleep'],
      explanation: 'Wide eyes and an open mouth show the alien is extremely surprised — astonished!',
    },
    stories: [
      { context: 'space', text: 'When the astronauts saw a planet with purple oceans, they were {astonished}.' },
      { context: 'sports', text: 'The smallest player kicked the ball all the way across the field. The coach was {astonished}.' },
      { context: 'arcade', text: 'Leo opened the treasure chest and found a thousand golden coins. He was {astonished}!' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'When Dad opened the door and saw a giant cake shaped like a castle, his mouth fell open. He was {astonished}.',
        question: 'What does "astonished" mean in this story?',
        options: ['Extremely surprised', 'Very hungry', 'A little worried'],
        explanation: 'His mouth fell open — a clue that he was very surprised.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "astonished" correctly?',
        options: [
          'We were astonished when the tiny puppy carried a huge stick.',
          'I astonished my teeth before bed.',
          'The astonished table had four legs.',
        ],
        explanation: 'A tiny puppy carrying a huge stick would be very surprising.',
      },
      {
        kind: 'character',
        passage: 'Ella read her test score and said, "Wow, I’m {astonished}! I thought that test was really hard!"',
        question: 'What did Ella probably mean?',
        options: ['She was very surprised by her good score', 'She was upset', 'She didn’t care'],
        explanation: 'Ella didn’t expect to do so well, so she was very surprised.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which of these would make most people astonished?',
        options: ['A dog that can play the piano', 'Eating cereal for breakfast', 'Brushing your teeth'],
        explanation: 'A dog playing piano would be amazing! The other things are ordinary.',
      },
      {
        prompt: 'The explorer was astonished when she found the hidden cave. How did she feel?',
        options: ['Extremely surprised and amazed', 'Bored', 'Sleepy'],
        explanation: 'Astonished means extremely surprised or amazed.',
      },
      {
        prompt: 'Which word means almost the SAME as astonished?',
        options: ['Amazed', 'Tired', 'Calm'],
        explanation: 'Amazed and astonished both mean very surprised.',
      },
      {
        prompt: 'Why might a person be astonished at a birthday party?',
        options: ['Because it was a surprise party they didn’t expect', 'Because they planned every detail', 'Because they went to sleep early'],
        explanation: 'A surprise you didn’t expect can make you astonished.',
      },
    ],
    creativePrompts: [
      'Invent an alien that would make scientists astonished. What can it do?',
      'Tell about the most astonishing thing you have ever seen.',
    ],
    nuance: {
      versus: 'surprised',
      versusDefinition: 'Feeling something you didn’t expect',
      explanation: 'Astonished is a BIG surprise. You might be surprised by a new pencil, but astonished by a flying elephant!',
      sentences: [
        { text: 'The whole crowd gasped when the elephant began to fly.', answer: 'word' },
        { text: 'I didn’t expect a blue pencil, but I got one.', answer: 'versus' },
        { text: 'Grandma’s jaw dropped when she saw a real dinosaur bone in the museum.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 3 ─────────────────────────────
  {
    id: 'anticipate',
    week: 3,
    text: 'Anticipate',
    pronunciation: 'an-TIS-ih-pate',
    partOfSpeech: 'verb',
    definition: 'To expect something or prepare for it before it happens',
    examples: [
      'The goalie {anticipated} where the soccer ball would go.',
      'We {anticipate} a big crowd at the fair, so we will get there early.',
      'The squirrels {anticipated} the cold winter by hiding acorns all autumn.',
      'The video game hero {anticipated} the dragon’s attack and jumped out of the way.',
    ],
    synonyms: ['expect', 'foresee'],
    antonyms: ['overlook'],
    discussionPrompts: [
      'What do you anticipate will happen at your next birthday?',
      'How can anticipating a problem help you stop it from happening?',
    ],
    contexts: [
      'Packing an umbrella because the forecast says it will rain later.',
      'Moving to the spot where you think the baseball will land before it comes down.',
      'Putting a towel by the door because you know your dog will come in muddy.',
    ],
    misconceptions: ['To forget about something', 'To be sorry about something that already happened'],
    wordFamily: [
      { form: 'anticipation', partOfSpeech: 'noun', example: 'The kids bounced with {anticipation} on the morning of the field trip.' },
    ],
    illustration: 'A soccer-playing robot goalie diving to catch a ball.',
    stickerId: 'stk-anticipate',
    discovery: {
      scene: 'A robot goalie leaps to the exact spot where the ball is about to fly.',
      question: 'How did the robot anticipate the shot?',
      choices: [
        'It guessed where the ball would go and moved there before the kick',
        'It closed its eyes and hoped',
        'It waited until the ball was already in the net',
      ],
      explanation: 'The robot expected where the ball would go and got ready early. That is anticipating!',
    },
    stories: [
      { context: 'space', text: 'The astronauts knew the asteroid storm was coming, so they moved the spaceship to safety. They {anticipated} the danger.' },
      { context: 'arcade', text: 'Mia remembered that a giant spider appeared in this level, so she was ready when it dropped down. She had {anticipated} it!' },
      { context: 'everyday', text: 'Dad {anticipated} that we would be hungry after the long hike, so he packed extra sandwiches.' },
      { context: 'sports', text: 'The basketball player {anticipated} the pass and caught the ball before it reached the other team.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Before the storm, the farmer brought all the animals into the barn. He {anticipated} the heavy rain and wanted them to stay dry.',
        question: 'What does "anticipated" mean in this story?',
        options: ['Expected something and got ready for it', 'Felt sad about something', 'Forgot about something'],
        explanation: 'The farmer expected rain and prepared before it came. That is anticipating.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "anticipate" correctly?',
        options: [
          'We anticipate that the bus will be late because of the snow.',
          'I anticipated my sandwich for lunch yesterday and it was yummy.',
          'The anticipate dog wagged its tail.',
        ],
        explanation: 'Expecting the bus to be late because of the snow is anticipating.',
      },
      {
        kind: 'character',
        passage: 'Coach said, "The other team always passes to their tallest player. Let’s {anticipate} that and guard her closely!"',
        question: 'What did Coach probably mean?',
        options: [
          'Expect what the other team will do and be ready',
          'Let the other team win',
          'Stop playing and rest',
        ],
        explanation: 'Coach wanted the team to expect the pass and prepare for it.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is anticipating?',
        options: [
          'Ivy, who brings a jacket because she expects the movie theater to be cold',
          'Owen, who forgot his jacket and is shivering',
          'Ana, who is laughing at a joke',
        ],
        explanation: 'Ivy expected the cold and prepared for it ahead of time.',
      },
      {
        prompt: 'A dinosaur sees the volcano smoking and starts walking away before it erupts. What is it doing?',
        options: ['Anticipating the eruption', 'Ignoring the volcano', 'Feeling reluctant to eat'],
        explanation: 'The dinosaur expects the eruption and gets away before it happens.',
      },
      {
        prompt: 'If you anticipate a problem, when do you think about it?',
        options: ['Before it happens', 'Only after it happens', 'Never'],
        explanation: 'Anticipating happens before — you expect it and prepare.',
      },
      {
        prompt: 'The chess player anticipated her friend’s next move. What does that mean?',
        options: [
          'She figured out what her friend would do before he did it',
          'She was surprised by her friend’s move',
          'She knocked the pieces off the board',
        ],
        explanation: 'She expected the move ahead of time — that is anticipating.',
      },
    ],
    creativePrompts: [
      'You are going camping on a planet with three moons. What problems do you anticipate, and how will you prepare?',
      'Tell about a time you anticipated something and were ready for it.',
    ],
    nuance: {
      versus: 'hope',
      versusDefinition: 'To wish something would happen',
      explanation: 'When you hope, you wish for something. When you anticipate, you expect it and often get ready for it.',
      sentences: [
        { text: 'Ben saw dark clouds, so he packed his raincoat before school.', answer: 'word' },
        { text: 'Ben wished really hard that he would get a puppy someday.', answer: 'versus' },
        { text: 'The goalie moved left because she expected the kicker to aim there.', answer: 'word' },
      ],
    },
  },
  {
    id: 'persistent',
    week: 3,
    text: 'Persistent',
    pronunciation: 'per-SIS-tunt',
    partOfSpeech: 'adjective',
    definition: 'Continuing to try even when something is difficult',
    examples: [
      'The {persistent} scientist kept experimenting until she succeeded.',
      'The {persistent} woodpecker tapped on the tree all morning until it found a tasty bug.',
      'Learning to ride a bike was hard, but Jada was {persistent} and practiced every day.',
      'The {persistent} gamer tried the tricky level twenty times before finally beating it.',
    ],
    synonyms: ['determined', 'tireless'],
    antonyms: ['quitting'],
    discussionPrompts: [
      'What is something you got better at because you were persistent?',
      'When is it smart to be persistent, and when is it smart to try a different plan?',
    ],
    contexts: [
      'Practicing a hard piano song every day until you can play it.',
      'Building your block tower again and again after it keeps falling down.',
      'A spider rebuilding its web every time the wind breaks it.',
    ],
    misconceptions: ['Giving up when something gets hard', 'Doing something very quickly'],
    wordFamily: [
      { form: 'persist', partOfSpeech: 'verb', example: 'If you {persist}, you will learn to tie your shoes.' },
      { form: 'persistence', partOfSpeech: 'noun', example: 'Her {persistence} helped her finish the giant puzzle.' },
    ],
    illustration: 'A determined dinosaur climbing up a rocky hill, step by step.',
    stickerId: 'stk-persistent',
    discovery: {
      scene: 'A little dinosaur keeps climbing a rocky hill. It slips, but tries again and again.',
      question: 'Why is this dinosaur being persistent?',
      choices: [
        'It keeps trying to climb even though the hill is hard',
        'It climbs the hill in one easy jump',
        'It gives up and walks away',
      ],
      explanation: 'The dinosaur doesn’t quit when it slips. It keeps trying — that’s persistent!',
    },
    stories: [
      { context: 'space', text: 'The astronaut tried five different ways to repair the rocket. She refused to give up. She was very {persistent}.' },
      { context: 'dino', text: 'The baby triceratops kept trying to crack the coconut until it finally broke open. It was {persistent}.' },
      { context: 'school', text: 'Spelling the long word was tricky, but Eli kept practicing. He was {persistent}.' },
      { context: 'sports', text: 'Every time the {persistent} skater fell, she got back up and tried the jump again.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The ant tried to carry a big crumb up the hill. It fell down six times, but the {persistent} ant kept going until it reached the top.',
        question: 'What does "persistent" mean in this story?',
        options: ['Keeps trying even when it’s hard', 'Very small', 'Moving very slowly on purpose'],
        explanation: 'The ant fell six times but kept trying. That is being persistent.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "persistent" correctly?',
        options: [
          'The persistent puppy kept pulling the blanket until it came off the bed.',
          'He was persistent, so he quit after one try.',
          'Please persistent the milk into the cup.',
        ],
        explanation: 'The puppy kept pulling and didn’t give up — that’s persistent.',
      },
      {
        kind: 'character',
        passage: 'Grandpa smiled and said, "That knot is tough. Be {persistent}, and it will come loose."',
        question: 'What did Grandpa probably mean?',
        options: ['Keep trying and don’t give up', 'Cut the rope right away', 'Ask someone else to do it'],
        explanation: 'Grandpa was encouraging his grandchild to keep trying.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is being persistent?',
        options: [
          'Mateo, who keeps practicing his cartwheel even after falling many times',
          'Sara, who stops after one try',
          'Leo, who is watching TV',
        ],
        explanation: 'Mateo keeps trying even though it is hard. That is persistent.',
      },
      {
        prompt: 'A robot keeps trying to open a stuck door. It tries pushing, pulling, and sliding. What word describes the robot?',
        options: ['Persistent', 'Reluctant', 'Astonished'],
        explanation: 'The robot keeps trying different ways and doesn’t give up — it is persistent.',
      },
      {
        prompt: 'What would a persistent person do if a puzzle was really hard?',
        options: ['Keep working on it, a little at a time', 'Throw the puzzle away', 'Hide the puzzle under the bed'],
        explanation: 'Persistent people keep trying when things are difficult.',
      },
      {
        prompt: 'Which word means the OPPOSITE of persistent?',
        options: ['Quitting', 'Determined', 'Hardworking'],
        explanation: 'Quitting means giving up — the opposite of persistent.',
      },
    ],
    creativePrompts: [
      'Tell a story about a persistent explorer searching for a lost treasure.',
      'What is something hard you want to learn? How could you be persistent?',
    ],
    nuance: {
      versus: 'stubborn',
      versusDefinition: 'Refusing to change your mind, even when you should',
      explanation:
        'Persistence can be useful: you keep trying. Being stubborn can mean refusing to reconsider, even when changing course would be smarter.',
      sentences: [
        { text: 'Kai kept practicing his spelling words every night until he knew them all.', answer: 'word' },
        { text: 'Kai refused to wear a coat even though it was snowing and everyone told him he’d be cold.', answer: 'versus' },
        { text: 'The bird tried new ways to build its nest until it finally stayed in the tree.', answer: 'word' },
        { text: 'Zara kept pushing the door marked "PULL" and wouldn’t try pulling it.', answer: 'versus' },
      ],
    },
  },
  {
    id: 'consequence',
    week: 3,
    text: 'Consequence',
    pronunciation: 'KON-suh-kwens',
    partOfSpeech: 'noun',
    definition: 'Something that happens as a result of an action or decision',
    examples: [
      'One {consequence} of staying up late was feeling tired the next morning.',
      'A good {consequence} of practicing the piano is that you get better at playing.',
      'Spilling juice on the floor had a sticky {consequence}: ants came marching into the kitchen!',
      'One {consequence} of forgetting to save the game was starting the level all over again.',
    ],
    synonyms: ['result', 'effect'],
    antonyms: ['cause'],
    discussionPrompts: [
      'What is a good consequence of being kind to someone?',
      'Can a small choice have a big consequence? Give an example.',
    ],
    contexts: [
      'Your plant wilted because you forgot to water it.',
      'You got a muddy shirt after sliding down a wet hill.',
      'Your friend smiled after you shared your snack.',
    ],
    misconceptions: ['A plan for what to do next', 'A prize you win in a contest'],
    illustration: 'A long chain of colorful dominoes falling one after another.',
    stickerId: 'stk-consequence',
    discovery: {
      scene: 'One push makes a whole chain of dominoes fall down, one after another.',
      question: 'What is the consequence of pushing the first domino?',
      choices: ['All the other dominoes fall down', 'The dominoes turn into birds', 'Nothing happens at all'],
      explanation: 'The push is the action. All the falling dominoes are the result — the consequence!',
    },
    stories: [
      { context: 'dino', text: 'The T. rex stomped too hard and the ground shook. The {consequence} was that all the eggs rolled away!' },
      { context: 'arcade', text: 'Max jumped too early and fell into the lava pit. The {consequence} was losing a life.' },
      { context: 'everyday', text: 'Ella left her bike out in the rain. The {consequence} was a rusty chain.' },
      { context: 'space', text: 'The astronaut forgot to close the hatch. The {consequence} was that all the floating snacks drifted away.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Nico didn’t study his spelling words. As a {consequence}, he missed many words on the test.',
        question: 'What does "consequence" mean in this story?',
        options: ['Something that happens because of what you did', 'A kind of test', 'A reason to celebrate'],
        explanation: 'Missing words happened because Nico didn’t study. It was the result — the consequence.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "consequence" correctly?',
        options: [
          'A consequence of eating too much candy can be a tummy ache.',
          'I put a consequence on my sandwich.',
          'The consequence bird flew over the lake.',
        ],
        explanation: 'A tummy ache is a result of eating too much candy.',
      },
      {
        kind: 'character',
        passage: 'Mom said, "If you leave your toys on the stairs, someone could trip. Think about the {consequences}."',
        question: 'What did Mom probably mean?',
        options: ['Think about what could happen because of your choice', 'Think about your favorite toy', 'Think about dinner'],
        explanation: 'Mom wanted her child to think about the results of leaving toys out.',
      },
    ],
    quizItems: [
      {
        prompt: 'Jade forgot her lunch at home. Which is a consequence?',
        options: ['She was hungry at lunchtime', 'She loves sandwiches', 'She has a red backpack'],
        explanation: 'Being hungry happened because she forgot her lunch — that’s a consequence.',
      },
      {
        prompt: 'What consequence might follow if a dragon ate all the food in a village?',
        options: ['The villagers would have nothing to eat', 'The dragon would turn invisible', 'The village would grow taller'],
        explanation: 'If the food is all gone, the villagers would have nothing to eat. That is a result of the dragon’s action.',
      },
      {
        prompt: 'Which pair shows an action and its consequence?',
        options: [
          'Leaving the freezer open → the ice cream melts',
          'Blue sky → green grass',
          'Monday → Tuesday',
        ],
        explanation: 'The ice cream melts BECAUSE the freezer was left open.',
      },
      {
        prompt: 'Which word means almost the SAME as consequence?',
        options: ['Result', 'Beginning', 'Question'],
        explanation: 'A consequence is a result of an action.',
      },
    ],
    creativePrompts: [
      'What consequence might follow if a dragon ate all the food in a village?',
      'Imagine you could fly for one day. What are two consequences — one good and one tricky?',
    ],
    nuance: {
      versus: 'punishment',
      versusDefinition: 'Something unpleasant given to someone for doing something wrong',
      explanation:
        'A consequence is ANY result of an action — it can be good or bad! A punishment is only given when someone does something wrong.',
      sentences: [
        { text: 'Because Leo practiced every day, he scored a goal in the big game.', answer: 'word' },
        { text: 'Because Leo threw sand, he had to sit out of recess.', answer: 'versus' },
        { text: 'Because the sun came out, the snowman melted.', answer: 'word' },
      ],
    },
  },
];
