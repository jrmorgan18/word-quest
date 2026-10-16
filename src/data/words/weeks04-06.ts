import type { Word } from '../types';

export const WORDS_04_06: Word[] = [
  // ───────────────────────────── Week 4 ─────────────────────────────
  {
    id: 'cautious',
    week: 4,
    text: 'Cautious',
    pronunciation: 'KAW-shus',
    partOfSpeech: 'adjective',
    definition: 'Careful to avoid danger or mistakes',
    examples: [
      'The {cautious} hiker tested each rock before stepping on it.',
      'Be {cautious} when you carry a full bowl of soup so it doesn’t spill.',
      'The {cautious} deer looked all around before stepping into the meadow.',
      'The {cautious} astronaut checked her helmet twice before going outside the station.',
    ],
    synonyms: ['careful', 'watchful'],
    antonyms: ['reckless'],
    discussionPrompts: [
      'When is it important to be cautious?',
      'Can someone be too cautious? What might they miss out on?',
    ],
    contexts: [
      'Looking both ways twice before crossing the street.',
      'Walking slowly across an icy sidewalk so you don’t slip.',
      'Holding the railing tightly while going down steep stairs.',
    ],
    misconceptions: ['Feeling very proud of yourself', 'Moving as fast as you can'],
    wordFamily: [
      { form: 'caution', partOfSpeech: 'noun', example: 'The sign said, "Use {caution}: wet floor."' },
      { form: 'cautiously', partOfSpeech: 'adverb', example: 'The kitten {cautiously} sniffed the new toy.' },
    ],
    illustration: 'A careful orange dinosaur tiptoeing across stepping stones over a bubbling lava river.',
    stickerId: 'stk-cautious',
    discovery: {
      scene: 'A dinosaur tiptoes across stepping stones over bubbling lava.',
      question: 'Why is this dinosaur being cautious?',
      choices: [
        'It is moving carefully so it won’t fall into the lava',
        'It wants to go swimming in the lava',
        'It is racing to win a prize',
      ],
      explanation: 'The dino steps slowly and carefully to stay safe. That is cautious!',
    },
    stories: [
      { context: 'space', text: 'The rover drove slowly around the giant crater so it wouldn’t tip over. It was a {cautious} driver.' },
      { context: 'arcade', text: 'The bridge in level six had loose boards, so Ana made her hero jump very carefully. She was {cautious}.' },
      { context: 'sports', text: 'The {cautious} rock climber checked her rope and helmet before every climb.' },
      { context: 'everyday', text: 'Grandma was {cautious} with the sharp knife and cut the apple very slowly.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The mouse peeked out of its hole. It looked left, then right, then left again. The {cautious} mouse wanted to make sure the cat was gone.',
        question: 'What does "cautious" mean in this story?',
        options: ['Careful to stay safe', 'Very hungry', 'Sleepy and slow'],
        explanation: 'The mouse checked carefully for danger before coming out. That is cautious.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "cautious" correctly?',
        options: [
          'Dad was cautious as he carried the tall stack of plates.',
          'The cautious song was very loud.',
          'I cautious my homework every night.',
        ],
        explanation: 'Carrying plates carefully so they don’t fall is being cautious.',
      },
      {
        kind: 'character',
        passage: 'At the edge of the frozen pond, the park ranger said, "Let’s be {cautious}. The ice might be thin."',
        question: 'What did the ranger probably mean?',
        options: ['Be careful because there might be danger', 'Hurry onto the ice', 'Go get some hot cocoa'],
        explanation: 'Thin ice is dangerous, so the ranger wanted everyone to be careful.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is being cautious?',
        options: [
          'Lucy, who puts on her helmet and checks her brakes before riding',
          'Jake, who rides down the hill with no hands',
          'Mo, who is eating a cookie',
        ],
        explanation: 'Lucy is careful to avoid danger. That is being cautious.',
      },
      {
        prompt: 'A space explorer lands on a planet with strange purple plants. What would a cautious explorer do?',
        options: ['Look closely before touching anything', 'Eat the plants right away', 'Run through the plants'],
        explanation: 'Cautious means careful to avoid danger or mistakes.',
      },
      {
        prompt: 'Which word is the OPPOSITE of cautious?',
        options: ['Reckless', 'Careful', 'Alert'],
        explanation: 'Reckless means not careful about danger — the opposite of cautious.',
      },
      {
        prompt: 'Why would a cautious baker read the recipe twice?',
        options: ['To avoid making a mistake', 'Because she forgot how to read', 'To make the cake taste worse'],
        explanation: 'Being cautious helps you avoid mistakes.',
      },
    ],
    creativePrompts: [
      'Invent a cautious dinosaur. What does it do every morning to stay safe?',
      'You are exploring a spooky castle. Tell three cautious things you would do.',
    ],
    nuance: {
      versus: 'scared',
      versusDefinition: 'Feeling afraid',
      explanation: 'A scared person feels afraid. A cautious person is being careful — they might feel calm and just be smart about danger.',
      sentences: [
        { text: 'Nia calmly checked the ladder to make sure it was steady before climbing.', answer: 'word' },
        { text: 'Nia screamed and hid when the thunder boomed.', answer: 'versus' },
        { text: 'The chef wore oven mitts so she wouldn’t burn her hands.', answer: 'word' },
      ],
    },
  },
  {
    id: 'persuade',
    week: 4,
    text: 'Persuade',
    pronunciation: 'per-SWADE',
    partOfSpeech: 'verb',
    definition: 'To convince someone to do or believe something',
    examples: [
      'Lily tried to {persuade} her parents to get a puppy.',
      'The poster was made to {persuade} people to recycle their bottles.',
      'Jamal {persuaded} his little sister to try the strawberries by telling her they tasted like candy.',
      'The class {persuaded} the principal to plant a garden by showing her a plan.',
    ],
    synonyms: ['convince', 'coax'],
    antonyms: ['discourage'],
    discussionPrompts: [
      'How would you persuade your family to visit a dinosaur museum?',
      'What makes a good reason when you are trying to persuade someone?',
    ],
    contexts: [
      'Giving three good reasons why your class should get a pet fish.',
      'Talking your friend into trying a new game by telling them how fun it is.',
      'Making a poster that convinces people to pick up litter.',
    ],
    misconceptions: ['To chase someone around', 'To agree with everything someone says'],
    wordFamily: [
      { form: 'persuasive', partOfSpeech: 'adjective', example: 'Ana wrote a {persuasive} letter asking for longer recess.' },
      { form: 'persuasion', partOfSpeech: 'noun', example: 'With a little {persuasion}, Dad agreed to make pancakes.' },
    ],
    illustration: 'A cheerful little alien holding up a sign that says "PLEASE?" with puppy-dog eyes.',
    stickerId: 'stk-persuade',
    discovery: {
      scene: 'A little alien holds a sign that says "PLEASE?" and gives good reasons to visit its planet.',
      question: 'How is the alien trying to persuade its friends?',
      choices: [
        'By giving reasons so they will want to visit',
        'By hiding from its friends',
        'By falling asleep',
      ],
      explanation: 'The alien is using reasons to change its friends’ minds. That is persuading!',
    },
    stories: [
      { context: 'dino', text: 'The little stegosaurus wanted to swim, so she told her friends how cool the lake was. She {persuaded} them to come along.' },
      { context: 'school', text: 'Oliver gave great reasons for a class movie day. He {persuaded} the teacher to say yes!' },
      { context: 'arcade', text: 'The knight wanted to cross the bridge, so he {persuaded} the troll by offering it a shiny coin.' },
      { context: 'everyday', text: 'It took a while, but Mia finally {persuaded} her brother to share the last piece of pizza.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Zoe wanted to stay at the park longer. She told her mom, "We can watch the sunset and I’ll help make dinner!" Her reasons {persuaded} Mom to stay.',
        question: 'What does "persuaded" mean in this story?',
        options: ['Convinced someone with reasons', 'Ran very fast', 'Forgot to do something'],
        explanation: 'Zoe’s reasons changed Mom’s mind. That is persuading.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "persuade" correctly?',
        options: [
          'Can I persuade you to play tag with me?',
          'The persuade cloud floated by.',
          'I persuaded my socks on my feet.',
        ],
        explanation: 'Asking to convince someone to play is using persuade correctly.',
      },
      {
        kind: 'character',
        passage: 'The salesperson smiled and said, "Let me {persuade} you. This bike is fast, safe, AND comes in purple!"',
        question: 'What did the salesperson probably mean?',
        options: ['Let me convince you to want this bike', 'Let me take your bike away', 'Let me paint your bike'],
        explanation: 'The salesperson was giving reasons to convince the customer.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is trying to persuade someone?',
        options: [
          'Ravi, who says, "Let’s build a fort! It will be cozy, and we can read in it."',
          'Ella, who is quietly drawing',
          'Sam, who is brushing his teeth',
        ],
        explanation: 'Ravi gives reasons to convince someone to build a fort.',
      },
      {
        prompt: 'The robot wanted the astronauts to fix its antenna. Which would best persuade them?',
        options: [
          'Explaining that a fixed antenna will help everyone talk to Earth',
          'Beeping loudly and spinning in circles',
          'Rolling away and hiding',
        ],
        explanation: 'Giving good reasons is the best way to persuade.',
      },
      {
        prompt: 'Which word means almost the SAME as persuade?',
        options: ['Convince', 'Forget', 'Whisper'],
        explanation: 'To persuade means to convince someone.',
      },
      {
        prompt: 'If an ad tries to persuade you, what does it want?',
        options: ['It wants you to believe or buy something', 'It wants you to fall asleep', 'It wants you to sing'],
        explanation: 'Ads try to convince people — they persuade.',
      },
    ],
    creativePrompts: [
      'Persuade a dragon to stop scaring the village. What would you say?',
      'Give three reasons to persuade your family to go on an adventure this weekend.',
    ],
    nuance: {
      versus: 'force',
      versusDefinition: 'To make someone do something even if they don’t want to',
      explanation: 'When you persuade, the other person chooses to agree because of your reasons. Forcing someone gives them no choice.',
      sentences: [
        { text: 'Kim explained why the beach would be fun, and her friend decided to come.', answer: 'word' },
        { text: 'The big kid grabbed the ball and made everyone play his game.', answer: 'versus' },
        { text: 'After hearing how tasty it was, Grandpa agreed to try the mango.', answer: 'word' },
      ],
    },
  },
  {
    id: 'remarkable',
    week: 4,
    text: 'Remarkable',
    pronunciation: 'rih-MAR-kuh-bul',
    partOfSpeech: 'adjective',
    definition: 'Unusual or impressive enough to deserve attention',
    examples: [
      'The magician did a {remarkable} trick that made a bird appear from a hat.',
      'It is {remarkable} that hummingbirds can fly backward.',
      'Mia made a {remarkable} recovery and was back on the soccer field in a week.',
      'The rocket made a {remarkable} journey all the way to the edge of the solar system.',
    ],
    synonyms: ['impressive', 'extraordinary'],
    antonyms: ['ordinary'],
    discussionPrompts: [
      'What is a remarkable animal? What makes it remarkable?',
      'What remarkable thing would you like to do someday?',
    ],
    contexts: [
      'A seven-year-old building a robot that can water plants.',
      'A tiny frog that can jump twenty times its own length.',
      'A snowstorm that leaves snow taller than a house.',
    ],
    misconceptions: ['Written with a marker', 'Boring and easy to forget'],
    wordFamily: [
      { form: 'remark', partOfSpeech: 'noun', example: 'The coach made a kind {remark} about my kicking.' },
      { form: 'remarkably', partOfSpeech: 'adverb', example: 'The puppy was {remarkably} calm at the vet.' },
    ],
    illustration: 'A shining dinosaur egg sparkling with rainbow colors.',
    stickerId: 'stk-remarkable',
    discovery: {
      scene: 'A dinosaur egg glows with rainbow sparkles. Everyone stops to look!',
      question: 'Why is this egg remarkable?',
      choices: [
        'It is so unusual and amazing that everyone notices it',
        'It looks just like every other egg',
        'It is too small to see',
      ],
      explanation: 'A rainbow-glowing egg is impressive and deserves attention. That’s remarkable!',
    },
    stories: [
      { context: 'space', text: 'The astronaut discovered a planet with seven moons! It was a {remarkable} find.' },
      { context: 'sports', text: 'Kayla scored three goals in one game. It was a {remarkable} performance.' },
      { context: 'dino', text: 'The fossil hunters dug up a dinosaur skeleton as long as a school bus. What a {remarkable} discovery!' },
      { context: 'arcade', text: 'Sam finished the whole game without losing a single life. Everyone said it was {remarkable}.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The old oak tree in the park is more than 300 years old. Visitors come from far away to see this {remarkable} tree.',
        question: 'What does "remarkable" mean in this story?',
        options: ['Special enough that people want to notice it', 'Covered in leaves', 'Very young'],
        explanation: 'People travel far to see it because it is special. That is remarkable.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "remarkable" correctly?',
        options: [
          'The dog that can skateboard is truly remarkable.',
          'I remarkable my name on the paper.',
          'This plain cracker is the most remarkable thing ever because it is plain.',
        ],
        explanation: 'A skateboarding dog is impressive and unusual — remarkable!',
      },
      {
        kind: 'character',
        passage: 'After hearing the young cellist play, the teacher whispered, "That was {remarkable}."',
        question: 'What did the teacher probably mean?',
        options: ['The music was impressive and special', 'The music was too quiet', 'The music was boring'],
        explanation: 'The teacher was impressed by the playing.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which of these is the most remarkable?',
        options: ['A parrot that can say 100 words', 'A cat sleeping on a chair', 'A spoon in a drawer'],
        explanation: 'A parrot saying 100 words is unusual and impressive.',
      },
      {
        prompt: 'The newspaper wrote about a remarkable girl. What did she probably do?',
        options: ['Something impressive that people wanted to know about', 'Eat breakfast', 'Tie her shoes'],
        explanation: 'Remarkable things are impressive enough to deserve attention.',
      },
      {
        prompt: 'Which word means almost the SAME as remarkable?',
        options: ['Extraordinary', 'Ordinary', 'Tiny'],
        explanation: 'Extraordinary and remarkable both mean unusually impressive.',
      },
      {
        prompt: 'Why might a scientist call a fossil remarkable?',
        options: ['Because it is rare and teaches something new', 'Because it is just like all the others', 'Because it is dirty'],
        explanation: 'Remarkable things stand out and deserve attention.',
      },
    ],
    creativePrompts: [
      'Invent a remarkable robot. What can it do that no other robot can?',
      'Tell about something remarkable you saw in nature.',
    ],
    nuance: {
      versus: 'peculiar',
      versusDefinition: 'Strange or unusual',
      explanation: 'Both words mean unusual. Remarkable usually means impressive in a good way. Peculiar just means strange.',
      sentences: [
        { text: 'The gymnast did a perfect triple flip and everyone cheered.', answer: 'word' },
        { text: 'There was a strange smell, like pickles and perfume, coming from the closet.', answer: 'versus' },
        { text: 'The young pianist played a hard song perfectly at her first concert.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 5 ─────────────────────────────
  {
    id: 'scarce',
    week: 5,
    text: 'Scarce',
    pronunciation: 'SKAIRS',
    partOfSpeech: 'adjective',
    definition: 'Hard to find because there isn’t much available',
    examples: [
      'Water is {scarce} in the desert, so camels store energy in their humps.',
      'By the end of the party, cupcakes were {scarce}, and only two were left.',
      'Food becomes {scarce} for many animals in the winter.',
      'Gold coins were {scarce} in the last level, so every coin mattered.',
    ],
    synonyms: ['rare', 'limited'],
    antonyms: ['plentiful'],
    discussionPrompts: [
      'What would you do if water became scarce in your town?',
      'Why do things that are scarce sometimes seem more valuable?',
    ],
    contexts: [
      'Only one snack left in the whole pantry.',
      'A plant that grows in just one valley in the whole world.',
      'Hardly any seats left on the bus.',
    ],
    misconceptions: ['Scary and frightening', 'Something there is a lot of'],
    wordFamily: [
      { form: 'scarcely', partOfSpeech: 'adverb', example: 'There was {scarcely} any milk left for my cereal.' },
      { form: 'scarcity', partOfSpeech: 'noun', example: 'The {scarcity} of rain made the crops thirsty.' },
    ],
    illustration: 'An open treasure chest with just one lonely gem inside.',
    stickerId: 'stk-scarce',
    discovery: {
      scene: 'A big treasure chest is open… but only ONE gem is left inside.',
      question: 'Why are gems scarce in this chest?',
      choices: [
        'There are hardly any left, so they are hard to find',
        'The chest is overflowing with gems',
        'The gems are scary',
      ],
      explanation: 'Only one gem is left. When there isn’t much of something, it is scarce!',
    },
    stories: [
      { context: 'space', text: 'On the space station, fresh fruit was {scarce}, so the astronauts shared each apple.' },
      { context: 'dino', text: 'During the long dry season, leaves were {scarce}, and the hungry dinosaurs had to search for food.' },
      { context: 'everyday', text: 'After the big storm, flashlights were {scarce} at the store because everyone wanted one.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The explorers had only a few drops of water left. Because water was {scarce}, they took only tiny sips.',
        question: 'What does "scarce" mean in this story?',
        options: ['There was not much of it', 'It was very cold', 'It tasted bad'],
        explanation: 'Only a few drops were left, so water was hard to find — scarce.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "scarce" correctly?',
        options: [
          'Parking spots are scarce at the busy mall on Saturdays.',
          'The movie was so scarce that I hid under a blanket.',
          'There were thousands of scarce leaves all over the yard.',
        ],
        explanation: 'Hardly any parking spots means they are scarce. Watch out — scarce is not the same as scary!',
      },
      {
        kind: 'character',
        passage: 'The baker frowned. "Eggs are {scarce} this week. I can only make one cake."',
        question: 'What did the baker probably mean?',
        options: ['She doesn’t have many eggs', 'The eggs are scary', 'She has too many eggs'],
        explanation: 'She can only make one cake because she doesn’t have many eggs.',
      },
    ],
    quizItems: [
      {
        prompt: 'In which place would trees be scarce?',
        options: ['A sandy desert', 'A rainforest', 'A big park'],
        explanation: 'Deserts have very few trees, so trees are scarce there.',
      },
      {
        prompt: 'A pirate crew had only one barrel of food left for a long trip. What was scarce?',
        options: ['Food', 'Water in the ocean', 'Wind'],
        explanation: 'There was very little food, so food was scarce.',
      },
      {
        prompt: 'Which word is the OPPOSITE of scarce?',
        options: ['Plentiful', 'Rare', 'Limited'],
        explanation: 'Plentiful means there is a lot — the opposite of scarce.',
      },
      {
        prompt: 'Why might tickets to a popular show become scarce?',
        options: ['Because so many people bought them that few are left', 'Because nobody wants them', 'Because they are free'],
        explanation: 'When most are gone, the rest are hard to find — scarce.',
      },
    ],
    creativePrompts: [
      'Imagine chocolate became scarce all over the world. What would happen?',
      'You are an astronaut and oxygen is getting scarce. What is your plan?',
    ],
    nuance: {
      versus: 'scary',
      versusDefinition: 'Making you feel afraid',
      explanation: 'Scarce and scary sound alike but mean different things! Scarce means there isn’t much. Scary means frightening.',
      sentences: [
        { text: 'There were only two crayons left in the whole box.', answer: 'word' },
        { text: 'The haunted house had spooky noises and creaky doors.', answer: 'versus' },
        { text: 'Rain hardly ever falls in that dry valley.', answer: 'word' },
      ],
    },
  },
  {
    id: 'essential',
    week: 5,
    text: 'Essential',
    pronunciation: 'ih-SEN-shul',
    partOfSpeech: 'adjective',
    definition: 'Absolutely necessary or very important',
    examples: [
      'Water is {essential} for all living things.',
      'A helmet is {essential} when you ride your bike.',
      'Sleep is {essential} for a healthy body and brain.',
      'A map was {essential} for finding the hidden treasure.',
    ],
    synonyms: ['necessary', 'vital'],
    antonyms: ['unnecessary'],
    discussionPrompts: [
      'What are three essential things to pack for a camping trip?',
      'What is something you like that is NOT essential?',
    ],
    contexts: [
      'Bringing an oxygen tank when diving deep underwater.',
      'Plants needing sunlight to grow.',
      'Needing a key to open a locked door.',
    ],
    misconceptions: ['Extra and not needed', 'Smelling very nice'],
    wordFamily: [
      { form: 'essentials', partOfSpeech: 'noun', example: 'We packed the {essentials}: water, snacks, and a flashlight.' },
      { form: 'essentially', partOfSpeech: 'adverb', example: 'A tadpole is {essentially} a baby frog.' },
    ],
    illustration: 'A shiny astronaut helmet with an oxygen tank and a little heart symbol.',
    stickerId: 'stk-essential',
    discovery: {
      scene: 'An astronaut can’t go into space without a helmet full of air.',
      question: 'Why is the helmet essential for the astronaut?',
      choices: [
        'She absolutely needs it to breathe in space',
        'It is just for decoration',
        'It makes her look taller',
      ],
      explanation: 'Without air, she can’t survive in space. The helmet is absolutely necessary — essential!',
    },
    stories: [
      { context: 'sports', text: 'Before the soccer game, Coach said that drinking water was {essential} on such a hot day.' },
      { context: 'dino', text: 'For the baby dinosaurs, staying close to their mother was {essential} for staying safe.' },
      { context: 'arcade', text: 'The magic key was {essential}. Without it, nobody could open the castle door.' },
      { context: 'school', text: 'A pencil is {essential} for taking a spelling test.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The recipe said that flour was {essential}. Without flour, the cookies would just be a gooey puddle.',
        question: 'What does "essential" mean in this story?',
        options: ['Absolutely needed', 'Tasty', 'Optional'],
        explanation: 'Without flour the cookies wouldn’t work, so flour is absolutely needed — essential.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "essential" correctly?',
        options: [
          'Sunscreen is essential on a long, sunny day at the beach.',
          'Glitter is essential for breathing.',
          'The essential cat jumped off the couch and went to sleep.',
        ],
        explanation: 'On a long, sunny day, sunscreen is really important to protect your skin.',
      },
      {
        kind: 'character',
        passage: 'The pilot said, "Fuel is {essential}. We can’t take off without it."',
        question: 'What did the pilot probably mean?',
        options: ['The plane absolutely needs fuel', 'Fuel is a nice extra', 'Fuel is too heavy'],
        explanation: 'The plane can’t fly without fuel, so it is essential.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which item is essential for a fish?',
        options: ['Water', 'A tiny hat', 'A toy castle'],
        explanation: 'A fish absolutely needs water to live.',
      },
      {
        prompt: 'An explorer is packing for a hike in the desert. Which item is most essential?',
        options: ['Plenty of water', 'A video game', 'A fancy scarf'],
        explanation: 'In the desert, water is absolutely necessary.',
      },
      {
        prompt: 'Which word means almost the SAME as essential?',
        options: ['Necessary', 'Extra', 'Silly'],
        explanation: 'Essential and necessary both mean really needed.',
      },
      {
        prompt: 'Mia says ice cream is essential for her birthday party. Is ice cream truly essential to have a party?',
        options: ['No — it’s fun, but the party can happen without it', 'Yes — no one can have a party without ice cream', 'Yes — ice cream helps you breathe'],
        explanation: 'Something truly essential is absolutely necessary. A party can still happen without ice cream!',
      },
    ],
    creativePrompts: [
      'You are building a base on Mars. What five things are essential?',
      'What is essential for being a good friend?',
    ],
    nuance: {
      versus: 'nice to have',
      versusDefinition: 'Something you like but could live without',
      explanation: 'Essential things are absolutely needed. Some things are just nice to have — fun, but not necessary.',
      sentences: [
        { text: 'A car needs wheels to drive.', answer: 'word' },
        { text: 'Stickers on a car make it look fun.', answer: 'versus' },
        { text: 'People need food to stay alive.', answer: 'word' },
      ],
    },
  },
  {
    id: 'investigate',
    week: 5,
    text: 'Investigate',
    pronunciation: 'in-VES-tih-gate',
    partOfSpeech: 'verb',
    definition: 'To search carefully for information or answers',
    examples: [
      'The detective came to {investigate} the missing cookies.',
      'Scientists {investigate} why some frogs can change color.',
      'We heard a thump in the garage, so Dad went to {investigate}.',
      'The space crew landed on the moon to {investigate} a strange glowing rock.',
    ],
    synonyms: ['explore', 'research'],
    antonyms: ['disregard'],
    discussionPrompts: [
      'If something in your house went missing, how would you investigate?',
      'What mystery in nature would you like to investigate?',
    ],
    contexts: [
      'Following muddy paw prints to find out where the dog went.',
      'Asking questions and reading books to learn why the sky is blue.',
      'Looking for clues to discover who left a surprise note on your desk.',
    ],
    misconceptions: ['To make up a story that isn’t true', 'To hide something away'],
    wordFamily: [
      { form: 'investigation', partOfSpeech: 'noun', example: 'The {investigation} showed that the hamster had escaped.' },
      { form: 'investigator', partOfSpeech: 'noun', example: 'The {investigator} found a footprint by the window.' },
    ],
    illustration: 'A detective dinosaur in a hat holding a big magnifying glass.',
    stickerId: 'stk-investigate',
    discovery: {
      scene: 'A detective dinosaur follows footprints with a magnifying glass.',
      question: 'How is the dinosaur investigating?',
      choices: [
        'It is searching carefully for clues to find an answer',
        'It is taking a nap in the sun',
        'It is hiding the footprints',
      ],
      explanation: 'Searching carefully for clues and answers is what investigating means!',
    },
    stories: [
      { context: 'space', text: 'A strange signal came from the dark side of the moon, so the astronauts flew there to {investigate}.' },
      { context: 'everyday', text: 'Mom found crumbs on the couch and decided to {investigate} who had been eating there.' },
      { context: 'arcade', text: 'The hero heard a noise behind the secret wall and went to {investigate}. She found a hidden room!' },
      { context: 'school', text: 'Our class will {investigate} which paper airplane design flies the farthest.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'The garden tomatoes kept disappearing. Lena set up a camera to {investigate}. The next morning, she saw a raccoon on the video!',
        question: 'What does "investigate" mean in this story?',
        options: ['Search carefully to find out the answer', 'Grow more tomatoes', 'Go to sleep'],
        explanation: 'Lena used a camera to find out what was happening. That is investigating.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "investigate" correctly?',
        options: [
          'Scientists will investigate why the lake turned green.',
          'I investigated my sandwich into my mouth.',
          'The investigate puppy barked.',
        ],
        explanation: 'Scientists searching for an answer about the lake are investigating.',
      },
      {
        kind: 'character',
        passage: 'When the cookie jar was empty, Grandma put on her glasses and said, "Hmm, I think I need to {investigate}."',
        question: 'What did Grandma probably mean?',
        options: ['She was going to look for clues to find out what happened', 'She was going to bake more cookies', 'She wanted to take a nap'],
        explanation: 'Grandma wanted to search for clues about the missing cookies.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which kid is investigating?',
        options: [
          'Ben, who checks every room and asks questions to find his missing shoe',
          'Ava, who is eating lunch',
          'Leo, who is singing in the bath',
        ],
        explanation: 'Ben is searching carefully for an answer. That is investigating.',
      },
      {
        prompt: 'A robot detective finds a broken window. What would it do to investigate?',
        options: ['Look for clues like footprints and fingerprints', 'Go home and charge its battery', 'Paint the window'],
        explanation: 'Investigating means searching carefully for information.',
      },
      {
        prompt: 'Which word means almost the SAME as investigate?',
        options: ['Explore', 'Ignore', 'Celebrate'],
        explanation: 'Explore and investigate both involve searching to find out more.',
      },
      {
        prompt: 'Why do scientists investigate?',
        options: ['To find answers to questions', 'To make things up', 'To hide information'],
        explanation: 'Scientists investigate to find out what is true.',
      },
    ],
    creativePrompts: [
      'A mysterious green glow is coming from under your bed. How will you investigate?',
      'Invent a detective animal. What mystery does it investigate?',
    ],
    nuance: {
      versus: 'guess',
      versusDefinition: 'To give an answer without checking',
      explanation: 'When you guess, you just pick an answer. When you investigate, you search for clues to find the real answer.',
      sentences: [
        { text: 'Kim checked the footprints and the open window to figure out who took the cake.', answer: 'word' },
        { text: 'Kim said, "I bet the dog took it," without looking at anything.', answer: 'versus' },
        { text: 'The scientists tested the water in ten places to learn why the fish were sick.', answer: 'word' },
      ],
    },
  },

  // ───────────────────────────── Week 6 ─────────────────────────────
  {
    id: 'vivid',
    week: 6,
    text: 'Vivid',
    pronunciation: 'VIV-id',
    partOfSpeech: 'adjective',
    definition: 'Very clear, bright, or detailed',
    examples: [
      'The parrot had {vivid} red and blue feathers.',
      'Mia had a {vivid} dream about riding a dragon over the ocean.',
      'The author used {vivid} words, so I could picture the castle in my mind.',
      'The sunset painted the sky in {vivid} shades of orange and pink.',
    ],
    synonyms: ['bright', 'colorful'],
    antonyms: ['dull'],
    discussionPrompts: [
      'Describe a vivid memory you have from a vacation or special day.',
      'How can you make your writing more vivid?',
    ],
    contexts: [
      'A rainbow with colors so bright they almost glow.',
      'Remembering every detail of your best birthday party, like the cake’s frosting and the songs.',
      'A painting full of bold, bright colors that catch your eye.',
    ],
    misconceptions: ['Blurry and hard to see', 'Very quiet'],
    wordFamily: [
      { form: 'vividly', partOfSpeech: 'adverb', example: 'I {vividly} remember the first time I saw the ocean.' },
    ],
    illustration: 'A paint palette splashing bright, bold rainbow colors.',
    stickerId: 'stk-vivid',
    discovery: {
      scene: 'A paint palette bursts with bright, bold rainbow colors.',
      question: 'Why would you call these colors vivid?',
      choices: ['They are very bright and clear', 'They are gray and faded', 'They are invisible'],
      explanation: 'Bright, bold, clear colors are vivid!',
    },
    stories: [
      { context: 'space', text: 'From the spaceship window, the astronauts saw a {vivid} purple and green glow dancing over Earth.' },
      { context: 'arcade', text: 'The new game had {vivid} graphics, with bright colors and sharp details.' },
      { context: 'school', text: 'Ella’s story was so {vivid} that the class could almost smell the cookies she described.' },
      { context: 'dino', text: 'The museum’s dinosaur mural was painted in {vivid} greens and oranges.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'Grandpa told a {vivid} story about his trip to the jungle. He described the screeching monkeys, the giant leaves, and the smell of rain so well that I felt like I was there.',
        question: 'What does "vivid" mean in this story?',
        options: ['Full of clear details', 'Very short', 'Hard to understand'],
        explanation: 'The story had so many clear details that it felt real. That is vivid.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "vivid" correctly?',
        options: [
          'The flower garden was full of vivid yellow and pink tulips.',
          'I vivid my bike around the block.',
          'The fog made everything vivid and hard to see.',
        ],
        explanation: 'Bright yellow and pink tulips are vivid. Fog makes things hard to see — the opposite!',
      },
      {
        kind: 'character',
        passage: 'After watching the fireworks, Max said, "I’ll never forget that. It was so {vivid}!"',
        question: 'What did Max probably mean?',
        options: ['The fireworks were bright and clear in his memory', 'The fireworks were boring', 'He couldn’t see the fireworks'],
        explanation: 'Max meant the fireworks were bright, clear, and easy to remember.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which of these is the most vivid?',
        options: ['A bright orange tiger in green grass', 'A faded gray photo', 'A foggy window'],
        explanation: 'Bright, clear colors are vivid.',
      },
      {
        prompt: 'Which sentence is more vivid?',
        options: ['The red dragon roared and blew sparkling blue flames.', 'The dragon was there.', 'It did a thing.'],
        explanation: 'Vivid writing gives clear, bright details.',
      },
      {
        prompt: 'Which word is the OPPOSITE of vivid?',
        options: ['Dull', 'Bright', 'Colorful'],
        explanation: 'Dull means not bright — the opposite of vivid.',
      },
      {
        prompt: 'If you have a vivid memory of a day at the zoo, what can you do?',
        options: ['Remember lots of clear details about it', 'Not remember it at all', 'Only remember that it was a day'],
        explanation: 'A vivid memory is clear and detailed.',
      },
    ],
    creativePrompts: [
      'Describe an alien planet using vivid words. What colors, sounds, and smells are there?',
      'Close your eyes and picture your favorite place. Describe it as vividly as you can.',
    ],
    nuance: {
      versus: 'loud',
      versusDefinition: 'Making a lot of noise',
      explanation: 'Vivid is about how clear or bright something is — usually colors, pictures, memories, or descriptions. Loud is about sound.',
      sentences: [
        { text: 'The butterfly’s wings were bright blue with shiny orange spots.', answer: 'word' },
        { text: 'The fire truck’s siren made everyone cover their ears.', answer: 'versus' },
        { text: 'I can picture every detail of the castle from the book.', answer: 'word' },
      ],
    },
  },
  {
    id: 'contrast',
    week: 6,
    text: 'Contrast',
    pronunciation: 'kun-TRAST',
    partOfSpeech: 'verb',
    definition: 'To show how two things are different',
    examples: [
      'Our teacher asked us to {contrast} frogs and toads.',
      'If you {contrast} summer and winter, you will notice big changes in the weather.',
      'The book {contrasts} life in the city with life on a farm.',
      'Let’s {contrast} the two robots to see which one is faster.',
    ],
    synonyms: ['differentiate', 'tell apart'],
    antonyms: ['match'],
    discussionPrompts: [
      'Contrast a cat and a dog. How are they different?',
      'How is your favorite food different from your least favorite? Contrast them!',
    ],
    contexts: [
      'Explaining how the hot desert is different from the icy Arctic.',
      'Pointing out that a dolphin breathes air while a shark uses gills.',
      'Making a chart that shows how a bike is different from a scooter.',
    ],
    misconceptions: ['To make two things exactly the same', 'To draw a picture with crayons'],
    wordFamily: [
      { form: 'contrasting', partOfSpeech: 'adjective', example: 'The {contrasting} black and white stripes make the zebra easy to spot.' },
    ],
    illustration: 'A round planet that is half sunny day and half starry night.',
    stickerId: 'stk-contrast',
    discovery: {
      scene: 'A planet is half bright day and half dark night.',
      question: 'How does this picture help you contrast day and night?',
      choices: [
        'It shows how day and night are different, side by side',
        'It shows that day and night are exactly the same',
        'It shows only a sunny day',
      ],
      explanation: 'Putting them side by side shows their differences. That’s contrasting!',
    },
    stories: [
      { context: 'dino', text: 'The scientist wanted to {contrast} the T. rex and the triceratops, so she listed how their teeth and bodies were different.' },
      { context: 'space', text: 'To {contrast} the two planets, the astronauts noticed that one was icy and blue while the other was hot and red.' },
      { context: 'school', text: 'Our class made a chart to {contrast} butterflies and moths.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'In science class, we had to {contrast} a rock and a sponge. The rock was hard and heavy. The sponge was soft and light.',
        question: 'What does "contrast" mean in this story?',
        options: ['Show how two things are different', 'Show how two things are the same', 'Throw two things away'],
        explanation: 'The class listed differences between the rock and the sponge. That’s contrasting.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "contrast" correctly?',
        options: [
          'Let’s contrast apples and oranges by looking at their peels and colors.',
          'Please contrast the cookie and eat it.',
          'The contrast puppy ran fast.',
        ],
        explanation: 'Looking at how apples and oranges differ is contrasting.',
      },
      {
        kind: 'character',
        passage: 'Mr. Lee held up two pictures and asked, "Can someone {contrast} these two castles for me?"',
        question: 'What did Mr. Lee probably mean?',
        options: ['Tell how the castles are different', 'Build a castle', 'Tell which castle you like best'],
        explanation: 'Mr. Lee wanted someone to explain the differences.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which sentence contrasts a turtle and a rabbit?',
        options: ['A turtle is slow, but a rabbit is fast.', 'A turtle and a rabbit are both animals.', 'A turtle likes to swim.'],
        explanation: 'Contrasting means showing how things are different.',
      },
      {
        prompt: 'An astronaut wants to contrast Earth and Mars. What should she talk about?',
        options: ['How the two planets are different', 'Only her favorite snack', 'How they are exactly the same'],
        explanation: 'Contrasting means showing differences.',
      },
      {
        prompt: 'Which word means the OPPOSITE of contrast?',
        options: ['Match', 'Differentiate', 'Separate'],
        explanation: 'To match means to be alike — the opposite of showing differences.',
      },
      {
        prompt: 'If your teacher asks you to contrast two books, what should you do?',
        options: ['Explain how the books are different', 'Read only the first page', 'Draw a picture of yourself'],
        explanation: 'To contrast means to show differences.',
      },
    ],
    creativePrompts: [
      'Contrast a dinosaur and a robot. Name three ways they are different.',
      'Contrast your morning and your bedtime. How do they feel different?',
    ],
    nuance: {
      versus: 'compare',
      versusDefinition: 'To look at how things are alike (and sometimes different)',
      explanation: 'When you compare, you often look for ways things are alike. When you contrast, you focus on how they are different.',
      sentences: [
        { text: 'A lemon is sour, but a strawberry is sweet.', answer: 'word' },
        { text: 'A lemon and a strawberry are both fruits that grow on plants.', answer: 'versus' },
        { text: 'Owls hunt at night, while eagles hunt during the day.', answer: 'word' },
      ],
    },
  },
  {
    id: 'adapt',
    week: 6,
    text: 'Adapt',
    pronunciation: 'uh-DAPT',
    partOfSpeech: 'verb',
    definition: 'To change to fit a new situation',
    examples: [
      'Polar bears have thick fur that helps them {adapt} to the freezing Arctic.',
      'When we moved to a new town, it took me a few weeks to {adapt} to my new school.',
      'The team {adapted} their plan when it started to rain during the game.',
      'Astronauts must {adapt} to floating around without gravity.',
    ],
    synonyms: ['adjust', 'change'],
    antonyms: ['resist'],
    discussionPrompts: [
      'How would you adapt if you suddenly had to live in the ocean?',
      'Tell about a time you had to adapt to something new.',
    ],
    contexts: [
      'Wearing a heavy coat and boots when you move from a warm place to a snowy one.',
      'Changing your game plan when it starts raining at the picnic.',
      'A cactus storing water so it can live in a dry desert.',
    ],
    misconceptions: ['To stay exactly the same no matter what', 'To add numbers together'],
    wordFamily: [
      { form: 'adaptation', partOfSpeech: 'noun', example: 'A giraffe’s long neck is an {adaptation} for reaching tall trees.' },
      { form: 'adaptable', partOfSpeech: 'adjective', example: 'Raccoons are {adaptable} and can live in forests or cities.' },
    ],
    illustration: 'A chameleon changing colors to match a rainbow branch.',
    stickerId: 'stk-adapt',
    discovery: {
      scene: 'A chameleon changes its colors to match the leaves around it.',
      question: 'How is the chameleon adapting?',
      choices: [
        'It changes to fit where it is',
        'It stays the same color everywhere',
        'It is falling asleep',
      ],
      explanation: 'The chameleon changes to fit its new surroundings. That’s adapting!',
    },
    stories: [
      { context: 'space', text: 'On the moon, the astronauts had to {adapt} by learning to walk in big, bouncy hops.' },
      { context: 'arcade', text: 'Level seven was underwater, so Maya had to {adapt} her moves to swim instead of jump.' },
      { context: 'sports', text: 'When the field was too muddy for soccer, the team had to {adapt} and play in the gym.' },
      { context: 'dino', text: 'When the weather got colder, some animals had to {adapt} by growing thicker fur.' },
    ],
    detective: [
      {
        kind: 'meaning',
        passage: 'At first, Lucas didn’t like wearing glasses. After a few days, he {adapted} and forgot he was even wearing them.',
        question: 'What does "adapted" mean in this story?',
        options: ['Got used to a change', 'Broke something', 'Forgot his glasses at home'],
        explanation: 'Lucas changed to fit his new situation and got used to his glasses. That’s adapting.',
      },
      {
        kind: 'usage',
        question: 'Which sentence uses "adapt" correctly?',
        options: [
          'Our puppy needed time to adapt to her new home.',
          'Please adapt the cookies on the plate.',
          'The adapt bird flew home.',
        ],
        explanation: 'A puppy getting used to a new home is adapting.',
      },
      {
        kind: 'character',
        passage: 'When the oven broke, the chef laughed and said, "No problem. We’ll {adapt}. Who wants cold sandwiches?"',
        question: 'What did the chef probably mean?',
        options: ['They will change their plan to fit the problem', 'They will give up and close', 'The oven was fine'],
        explanation: 'The chef was changing the plan to fit the new situation.',
      },
    ],
    quizItems: [
      {
        prompt: 'Which animal is adapting?',
        options: [
          'A bird that flies south when winter gets too cold',
          'A cat sleeping in the same spot every day',
          'A dog chasing its tail',
        ],
        explanation: 'The bird changes what it does to fit the cold season.',
      },
      {
        prompt: 'A robot built for the desert is sent to the snowy mountains. How could it adapt?',
        options: ['Grow wheels with snow chains to grip the ice', 'Keep doing everything exactly the same', 'Turn off forever'],
        explanation: 'Adapting means changing to fit a new situation.',
      },
      {
        prompt: 'Which word means almost the SAME as adapt?',
        options: ['Adjust', 'Repeat', 'Freeze'],
        explanation: 'Adjust and adapt both mean to change to fit.',
      },
      {
        prompt: 'A new kid in class doesn’t know the rules yet. What will help him adapt?',
        options: ['Learning the routines and making friends', 'Hiding in the closet', 'Going back to bed'],
        explanation: 'Learning new routines helps someone change to fit a new place.',
      },
    ],
    creativePrompts: [
      'Invent an animal that has adapted to live on a volcano. What special features does it have?',
      'Your family moves to the moon. How would you adapt?',
    ],
    nuance: {
      versus: 'adopt',
      versusDefinition: 'To take something or someone in as your own',
      explanation: 'Adapt and adopt sound alike! Adapt means to change to fit. Adopt means to take something as your own, like adopting a pet.',
      sentences: [
        { text: 'The penguins huddled together to stay warm in the icy wind.', answer: 'word' },
        { text: 'Our family brought home a kitten from the shelter to be our pet.', answer: 'versus' },
        { text: 'When school started earlier, Sam learned to go to bed earlier too.', answer: 'word' },
      ],
    },
  },
];
