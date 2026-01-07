export const ChoiceType = {
  Text: 'text',
  Action: 'action',
} as const

export type ChoiceType = (typeof ChoiceType)[keyof typeof ChoiceType]

export type Choice = {
  id: string
  text: string
  nextBeatId: string
  type?: ChoiceType
}

export type ChoicePrompt = {
  id: string
  beatId: string
  choices: Choice[]
  selectedChoiceId: string | null
  timestamp: number
}

export class ChoiceService {
  static createPrompt(beatId: string, choices: Choice[]): ChoicePrompt {
    return {
      id: crypto.randomUUID(),
      beatId,
      choices,
      selectedChoiceId: null,
      timestamp: Date.now(),
    }
  }

  static markSelected(prompt: ChoicePrompt, choiceId: string): ChoicePrompt {
    return { ...prompt, selectedChoiceId: choiceId }
  }

  static isAction(choice: Choice): boolean {
    return choice.type === ChoiceType.Action
  }
}
