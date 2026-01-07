import { Component, type ReactNode } from 'react'
import { clearAllData } from '../../engine'
import { Button } from '../primitives'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  handleClearCache = async () => {
    await clearAllData()
    window.location.reload()
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">💀</div>
            <h1 className="text-xl font-semibold text-foreground mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-muted-foreground max-w-sm">
              The game encountered an unexpected error. This might be due to
              corrupted save data.
            </p>
          </div>

          {this.state.error && (
            <pre className="text-xs text-destructive bg-destructive/10 p-3 rounded-lg mb-6 max-w-full overflow-auto">
              {this.state.error.message}
            </pre>
          )}

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button onClick={this.handleReload} variant="secondary">
              Try Again
            </Button>
            <Button onClick={this.handleClearCache} variant="ghost">
              Clear Cache & Reload
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-6">
            Clearing cache will reset all your game progress.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
