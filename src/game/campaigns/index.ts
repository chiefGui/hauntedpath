import type { Campaign } from '../../engine'
import { unknownNumberCampaign } from './unknown-number'

export const campaigns: Campaign[] = [unknownNumberCampaign]

export function getCampaign(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id)
}
