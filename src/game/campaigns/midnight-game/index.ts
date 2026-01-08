import {
  BeatItemKind,
  ContactStatus,
  type Campaign,
} from '../../../engine'

// Taylor's avatar
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

// Cover image
const coverImage = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0a"/>
      <stop offset="100%" style="stop-color:#1a0a1a"/>
    </linearGradient>
  </defs>
  <rect width="400" height="225" fill="url(#bg)"/>
  <text x="200" y="105" font-family="system-ui" font-size="14" fill="#444" text-anchor="middle">forward this to 5 people</text>
  <text x="200" y="125" font-family="system-ui" font-size="14" fill="#444" text-anchor="middle">or else</text>
</svg>
`)}`

export const midnightGameCampaign: Campaign = {
  id: 'midnight-game',
  title: 'Forward This',
  description: 'Taylor just sent you a chain message. You know how these things are.',
  coverImage,
  meta: {
    genre: ['Horror', 'Thriller'],
    duration: '10-15 min',
    rating: 'Mature',
    year: 2026,
    longDescription: "It's late. Taylor sends you one of those chain messages. You've seen a hundred of these before. But something about this one feels different.",
  },
  protagonist: {
    id: 'player',
    name: 'Hazel',
    avatar: playerAvatar,
    age: 22,
    bio: 'Taylor has been your best friend since college.',
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
    start: 'Jan 10, 2026, 11:52 PM',
  },
  startBeatId: 'start',
  beats: {
    start: {
      id: 'start',
      at: '11:52 PM',
      presenceChanges: {
        taylor: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-1',
          sender: 'taylor',
          content: "⛓️ FORWARD THIS MESSAGE TO 5 PEOPLE OR THE GIRL FROM THE PHOTOGRAPH WILL VISIT YOU TONIGHT. THIS IS NOT A JOKE. MARIA SANTOS IGNORED THIS MESSAGE AND WAS FOUND DEAD 3 DAYS LATER. THE PHOTOGRAPH WAS TAKEN IN 1987 AND EVERYONE WHO HAS SEEN IT AND NOT FORWARDED THE MESSAGE HAS DIED. YOU HAVE BEEN WARNED. ⛓️",
          delay: 1000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-2',
          sender: 'taylor',
          content: 'lmao sorry i had to send it to 5 people',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-1a',
          text: 'haha youre the worst',
          nextBeatId: 'banter-1',
        },
        {
          id: 'choice-1b',
          text: 'really tay',
          nextBeatId: 'banter-1',
        },
        {
          id: 'choice-1c',
          text: 'who even sends these anymore',
          nextBeatId: 'banter-2',
        },
      ],
    },

    'banter-1': {
      id: 'banter-1',
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
          content: 'but like what if',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-2a',
          text: 'what if what',
          nextBeatId: 'what-if',
        },
        {
          id: 'choice-2b',
          text: 'tay its a chain message',
          nextBeatId: 'skeptic',
        },
      ],
    },

    'banter-2': {
      id: 'banter-2',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-5',
          sender: 'taylor',
          content: 'my cousin sent it to me',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-6',
          sender: 'taylor',
          content: 'shes like super freaked out',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-7',
          sender: 'taylor',
          content: 'apparently her friend didnt forward it and like',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-8',
          sender: 'taylor',
          content: 'idk something happened',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-3a',
          text: 'something like what',
          nextBeatId: 'something-happened',
        },
        {
          id: 'choice-3b',
          text: 'tay come on',
          nextBeatId: 'skeptic',
        },
      ],
    },

    'what-if': {
      id: 'what-if',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-9',
          sender: 'taylor',
          content: 'idk',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-10',
          sender: 'taylor',
          content: 'my cousin sent it to me and she was really weird about it',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-11',
          sender: 'taylor',
          content: 'said her friend got it and didnt send it and then',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-12',
          sender: 'taylor',
          content: 'something happened to her',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-4a',
          text: 'what happened',
          nextBeatId: 'something-happened',
        },
        {
          id: 'choice-4b',
          text: 'taylor...',
          nextBeatId: 'skeptic',
        },
      ],
    },

    'skeptic': {
      id: 'skeptic',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-13',
          sender: 'taylor',
          content: 'i know i know',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-14',
          sender: 'taylor',
          content: 'its dumb',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-15',
          sender: 'taylor',
          content: 'but like',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-16',
          sender: 'taylor',
          content: 'you should still forward it just in case',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-5a',
          text: 'im not forwarding a chain message',
          nextBeatId: 'not-forwarding',
        },
        {
          id: 'choice-5b',
          text: 'to who lol',
          nextBeatId: 'to-who',
        },
      ],
    },

    'something-happened': {
      id: 'something-happened',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-17',
          sender: 'taylor',
          content: 'ok so apparently',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-18',
          sender: 'taylor',
          content: 'she woke up and there was someone in her room',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-19',
          sender: 'taylor',
          content: 'just standing there',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-20',
          sender: 'taylor',
          content: 'watching her',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-6a',
          text: 'what',
          nextBeatId: 'more-details',
        },
        {
          id: 'choice-6b',
          text: 'tay thats not funny',
          nextBeatId: 'not-joking',
        },
      ],
    },

    'more-details': {
      id: 'more-details',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-21',
          sender: 'taylor',
          content: 'yeah',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-22',
          sender: 'taylor',
          content: 'she said it was a girl',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-23',
          sender: 'taylor',
          content: 'with like really long hair covering her face',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-24',
          sender: 'taylor',
          content: 'and she just stood there until she screamed and then it was gone',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-7a',
          text: 'thats creepy as fuck',
          nextBeatId: 'creepy-agree',
        },
        {
          id: 'choice-7b',
          text: 'she probably dreamed it',
          nextBeatId: 'dreamed-it',
        },
      ],
    },

    'not-joking': {
      id: 'not-joking',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-25',
          sender: 'taylor',
          content: 'im not joking',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-26',
          sender: 'taylor',
          content: 'my cousin was legit freaked out',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-27',
          sender: 'taylor',
          content: 'and her friend is like not the type to make stuff up',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-8a',
          text: 'ok so what exactly did she see',
          nextBeatId: 'more-details',
        },
        {
          id: 'choice-8b',
          text: 'idk tay',
          nextBeatId: 'forward-or-not',
        },
      ],
    },

    'creepy-agree': {
      id: 'creepy-agree',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-28',
          sender: 'taylor',
          content: 'right',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-29',
          sender: 'taylor',
          content: 'so like',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-30',
          sender: 'taylor',
          content: 'just forward it ok',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-9a',
          text: 'fine who do i even send it to',
          nextBeatId: 'to-who',
        },
        {
          id: 'choice-9b',
          text: 'im not sending a chain message tay',
          nextBeatId: 'not-forwarding',
        },
      ],
    },

    'dreamed-it': {
      id: 'dreamed-it',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-31',
          sender: 'taylor',
          content: 'thats what i said',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-32',
          sender: 'taylor',
          content: 'but my cousin said she had scratches on her arm the next day',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-33',
          sender: 'taylor',
          content: 'like she didnt have before',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-10a',
          text: 'ok thats weird',
          nextBeatId: 'forward-or-not',
        },
        {
          id: 'choice-10b',
          text: 'she couldve scratched herself in her sleep',
          nextBeatId: 'forward-or-not',
        },
      ],
    },

    'to-who': {
      id: 'to-who',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-34',
          sender: 'taylor',
          content: 'idk anyone',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-35',
          sender: 'taylor',
          content: 'just pick 5 people',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-36',
          sender: 'taylor',
          content: 'or dont',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-37',
          sender: 'taylor',
          content: 'its probably nothing',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-38',
          sender: 'taylor',
          content: 'anyway im going to sleep',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-39',
          sender: 'taylor',
          content: 'night!',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-11a',
          text: 'night tay',
          nextBeatId: 'alone-1',
        },
        {
          id: 'choice-11b',
          text: 'wait youre just gonna leave me with this',
          nextBeatId: 'taylor-leaves',
        },
      ],
    },

    'not-forwarding': {
      id: 'not-forwarding',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-40',
          sender: 'taylor',
          content: 'ok fine',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-41',
          sender: 'taylor',
          content: 'your funeral lol',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-42',
          sender: 'taylor',
          content: 'jk',
          delay: 1200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-43',
          sender: 'taylor',
          content: 'anyway im going to bed',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-44',
          sender: 'taylor',
          content: 'night!',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-12a',
          text: 'night',
          nextBeatId: 'alone-1',
        },
        {
          id: 'choice-12b',
          text: 'thanks for the nightmares',
          nextBeatId: 'taylor-leaves',
        },
      ],
    },

    'forward-or-not': {
      id: 'forward-or-not',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-45',
          sender: 'taylor',
          content: 'anyway just forward it to be safe',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-46',
          sender: 'taylor',
          content: 'im going to sleep',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-47',
          sender: 'taylor',
          content: 'night hazel',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-13a',
          text: 'night',
          nextBeatId: 'alone-1',
        },
        {
          id: 'choice-13b',
          text: 'tay wait',
          nextBeatId: 'taylor-leaves',
        },
      ],
    },

    'taylor-leaves': {
      id: 'taylor-leaves',
      presenceChanges: {
        taylor: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-48',
          sender: 'taylor',
          content: 'gotta sleep! talk tomorrow',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-14a',
          text: 'ok',
          nextBeatId: 'alone-1',
        },
      ],
    },

    'alone-1': {
      id: 'alone-1',
      at: '12:15 AM',
      presenceChanges: {
        taylor: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-49',
          sender: 'taylor',
          content: 'hey',
          delay: 15000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-50',
          sender: 'taylor',
          content: 'you still up?',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-15a',
          text: 'yeah why',
          nextBeatId: 'taylor-back',
        },
        {
          id: 'choice-15b',
          text: 'thought you were sleeping',
          nextBeatId: 'taylor-back',
        },
      ],
    },

    'taylor-back': {
      id: 'taylor-back',
      presenceChanges: {
        taylor: { status: ContactStatus.Online },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-51',
          sender: 'taylor',
          content: 'i cant sleep',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-52',
          sender: 'taylor',
          content: 'i keep thinking about that stupid message',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-16a',
          text: 'same honestly',
          nextBeatId: 'both-creeped',
        },
        {
          id: 'choice-16b',
          text: 'tay its just a chain message',
          nextBeatId: 'just-a-message',
        },
      ],
    },

    'both-creeped': {
      id: 'both-creeped',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-53',
          sender: 'taylor',
          content: 'did you forward it',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-17a',
          text: 'no',
          nextBeatId: 'didnt-forward',
        },
        {
          id: 'choice-17b',
          text: 'yeah to like 3 people',
          nextBeatId: 'forwarded-some',
        },
      ],
    },

    'just-a-message': {
      id: 'just-a-message',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-54',
          sender: 'taylor',
          content: 'i know',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-55',
          sender: 'taylor',
          content: 'but i heard something',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-18a',
          text: 'what',
          nextBeatId: 'taylor-heard',
        },
        {
          id: 'choice-18b',
          text: 'youre freaking yourself out',
          nextBeatId: 'freaking-out',
        },
      ],
    },

    'didnt-forward': {
      id: 'didnt-forward',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-56',
          sender: 'taylor',
          content: 'hazel',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-57',
          sender: 'taylor',
          content: 'i think i heard something downstairs',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-19a',
          text: 'what kind of something',
          nextBeatId: 'taylor-heard',
        },
        {
          id: 'choice-19b',
          text: 'its probably nothing',
          nextBeatId: 'freaking-out',
        },
      ],
    },

    'forwarded-some': {
      id: 'forwarded-some',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-58',
          sender: 'taylor',
          content: 'it said 5',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-59',
          sender: 'taylor',
          content: 'hazel i think i hear something',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-20a',
          text: 'what',
          nextBeatId: 'taylor-heard',
        },
        {
          id: 'choice-20b',
          text: 'tay relax',
          nextBeatId: 'freaking-out',
        },
      ],
    },

    'freaking-out': {
      id: 'freaking-out',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-60',
          sender: 'taylor',
          content: 'no hazel listen',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-61',
          sender: 'taylor',
          content: 'theres something in my house',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-21a',
          text: 'what do you mean',
          nextBeatId: 'taylor-heard',
        },
      ],
    },

    'taylor-heard': {
      id: 'taylor-heard',
      at: '12:23 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-62',
          sender: 'taylor',
          content: 'footsteps',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-63',
          sender: 'taylor',
          content: 'on the stairs',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-64',
          sender: 'taylor',
          content: 'hazel im not kidding',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-22a',
          text: 'maybe its your roommate',
          nextBeatId: 'not-roommate',
        },
        {
          id: 'choice-22b',
          text: 'call the police',
          nextBeatId: 'cant-call',
        },
        {
          id: 'choice-22c',
          text: 'tay youre scaring me',
          nextBeatId: 'both-scared',
        },
      ],
    },

    'not-roommate': {
      id: 'not-roommate',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-65',
          sender: 'taylor',
          content: 'shes not here this weekend',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-66',
          sender: 'taylor',
          content: 'hazel its getting closer',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-23a',
          text: 'lock your door',
          nextBeatId: 'lock-door',
        },
        {
          id: 'choice-23b',
          text: 'call someone',
          nextBeatId: 'cant-call',
        },
      ],
    },

    'cant-call': {
      id: 'cant-call',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-67',
          sender: 'taylor',
          content: 'i cant',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-68',
          sender: 'taylor',
          content: 'it will hear me',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-69',
          sender: 'taylor',
          content: 'fuck',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-70',
          sender: 'taylor',
          content: 'its outside my door',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-24a',
          text: 'dont open it',
          nextBeatId: 'door-moment',
        },
        {
          id: 'choice-24b',
          text: 'taylor hide',
          nextBeatId: 'door-moment',
        },
      ],
    },

    'both-scared': {
      id: 'both-scared',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-71',
          sender: 'taylor',
          content: 'im scared too',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-72',
          sender: 'taylor',
          content: 'its stopped',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-73',
          sender: 'taylor',
          content: 'right outside my room',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-25a',
          text: 'dont move',
          nextBeatId: 'door-moment',
        },
        {
          id: 'choice-25b',
          text: 'is your door locked',
          nextBeatId: 'lock-door',
        },
      ],
    },

    'lock-door': {
      id: 'lock-door',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-74',
          sender: 'taylor',
          content: 'yeah',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-75',
          sender: 'taylor',
          content: 'i think',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-76',
          sender: 'taylor',
          content: 'wait',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-77',
          sender: 'taylor',
          content: 'the handle is moving',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-26a',
          text: 'taylor',
          nextBeatId: 'door-moment',
        },
      ],
    },

    'door-moment': {
      id: 'door-moment',
      at: '12:31 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-78',
          sender: 'taylor',
          content: 'hazel',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-79',
          sender: 'taylor',
          content: 'someones trying to get in',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-80',
          sender: 'taylor',
          content: 'oh god',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-81',
          sender: 'taylor',
          content: 'it stopped',
          delay: 4000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-27a',
          text: 'is it gone',
          nextBeatId: 'silence',
        },
        {
          id: 'choice-27b',
          text: 'tay?',
          nextBeatId: 'silence',
        },
      ],
    },

    'silence': {
      id: 'silence',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-82',
          sender: 'taylor',
          content: 'i dont hear anything',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-83',
          sender: 'taylor',
          content: 'maybe it left',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-84',
          sender: 'taylor',
          content: 'hold on im gonna check',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-28a',
          text: 'no dont',
          nextBeatId: 'dont-check',
        },
        {
          id: 'choice-28b',
          text: 'be careful',
          nextBeatId: 'checking',
        },
      ],
    },

    'dont-check': {
      id: 'dont-check',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-85',
          sender: 'taylor',
          content: 'i have to know',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-86',
          sender: 'taylor',
          content: 'one sec',
          delay: 1500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-29a',
          text: 'taylor',
          nextBeatId: 'checking',
        },
      ],
    },

    'checking': {
      id: 'checking',
      at: '12:38 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-87',
          sender: 'taylor',
          content: 'ok opening the door',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-88',
          sender: 'taylor',
          content: 'nothing',
          delay: 4000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-89',
          sender: 'taylor',
          content: 'hallways empty',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-90',
          sender: 'taylor',
          content: 'i think i imagined it',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-91',
          sender: 'taylor',
          content: 'god im so dumb',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-30a',
          text: 'you scared the shit out of me',
          nextBeatId: 'relief',
        },
        {
          id: 'choice-30b',
          text: 'are you sure',
          nextBeatId: 'are-you-sure',
        },
      ],
    },

    'relief': {
      id: 'relief',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-92',
          sender: 'taylor',
          content: 'sorry lol',
          delay: 1800,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-93',
          sender: 'taylor',
          content: 'that chain message really got to me',
          delay: 2200,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-94',
          sender: 'taylor',
          content: 'anyway im gonna try to sleep again',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-95',
          sender: 'taylor',
          content: 'wait',
          delay: 3500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-31a',
          text: 'what',
          nextBeatId: 'wait-what',
        },
      ],
    },

    'are-you-sure': {
      id: 'are-you-sure',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-96',
          sender: 'taylor',
          content: 'yeah theres nothing',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-97',
          sender: 'taylor',
          content: 'wait',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-32a',
          text: 'what',
          nextBeatId: 'wait-what',
        },
      ],
    },

    'wait-what': {
      id: 'wait-what',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-98',
          sender: 'taylor',
          content: 'did you hear that',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-33a',
          text: 'hear what',
          nextBeatId: 'hear-what',
        },
        {
          id: 'choice-33b',
          text: 'tay im at my place i cant hear anything',
          nextBeatId: 'hear-what',
        },
      ],
    },

    'hear-what': {
      id: 'hear-what',
      at: '12:44 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-99',
          sender: 'taylor',
          content: 'behind me',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-34a',
          text: 'taylor run',
          nextBeatId: 'final-choice',
        },
        {
          id: 'choice-34b',
          text: 'what is it',
          nextBeatId: 'final-choice',
        },
      ],
    },

    'final-choice': {
      id: 'final-choice',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-100',
          sender: 'taylor',
          content: 'theres someone',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-101',
          sender: 'taylor',
          content: 'hazel theres someone in my room',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-102',
          sender: 'taylor',
          content: 'oh fuck',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-103',
          sender: 'taylor',
          content: 'she has no face',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-104',
          sender: 'taylor',
          content: 'just hair',
          delay: 2000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-105',
          sender: 'taylor',
          content: 'hazel shes looking at me',
          delay: 2500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-106',
          sender: 'taylor',
          content: 'how is she looking at me if she has no',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-35a',
          text: 'TAYLOR',
          nextBeatId: 'ending-1',
        },
        {
          id: 'choice-35b',
          text: 'get out of there',
          nextBeatId: 'ending-1',
        },
      ],
    },

    'ending-1': {
      id: 'ending-1',
      at: '12:47 AM',
      presenceChanges: {
        taylor: { status: ContactStatus.Offline },
      },
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-107',
          sender: 'taylor',
          content: 'shes coming clo',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-36a',
          text: 'taylor???',
          nextBeatId: 'ending-2',
        },
      ],
    },

    'ending-2': {
      id: 'ending-2',
      at: '12:52 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-108',
          sender: 'taylor',
          content: 'forward the message hazel',
          delay: 8000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [
        {
          id: 'choice-37a',
          text: 'taylor is that you',
          nextBeatId: 'ending-final',
        },
        {
          id: 'choice-37b',
          text: 'what happened',
          nextBeatId: 'ending-final',
        },
      ],
    },

    'ending-final': {
      id: 'ending-final',
      at: '12:55 AM',
      items: [
        {
          kind: BeatItemKind.Message,
          id: 'msg-109',
          sender: 'taylor',
          content: 'shes coming for you next',
          delay: 4000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-110',
          sender: 'taylor',
          content: 'unless you forward it',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-111',
          sender: 'taylor',
          content: '5 people hazel',
          delay: 3000,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-112',
          sender: 'taylor',
          content: 'or shell visit you tonight',
          delay: 3500,
          conversationId: 'taylor-chat',
        },
        {
          kind: BeatItemKind.Message,
          id: 'msg-113',
          sender: 'taylor',
          content: '⛓️ FORWARD THIS MESSAGE TO 5 PEOPLE ⛓️',
          delay: 5000,
          conversationId: 'taylor-chat',
        },
      ],
      choices: [],
      isEnding: true,
    },
  },
}
