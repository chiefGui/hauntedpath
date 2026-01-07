// Story time parser - converts writer-friendly time strings to Date objects

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

export type StoryTimeContext = {
  current: Date
  baseYear: number
}

export class StoryTimeService {
  /**
   * Parse a story start string into a Date
   * e.g., "Jan 7, 2026, 2:45 AM"
   */
  static parseStart(start: string): Date | null {
    const date = new Date(start)
    if (isNaN(date.getTime())) {
      return this.parseFlexible(start, new Date())
    }
    return date
  }

  /**
   * Create initial context from campaign story.start
   */
  static createContext(startString: string): StoryTimeContext | null {
    const start = this.parseStart(startString)
    if (!start) return null
    return {
      current: start,
      baseYear: start.getFullYear(),
    }
  }

  /**
   * Parse a time string and advance the context
   * Returns the parsed Date and updates context.current
   */
  static parse(timeString: string, context: StoryTimeContext): Date {
    const result = this.parseFlexible(timeString, context.current, context.baseYear)
    context.current = result
    return result
  }

  /**
   * Parse flexible time formats:
   * - "2:47 AM" - time only (same day, or next day if earlier)
   * - "3:15 PM" - time only
   * - "Tuesday, 3:15 AM" - day of week + time
   * - "Jan 8, 2:00 AM" - month day + time
   * - "Jan 8, 2026, 2:00 AM" - full date
   * - "+30m" - relative minutes
   * - "+2h" - relative hours
   * - "next day, 6:00 AM" - next day at time
   * - "3 days later, noon" - days later
   */
  private static parseFlexible(input: string, current: Date, baseYear?: number): Date {
    const str = input.trim().toLowerCase()

    // Relative: +30m, +2h, +1d
    const relativeMatch = str.match(/^\+(\d+)(m|h|d)$/)
    if (relativeMatch) {
      const amount = parseInt(relativeMatch[1], 10)
      const unit = relativeMatch[2]
      const result = new Date(current)
      if (unit === 'm') result.setMinutes(result.getMinutes() + amount)
      if (unit === 'h') result.setHours(result.getHours() + amount)
      if (unit === 'd') result.setDate(result.getDate() + amount)
      return result
    }

    // "next day, TIME" or "X days later, TIME"
    const daysLaterMatch = str.match(/^(?:next day|(\d+) days? later),?\s*(.+)$/)
    if (daysLaterMatch) {
      const days = daysLaterMatch[1] ? parseInt(daysLaterMatch[1], 10) : 1
      const timeStr = daysLaterMatch[2]
      const result = new Date(current)
      result.setDate(result.getDate() + days)
      return this.applyTime(result, timeStr)
    }

    // "DAY, TIME" (e.g., "Tuesday, 3:15 AM")
    const dayMatch = str.match(/^(monday|tuesday|wednesday|thursday|friday|saturday|sunday),?\s*(.+)$/)
    if (dayMatch) {
      const targetDay = DAYS.indexOf(dayMatch[1])
      const timeStr = dayMatch[2]
      const result = new Date(current)
      const currentDay = result.getDay()
      let daysToAdd = targetDay - currentDay
      if (daysToAdd <= 0) daysToAdd += 7 // next occurrence
      result.setDate(result.getDate() + daysToAdd)
      return this.applyTime(result, timeStr)
    }

    // "MONTH DAY, YEAR, TIME" or "MONTH DAY, TIME"
    const dateMatch = str.match(/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(\d{1,2})(?:,?\s+(\d{4}))?,?\s*(.+)?$/i)
    if (dateMatch) {
      const month = MONTHS.indexOf(dateMatch[1].toLowerCase())
      const day = parseInt(dateMatch[2], 10)
      const year = dateMatch[3] ? parseInt(dateMatch[3], 10) : (baseYear ?? current.getFullYear())
      const timeStr = dateMatch[4] || '12:00 AM'
      const result = new Date(year, month, day)
      return this.applyTime(result, timeStr)
    }

    // Time only: "2:47 AM", "3:15 PM", "noon", "midnight"
    const result = new Date(current)
    const applied = this.applyTime(result, str)

    // If time is earlier than current, assume next day
    if (applied <= current) {
      applied.setDate(applied.getDate() + 1)
    }

    return applied
  }

  /**
   * Apply a time string to a date
   */
  private static applyTime(date: Date, timeStr: string): Date {
    const str = timeStr.trim().toLowerCase()

    if (str === 'noon') {
      date.setHours(12, 0, 0, 0)
      return date
    }

    if (str === 'midnight') {
      date.setHours(0, 0, 0, 0)
      return date
    }

    // "H:MM AM/PM" or "HH:MM AM/PM"
    const timeMatch = str.match(/^(\d{1,2}):(\d{2})\s*(am|pm)?$/i)
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10)
      const minutes = parseInt(timeMatch[2], 10)
      const period = timeMatch[3]?.toLowerCase()

      if (period === 'pm' && hours < 12) hours += 12
      if (period === 'am' && hours === 12) hours = 0

      date.setHours(hours, minutes, 0, 0)
      return date
    }

    // "H AM/PM"
    const hourMatch = str.match(/^(\d{1,2})\s*(am|pm)$/i)
    if (hourMatch) {
      let hours = parseInt(hourMatch[1], 10)
      const period = hourMatch[2].toLowerCase()

      if (period === 'pm' && hours < 12) hours += 12
      if (period === 'am' && hours === 12) hours = 0

      date.setHours(hours, 0, 0, 0)
      return date
    }

    return date
  }

  /**
   * Format a Date for display in the chat
   * e.g., "2:47 AM" or "Tuesday 2:47 AM" if day changed
   */
  static format(date: Date, previousDate?: Date): string {
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })

    // If no previous date or same day, just show time
    if (!previousDate || this.isSameDay(date, previousDate)) {
      return time
    }

    // Different day - show day name
    const day = date.toLocaleDateString('en-US', { weekday: 'long' })
    return `${day} ${time}`
  }

  /**
   * Check if two dates are on the same calendar day
   */
  static isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    )
  }
}
