import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ErrorPage } from './ErrorPage';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle React component errors
 * Prevents the entire application from crashing when an error occurs
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }
    // In production, you could log to an error reporting service here
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.resetError);
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <ErrorPage
              title="Something Went Wrong"
              message="We're sorry, but something unexpected happened. Please try refreshing the page or click the button below to try again."
              onRetry={this.resetError}
              showRetry={true}
              actionLabel={
                import.meta.env.DEV ? 'Show Error Details' : undefined
              }
              onAction={
                import.meta.env.DEV
                  ? () => {
                      // In development, log full error details
                      console.error('Error details:', {
                        error: this.state.error,
                        message: this.state.error?.message,
                        stack: this.state.error?.stack,
                      });
                      alert(
                        `Error: ${this.state.error?.message}\n\nCheck console for full details.`
                      );
                    }
                  : undefined
              }
            />
            {import.meta.env.DEV && (
              <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
                <details className="cursor-pointer">
                  <summary className="text-sm font-medium text-gray-700 mb-2">
                    Error details (development only)
                  </summary>
                  <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40 mt-2">
                    {this.state.error.toString()}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

