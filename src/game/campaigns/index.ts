import type { Campaign } from '../../engine'
import { midnightGameCampaign } from './midnight-game'
import { unknownNumberCampaign } from './unknown-number'

export const campaigns: Campaign[] = [midnightGameCampaign, unknownNumberCampaign]

export function getCampaign(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id)
}
