export function formatLastSeen(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) {
    return 'last seen just now'
  }

  if (minutes < 60) {
    return `last seen ${minutes}m ago`
  }

  if (hours < 24) {
    return `last seen ${hours}h ago`
  }

  if (days === 1) {
    return 'last seen yesterday'
  }

  if (days < 7) {
    return `last seen ${days}d ago`
  }

  // For older dates, show the actual date
  const date = new Date(timestamp)
  return `last seen ${date.toLocaleDateString()}`
}
