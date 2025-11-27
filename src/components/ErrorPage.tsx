import { ArrowPathIcon, ExclamationTriangleIcon } from '@phosphor-icons/react';
import { Button } from './Button';

interface ErrorPageProps {
  /** Error message to display */
  message?: string;
  /** Optional error title */
  title?: string;
  /** Callback function when retry button is clicked */
  onRetry?: () => void;
  /** Whether to show retry button */
  showRetry?: boolean;
  /** Additional action button */
  actionLabel?: string;
  /** Callback for additional action */
  onAction?: () => void;
}

/**
 * Reusable error page component with consistent UI
 * Used for displaying error states throughout the application
 */
export const ErrorPage = ({
  message = 'Something went wrong. Please try again.',
  title = 'Oops!',
  onRetry,
  showRetry = true,
  actionLabel,
  onAction,
}: ErrorPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <ExclamationTriangleIcon
              size={48}
              weight="fill"
              className="text-red-600"
            />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>

        {/* Error Message */}
        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showRetry && onRetry && (
            <Button
              variant="primary"
              onClick={onRetry}
              className="flex items-center justify-center gap-2"
            >
              <ArrowPathIcon size={20} weight="bold" />
              Try Again
            </Button>
          )}
          {actionLabel && onAction && (
            <Button
              variant="secondary"
              onClick={onAction}
              className="flex items-center justify-center"
            >
              {actionLabel}
            </Button>
          )}
        </div>

        {/* Helpful Tips */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">You can also try:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Refreshing the page</li>
            <li>• Checking your internet connection</li>
            <li>• Coming back in a few moments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

