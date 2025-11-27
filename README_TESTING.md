# Testing Guide

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/react) for testing.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm test -- --run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Structure

Tests are located next to the files they test:
- Component tests: `ComponentName.test.tsx`
- Utility tests: `utilityName.test.ts`
- Service tests: `serviceName.test.ts`

## Writing Tests

### Component Tests

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Testing with React Query

Use the `render` function from `testUtils.tsx` which includes QueryClientProvider:

```tsx
import { render, screen } from '../test/testUtils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render with react query', () => {
    render(<MyComponent />);
    // Your test...
  });
});
```

### Utility Function Tests

```tsx
import { describe, it, expect } from 'vitest';
import { myUtility } from './myUtility';

describe('myUtility', () => {
  it('should work correctly', () => {
    expect(myUtility(input)).toBe(expectedOutput);
  });
});
```

### Mocking Fetch

```tsx
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => mockData,
});
```

## Available Matchers

We use `@testing-library/jest-dom` matchers:
- `toBeInTheDocument()`
- `toHaveClass()`
- `toBeDisabled()`
- `toHaveTextContent()`
- And more...

## Coverage

Coverage reports are generated in the `coverage/` directory when running `npm run test:coverage`.

## Best Practices

1. **Test behavior, not implementation**: Focus on what the user sees and does
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Keep tests simple**: Each test should verify one thing
4. **Use descriptive test names**: They serve as documentation
5. **Clean up**: Tests automatically clean up after themselves

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

