import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorPage } from './ErrorPage';

describe('ErrorPage', () => {
  it('should render default title and message', () => {
    render(<ErrorPage />);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong. Please try again.')
    ).toBeInTheDocument();
  });

  it('should render custom title and message', () => {
    render(
      <ErrorPage title="Custom Error" message="This is a custom error message" />
    );
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('This is a custom error message')).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', async () => {
    const user = userEvent.setup();
    const handleRetry = vi.fn();
    render(<ErrorPage onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  it('should not render retry button when showRetry is false', () => {
    const handleRetry = vi.fn();
    render(<ErrorPage onRetry={handleRetry} showRetry={false} />);

    expect(screen.queryByRole('button', { name: /try again/i })).not.toBeInTheDocument();
  });

  it('should render action button when provided', async () => {
    const user = userEvent.setup();
    const handleAction = vi.fn();
    render(
      <ErrorPage
        actionLabel="View Details"
        onAction={handleAction}
        showRetry={false}
      />
    );

    const actionButton = screen.getByRole('button', { name: /view details/i });
    expect(actionButton).toBeInTheDocument();

    await user.click(actionButton);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });

  it('should render helpful tips section', () => {
    render(<ErrorPage />);
    expect(screen.getByText(/you can also try:/i)).toBeInTheDocument();
    expect(screen.getByText(/refreshing the page/i)).toBeInTheDocument();
    expect(
      screen.getByText(/checking your internet connection/i)
    ).toBeInTheDocument();
  });

  it('should render error icon', () => {
    render(<ErrorPage />);
    // The icon is rendered via Phosphor Icons, we can check for the container
    const iconContainer = document.querySelector('.bg-red-100');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    render(<ErrorPage />);
    const container = document.querySelector('.min-h-screen.bg-gray-50');
    expect(container).toBeInTheDocument();

    const card = document.querySelector('.bg-white.rounded-xl.shadow-lg');
    expect(card).toBeInTheDocument();
  });
});

