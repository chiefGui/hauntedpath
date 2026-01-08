import {
  BeatItemKind,
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

// Player avatar
const playerAvatar = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#0b84fe"/>
  <circle cx="50" cy="40" r="20" fill="#fff"/>
  <ellipse cx="50" cy="85" rx="30" ry="25" fill="#fff"/>
</svg>
`)}`

// Cover image - phone screen glow in darkness
const coverImage = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#1a0a1a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="35%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="225" fill="url(#bg)"/>
  <ellipse cx="200" cy="112" rx="80" ry="60" fill="url(#glow)"/>
  <rect x="175" y="70" width="50" height="85" rx="5" fill="#1a1a2a" stroke="#333" stroke-width="1"/>
  <rect x="180" y="78" width="40" height="65" fill="#0f172a"/>
  <text x="200" y="195" font-family="system-ui" font-size="18" fill="#4a4a6a" text-anchor="middle">Do you remember?</text>
</svg>
`)}`

export const midnightGameCampaign: Campaign = {
  id: 'midnight-game',
  title: 'Do You Remember?',
  description:
    "11:47 PM. Taylor texts you out of the blue. She wants to reminisce. But some of the memories don't match yours.",
  coverImage,
  meta: {
    genre: ['Horror', 'Psychological', 'Mystery'],
    duration: '15-20 min',
    rating: 'Mature',
    year: 2026,
    longDescription:
      "You haven't heard from Taylor in a while. When she texts late at night wanting to catch up, you're happy to hear from her. But as you talk, something feels off. The details don't quite line up. The memories she shares aren't the ones you have. And the more you talk, the less sure you are about what's real.",
  },
  protagonist: {
    id: 'player',
    name: 'Mia',
    avatar: playerAvatar,
    age: 23,
    bio: 'Taylor has been your best friend since high school. You tell each other everything.',
  },
  characters: [
    {
      id: 'taylor',
      name: 'Taylor',
      avatar: taylorAvatar,
    },
  ],
  conversations: [
    {
      id: 'taylor-chat',
      characterIds: ['taylor'],
      name: 'Taylor',
    },
  ],
  startConversationId: 'taylor-chat',
  story: {
    start: 'Jan 10, 2026, 11:45 PM',
  },
  startBeatId: 'start',
  beats: {
    // ============================================
    // ACT 1: NORMAL CATCH-UP
    // ============================================
    start: {
      id: 'start',
      at: '11:47 PM',
      presenceChanges: {
        taylor: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-1',
          sender: 'taylor',
          content: 'hey stranger',
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
          text: 'omg hi!! its been forever',
          nextBeatId: 'catch-up-warm',
        },
        {
          id: 'choice-1b',
          text: 'hey! yeah cant sleep. whats up?',
          nextBeatId: 'catch-up-casual',
        },
        {
          id: 'choice-1c',
          text: 'taylor! i was literally just thinking about you',
          nextBeatId: 'catch-up-warm',
        },
      ],
    },

    'catch-up-warm': {
      id: 'catch-up-warm',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-3',
          sender: 'taylor',
          content: 'i know right',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-4',
          sender: 'taylor',
          content: 'i was just lying here and started thinking about old times',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-5',
          sender: 'taylor',
          content: 'felt like i had to text you',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'aw i love that. what were you thinking about?',
          nextBeatId: 'first-memory',
        },
        {
          id: 'choice-2b',
          text: 'same honestly. feels like we never talk anymore',
          nextBeatId: 'first-memory',
        },
      ],
    },

    'catch-up-casual': {
      id: 'catch-up-casual',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-6',
          sender: 'taylor',
          content: 'nothing really',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-7',
          sender: 'taylor',
          content: 'just been thinking about stuff',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-8',
          sender: 'taylor',
          content: 'you know how it is when you cant sleep',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-9',
          sender: 'taylor',
          content: 'your brain just goes places',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'yeah totally. what kind of stuff?',
          nextBeatId: 'first-memory',
        },
        {
          id: 'choice-3b',
          text: 'god yes. my brain does NOT shut up at night',
          nextBeatId: 'first-memory',
        },
      ],
    },

    // ============================================
    // FIRST MEMORY - seems normal
    // ============================================
    'first-memory': {
      id: 'first-memory',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-10',
          sender: 'taylor',
          content: 'do you remember that roadtrip we took after graduation',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-11',
          sender: 'taylor',
          content: 'when we drove to the coast',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-12',
          sender: 'taylor',
          content: 'that was such a good trip',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: 'YES omg that was the best. remember that weird motel?',
          nextBeatId: 'memory-motel',
        },
        {
          id: 'choice-4b',
          text: 'i think about that trip all the time honestly',
          nextBeatId: 'memory-expand',
        },
      ],
    },

    'memory-motel': {
      id: 'memory-motel',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-13',
          sender: 'taylor',
          content: 'the one with the pool',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-14',
          sender: 'taylor',
          content: 'we went swimming at like 2am',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-15',
          sender: 'taylor',
          content: 'and that guy from the front desk came out and yelled at us',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: 'haha yes! we were SO loud',
          nextBeatId: 'first-wrong-detail',
        },
        {
          id: 'choice-5b',
          text: 'lmao i cant believe we didnt get kicked out',
          nextBeatId: 'first-wrong-detail',
        },
      ],
    },

    'memory-expand': {
      id: 'memory-expand',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-16',
          sender: 'taylor',
          content: 'me too',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-17',
          sender: 'taylor',
          content: 'remember when we stopped at that diner',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-18',
          sender: 'taylor',
          content: 'and the waitress thought we were sisters',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: 'haha i mean we basically are at this point',
          nextBeatId: 'first-wrong-detail',
        },
        {
          id: 'choice-6b',
          text: 'people always think that! its the hair i think',
          nextBeatId: 'first-wrong-detail',
        },
      ],
    },

    // ============================================
    // FIRST WRONG DETAIL - subtle
    // ============================================
    'first-wrong-detail': {
      id: 'first-wrong-detail',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-19',
          sender: 'taylor',
          content: 'that whole summer was perfect honestly',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-20',
          sender: 'taylor',
          content: 'before you moved in with jake',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-21',
          sender: 'taylor',
          content: 'things got so busy after that',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: 'wait what? i never moved in with jake',
          nextBeatId: 'correction-jake',
        },
        {
          id: 'choice-7b',
          text: 'who is jake?',
          nextBeatId: 'correction-jake',
        },
        {
          id: 'choice-7c',
          text: 'yeah things definitely changed after that summer',
          nextBeatId: 'go-along-jake',
        },
      ],
    },

    'correction-jake': {
      id: 'correction-jake',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-22',
          sender: 'taylor',
          content: 'wait seriously?',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-23',
          sender: 'taylor',
          content: 'oh my god im so tired lol',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-24',
          sender: 'taylor',
          content: 'i dont know why i said that',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-25',
          sender: 'taylor',
          content: 'i meant after you started that job',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-26',
          sender: 'taylor',
          content: 'at the coffee shop',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: 'lol no worries. yeah that job was exhausting',
          nextBeatId: 'second-memory',
        },
        {
          id: 'choice-8b',
          text: 'tay i never worked at a coffee shop either',
          nextBeatId: 'second-correction',
        },
      ],
    },

    'go-along-jake': {
      id: 'go-along-jake',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-27',
          sender: 'taylor',
          content: 'how is he btw',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-28',
          sender: 'taylor',
          content: 'you guys still together?',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-9a',
          text: 'taylor i seriously dont know who jake is',
          nextBeatId: 'second-correction',
        },
        {
          id: 'choice-9b',
          text: 'are you thinking of someone else maybe?',
          nextBeatId: 'second-correction',
        },
      ],
    },

    'second-correction': {
      id: 'second-correction',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-29',
          sender: 'taylor',
          content: 'haha ok now youre messing with me',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-30',
          sender: 'taylor',
          content: 'jake',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-31',
          sender: 'taylor',
          content: 'tall guy',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-32',
          sender: 'taylor',
          content: 'you met him at that party',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-33',
          sender: 'taylor',
          content: 'i introduced you',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-10a',
          text: 'what party? tay im not joking',
          nextBeatId: 'taylor-insists',
        },
        {
          id: 'choice-10b',
          text: 'i think youre thinking of someone else',
          nextBeatId: 'taylor-insists',
        },
      ],
    },

    // ============================================
    // TAYLOR INSISTS
    // ============================================
    'taylor-insists': {
      id: 'taylor-insists',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-34',
          sender: 'taylor',
          content: 'mia come on',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-35',
          sender: 'taylor',
          content: 'the party at devons place',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-36',
          sender: 'taylor',
          content: 'last october',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-37',
          sender: 'taylor',
          content: 'you were wearing that green dress',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-38',
          sender: 'taylor',
          content: 'the one i helped you pick out',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-11a',
          text: 'i dont own a green dress',
          nextBeatId: 'more-wrong',
        },
        {
          id: 'choice-11b',
          text: 'i dont know anyone named devon',
          nextBeatId: 'more-wrong',
        },
        {
          id: 'choice-11c',
          text: 'are you ok? youre freaking me out a little',
          nextBeatId: 'taylor-concerned',
        },
      ],
    },

    'taylor-concerned': {
      id: 'taylor-concerned',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-39',
          sender: 'taylor',
          content: 'im freaking YOU out?',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-40',
          sender: 'taylor',
          content: 'mia youre the one pretending not to remember our whole lives',
          delay: 2800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-12a',
          text: 'im not pretending! none of this happened',
          nextBeatId: 'more-wrong',
        },
        {
          id: 'choice-12b',
          text: 'our whole lives? tay what are you talking about',
          nextBeatId: 'more-wrong',
        },
      ],
    },

    // ============================================
    // MORE WRONG - escalating
    // ============================================
    'more-wrong': {
      id: 'more-wrong',
      at: '12:08 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-41',
          sender: 'taylor',
          content: 'ok',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-42',
          sender: 'taylor',
          content: 'ok fine',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-43',
          sender: 'taylor',
          content: 'what DO you remember then',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-13a',
          text: 'i remember the roadtrip. i remember us being best friends since high school. i remember normal stuff',
          nextBeatId: 'taylor-questions',
        },
        {
          id: 'choice-13b',
          text: 'i remember everything except the stuff youre making up right now',
          nextBeatId: 'taylor-hurt',
        },
      ],
    },

    'taylor-questions': {
      id: 'taylor-questions',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-44',
          sender: 'taylor',
          content: 'best friends since high school',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-45',
          sender: 'taylor',
          content: 'mia we met in college',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-46',
          sender: 'taylor',
          content: 'freshman year',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-47',
          sender: 'taylor',
          content: 'you sat next to me in bio and asked to borrow a pen',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-14a',
          text: 'no we didnt. we grew up on the same street',
          nextBeatId: 'contradictions',
        },
        {
          id: 'choice-14b',
          text: 'taylor stop. this isnt funny anymore',
          nextBeatId: 'contradictions',
        },
      ],
    },

    'taylor-hurt': {
      id: 'taylor-hurt',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-48',
          sender: 'taylor',
          content: 'making up',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-49',
          sender: 'taylor',
          content: 'wow',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-50',
          sender: 'taylor',
          content: 'i text you because i miss you and you act like i dont even know you',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-15a',
          text: 'i miss you too but youre saying things that arent true',
          nextBeatId: 'contradictions',
        },
        {
          id: 'choice-15b',
          text: 'thats not what im saying. somethings just off tonight',
          nextBeatId: 'contradictions',
        },
      ],
    },

    // ============================================
    // CONTRADICTIONS PILE UP
    // ============================================
    'contradictions': {
      id: 'contradictions',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-51',
          sender: 'taylor',
          content: 'do you remember when we almost got matching tattoos',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-52',
          sender: 'taylor',
          content: 'little moons on our ankles',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-53',
          sender: 'taylor',
          content: 'but then you chickened out at the last second',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-16a',
          text: 'we did get them. i have one right now',
          nextBeatId: 'taylor-confused',
        },
        {
          id: 'choice-16b',
          text: 'taylor i have the tattoo. i didnt chicken out',
          nextBeatId: 'taylor-confused',
        },
      ],
    },

    'taylor-confused': {
      id: 'taylor-confused',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-54',
          sender: 'taylor',
          content: 'what',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-55',
          sender: 'taylor',
          content: 'no you dont',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-56',
          sender: 'taylor',
          content: 'i remember because i got mine alone',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-57',
          sender: 'taylor',
          content: 'and i was upset about it for weeks',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-17a',
          text: 'taylor look at my instagram. theres pics of both of us getting them',
          nextBeatId: 'proof',
        },
        {
          id: 'choice-17b',
          text: 'this is so weird. why do we remember this differently',
          nextBeatId: 'getting-scared',
        },
      ],
    },

    'proof': {
      id: 'proof',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-58',
          sender: 'taylor',
          content: 'i dont see any pics like that',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-59',
          sender: 'taylor',
          content: 'i just looked',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-60',
          sender: 'taylor',
          content: 'theres nothing',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-18a',
          text: 'what? theyre right there from last march',
          nextBeatId: 'getting-scared',
        },
        {
          id: 'choice-18b',
          text: 'taylor youre scaring me',
          nextBeatId: 'getting-scared',
        },
      ],
    },

    // ============================================
    // GETTING SCARED
    // ============================================
    'getting-scared': {
      id: 'getting-scared',
      at: '12:23 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-61',
          sender: 'taylor',
          content: 'mia',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-62',
          sender: 'taylor',
          content: 'i need to ask you something',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-63',
          sender: 'taylor',
          content: 'and i need you to be honest',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-19a',
          text: 'ok',
          nextBeatId: 'taylor-asks',
        },
        {
          id: 'choice-19b',
          text: 'what is it',
          nextBeatId: 'taylor-asks',
        },
      ],
    },

    'taylor-asks': {
      id: 'taylor-asks',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-64',
          sender: 'taylor',
          content: 'where are you right now',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-20a',
          text: 'home? in bed?',
          nextBeatId: 'taylor-where',
        },
        {
          id: 'choice-20b',
          text: 'at my apartment. why?',
          nextBeatId: 'taylor-where',
        },
      ],
    },

    'taylor-where': {
      id: 'taylor-where',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-65',
          sender: 'taylor',
          content: 'which apartment',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-21a',
          text: 'the one on brooks st? where ive lived for two years?',
          nextBeatId: 'taylor-wrong-address',
        },
        {
          id: 'choice-21b',
          text: 'taylor you know where i live',
          nextBeatId: 'taylor-says-address',
        },
      ],
    },

    'taylor-wrong-address': {
      id: 'taylor-wrong-address',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-66',
          sender: 'taylor',
          content: 'brooks st',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-67',
          sender: 'taylor',
          content: 'you moved',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-22a',
          text: 'no i didnt?',
          nextBeatId: 'taylor-insists-moved',
        },
        {
          id: 'choice-22b',
          text: 'taylor i havent moved',
          nextBeatId: 'taylor-insists-moved',
        },
      ],
    },

    'taylor-says-address': {
      id: 'taylor-says-address',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-68',
          sender: 'taylor',
          content: 'yeah the place on elm',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-69',
          sender: 'taylor',
          content: 'second floor',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-70',
          sender: 'taylor',
          content: 'with the blue door',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-23a',
          text: 'i dont live on elm. i live on brooks',
          nextBeatId: 'taylor-insists-moved',
        },
        {
          id: 'choice-23b',
          text: 'taylor ive never lived anywhere with a blue door',
          nextBeatId: 'taylor-insists-moved',
        },
      ],
    },

    'taylor-insists-moved': {
      id: 'taylor-insists-moved',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-71',
          sender: 'taylor',
          content: 'mia stop',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-72',
          sender: 'taylor',
          content: 'just stop',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-73',
          sender: 'taylor',
          content: 'i was at your apartment last week',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-74',
          sender: 'taylor',
          content: 'we watched a movie',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-75',
          sender: 'taylor',
          content: 'you made that pasta you always make',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-24a',
          text: 'taylor i havent seen you in person in months',
          nextBeatId: 'when-last-saw',
        },
        {
          id: 'choice-24b',
          text: 'we didnt hang out last week',
          nextBeatId: 'when-last-saw',
        },
      ],
    },

    // ============================================
    // WHEN DID THEY LAST SEE EACH OTHER
    // ============================================
    'when-last-saw': {
      id: 'when-last-saw',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-76',
          sender: 'taylor',
          content: 'what',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-77',
          sender: 'taylor',
          content: 'mia thats not true',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-78',
          sender: 'taylor',
          content: 'we see each other all the time',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-25a',
          text: 'when did we last see each other. give me a specific day',
          nextBeatId: 'taylor-specific',
        },
        {
          id: 'choice-25b',
          text: 'taylor when do you think we last hung out',
          nextBeatId: 'taylor-specific',
        },
      ],
    },

    'taylor-specific': {
      id: 'taylor-specific',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-79',
          sender: 'taylor',
          content: 'last saturday',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-80',
          sender: 'taylor',
          content: 'we got brunch',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-81',
          sender: 'taylor',
          content: 'at that place you like',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-82',
          sender: 'taylor',
          content: 'the one with the waffles',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-26a',
          text: 'taylor last saturday i was at my parents house',
          nextBeatId: 'deep-wrong',
        },
        {
          id: 'choice-26b',
          text: 'i didnt leave my apartment last saturday',
          nextBeatId: 'deep-wrong',
        },
      ],
    },

    // ============================================
    // DEEP WRONG - the reality gap
    // ============================================
    'deep-wrong': {
      id: 'deep-wrong',
      at: '12:34 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-83',
          sender: 'taylor',
          content: 'this isnt funny',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-84',
          sender: 'taylor',
          content: 'why are you doing this',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-85',
          sender: 'taylor',
          content: 'i thought you were my best friend',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-27a',
          text: 'i am your best friend. thats why this is scaring me',
          nextBeatId: 'mia-scared',
        },
        {
          id: 'choice-27b',
          text: 'im not doing anything! you keep saying things that didnt happen',
          nextBeatId: 'taylor-defensive',
        },
      ],
    },

    'taylor-defensive': {
      id: 'taylor-defensive',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-86',
          sender: 'taylor',
          content: 'they did happen',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-87',
          sender: 'taylor',
          content: 'i was there',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-88',
          sender: 'taylor',
          content: 'i remember everything',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-28a',
          text: 'taylor something is really wrong',
          nextBeatId: 'mia-scared',
        },
        {
          id: 'choice-28b',
          text: 'but i wasnt there. how can we both remember different things',
          nextBeatId: 'mia-scared',
        },
      ],
    },

    'mia-scared': {
      id: 'mia-scared',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-89',
          sender: 'taylor',
          content: 'whats wrong',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-90',
          sender: 'taylor',
          content: 'tell me',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-29a',
          text: 'either youre remembering a life that didnt happen or i am',
          nextBeatId: 'either-or',
        },
        {
          id: 'choice-29b',
          text: 'i dont know how to say this but its like youre talking about someone else',
          nextBeatId: 'someone-else',
        },
      ],
    },

    'either-or': {
      id: 'either-or',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-91',
          sender: 'taylor',
          content: 'what do you mean',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-30a',
          text: 'one of us is wrong about everything and i dont think its me',
          nextBeatId: 'divergence',
        },
        {
          id: 'choice-30b',
          text: 'were remembering different versions of our friendship',
          nextBeatId: 'divergence',
        },
      ],
    },

    'someone-else': {
      id: 'someone-else',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-92',
          sender: 'taylor',
          content: 'someone else',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-93',
          sender: 'taylor',
          content: 'mia im talking about you',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-94',
          sender: 'taylor',
          content: 'my best friend',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-95',
          sender: 'taylor',
          content: 'who i love',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-96',
          sender: 'taylor',
          content: 'who im worried about right now',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-31a',
          text: 'and im worried about you',
          nextBeatId: 'divergence',
        },
        {
          id: 'choice-31b',
          text: 'taylor i love you too but something is very wrong here',
          nextBeatId: 'divergence',
        },
      ],
    },

    // ============================================
    // THE DIVERGENCE
    // ============================================
    'divergence': {
      id: 'divergence',
      at: '12:47 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-97',
          sender: 'taylor',
          content: 'ok',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-98',
          sender: 'taylor',
          content: 'lets figure this out',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-99',
          sender: 'taylor',
          content: 'whats your moms name',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-32a',
          text: 'diane',
          nextBeatId: 'test-answers',
        },
        {
          id: 'choice-32b',
          text: 'why',
          nextBeatId: 'taylor-explains-test',
        },
      ],
    },

    'taylor-explains-test': {
      id: 'taylor-explains-test',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-100',
          sender: 'taylor',
          content: 'just answer',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-101',
          sender: 'taylor',
          content: 'if were both confused lets start with stuff we should both know',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-33a',
          text: 'diane',
          nextBeatId: 'test-answers',
        },
      ],
    },

    'test-answers': {
      id: 'test-answers',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-102',
          sender: 'taylor',
          content: 'ok good',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-103',
          sender: 'taylor',
          content: 'what high school did you go to',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-34a',
          text: 'lincoln',
          nextBeatId: 'test-two',
        },
        {
          id: 'choice-34b',
          text: 'lincoln high. same as you',
          nextBeatId: 'test-two-same',
        },
      ],
    },

    'test-two': {
      id: 'test-two',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-104',
          sender: 'taylor',
          content: 'mia i went to westfield',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-105',
          sender: 'taylor',
          content: 'we didnt meet until college',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-106',
          sender: 'taylor',
          content: 'i told you this',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-35a',
          text: 'taylor we grew up together. you lived three houses down',
          nextBeatId: 'fundamental-split',
        },
        {
          id: 'choice-35b',
          text: 'no. you went to lincoln. we walked to school together every day',
          nextBeatId: 'fundamental-split',
        },
      ],
    },

    'test-two-same': {
      id: 'test-two-same',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-107',
          sender: 'taylor',
          content: 'i didnt go to lincoln',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-108',
          sender: 'taylor',
          content: 'i went to westfield',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-109',
          sender: 'taylor',
          content: 'mia we met in college',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-36a',
          text: 'you came to my birthday party when we were 12',
          nextBeatId: 'fundamental-split',
        },
        {
          id: 'choice-36b',
          text: 'thats not possible',
          nextBeatId: 'fundamental-split',
        },
      ],
    },

    // ============================================
    // THE FUNDAMENTAL SPLIT
    // ============================================
    'fundamental-split': {
      id: 'fundamental-split',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-110',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-111',
          sender: 'taylor',
          content: 'what year is it',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-37a',
          text: '2026',
          nextBeatId: 'year-question',
        },
        {
          id: 'choice-37b',
          text: 'what kind of question is that',
          nextBeatId: 'year-dodge',
        },
      ],
    },

    'year-dodge': {
      id: 'year-dodge',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-112',
          sender: 'taylor',
          content: 'just answer',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-38a',
          text: '2026',
          nextBeatId: 'year-question',
        },
      ],
    },

    'year-question': {
      id: 'year-question',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-113',
          sender: 'taylor',
          content: 'ok',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-114',
          sender: 'taylor',
          content: 'good',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-115',
          sender: 'taylor',
          content: 'same here',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-116',
          sender: 'taylor',
          content: 'what month',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-39a',
          text: 'january',
          nextBeatId: 'month-check',
        },
        {
          id: 'choice-39b',
          text: 'its january 10th',
          nextBeatId: 'date-check',
        },
      ],
    },

    'month-check': {
      id: 'month-check',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-117',
          sender: 'taylor',
          content: 'what day',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-40a',
          text: 'the 10th',
          nextBeatId: 'date-check',
        },
      ],
    },

    'date-check': {
      id: 'date-check',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-118',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-119',
          sender: 'taylor',
          content: 'its march',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-120',
          sender: 'taylor',
          content: 'march 15th',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-41a',
          text: 'no its not. i just looked at my phone. january 10th',
          nextBeatId: 'time-split',
        },
        {
          id: 'choice-41b',
          text: 'taylor thats two months from now',
          nextBeatId: 'time-split',
        },
      ],
    },

    // ============================================
    // TIME SPLIT - something is deeply wrong
    // ============================================
    'time-split': {
      id: 'time-split',
      at: '1:02 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-121',
          sender: 'taylor',
          content: 'mia im looking at my phone right now',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-122',
          sender: 'taylor',
          content: 'march 15 2026',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-123',
          sender: 'taylor',
          content: '1:02 am',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-42a',
          text: 'thats impossible',
          nextBeatId: 'impossible',
        },
        {
          id: 'choice-42b',
          text: 'send me a screenshot',
          nextBeatId: 'screenshot',
        },
      ],
    },

    'screenshot': {
      id: 'screenshot',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-124',
          sender: 'taylor',
          content: 'ok',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-125',
          sender: 'taylor',
          content: 'sending',
          delay: 3500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-126',
          sender: 'taylor',
          content: 'did you get it',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-43a',
          text: 'no nothing came through',
          nextBeatId: 'no-image',
        },
        {
          id: 'choice-43b',
          text: 'i dont see anything',
          nextBeatId: 'no-image',
        },
      ],
    },

    'no-image': {
      id: 'no-image',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-127',
          sender: 'taylor',
          content: 'what',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-128',
          sender: 'taylor',
          content: 'i sent it',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-129',
          sender: 'taylor',
          content: 'it says delivered',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-44a',
          text: 'theres nothing here taylor',
          nextBeatId: 'impossible',
        },
      ],
    },

    'impossible': {
      id: 'impossible',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-130',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-131',
          sender: 'taylor',
          content: 'im scared',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-45a',
          text: 'me too',
          nextBeatId: 'both-scared',
        },
        {
          id: 'choice-45b',
          text: 'i dont understand whats happening',
          nextBeatId: 'both-scared',
        },
      ],
    },

    // ============================================
    // BOTH SCARED
    // ============================================
    'both-scared': {
      id: 'both-scared',
      at: '1:15 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-132',
          sender: 'taylor',
          content: 'i looked something up',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-133',
          sender: 'taylor',
          content: 'i searched your name',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-46a',
          text: 'what did you find',
          nextBeatId: 'search-results',
        },
        {
          id: 'choice-46b',
          text: 'why',
          nextBeatId: 'search-results',
        },
      ],
    },

    'search-results': {
      id: 'search-results',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-134',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-135',
          sender: 'taylor',
          content: 'i found a news article',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-136',
          sender: 'taylor',
          content: 'from january',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-47a',
          text: 'what article',
          nextBeatId: 'the-article',
        },
        {
          id: 'choice-47b',
          text: 'taylor youre scaring me',
          nextBeatId: 'the-article',
        },
      ],
    },

    'the-article': {
      id: 'the-article',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-137',
          sender: 'taylor',
          content: 'january 10th',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-138',
          sender: 'taylor',
          content: 'there was an accident',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-139',
          sender: 'taylor',
          content: 'on brooks st',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-48a',
          text: 'what kind of accident',
          nextBeatId: 'the-accident',
        },
        {
          id: 'choice-48b',
          text: 'thats my street',
          nextBeatId: 'the-accident',
        },
      ],
    },

    'the-accident': {
      id: 'the-accident',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-140',
          sender: 'taylor',
          content: 'a fire',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-141',
          sender: 'taylor',
          content: 'in an apartment building',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-142',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-143',
          sender: 'taylor',
          content: 'your name is in the article',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-49a',
          text: 'what does it say',
          nextBeatId: 'revelation-path-1',
        },
        {
          id: 'choice-49b',
          text: 'taylor stop',
          nextBeatId: 'taylor-continues',
        },
      ],
    },

    'taylor-continues': {
      id: 'taylor-continues',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-144',
          sender: 'taylor',
          content: 'i have to tell you',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-145',
          sender: 'taylor',
          content: 'mia you have to know',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-50a',
          text: 'tell me',
          nextBeatId: 'revelation-path-1',
        },
      ],
    },

    // ============================================
    // THE REVELATION
    // ============================================
    'revelation-path-1': {
      id: 'revelation-path-1',
      at: '1:33 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-146',
          sender: 'taylor',
          content: 'it says you died',
          delay: 3500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-147',
          sender: 'taylor',
          content: 'january 10th',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-148',
          sender: 'taylor',
          content: 'two months ago',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-51a',
          text: 'thats not possible. im right here',
          nextBeatId: 'denial',
        },
        {
          id: 'choice-51b',
          text: 'taylor thats today for me',
          nextBeatId: 'today',
        },
      ],
    },

    'denial': {
      id: 'denial',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-149',
          sender: 'taylor',
          content: 'i know',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-150',
          sender: 'taylor',
          content: 'i know youre right there',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-151',
          sender: 'taylor',
          content: 'but',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-152',
          sender: 'taylor',
          content: 'mia',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-153',
          sender: 'taylor',
          content: 'i went to your funeral',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-52a',
          text: 'no',
          nextBeatId: 'final-exchange',
        },
        {
          id: 'choice-52b',
          text: 'taylor stop please',
          nextBeatId: 'final-exchange',
        },
      ],
    },

    'today': {
      id: 'today',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-154',
          sender: 'taylor',
          content: 'what',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-53a',
          text: 'its january 10th right now. tonight.',
          nextBeatId: 'tonight',
        },
      ],
    },

    'tonight': {
      id: 'tonight',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-155',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-156',
          sender: 'taylor',
          content: 'the article says the fire started at 2am',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-157',
          sender: 'taylor',
          content: 'what time is it there',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-54a',
          text: 'its almost 2',
          nextBeatId: 'final-warning',
        },
        {
          id: 'choice-54b',
          text: 'taylor what are you saying',
          nextBeatId: 'taylor-explicit',
        },
      ],
    },

    'taylor-explicit': {
      id: 'taylor-explicit',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-158',
          sender: 'taylor',
          content: 'im saying you need to get out',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-159',
          sender: 'taylor',
          content: 'NOW',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-160',
          sender: 'taylor',
          content: 'mia please',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-161',
          sender: 'taylor',
          content: 'get out of the apartment',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-55a',
          text: 'ok im going',
          nextBeatId: 'ending-leave',
        },
        {
          id: 'choice-55b',
          text: 'taylor this is crazy',
          nextBeatId: 'ending-stay',
        },
      ],
    },

    'final-warning': {
      id: 'final-warning',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-162',
          sender: 'taylor',
          content: 'mia get out',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-163',
          sender: 'taylor',
          content: 'get out of the apartment right now',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-164',
          sender: 'taylor',
          content: 'please',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-165',
          sender: 'taylor',
          content: 'i already lost you once',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-56a',
          text: 'ok im leaving',
          nextBeatId: 'ending-leave',
        },
        {
          id: 'choice-56b',
          text: 'taylor im fine. nothing is going to happen',
          nextBeatId: 'ending-stay',
        },
      ],
    },

    'final-exchange': {
      id: 'final-exchange',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-166',
          sender: 'taylor',
          content: 'i cried for weeks',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-167',
          sender: 'taylor',
          content: 'and then tonight i just',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-168',
          sender: 'taylor',
          content: 'i had to text you',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-169',
          sender: 'taylor',
          content: 'i didnt think youd answer',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-57a',
          text: 'but i did',
          nextBeatId: 'ending-connection',
        },
        {
          id: 'choice-57b',
          text: 'im still here',
          nextBeatId: 'ending-connection',
        },
      ],
    },

    // ============================================
    // ENDINGS
    // ============================================
    'ending-leave': {
      id: 'ending-leave',
      at: '1:54 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-170',
          sender: 'taylor',
          content: 'good',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-171',
          sender: 'taylor',
          content: 'keep texting me',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-172',
          sender: 'taylor',
          content: 'let me know when youre out',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-173',
          sender: 'taylor',
          content: 'please',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-174',
          sender: 'taylor',
          content: 'mia?',
          delay: 8000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-175',
          sender: 'taylor',
          content: 'are you out?',
          delay: 5000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-176',
          sender: 'taylor',
          content: 'mia please answer',
          delay: 6000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-177',
          sender: 'taylor',
          content: 'please',
          delay: 10000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-stay': {
      id: 'ending-stay',
      at: '1:58 AM',
      presenceChanges: {
        taylor: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-178',
          sender: 'taylor',
          content: 'mia please listen to me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-179',
          sender: 'taylor',
          content: 'i cant lose you again',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-180',
          sender: 'taylor',
          content: 'mia',
          delay: 5000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-181',
          sender: 'taylor',
          content: 'do you smell smoke',
          delay: 8000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    'ending-connection': {
      id: 'ending-connection',
      at: '1:47 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-182',
          sender: 'taylor',
          content: 'yeah',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-183',
          sender: 'taylor',
          content: 'you did',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-184',
          sender: 'taylor',
          content: 'mia',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-185',
          sender: 'taylor',
          content: 'if you can hear me',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-186',
          sender: 'taylor',
          content: 'wherever you are',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-187',
          sender: 'taylor',
          content: 'i miss you so much',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-188',
          sender: 'taylor',
          content: 'goodnight',
          delay: 4000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },

    // ============================================
    // SECOND MEMORY PATH (if player doesn't correct Jake)
    // ============================================
    'second-memory': {
      id: 'second-memory',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-189',
          sender: 'taylor',
          content: 'yeah you were always so tired',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-190',
          sender: 'taylor',
          content: 'remember how you used to fall asleep at movie nights',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-191',
          sender: 'taylor',
          content: 'every single time',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-58a',
          text: 'haha yeah i was the worst',
          nextBeatId: 'more-wrong',
        },
        {
          id: 'choice-58b',
          text: 'wait what coffee shop do you think i worked at',
          nextBeatId: 'second-correction',
        },
      ],
    },
  },
}
