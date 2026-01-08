import {
  BeatItemKind,
  ChoiceType,
  ContactStatus,
  type Campaign,
} from '../../../engine'

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

const playerAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#0b84fe"/>
  <circle cx="50" cy="40" r="20" fill="#fff"/>
  <ellipse cx="50" cy="85" rx="30" ry="25" fill="#fff"/>
</svg>
`)}`

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
    'Your best friend Taylor texts you late at night. Something feels off.',
  coverImage,
  meta: {
    genre: ['Horror', 'Supernatural', 'Psychological'],
    duration: '15-20 min',
    rating: 'Mature',
    year: 2026,
    longDescription:
      "Taylor texts you at 11:47 PM about some creepy game she found online. She wants you to play it with her. Tonight. Before midnight. But as the night goes on, her messages start feeling... wrong.",
  },
  protagonist: {
    id: 'player',
    name: 'Hazel',
    avatar: playerAvatar,
    age: 22,
    bio: 'College senior. Taylor has been your best friend since freshman year.',
  },
  characters: [
    {
      id: 'taylor',
      name: 'Taylor',
      avatar: taylorAvatar,
    },
    {
      id: 'linda',
      name: "Taylor's Mom",
      avatar: lindaAvatar,
    },
  ],
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
          content: 'ok dont laugh',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-2',
          sender: 'taylor',
          content: 'but i need you to do something dumb with me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'lmao its almost midnight tay',
          nextBeatId: 'taylor-urgent',
        },
        {
          id: 'choice-1b',
          text: 'what kind of dumb',
          nextBeatId: 'taylor-explains',
        },
        {
          id: 'choice-1c',
          text: 'you ok?',
          nextBeatId: 'taylor-explains',
        },
      ],
    },

    'taylor-urgent': {
      id: 'taylor-urgent',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-3',
          sender: 'taylor',
          content: 'i know i know',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-4',
          sender: 'taylor',
          content: 'thats kind of the point',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-5',
          sender: 'taylor',
          content: 'it has to be before midnight',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'what does',
          nextBeatId: 'taylor-explains',
        },
      ],
    },

    'taylor-explains': {
      id: 'taylor-explains',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-6',
          sender: 'taylor',
          content: 'so theres this thing online',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-7',
          sender: 'taylor',
          content: 'the midnight game',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-8',
          sender: 'taylor',
          content: 'you light a candle and do some stuff and walk around your house in the dark',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-9',
          sender: 'taylor',
          content: 'until 3:33 am',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'taylor you literally make fun of this stuff',
          nextBeatId: 'taylor-different',
        },
        {
          id: 'choice-3b',
          text: 'thats like 4 hours',
          nextBeatId: 'taylor-rules',
        },
        {
          id: 'choice-3c',
          text: 'why tho',
          nextBeatId: 'taylor-reason',
        },
      ],
    },

    'taylor-different': {
      id: 'taylor-different',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-10',
          sender: 'taylor',
          content: 'i know',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-11',
          sender: 'taylor',
          content: 'but idk',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-12',
          sender: 'taylor',
          content: 'i just want to try it',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-13',
          sender: 'taylor',
          content: 'will you do it with me',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: 'this is so not like you',
          nextBeatId: 'taylor-insists',
        },
        {
          id: 'choice-4b',
          text: 'ok fine what do i do',
          nextBeatId: 'the-setup',
        },
      ],
    },

    'taylor-reason': {
      id: 'taylor-reason',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-14',
          sender: 'taylor',
          content: 'idk',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-15',
          sender: 'taylor',
          content: 'i just keep thinking about it',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-16',
          sender: 'taylor',
          content: 'i need to do it tonight',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-17',
          sender: 'taylor',
          content: 'please',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: 'are you being serious rn',
          nextBeatId: 'taylor-serious',
        },
        {
          id: 'choice-5b',
          text: 'ugh fine. what do i need',
          nextBeatId: 'the-setup',
        },
      ],
    },

    'taylor-rules': {
      id: 'taylor-rules',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-18',
          sender: 'taylor',
          content: 'yeah',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-19',
          sender: 'taylor',
          content: 'but its not hard',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-20',
          sender: 'taylor',
          content: 'you just walk around',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-21',
          sender: 'taylor',
          content: 'keep the candle lit',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-22',
          sender: 'taylor',
          content: 'and text me the whole time',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: 'this is so dumb',
          nextBeatId: 'taylor-please',
        },
        {
          id: 'choice-6b',
          text: 'whats the candle for',
          nextBeatId: 'taylor-candle',
        },
      ],
    },

    'taylor-insists': {
      id: 'taylor-insists',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-23',
          sender: 'taylor',
          content: 'hazel',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-24',
          sender: 'taylor',
          content: 'please',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-25',
          sender: 'taylor',
          content: 'i need someone to do it with me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-26',
          sender: 'taylor',
          content: 'and youre my best friend',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: 'fine. but you owe me',
          nextBeatId: 'the-setup',
        },
        {
          id: 'choice-7b',
          text: 'no im going to sleep this is weird',
          nextBeatId: 'taylor-desperate',
        },
      ],
    },

    'taylor-serious': {
      id: 'taylor-serious',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-27',
          sender: 'taylor',
          content: 'yes',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-28',
          sender: 'taylor',
          content: 'hazel please',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-29',
          sender: 'taylor',
          content: 'i need you',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: 'ok ok calm down',
          nextBeatId: 'the-setup',
        },
        {
          id: 'choice-8b',
          text: 'let me call you',
          nextBeatId: 'no-calls',
        },
      ],
    },

    'taylor-please': {
      id: 'taylor-please',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-30',
          sender: 'taylor',
          content: 'please',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-31',
          sender: 'taylor',
          content: 'just do this with me',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-9a',
          text: 'fiiiiine',
          nextBeatId: 'the-setup',
        },
        {
          id: 'choice-9b',
          text: 'no taylor im tired',
          nextBeatId: 'taylor-desperate',
        },
      ],
    },

    'taylor-candle': {
      id: 'taylor-candle',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-32',
          sender: 'taylor',
          content: 'you have to keep it lit the whole time',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-33',
          sender: 'taylor',
          content: 'if it goes out thats bad',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-10a',
          text: 'bad how',
          nextBeatId: 'bad-how',
        },
        {
          id: 'choice-10b',
          text: 'ok whatever lets just do it',
          nextBeatId: 'the-setup',
        },
      ],
    },

    'bad-how': {
      id: 'bad-how',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-34',
          sender: 'taylor',
          content: 'just dont let it go out',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-35',
          sender: 'taylor',
          content: 'ok?',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-11a',
          text: 'ok ok fine',
          nextBeatId: 'the-setup',
        },
      ],
    },

    'no-calls': {
      id: 'no-calls',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-36',
          sender: 'taylor',
          content: 'no',
          delay: 1000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-37',
          sender: 'taylor',
          content: 'just text',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-38',
          sender: 'taylor',
          content: 'its part of the thing',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-12a',
          text: 'thats weird but ok',
          nextBeatId: 'the-setup',
        },
        {
          id: 'choice-12b',
          text: 'tay this is freaking me out',
          nextBeatId: 'taylor-calm',
        },
      ],
    },

    'taylor-calm': {
      id: 'taylor-calm',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-39',
          sender: 'taylor',
          content: 'its fine',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-40',
          sender: 'taylor',
          content: 'its just a game',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-41',
          sender: 'taylor',
          content: 'will you do it',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-13a',
          text: 'fine',
          nextBeatId: 'the-setup',
        },
      ],
    },

    'taylor-desperate': {
      id: 'taylor-desperate',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-42',
          sender: 'taylor',
          content: 'hazel',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-43',
          sender: 'taylor',
          content: 'please dont leave me alone tonight',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-44',
          sender: 'taylor',
          content: 'i need you',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-14a',
          text: '... ok. im here',
          nextBeatId: 'the-setup',
        },
        {
          id: 'choice-14b',
          text: 'goodnight tay',
          nextBeatId: 'ending-refuse',
        },
      ],
    },

    'the-setup': {
      id: 'the-setup',
      at: '11:52 PM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-45',
          sender: 'taylor',
          content: 'ok',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-46',
          sender: 'taylor',
          content: 'you need a candle',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-47',
          sender: 'taylor',
          content: 'paper',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-48',
          sender: 'taylor',
          content: 'and a lighter',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-15a',
          text: 'hold on',
          nextBeatId: 'got-supplies',
        },
      ],
    },

    'got-supplies': {
      id: 'got-supplies',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-49',
          sender: 'taylor',
          content: 'did you find everything',
          delay: 4000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-16a',
          text: 'yeah i got a candle from the bathroom drawer',
          nextBeatId: 'write-name',
        },
        {
          id: 'choice-16b',
          text: 'yep. now what',
          nextBeatId: 'write-name',
        },
      ],
    },

    'write-name': {
      id: 'write-name',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-50',
          sender: 'taylor',
          content: 'write your name on the paper',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-51',
          sender: 'taylor',
          content: 'your full name',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-17a',
          text: 'done',
          nextBeatId: 'lights-off',
        },
        {
          id: 'choice-17b',
          text: 'why my full name',
          nextBeatId: 'name-reason',
        },
      ],
    },

    'name-reason': {
      id: 'name-reason',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-52',
          sender: 'taylor',
          content: 'its just the rules',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-53',
          sender: 'taylor',
          content: 'just do it',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-18a',
          text: 'ok done',
          nextBeatId: 'lights-off',
        },
      ],
    },

    'lights-off': {
      id: 'lights-off',
      at: '11:55 PM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-54',
          sender: 'taylor',
          content: 'now turn off all your lights',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-55',
          sender: 'taylor',
          content: 'all of them',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-56',
          sender: 'taylor',
          content: 'and light the candle',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-19a',
          text: 'ok its dark. candle is lit',
          nextBeatId: 'go-to-door',
        },
      ],
    },

    'go-to-door': {
      id: 'go-to-door',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-57',
          sender: 'taylor',
          content: 'go to your front door',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-20a',
          text: 'ok im there',
          nextBeatId: 'the-knock',
        },
      ],
    },

    'the-knock': {
      id: 'the-knock',
      at: '11:58 PM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-58',
          sender: 'taylor',
          content: 'at midnight exactly',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-59',
          sender: 'taylor',
          content: 'knock on your door 22 times',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-60',
          sender: 'taylor',
          content: 'open it',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-61',
          sender: 'taylor',
          content: 'blow out the candle',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-62',
          sender: 'taylor',
          content: 'say "i invite you in"',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-63',
          sender: 'taylor',
          content: 'then close the door and relight the candle immediately',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-21a',
          text: 'invite WHAT in exactly',
          nextBeatId: 'invite-what',
        },
        {
          id: 'choice-21b',
          text: 'ok here goes',
          nextBeatId: 'do-it',
        },
      ],
    },

    'invite-what': {
      id: 'invite-what',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-64',
          sender: 'taylor',
          content: 'nothing',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-65',
          sender: 'taylor',
          content: 'its just what you say',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-66',
          sender: 'taylor',
          content: 'hazel its midnight',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-67',
          sender: 'taylor',
          content: 'do it now',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-22a',
          text: 'ok ok',
          nextBeatId: 'do-it',
        },
        {
          id: 'choice-22b',
          text: 'im not doing this',
          nextBeatId: 'too-late-refuse',
        },
      ],
    },

    'too-late-refuse': {
      id: 'too-late-refuse',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-68',
          sender: 'taylor',
          content: 'you already started it',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-69',
          sender: 'taylor',
          content: 'you have to finish',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-70',
          sender: 'taylor',
          content: 'DO IT',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-23a',
          text: 'fine jesus',
          nextBeatId: 'do-it',
        },
      ],
    },

    'do-it': {
      id: 'do-it',
      at: '12:00 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-71',
          sender: 'taylor',
          content: 'did you do it',
          delay: 8000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-24a',
          text: 'yeah. i feel dumb',
          nextBeatId: 'now-walk',
        },
        {
          id: 'choice-24b',
          text: 'done. now what',
          nextBeatId: 'now-walk',
        },
      ],
    },

    'now-walk': {
      id: 'now-walk',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-72',
          sender: 'taylor',
          content: 'good',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-73',
          sender: 'taylor',
          content: 'now just walk around your apartment',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-74',
          sender: 'taylor',
          content: 'keep the candle lit',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-75',
          sender: 'taylor',
          content: 'text me',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-25a',
          text: 'this is boring lol',
          nextBeatId: 'first-weird',
        },
        {
          id: 'choice-25b',
          text: 'ok walking around my dark apartment like a weirdo',
          nextBeatId: 'first-weird',
        },
      ],
    },

    'first-weird': {
      id: 'first-weird',
      at: '12:08 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-76',
          sender: 'taylor',
          content: 'is it cold',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-26a',
          text: 'actually yeah kind of. how did you know',
          nextBeatId: 'taylor-knows',
        },
        {
          id: 'choice-26b',
          text: 'not really',
          nextBeatId: 'keep-going',
        },
      ],
    },

    'taylor-knows': {
      id: 'taylor-knows',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-77',
          sender: 'taylor',
          content: 'just keep moving',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-27a',
          text: 'tay how did you know it was cold',
          nextBeatId: 'she-ignores',
        },
      ],
    },

    'she-ignores': {
      id: 'she-ignores',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-78',
          sender: 'taylor',
          content: 'hows the candle',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-28a',
          text: 'still lit. you didnt answer me',
          nextBeatId: 'weird-response',
        },
        {
          id: 'choice-28b',
          text: 'fine',
          nextBeatId: 'weird-response',
        },
      ],
    },

    'weird-response': {
      id: 'weird-response',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-79',
          sender: 'taylor',
          content: 'good girl',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-29a',
          text: '???',
          nextBeatId: 'thats-weird',
        },
        {
          id: 'choice-29b',
          text: 'wtf tay',
          nextBeatId: 'thats-weird',
        },
      ],
    },

    'thats-weird': {
      id: 'thats-weird',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-80',
          sender: 'taylor',
          content: 'sorry lol',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-81',
          sender: 'taylor',
          content: 'keep going',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-30a',
          text: 'youre being weird tonight',
          nextBeatId: 'getting-weirder',
        },
      ],
    },

    'keep-going': {
      id: 'keep-going',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-82',
          sender: 'taylor',
          content: 'keep going',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-83',
          sender: 'taylor',
          content: 'youre doing so well',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-31a',
          text: 'lol ok',
          nextBeatId: 'getting-weirder',
        },
      ],
    },

    'getting-weirder': {
      id: 'getting-weirder',
      at: '12:23 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-84',
          sender: 'taylor',
          content: 'hazel',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-85',
          sender: 'taylor',
          content: 'do you remember when we first met',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-32a',
          text: 'yeah freshman orientation. why',
          nextBeatId: 'wrong-memory',
        },
        {
          id: 'choice-32b',
          text: 'of course. you spilled coffee on me lol',
          nextBeatId: 'wrong-memory',
        },
      ],
    },

    'wrong-memory': {
      id: 'wrong-memory',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-86',
          sender: 'taylor',
          content: 'that was nice',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-87',
          sender: 'taylor',
          content: 'i liked meeting you',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-33a',
          text: 'are you ok? youre being really weird',
          nextBeatId: 'test-her',
        },
        {
          id: 'choice-33b',
          text: 'tay whats going on with you tonight',
          nextBeatId: 'test-her',
        },
      ],
    },

    'test-her': {
      id: 'test-her',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-88',
          sender: 'taylor',
          content: 'im fine',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-89',
          sender: 'taylor',
          content: 'just thinking',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-90',
          sender: 'taylor',
          content: 'keep walking',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-34a',
          text: 'whats my middle name',
          nextBeatId: 'cant-answer',
        },
        {
          id: 'choice-34b',
          text: 'what class did we have together sophomore year',
          nextBeatId: 'cant-answer',
        },
      ],
    },

    'cant-answer': {
      id: 'cant-answer',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-91',
          sender: 'taylor',
          content: 'hazel come on',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-92',
          sender: 'taylor',
          content: 'dont be weird',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-93',
          sender: 'taylor',
          content: 'focus on the game',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-35a',
          text: 'answer the question',
          nextBeatId: 'deflects',
        },
        {
          id: 'choice-35b',
          text: 'taylor you literally know this',
          nextBeatId: 'deflects',
        },
      ],
    },

    'deflects': {
      id: 'deflects',
      at: '12:31 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-94',
          sender: 'taylor',
          content: 'your candle',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-95',
          sender: 'taylor',
          content: 'is it still lit',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-36a',
          text: 'yeah why',
          nextBeatId: 'candle-warning',
        },
        {
          id: 'choice-36b',
          text: 'stop changing the subject',
          nextBeatId: 'candle-warning',
        },
      ],
    },

    'candle-warning': {
      id: 'candle-warning',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-96',
          sender: 'taylor',
          content: 'its going to go out soon',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-37a',
          text: 'what?? how would you know that',
          nextBeatId: 'candle-goes-out',
        },
      ],
    },

    'candle-goes-out': {
      id: 'candle-goes-out',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-97',
          sender: 'taylor',
          content: 'hazel',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-98',
          sender: 'taylor',
          content: 'relight it',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-99',
          sender: 'taylor',
          content: 'NOW',
          delay: 1000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-38a',
          text: 'holy shit it actually went out',
          nextBeatId: 'relit',
        },
        {
          id: 'choice-38b',
          text: 'how the fuck did you know that',
          nextBeatId: 'relit',
        },
      ],
    },

    'relit': {
      id: 'relit',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-100',
          sender: 'taylor',
          content: 'is it lit',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-39a',
          text: 'yeah. tay im scared',
          nextBeatId: 'dont-be-scared',
        },
        {
          id: 'choice-39b',
          text: 'yes. what is going on',
          nextBeatId: 'dont-be-scared',
        },
      ],
    },

    'dont-be-scared': {
      id: 'dont-be-scared',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-101',
          sender: 'taylor',
          content: 'dont be scared',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-102',
          sender: 'taylor',
          content: 'i wont let anything happen to you',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-103',
          sender: 'taylor',
          content: 'i promise',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-40a',
          text: 'who are you',
          nextBeatId: 'the-reveal',
        },
        {
          id: 'choice-40b',
          text: 'taylor would have answered my question',
          nextBeatId: 'the-reveal',
        },
      ],
    },

    'the-reveal': {
      id: 'the-reveal',
      at: '12:47 AM',
      presenceChanges: {
        linda: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-104',
          sender: 'taylor',
          content: 'hazel',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-105',
          sender: 'taylor',
          content: 'why are you being like this',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-106',
          sender: 'linda',
          content: 'Hazel?',
          delay: 4000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-107',
          sender: 'linda',
          content: 'Are you awake? I know its late',
          delay: 2500,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-108',
          sender: 'linda',
          content: 'Its about Taylor',
          delay: 2000,
          conversationId: 'linda-chat',
        },
      ],
      choices: [
        {
          id: 'choice-41a',
          text: 'View message from Taylor\'s Mom',
          nextBeatId: 'mom-message',
          type: ChoiceType.Action,
        },
      ],
    },

    'mom-message': {
      id: 'mom-message',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-109',
          sender: 'linda',
          content: 'She was in an accident',
          delay: 2500,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-110',
          sender: 'linda',
          content: 'Around 9pm tonight',
          delay: 2000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-111',
          sender: 'linda',
          content: 'Shes at St Marys',
          delay: 2000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-112',
          sender: 'linda',
          content: 'Shes been unconscious since they brought her in',
          delay: 2500,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-113',
          sender: 'linda',
          content: 'I thought you should know',
          delay: 2000,
          conversationId: 'linda-chat',
        },
      ],
      choices: [
        {
          id: 'choice-42a',
          text: 'Go back to Taylor chat',
          nextBeatId: 'back-to-taylor',
          type: ChoiceType.Action,
        },
      ],
    },

    'back-to-taylor': {
      id: 'back-to-taylor',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-114',
          sender: 'taylor',
          content: 'who was that',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-43a',
          text: 'your mom',
          nextBeatId: 'she-knows',
        },
        {
          id: 'choice-43b',
          text: 'taylor has been unconscious since 9pm',
          nextBeatId: 'she-knows',
        },
      ],
    },

    'she-knows': {
      id: 'she-knows',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-115',
          sender: 'taylor',
          content: 'oh',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-116',
          sender: 'taylor',
          content: 'that',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-44a',
          text: 'who the fuck is this',
          nextBeatId: 'it-speaks',
        },
        {
          id: 'choice-44b',
          text: 'what are you',
          nextBeatId: 'it-speaks',
        },
      ],
    },

    'it-speaks': {
      id: 'it-speaks',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-117',
          sender: 'taylor',
          content: 'she found me first you know',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-118',
          sender: 'taylor',
          content: 'taylor',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-119',
          sender: 'taylor',
          content: 'she started the game but she got scared',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-120',
          sender: 'taylor',
          content: 'tried to run',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-121',
          sender: 'taylor',
          content: 'shouldnt have done that',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-45a',
          text: 'what do you want',
          nextBeatId: 'what-it-wants',
        },
      ],
    },

    'what-it-wants': {
      id: 'what-it-wants',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-122',
          sender: 'taylor',
          content: 'to come in',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-123',
          sender: 'taylor',
          content: 'and you let me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-124',
          sender: 'taylor',
          content: 'you said the words hazel',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-125',
          sender: 'taylor',
          content: 'i invite you in',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-126',
          sender: 'taylor',
          content: 'so here i am',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-46a',
          text: 'no',
          nextBeatId: 'ending-trapped',
        },
        {
          id: 'choice-46b',
          text: 'this isnt real',
          nextBeatId: 'ending-denial',
        },
      ],
    },

    'ending-trapped': {
      id: 'ending-trapped',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-127',
          sender: 'taylor',
          content: 'yes',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-128',
          sender: 'taylor',
          content: 'thank you for playing with me hazel',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-129',
          sender: 'taylor',
          content: 'now we get to play forever',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-130',
          content: 'Your candle goes out.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-131',
          content: 'In the darkness, something moves.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-denial': {
      id: 'ending-denial',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-132',
          sender: 'taylor',
          content: 'turn around hazel',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-refuse': {
      id: 'ending-refuse',
      items: [
        {
          kind: BeatItemKind.Event,
          id: 'msg-133',
          content: 'You put down your phone and go to sleep.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-134',
          content: 'The next morning, your phone buzzes.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-135',
          sender: 'linda',
          content: 'Hazel please call me when you wake up',
          delay: 3000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-136',
          sender: 'linda',
          content: 'Taylor passed away last night',
          delay: 3000,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-137',
          sender: 'linda',
          content: 'Car accident. Around 9pm.',
          delay: 2500,
          conversationId: 'linda-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-138',
          content: 'You open the Taylor chat.',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Event,
          id: 'msg-139',
          content: 'The messages from last night are still there.',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-140',
          sender: 'taylor',
          content: 'you should have played with me',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-141',
          sender: 'taylor',
          content: 'now ill have to find someone else',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-142',
          sender: 'taylor',
          content: 'see you tonight hazel',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },
  },
}
