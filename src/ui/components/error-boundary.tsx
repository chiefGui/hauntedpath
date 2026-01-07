import { Component, type ReactNode } from 'react'
import { clearAllData } from '../../engine'

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

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: '#09090b',
            color: '#fafafa',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>💀</div>

          <h1
            style={{
              fontSize: '20px',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
              maxWidth: '300px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            This might be due to corrupted save data from a previous version.
          </p>

          {this.state.error && (
            <pre
              style={{
                fontSize: '12px',
                color: '#f87171',
                backgroundColor: 'rgba(248, 113, 113, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '24px',
                maxWidth: '100%',
                overflow: 'auto',
              }}
            >
              {this.state.error.message}
            </pre>
          )}

          <button
            type="button"
            onClick={this.handleClearCache}
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 500,
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            Clear Cache & Reload
          </button>

          <p
            style={{
              fontSize: '12px',
              color: '#71717a',
              marginTop: '16px',
            }}
          >
            This will reset all game progress.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
