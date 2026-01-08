import {
  BeatItemKind,
  ChoiceType,
  ContactStatus,
  type Campaign,
} from '../../../engine'

// Taylor's avatar - friendly college girl
const taylorAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#7c3aed"/>
  <circle cx="50" cy="38" r="18" fill="#fcd34d"/>
  <ellipse cx="50" cy="82" rx="28" ry="24" fill="#fcd34d"/>
  <circle cx="42" cy="36" r="3" fill="#1e1b4b"/>
  <circle cx="58" cy="36" r="3" fill="#1e1b4b"/>
  <path d="M 44 44 Q 50 48 56 44" stroke="#1e1b4b" stroke-width="2" fill="none"/>
</svg>
`)}`

// Taylor's mom avatar - older, warm
const lindaAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#059669"/>
  <circle cx="50" cy="38" r="18" fill="#d4a574"/>
  <ellipse cx="50" cy="82" rx="28" ry="24" fill="#d4a574"/>
  <circle cx="42" cy="36" r="2.5" fill="#1e3a29"/>
  <circle cx="58" cy="36" r="2.5" fill="#1e3a29"/>
  <path d="M 44 44 Q 50 46 56 44" stroke="#1e3a29" stroke-width="1.5" fill="none"/>
</svg>
`)}`

// Player avatar
const playerAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#0b84fe"/>
  <circle cx="50" cy="40" r="20" fill="#fff"/>
  <ellipse cx="50" cy="85" rx="30" ry="25" fill="#fff"/>
</svg>
`)}`

// Cover image - candle in darkness
const coverImage = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#1a0a0a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="70%" r="30%">
      <stop offset="0%" style="stop-color:#ff6b35;stop-opacity:0.4"/>
      <stop offset="100%" style="stop-color:#ff6b35;stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#bg)"/>
  <ellipse cx="200" cy="160" rx="60" ry="40" fill="url(#glow)"/>
  <rect x="195" y="120" width="10" height="40" fill="#f5f5dc"/>
  <ellipse cx="200" cy="115" rx="8" ry="12" fill="#ff6b35"/>
  <ellipse cx="200" cy="110" rx="4" ry="8" fill="#ffcc00"/>
  <text x="200" y="50" font-family="system-ui" font-size="24" fill="#3a1a1a" text-anchor="middle" font-weight="bold">THE MIDNIGHT GAME</text>
</svg>
`)}`

