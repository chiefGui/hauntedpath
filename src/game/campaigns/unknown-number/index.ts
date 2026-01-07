import {
  BeatItemKind,
  ChoiceType,
  ContactStatus,
  type Campaign,
} from '../../../engine'

// Simple avatar placeholder - a dark silhouette
const unknownAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#1c1c1e"/>
  <circle cx="50" cy="40" r="20" fill="#3a3a3c"/>
  <ellipse cx="50" cy="85" rx="30" ry="25" fill="#3a3a3c"/>
</svg>
`)}`

const playerAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#0b84fe"/>
  <circle cx="50" cy="40" r="20" fill="#fff"/>
  <ellipse cx="50" cy="85" rx="30" ry="25" fill="#fff"/>
</svg>
`)}`

// Cover image - dark gradient with question mark
const coverImage = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#0f0f1a"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#bg)"/>
  <text x="200" y="130" font-family="system-ui" font-size="80" fill="#2a2a4a" text-anchor="middle">?</text>
  <text x="200" y="130" font-family="system-ui" font-size="80" fill="none" stroke="#ff3b30" stroke-width="1" text-anchor="middle" opacity="0.5">?</text>
</svg>
`)}`

export const unknownNumberCampaign: Campaign = {
  id: 'unknown-number',
  title: 'Unknown Number',
  description:
    "It's 2:47 AM. Your phone buzzes. A number you don't recognize. They seem to know exactly where you are.",
  coverImage,
  meta: {
    genre: ['Horror', 'Thriller', 'Mystery'],
    duration: '10-15 min',
    rating: 'Mature',
    year: 2026,
    longDescription:
      "You're alone in your apartment when your phone lights up with a message from an unknown number. What starts as a wrong number quickly turns sinister as the stranger reveals they know things about you they shouldn't. Every choice you make could be your last. Will you survive until morning, or become another victim of the voice in the dark?",
  },
  protagonist: {
    id: 'player',
    name: 'Alex',
    avatar: playerAvatar,
    age: 24,
    bio: 'Just moved into a new apartment downtown. Night owl by habit.',
  },
  characters: [
    {
      id: 'unknown',
      name: 'Unknown',
      avatar: unknownAvatar,
    },
  ],
  startBeatId: 'start',
  beats: {
    start: {
      id: 'start',
      presenceChanges: {
        unknown: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-1',
          content: '2:47 AM',
          delay: 500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-2',
          sender: 'unknown',
          content: 'Are you awake?',
          delay: 2000,
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'Who is this?',
          nextBeatId: 'who-is-this',
        },
        {
          id: 'choice-1b',
          text: 'Sorry, I think you have the wrong number',
          nextBeatId: 'wrong-number',
        },
        {
          id: 'choice-1c',
          text: "I'm trying to sleep. Don't text me.",
          nextBeatId: 'rude-response',
        },
      ],
    },
    'who-is-this': {
      id: 'who-is-this',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-3',
          sender: 'unknown',
          content: "You don't remember me?",
          delay: 3000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-4',
          sender: 'unknown',
          content: 'I remember you.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-5',
          sender: 'unknown',
          content: 'I remember your face when you sleep.',
          delay: 2500,
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: "This isn't funny. Who are you?",
          nextBeatId: 'not-funny',
        },
        {
          id: 'choice-2b',
          text: "I'm calling the police",
          nextBeatId: 'call-police',
        },
      ],
    },
    'wrong-number': {
      id: 'wrong-number',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-6',
          sender: 'unknown',
          content: "No, I don't.",
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-7',
          sender: 'unknown',
          content: 'I know exactly who you are.',
          delay: 2500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-8',
          sender: 'unknown',
          content: 'Nice pajamas, by the way.',
          delay: 3000,
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'Look outside the window',
          nextBeatId: 'look-window',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-3b',
          text: 'Block this number',
          nextBeatId: 'block-number',
          type: ChoiceType.Action,
        },
      ],
    },
    'rude-response': {
      id: 'rude-response',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-9',
          sender: 'unknown',
          content: "That's not very nice.",
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-10',
          sender: 'unknown',
          content: "Especially after I've been watching you all night.",
          delay: 3000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-11',
          sender: 'unknown',
          content: 'You should be nicer to your guests.',
          delay: 2500,
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: 'Check the doors',
          nextBeatId: 'check-doors',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-4b',
          text: "I'm calling 911",
          nextBeatId: 'call-police',
        },
      ],
    },
    'not-funny': {
      id: 'not-funny',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-12',
          sender: 'unknown',
          content: "I'm not laughing.",
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-13',
          sender: 'unknown',
          content: 'Check your closet.',
          delay: 4000,
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: 'Open the closet',
          nextBeatId: 'ending-closet',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-5b',
          text: 'Run out of the room',
          nextBeatId: 'ending-run',
          type: ChoiceType.Action,
        },
      ],
    },
    'call-police': {
      id: 'call-police',
      presenceChanges: {
        unknown: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-14',
          sender: 'unknown',
          content: 'Go ahead.',
          delay: 1500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-15',
          sender: 'unknown',
          content: "By the time they arrive, I'll be gone.",
          delay: 2500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-16',
          sender: 'unknown',
          content: 'But I always come back.',
          delay: 3000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-17',
          content: 'The messages stop. You call the police. They find nothing.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-18',
          content: "But you can't shake the feeling you're being watched.",
          delay: 2000,
        },
      ],
      choices: [],
      isEnding: true,
    },
    'look-window': {
      id: 'look-window',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-19',
          content: 'You slowly approach the window and pull back the curtain.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-20',
          content: 'Nothing. Just the empty street below.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-21',
          sender: 'unknown',
          content: 'Not that window.',
          delay: 3000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-22',
          content: 'Your blood runs cold.',
          delay: 2000,
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: 'Turn around slowly',
          nextBeatId: 'ending-turn',
          type: ChoiceType.Action,
        },
        {
          id: 'choice-6b',
          text: 'Sprint for the door',
          nextBeatId: 'ending-sprint',
          type: ChoiceType.Action,
        },
      ],
    },
    'block-number': {
      id: 'block-number',
      presenceChanges: {
        unknown: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-23',
          content: 'You block the number.',
          delay: 1000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-24',
          content: 'Silence. You try to sleep.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-25',
          content: '3:15 AM - A new message from a different number.',
          delay: 3000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-26',
          sender: 'unknown',
          content: "That wasn't very nice.",
          delay: 2500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-27',
          sender: 'unknown',
          content: "I don't like being ignored.",
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-28',
          content: 'You hear a creak from somewhere inside the house.',
          delay: 3000,
        },
      ],
      choices: [],
      isEnding: true,
    },
    'check-doors': {
      id: 'check-doors',
      presenceChanges: {
        unknown: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-29',
          content: 'You quietly get up and check the front door.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-30',
          content: 'Locked.',
          delay: 1500,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-31',
          content: 'You check the back door.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-32',
          sender: 'unknown',
          content: "Don't bother.",
          delay: 1000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-33',
          sender: 'unknown',
          content: "I'm already inside.",
          delay: 3000,
        },
      ],
      choices: [],
      isEnding: true,
    },
    'ending-closet': {
      id: 'ending-closet',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-34',
          content: 'Your hand trembles as you reach for the closet door.',
          delay: 2500,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-35',
          content: 'You pull it open.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-36',
          content: 'Empty. Just clothes.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-37',
          content: 'You exhale with relief.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-38',
          sender: 'unknown',
          content: 'Behind you.',
          delay: 3000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-39',
          content: 'Your phone clatters to the floor.',
          delay: 2000,
        },
      ],
      choices: [],
      isEnding: true,
    },
    'ending-run': {
      id: 'ending-run',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-40',
          content: 'You bolt for the door.',
          delay: 1500,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-41',
          content: 'Down the stairs. Out the front door. Into the night.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-42',
          content: "You keep running. You don't look back.",
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-43',
          sender: 'unknown',
          content: 'You can run.',
          delay: 3000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-44',
          sender: 'unknown',
          content: "But you'll have to come home eventually.",
          delay: 2500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-45',
          sender: 'unknown',
          content: "I'll be waiting.",
          delay: 3000,
        },
      ],
      choices: [],
      isEnding: true,
    },
    'ending-turn': {
      id: 'ending-turn',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-46',
          content: 'You turn around slowly.',
          delay: 2500,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-47',
          content: 'The bedroom is empty.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-48',
          content: 'But the closet door is now open.',
          delay: 2500,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-49',
          content: 'It was closed before.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-50',
          content: "Wasn't it?",
          delay: 2000,
        },
      ],
      choices: [],
      isEnding: true,
    },
    'ending-sprint': {
      id: 'ending-sprint',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-51',
          content: 'You sprint for the bedroom door.',
          delay: 1500,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-52',
          content: "It won't open.",
          delay: 2000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-53',
          content: 'You pull harder. Nothing.',
          delay: 2000,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-54',
          sender: 'unknown',
          content: 'I locked it.',
          delay: 2500,
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-55',
          sender: 'unknown',
          content: 'From the inside.',
          delay: 3000,
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-56',
          content: 'The lights go out.',
          delay: 2000,
        },
      ],
      choices: [],
      isEnding: true,
    },
  },
}