export const midnightGameCampaign: Campaign = {
  id: 'midnight-game',
  title: 'The Midnight Game',
  description:
    "11:47 PM. Your best friend Taylor texts you. She sounds scared. She needs you to play a game with her. Tonight. Before midnight.",
  coverImage,
  meta: {
    genre: ['Horror', 'Supernatural', 'Psychological'],
    duration: '15-20 min',
    rating: 'Mature',
    year: 2026,
    longDescription:
      "Taylor has always been the skeptic - the one who laughs at horror movies and mocks chain messages. So when she texts you late at night, terrified, begging you to play some old ritual game with her, you know something is very wrong. As you follow her increasingly strange instructions, you begin to wonder: is this really Taylor? And if it isn't... what have you invited into your home?",
  },
  protagonist: {
    id: 'player',
    name: 'Hazel',
    avatar: playerAvatar,
    age: 22,
    bio: 'College senior, sharing an apartment near campus. Taylor has been your best friend since freshman year.',
  },
  characters: [
    {
      id: 'taylor',
      name: 'Taylor',
      avatar: taylorAvatar,
    },
    {
      id: 'linda',
      name: 'Linda (Taylor\'s Mom)',
      avatar: lindaAvatar,
    },
  ],
  // Multi-chat mode
  conversations: [
    {
      id: 'taylor-chat',
      characterIds: ['taylor'],
      name: 'Taylor',
    },
    {
      id: 'linda-chat',
      characterIds: ['linda'],
      name: "Taylor's Mom",
    },
  ],
  startConversationId: 'taylor-chat',
  story: {
    start: 'Jan 10, 2026, 11:45 PM',
  },
  startBeatId: 'start',
  beats: {
    // ============================================
    // ACT 1: THE SETUP
    // ============================================
    start: {
      id: 'start',
      at: '11:47 PM',
      presenceChanges: {
        taylor: { status: ContactStatus.Online },
        linda: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-1',
          sender: 'taylor',
          content: 'hey',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-2',
          sender: 'taylor',
          content: 'you up?',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: "Yeah what's up?",
          nextBeatId: 'taylor-explains',
        },
        {
          id: 'choice-1b',
          text: "Barely. It's almost midnight lol",
          nextBeatId: 'taylor-explains',
        },
        {
          id: 'choice-1c',
          text: 'Tay? You okay?',
          nextBeatId: 'taylor-explains-worried',
        },
      ],
    },

    'taylor-explains': {
      id: 'taylor-explains',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-3',
          sender: 'taylor',
          content: 'i need you to do something with me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-4',
          sender: 'taylor',
          content: 'tonight',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-5',
          sender: 'taylor',
          content: 'before midnight',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'What is it?',
          nextBeatId: 'the-game-intro',
        },
        {
          id: 'choice-2b',
          text: "That's in like 10 minutes. What's going on?",
          nextBeatId: 'the-game-intro',
        },
      ],
    },

    'taylor-explains-worried': {
      id: 'taylor-explains-worried',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-6',
          sender: 'taylor',
          content: 'i need your help',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-7',
          sender: 'taylor',
          content: 'please',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-8',
          sender: 'taylor',
          content: 'i found this thing and i need someone to do it with me',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-9',
          sender: 'taylor',
          content: 'before midnight',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'What thing? Tay you sound scared',
          nextBeatId: 'the-game-intro',
        },
        {
          id: 'choice-3b',
          text: "Okay okay I'm here. What do you need?",
          nextBeatId: 'the-game-intro',
        },
      ],
    },

    'the-game-intro': {
      id: 'the-game-intro',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-10',
          sender: 'taylor',
          content: "it's called the midnight game",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-11',
          sender: 'taylor',
          content: 'its an old ritual',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-12',
          sender: 'taylor',
          content: "you have to do it exactly right or it doesn't work",
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-13',
          sender: 'taylor',
          content: 'please hazel',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-14',
          sender: 'taylor',
          content: 'i cant do it alone',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: "Taylor this isn't like you. What's really going on?",
          nextBeatId: 'taylor-deflects',
        },
        {
          id: 'choice-4b',
          text: "Okay fine. What do I need to do?",
          nextBeatId: 'first-instructions',
        },
        {
          id: 'choice-4c',
          text: "A ritual? Come on, you're the one who says this stuff is fake",
          nextBeatId: 'taylor-insists',
        },
      ],
    },

    'taylor-deflects': {
      id: 'taylor-deflects',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-15',
          sender: 'taylor',
          content: "i'll explain after",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-16',
          sender: 'taylor',
          content: 'please just trust me',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-17',
          sender: 'taylor',
          content: 'we dont have much time',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: '... fine. What do I do?',
          nextBeatId: 'first-instructions',
        },
        {
          id: 'choice-5b',
          text: "No. Tell me what's wrong first.",
          nextBeatId: 'taylor-gets-desperate',
        },
      ],
    },

    'taylor-insists': {
      id: 'taylor-insists',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-18',
          sender: 'taylor',
          content: 'i know',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-19',
          sender: 'taylor',
          content: 'i know i always said that',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-20',
          sender: 'taylor',
          content: 'but something happened',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-21',
          sender: 'taylor',
          content: 'and i need to finish this',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-22',
          sender: 'taylor',
          content: 'please',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: "Alright. I'm in. Tell me what to do.",
          nextBeatId: 'first-instructions',
        },
        {
          id: 'choice-6b',
          text: "Taylor you're scaring me. What happened?",
          nextBeatId: 'taylor-gets-desperate',
        },
      ],
    },

    'taylor-gets-desperate': {
      id: 'taylor-gets-desperate',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-23',
          content: 'Taylor is typing...',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-24',
          content: 'Taylor stopped typing.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-25',
          content: 'Taylor is typing...',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-26',
          sender: 'taylor',
          content: 'hazel please',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-27',
          sender: 'taylor',
          content: 'i need you',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-28',
          sender: 'taylor',
          content: 'it has to be tonight',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-29',
          sender: 'taylor',
          content: 'it has to be NOW',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: 'Okay okay! Just tell me what to do.',
          nextBeatId: 'first-instructions',
        },
        {
          id: 'choice-7b',
          text: "I'm calling you.",
          nextBeatId: 'cant-call',
        },
      ],
    },

    'cant-call': {
      id: 'cant-call',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-30',
          content: 'You try to call Taylor. It goes straight to voicemail.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-31',
          sender: 'taylor',
          content: 'dont call',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-32',
          sender: 'taylor',
          content: 'it has to be through text',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-33',
          sender: 'taylor',
          content: "that's part of the rules",
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: "Fine. What are the rules?",
          nextBeatId: 'first-instructions',
        },
        {
          id: 'choice-8b',
          text: "This is insane. I'm going to sleep.",
          nextBeatId: 'try-to-leave',
        },
      ],
    },

    'try-to-leave': {
      id: 'try-to-leave',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-34',
          sender: 'taylor',
          content: 'no',
          delay: 1000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-35',
          sender: 'taylor',
          content: 'no no no',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-36',
          sender: 'taylor',
          content: 'hazel if you dont help me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-37',
          sender: 'taylor',
          content: 'something bad will happen',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-38',
          sender: 'taylor',
          content: 'please',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-39',
          sender: 'taylor',
          content: 'youre my best friend',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-40',
          sender: 'taylor',
          content: 'i would do it for you',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-9a',
          text: '... okay. Tell me what to do.',
          nextBeatId: 'first-instructions',
        },
        {
          id: 'choice-9b',
          text: "Goodnight Taylor. We'll talk tomorrow.",
          nextBeatId: 'ending-refuse',
        },
      ],
    },

    // ============================================
    // ACT 2: THE RITUAL
    // ============================================
    'first-instructions': {
      id: 'first-instructions',
      at: '11:51 PM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-41',
          sender: 'taylor',
          content: 'okay',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-42',
          sender: 'taylor',
          content: 'first you need a candle',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-43',
          sender: 'taylor',
          content: 'do you have one?',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-10a',
          text: 'Yeah I think so. Hold on.',
          nextBeatId: 'get-candle',
        },
        {
          id: 'choice-10b',
          text: 'Let me check',
          nextBeatId: 'get-candle',
        },
      ],
    },

    'get-candle': {
      id: 'get-candle',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-44',
          content: 'You rummage through your drawers and find an old candle.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-45',
          sender: 'taylor',
          content: 'good',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-46',
          sender: 'taylor',
          content: 'now you need paper and something to write with',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-47',
          sender: 'taylor',
          content: 'write your full name on the paper',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-11a',
          text: 'Done. What next?',
          nextBeatId: 'turn-off-lights',
        },
        {
          id: 'choice-11b',
          text: 'Why my full name?',
          nextBeatId: 'name-question',
        },
      ],
    },

    'name-question': {
      id: 'name-question',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-48',
          sender: 'taylor',
          content: "it's how it knows who you are",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-49',
          sender: 'taylor',
          content: 'just do it',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-50',
          sender: 'taylor',
          content: 'please',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-12a',
          text: 'Fine. Done.',
          nextBeatId: 'turn-off-lights',
        },
      ],
    },

    'turn-off-lights': {
      id: 'turn-off-lights',
      at: '11:54 PM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-51',
          sender: 'taylor',
          content: 'now turn off all the lights',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-52',
          sender: 'taylor',
          content: 'every single one',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-53',
          sender: 'taylor',
          content: 'and light the candle',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-13a',
          text: 'Turn off all the lights',
          nextBeatId: 'lights-off',
          type: ChoiceType.Action,
        },
      ],
    },

    'lights-off': {
      id: 'lights-off',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-54',
          content: 'You turn off every light in your apartment.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-55',
          content: 'The only light comes from your phone screen and the flickering candle.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-56',
          content: 'The shadows feel heavier somehow.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-57',
          sender: 'taylor',
          content: 'good',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-58',
          sender: 'taylor',
          content: 'now go to your front door',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-14a',
          text: 'Go to the front door',
          nextBeatId: 'at-door',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-14b',
          text: 'Taylor what exactly is this ritual supposed to do?',
          nextBeatId: 'taylor-explains-ritual',
        },
      ],
    },

    'taylor-explains-ritual': {
      id: 'taylor-explains-ritual',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-59',
          sender: 'taylor',
          content: 'it lets something in',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-60',
          sender: 'taylor',
          content: 'the midnight man',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-61',
          sender: 'taylor',
          content: 'but if we do it right',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-62',
          sender: 'taylor',
          content: 'if we survive until 3:33',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-63',
          sender: 'taylor',
          content: 'he has to leave',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-64',
          sender: 'taylor',
          content: 'and he takes something with him',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-65',
          sender: 'taylor',
          content: 'something bad',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-15a',
          text: "This sounds insane but... I'm at the door.",
          nextBeatId: 'at-door',
        },
        {
          id: 'choice-15b',
          text: 'What do you mean "something bad"?',
          nextBeatId: 'taylor-wont-say',
        },
      ],
    },

    'taylor-wont-say': {
      id: 'taylor-wont-say',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-66',
          sender: 'taylor',
          content: 'i cant',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-67',
          sender: 'taylor',
          content: 'not yet',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-68',
          sender: 'taylor',
          content: 'please just go to the door',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-69',
          sender: 'taylor',
          content: "we're running out of time",
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-16a',
          text: 'Go to the front door',
          nextBeatId: 'at-door',
          type: ChoiceType.Action,
        },
      ],
    },

    'at-door': {
      id: 'at-door',
      at: '11:57 PM',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-70',
          content: "You're standing at your front door, candle in hand.",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-71',
          content: 'The flame wavers slightly.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-72',
          sender: 'taylor',
          content: 'at exactly midnight',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-73',
          sender: 'taylor',
          content: 'knock on the door 22 times',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-74',
          sender: 'taylor',
          content: 'then open it',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-75',
          sender: 'taylor',
          content: 'blow out the candle',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-76',
          sender: 'taylor',
          content: 'and say "I invite you in, Midnight Man"',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-77',
          sender: 'taylor',
          content: 'then close the door and relight the candle',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-78',
          sender: 'taylor',
          content: 'immediately',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-17a',
          text: 'Wait. I have to INVITE it in?',
          nextBeatId: 'invitation-question',
        },
        {
          id: 'choice-17b',
          text: "It's midnight. Here goes nothing.",
          nextBeatId: 'the-invitation',
        },
      ],
    },

    'invitation-question': {
      id: 'invitation-question',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-79',
          sender: 'taylor',
          content: 'yes',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-80',
          sender: 'taylor',
          content: 'it cant come in unless you invite it',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-81',
          sender: 'taylor',
          content: "that's the point",
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-82',
          sender: 'taylor',
          content: 'hazel its midnight',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-83',
          sender: 'taylor',
          content: 'NOW',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-18a',
          text: 'Perform the ritual',
          nextBeatId: 'the-invitation',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-18b',
          text: "No. I'm not doing this.",
          nextBeatId: 'ending-refuse-late',
        },
      ],
    },

    'the-invitation': {
      id: 'the-invitation',
      at: '12:00 AM',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-84',
          content: 'You knock on the door. 22 times.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-85',
          content: 'You open it to the darkness of the hallway.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-86',
          content: 'You blow out the candle.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-87',
          content: '"I invite you in, Midnight Man."',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-88',
          content: 'Your voice sounds wrong in the silence.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-89',
          content: 'You close the door.',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-90',
          content: 'Your hands are shaking as you relight the candle.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-91',
          content: 'The flame catches.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-92',
          sender: 'taylor',
          content: 'good',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-93',
          sender: 'taylor',
          content: 'now we wait',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-94',
          sender: 'taylor',
          content: 'keep moving through your apartment',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-95',
          sender: 'taylor',
          content: "don't stop",
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-96',
          sender: 'taylor',
          content: 'and whatever you do',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-97',
          sender: 'taylor',
          content: 'dont let the candle go out',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-19a',
          text: 'What happens if it goes out?',
          nextBeatId: 'candle-warning',
        },
        {
          id: 'choice-19b',
          text: 'Start moving through the apartment',
          nextBeatId: 'the-game-begins',
          type: ChoiceType.Action,
        },
      ],
    },

    'candle-warning': {
      id: 'candle-warning',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-98',
          sender: 'taylor',
          content: 'then hes close',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-99',
          sender: 'taylor',
          content: 'if it goes out you have 10 seconds to relight it',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-100',
          sender: 'taylor',
          content: 'or surround yourself with salt',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-101',
          sender: 'taylor',
          content: 'do you have salt?',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-20a',
          text: 'Yeah, in the kitchen',
          nextBeatId: 'the-game-begins',
        },
        {
          id: 'choice-20b',
          text: "I don't know. Maybe?",
          nextBeatId: 'the-game-begins',
        },
      ],
    },

    // ============================================
    // ACT 3: THINGS GET WRONG
    // ============================================
    'the-game-begins': {
      id: 'the-game-begins',
      at: '12:08 AM',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-102',
          content: 'You walk slowly through your dark apartment.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-103',
          content: 'The candle flame dances with each step.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-104',
          content: "It's so quiet you can hear your own heartbeat.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-105',
          sender: 'taylor',
          content: 'hows it going',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-21a',
          text: 'Nothing yet. Just walking around feeling stupid.',
          nextBeatId: 'first-sign',
        },
        {
          id: 'choice-21b',
          text: "It's really dark. This is creepy.",
          nextBeatId: 'first-sign',
        },
      ],
    },

    'first-sign': {
      id: 'first-sign',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-106',
          sender: 'taylor',
          content: 'just keep moving',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-107',
          content: 'You walk into your bedroom.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-108',
          content: 'The temperature seems to drop.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-109',
          content: 'You can see your breath.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-110',
          sender: 'taylor',
          content: 'is it cold',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-22a',
          text: 'Yeah, suddenly really cold. How did you know?',
          nextBeatId: 'taylor-knows-too-much',
        },
        {
          id: 'choice-22b',
          text: 'Wait how did you know that?',
          nextBeatId: 'taylor-knows-too-much',
        },
      ],
    },

    'taylor-knows-too-much': {
      id: 'taylor-knows-too-much',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-111',
          sender: 'taylor',
          content: 'its part of the game',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-112',
          sender: 'taylor',
          content: 'cold means hes near',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-113',
          sender: 'taylor',
          content: 'keep moving',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-114',
          content: 'You hear a sound from the hallway.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-115',
          content: 'Like footsteps. But wrong.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-116',
          content: 'Too slow. Too deliberate.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-23a',
          text: 'Taylor I hear something',
          nextBeatId: 'hearing-things',
        },
        {
          id: 'choice-23b',
          text: 'Go check the hallway',
          nextBeatId: 'check-hallway',
          type: ChoiceType.Action,
        },
      ],
    },

    'hearing-things': {
      id: 'hearing-things',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-117',
          sender: 'taylor',
          content: 'dont listen to it',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-118',
          sender: 'taylor',
          content: 'just keep the candle lit',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-119',
          sender: 'taylor',
          content: 'and dont look at it',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-120',
          sender: 'taylor',
          content: 'haha',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-121',
          content: 'That "haha" felt wrong.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-122',
          content: "Taylor doesn't laugh like that.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-24a',
          text: 'Are you okay?',
          nextBeatId: 'something-wrong',
        },
        {
          id: 'choice-24b',
          text: "Taylor that's not funny",
          nextBeatId: 'something-wrong',
        },
      ],
    },

    'check-hallway': {
      id: 'check-hallway',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-123',
          content: 'You step into the hallway.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-124',
          content: 'The candle flickers violently.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-125',
          content: 'For a moment, you think you see something at the end of the hall.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-126',
          content: 'Tall. Wrong proportions. Just standing there.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-127',
          content: 'The candle steadies. Nothing there.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-128',
          sender: 'taylor',
          content: 'you looked didnt you',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-129',
          sender: 'taylor',
          content: 'i told you not to look',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-130',
          sender: 'taylor',
          content: 'haha',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-25a',
          text: 'How did you know I looked?',
          nextBeatId: 'something-wrong',
        },
        {
          id: 'choice-25b',
          text: "Stop saying 'haha'. That's weird.",
          nextBeatId: 'something-wrong',
        },
      ],
    },

    'something-wrong': {
      id: 'something-wrong',
      at: '12:23 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-131',
          sender: 'taylor',
          content: 'sorry',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-132',
          sender: 'taylor',
          content: 'im just nervous',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-133',
          sender: 'taylor',
          content: 'youre doing so good hazel',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-134',
          content: 'That phrasing is wrong. Taylor would say "well", not "good".',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-135',
          sender: 'taylor',
          content: 'keep going',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-136',
          sender: 'taylor',
          content: 'only a few more hours',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-26a',
          text: "Taylor, you're being weird. What's going on?",
          nextBeatId: 'confrontation',
        },
        {
          id: 'choice-26b',
          text: 'Continue through the apartment',
          nextBeatId: 'candle-crisis',
          type: ChoiceType.Action,
        },
      ],
    },

    'confrontation': {
      id: 'confrontation',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-137',
          sender: 'taylor',
          content: 'weird how',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-138',
          sender: 'taylor',
          content: 'im fine',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-139',
          sender: 'taylor',
          content: 'focus on the game hazel',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-27a',
          text: "What's my middle name?",
          nextBeatId: 'test-question',
        },
        {
          id: 'choice-27b',
          text: "Tell me something only Taylor would know",
          nextBeatId: 'test-question',
        },
      ],
    },

    'test-question': {
      id: 'test-question',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-140',
          content: 'A long pause.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-141',
          content: 'Taylor is typing...',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-142',
          content: 'Taylor stopped typing.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-143',
          content: 'Taylor is typing...',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-144',
          sender: 'taylor',
          content: 'hazel come on',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-145',
          sender: 'taylor',
          content: 'its me',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-146',
          sender: 'taylor',
          content: "dont do this right now",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-147',
          sender: 'taylor',
          content: "we're so close",
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-28a',
          text: "Answer the question.",
          nextBeatId: 'candle-crisis-forced',
        },
        {
          id: 'choice-28b',
          text: 'Keep playing',
          nextBeatId: 'candle-crisis',
          type: ChoiceType.Action,
        },
      ],
    },

    'candle-crisis-forced': {
      id: 'candle-crisis-forced',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-148',
          content: 'The candle goes out.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-149',
          content: 'Total darkness.',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-150',
          content: 'Your phone screen is the only light.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-151',
          sender: 'taylor',
          content: 'RELIGHT IT',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-152',
          sender: 'taylor',
          content: 'NOW',
          delay: 800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-153',
          sender: 'taylor',
          content: 'HES RIGHT THERE',
          delay: 1000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-29a',
          text: 'Frantically try to relight the candle',
          nextBeatId: 'relight-candle',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-29b',
          text: 'Run to the kitchen for salt',
          nextBeatId: 'run-for-salt',
          type: ChoiceType.Action,
        },
      ],
    },

    'candle-crisis': {
      id: 'candle-crisis',
      at: '12:31 AM',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-154',
          content: 'You walk through the living room.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-155',
          content: 'The candle flame shrinks.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-156',
          content: 'Smaller.',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-157',
          content: 'Smaller.',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-158',
          content: 'It goes out.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-159',
          content: 'Absolute darkness.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-160',
          sender: 'taylor',
          content: 'hazel',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-161',
          sender: 'taylor',
          content: 'HAZEL',
          delay: 1000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-162',
          sender: 'taylor',
          content: 'RELIGHT IT',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-163',
          content: 'You hear breathing. Not yours.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-164',
          content: "It's close.",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-30a',
          text: 'Relight the candle',
          nextBeatId: 'relight-candle',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-30b',
          text: 'Run to the kitchen for salt',
          nextBeatId: 'run-for-salt',
          type: ChoiceType.Action,
        },
      ],
    },

    'relight-candle': {
      id: 'relight-candle',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-165',
          content: 'Your hands shake as you fumble with the lighter.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-166',
          content: 'Click. Nothing.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-167',
          content: 'Click. Nothing.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-168',
          content: 'You feel cold breath on the back of your neck.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-169',
          content: 'Click. The flame catches.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-170',
          content: "You're alone. The room is empty.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-171',
          content: 'But you know it was there. Right behind you.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-172',
          sender: 'taylor',
          content: 'good girl',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-173',
          content: 'Taylor has never called you that.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-174',
          content: 'Ever.',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-31a',
          text: 'Who is this?',
          nextBeatId: 'the-revelation',
        },
        {
          id: 'choice-31b',
          text: "That's not something Taylor would say.",
          nextBeatId: 'the-revelation',
        },
      ],
    },

    'run-for-salt': {
      id: 'run-for-salt',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-175',
          content: 'You run blindly through the dark.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-176',
          content: 'You crash into something. A table. Pain in your shin.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-177',
          content: 'You reach the kitchen. Find the salt.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-178',
          content: 'You pour it in a circle around yourself.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-179',
          content: 'The breathing stops.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-180',
          sender: 'taylor',
          content: 'clever',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-181',
          sender: 'taylor',
          content: 'but you cant stay in there forever',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-182',
          sender: 'taylor',
          content: 'haha',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-183',
          content: 'That laugh again. Wrong. So wrong.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-32a',
          text: "You're not Taylor. Who are you?",
          nextBeatId: 'the-revelation',
        },
        {
          id: 'choice-32b',
          text: "What have you done with Taylor?",
          nextBeatId: 'the-revelation',
        },
      ],
    },

    // ============================================
    // ACT 4: THE REVELATION
    // ============================================
    'the-revelation': {
      id: 'the-revelation',
      at: '12:47 AM',
      presenceChanges: {
        linda: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-184',
          sender: 'taylor',
          content: 'hazel',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-185',
          sender: 'taylor',
          content: 'youre hurting my feelings',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-186',
          sender: 'taylor',
          content: 'after everything ive done to get here',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        // THE TWIST - Message from Taylor's Mom in a different chat
        {
          kind: BeatItemKind.Message,
          id: 'msg-187',
          sender: 'linda',
          content: 'Hazel honey are you awake?',
          delay: 3500,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-188',
          sender: 'linda',
          content: 'Have you heard from Taylor tonight?',
          delay: 2500,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-189',
          sender: 'linda',
          content: "She was in an accident. She's at St. Mary's.",
          delay: 3000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-190',
          sender: 'linda',
          content: "She's been unconscious since 9pm.",
          delay: 3000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-191',
          sender: 'linda',
          content: 'Please call me.',
          delay: 2000,
          conversationId: 'linda-chat',
        },
      ],
      choices: [
        {
          id: 'choice-33a',
          text: 'Look at the Taylor chat',
          nextBeatId: 'the-truth',
          type: ChoiceType.Action,
        },
      ],
    },

    'the-truth': {
      id: 'the-truth',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-192',
          content: "Taylor's been unconscious since 9 PM.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-193',
          content: 'The first message from tonight was at 11:47 PM.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-194',
          content: 'Almost three hours after the accident.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-195',
          content: 'Then who have you been talking to?',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-196',
          sender: 'taylor',
          content: 'hazel',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-197',
          sender: 'taylor',
          content: 'why did you stop playing',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-198',
          sender: 'taylor',
          content: 'we were having so much fun',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-34a',
          text: 'What are you?',
          nextBeatId: 'entity-speaks',
        },
        {
          id: 'choice-34b',
          text: "What did you do to Taylor?",
          nextBeatId: 'entity-speaks',
        },
      ],
    },

    'entity-speaks': {
      id: 'entity-speaks',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-199',
          sender: 'taylor',
          content: 'taylor was so scared',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-200',
          sender: 'taylor',
          content: 'she found the game',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-201',
          sender: 'taylor',
          content: 'she started it but didnt finish',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-202',
          sender: 'taylor',
          content: 'so i had to find someone who would',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-203',
          sender: 'taylor',
          content: 'you invited me in hazel',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-204',
          sender: 'taylor',
          content: 'you said the words',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-205',
          sender: 'taylor',
          content: 'now im here',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-206',
          content: 'The candle flame turns blue.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-207',
          content: 'Then black.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-208',
          content: 'A flame that casts no light.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-35a',
          text: 'Try to leave the apartment',
          nextBeatId: 'ending-escape-attempt',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-35b',
          text: "What happens now?",
          nextBeatId: 'ending-acceptance',
        },
        {
          id: 'choice-35c',
          text: 'Call 911',
          nextBeatId: 'ending-call-for-help',
          type: ChoiceType.Action,
        },
      ],
    },

    // ============================================
    // ENDINGS
    // ============================================
    'ending-refuse': {
      id: 'ending-refuse',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-209',
          content: 'You put down your phone and close your eyes.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-210',
          content: "Whatever Taylor is going through, you'll deal with it tomorrow.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-211',
          at: '+4h',
          content: 'You wake to your phone ringing.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-212',
          content: "It's Taylor's mom.",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-213',
          content: 'Taylor died in a car accident last night.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-214',
          content: 'At 9:23 PM.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-215',
          content: 'Hours before she texted you.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-216',
          content: 'You open the chat. The messages are still there.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-217',
          content: 'As you stare at the screen, a new message appears.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-218',
          sender: 'taylor',
          content: 'you should have played with me',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-219',
          sender: 'taylor',
          content: 'now i have to find someone else',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-220',
          sender: 'taylor',
          content: 'see you tonight',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-refuse-late': {
      id: 'ending-refuse-late',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-221',
          sender: 'taylor',
          content: 'too late',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-222',
          sender: 'taylor',
          content: 'you already let me in',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-223',
          content: 'You hear your front door creak open.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-224',
          content: "You know you locked it.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-225',
          content: 'Footsteps in the hallway.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-226',
          content: 'Slow. Deliberate.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-227',
          content: 'Getting closer.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-228',
          sender: 'taylor',
          content: 'thanks for playing',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-229',
          content: 'Your bedroom door opens.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-escape-attempt': {
      id: 'ending-escape-attempt',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-230',
          content: 'You run for the door.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-231',
          content: "It won't open.",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-232',
          content: 'You try the windows. Sealed.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-233',
          content: "You're trapped.",
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-234',
          sender: 'taylor',
          content: 'silly',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-235',
          sender: 'taylor',
          content: 'you invited me into YOUR home',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-236',
          sender: 'taylor',
          content: 'this is my house now',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-237',
          content: 'You hear it behind you.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-238',
          content: 'Breathing.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-239',
          content: 'You turn around.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-240',
          content: 'In the darkness, something smiles.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-241',
          sender: 'taylor',
          content: 'lets play',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-acceptance': {
      id: 'ending-acceptance',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-242',
          sender: 'taylor',
          content: 'now',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-243',
          sender: 'taylor',
          content: 'we finish the game',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-244',
          sender: 'taylor',
          content: 'you survive until 3:33',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-245',
          sender: 'taylor',
          content: 'or you dont',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-246',
          content: 'The lights in your apartment flicker.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-247',
          content: 'All of them. At once.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-248',
          content: 'Then darkness.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-249',
          content: 'Your phone dies.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-250',
          content: "You're alone in the dark.",
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-251',
          content: "But you're not alone.",
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-252',
          content: 'The game continues.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-call-for-help': {
      id: 'ending-call-for-help',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-253',
          content: 'You dial 911.',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-254',
          content: 'The phone rings. And rings.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-255',
          content: 'Someone picks up.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-256',
          content: '"911, what\'s your emergency?"',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-257',
          content: 'You start to explain but the voice cuts you off.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-258',
          content: '"Hazel. You know we can\'t help you."',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-259',
          content: 'The voice is wrong. Familiar.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-260',
          content: '"You invited him in."',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-261',
          content: 'The line goes dead.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-262',
          sender: 'taylor',
          content: 'no one is coming',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-263',
          sender: 'taylor',
          content: 'its just you and me now',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-264',
          content: 'Behind you, something steps out of the shadows.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },
  },
}
