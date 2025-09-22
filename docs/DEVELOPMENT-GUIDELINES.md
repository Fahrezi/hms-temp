# Development Guidelines

## Table of Contents

- [ESLint Configuration](#eslint-configuration)
- [Project Structure](#project-structure)
- [File Naming Conventions](#file-naming-conventions)
- [Component Organization](#component-organization)
- [Code Style Guidelines](#code-style-guidelines)
- [Styling Guidelines](#styling-guidelines)
- [TypeScript Guidelines](#typescript-guidelines)
- [Environment Variables & Config Best Practices](#environment-variables--config-best-practices)
- [Image Optimization](#image-optimization)

## ESLint Configuration

ESLint rules are defined in `eslint.config.js`. Avoid disabling rules unless absolutely necessary. When disabling rules, add a comment explaining why:<br/>

```typescript
// Disabled eslint because <reason>
// eslint-disable-next-line rule-name
```

## Project Structure

| Folder                  | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| /public                 | Static assets (images, fonts, etc.)                   |
| /src/components/commons | Shared components used across multiple pages          |
| /src/components/layouts | Layout components (header, footer, etc.)              |
| /src/components/pages   | Page-specific components with their logic and styling |
| /src/components/ui      | Base UI components (buttons, inputs, etc.)            |
| /src/constants          | Shared constant values                                |
| /src/context            | React Context providers and their related logic       |
| /src/hooks              | Reusable custom React hooks                           |
| /src/libs               | External library configurations and instances         |
| /src/routes             | Route components and configurations                   |
| /src/services           | API service definitions and implementations           |
| /src/styles             | Global styles                                         |
| /src/types              | TypeScript type definitions and interfaces            |
| /src/utils              | Utility functions and helpers                         |

### Key directory purposes of Libs and Utils

#### **/src/libs**

Contains configurations and instances of external libraries. This directory is for code that interfaces with or configures third-party packages.

Example:

```typescript
// filepath: /src/libs/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
```

#### **/src/utils**

Contains pure utility functions, browser API wrappers, and environment helpers. These are standalone functions that don't depend on external libraries.

Example:

```typescript
// filepath: /src/utils/storage.ts
const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(key, JSON.stringify(value));
};
```

## File Naming Conventions

- React Components: **PascalCase** (e.g., `Button.tsx`)
- Media Files: **kebab-case** (e.g., `hero-image.png`)
- Utility Files: **camelCase** (e.g., `formatDate.ts`)
- Component Support Files: Match component name (e.g., `Button.helpers.ts`)
- Context Files: **PascalCase** (e.g., `UserContext.tsx`)
- Hook Files: **camelCase** starting with "use" (e.g., `useLocalStorage.ts`)

## Component Organization

### Support Files

In a component, we can add supporting files that help the component manage its logic/styling.

1. **(componentname).module.scss**<br/>
   For declaring classes that are only used by one component.

2. **(componentname).constants.ts**<br/>
   For declaring constants that are only used by one component. Always try to create constant variables for strings/numbers to avoid `hardcode` or `magic numbers`. If a constant variable is only used in one component, store it in this file, but if the constant is used across multiple components, it can be stored in the `src/constants/` folder.

3. **(componentname).helpers.ts**<br/>
   For declaring functions/logic that are only used by one component. Always split the logic from a component, and use this helpers file for declaring functions/logic that are heavy and will be used by the component.

4. **use(componentname).tsx**<br/>
   For creating custom hooks that are only used by one component. Custom hooks are used to separate the logic from the component (fetching, listeners, data updates/manipulation, etc.).

### Component Export Structure

Each component should have its own directory with an `index.tsx` file that re-exports the component. This pattern provides cleaner imports and better module organization.

The `index.tsx` file should contain:

```typescript
export { default } from './Button';
```

or

```typescript
import Button from './Button';

export default Button;
```

This allows for cleaner imports:

```typescript
// ✅ Good
import Input from '@/components/ui/Button';

// ❌ Avoid
import Input from '@/components/ui/Button/Button';
```

### Directory Structure

```
src/components/ui/Button/
├── Button.tsx           # Main component
├── Button.module.scss   # Scoped styles
├── Button.constants.ts  # Component constants
├── Button.helpers.ts    # Helper functions
├── useButton.tsx        # Component-specific hook
└── index.tsx            # Re-export file
└── __tests__/           # Test directory
    ├── Button.test.tsx    # Component tests
    └── useButton.test.tsx # Hook tests
```

### Compound Components

If a component has sub-components (e.g., `<Select.Option />`), organize them like this:

```
src/components/ui/Select/
├── Select.tsx
├── SelectOption.tsx
├── SelectContext.tsx
├── Select.module.scss
├── index.tsx
```

## Code Style Guidelines

- Variables (except constants) are written in **camelCase**.<br/>
- Constant variables are written in **SCREAMING_SNAKE_CASE**.<br/>
- Functions/Methods are declared using **camelCase**.<br/>
- Components, contexts or something related to react function component are declared using **PascalCase**.<br/>
- Custom hooks are declared using **camelCase** and should start with `use`.<br/>
- Boolean variables should start with `is`, `has`, or `should` (e.g., `isLoading`).
- Use **arrow functions** (`const fn = () => {}`) for function declaration (pure functions, helpers, event handlers, callbacks, etc).

## Styling Guidelines

We use **SCSS module** in this project to keep styles scoped to the specific component they are defined in. This ensures that styles are not globally applied, reducing the chance of unintended style overrides across components.

In addition to SCSS module, we follow the **BEM (Block, Element, Modifier)** methodology to organize our CSS class names. BEM ensures that our CSS remains structured, scalable, and easy to maintain, especially as the project grows.

For example, a component named `Button` would follow this structure:

```scss
// Button.module.scss

.button {
  & {
    // Styling for the button
  }
  &__icon {
    // Styling for the icon within the button
  }

  &--primary {
    // Styling for the primary variant of the button
  }
}
```

- Block: The main container element (e.g., button).
- Element: A part of the block (e.g., \_\_icon).
- Modifier: A variant or state of the block (e.g., --primary).

### Usage Example

```jsx
// Component usage

import styles from './Button.module.scss'

<button className={styles.button}>Click me</button>
<button className={`${styles.button} ${styles['button--primary']}`}>
  Primary Button
  <span className={styles.button__icon}>→</span>
</button>
```

## TypeScript Guidelines

**Prefer `type` over `interface`** unless extending other interfaces for several reasons:

1. Flexibility: type offers greater flexibility for defining various types beyond just object shapes, including function signatures, union types, and more. This versatility makes it suitable for handling the diverse typing needs within a React application.

2. Props and State: While both type and interface can be used for props and state, type is often preferred due to its conciseness and ability to express more complex prop type relationships (e.g., optional props, readonly props).

3. Refs: type is generally the better choice for defining ref types, as interfaces don't work well with the MutableRefObject type often used for refs.

4. Functions: type is the clear winner for defining function types, offering a straightforward way to specify parameter types and return types.

5. Consistency: While interfaces have their place (especially when inheritance is needed), favoring type promotes consistency across your codebase, making it easier to reason about and maintain.

Also, use **discriminated unions** for flexible component props.

Example:

```typescript
type ButtonProps = { variant: 'primary'; onClick: () => void } | { variant: 'link'; href: string };
```

However, interfaces are still useful when working with extensive use of interfaces or anticipate needing inheritance for your type definitions, so there might be scenarios where interfaces are more appropriate. But in general, we favor types for their flexibility and ability to handle a wider range of use cases.

## Environment Variables & Config Best Practices

For detailed environment variables configuration and best practices, please refer to:

- [Environment Variables Guidelines](./ENVIRONMENT-VARIABLES.md)

## Image Optimization

### Lazy Loading Images

To improve performance and user experience, all non-critical images should implement lazy loading. Our codebase includes a custom LazyImage component that handles this efficiently.

### Quick Overview

- **What**: LazyImage is a React component that defers loading images until they're about to enter the viewport
- **Why**: Improves initial page load time, reduces bandwidth usage, and prevents layout shifts
- **When to use**: For all non-critical images, especially in:
  - Long scrolling pages
  - Image galleries
  - Product listings
  - Blog posts
- **When not to use**: Critical above-the-fold images that should load immediately (hero images, logos, etc.)

### Basic Implementation

```tsx
import LazyImage from '@/components/ui/LazyImage';

// Basic usage
const ProductImage = () => {
  return <LazyImage src='/images/product.jpg' alt='Product description' aspectRatio='1/1' />;
};
```

### Best Practices

1. **Always provide alt text** for accessibility
2. **Set aspect ratio** to prevent layout shifts
3. **Use appropriate image sizes** for different viewports
4. **Optimize image files** before using them:
   - Compress images appropriately
   - Use modern formats (WebP with fallbacks)
   - Choose the right format (JPEG for photos, PNG for graphics)

For detailed documentation on the LazyImage component, including all available props, advanced usage examples, and implementation details, please refer to:<br/>
[LazyImage Component Documentation](./LAZY-IMAGE-COMPONENT.md)

## Testing Guidelines

This project use Vitest and React Testing Library for testing. Tests should be placed in a `__tests__` directory within the component's directory.

### Test File Structure

```
src/components/ui/Button/
├── Button.tsx           # Main component
├── Button.module.scss   # Scoped styles
├── Button.constants.ts  # Component constants
├── Button.helpers.ts    # Helper functions
├── useButton.tsx        # Component-specific hook
├── index.tsx            # Re-export file
└── __tests__/           # Test directory
    ├── Button.test.tsx    # Component tests
    └── useButton.test.tsx # Hook tests
```

### Test File Naming

- Component tests: `ComponentName.test.tsx`
- Hook tests: `useHookName.test.tsx`
- Helper tests: `fileName.test.ts`

### Testing Principles

1. **Component Testing**

```tsx
// filepath: src/components/ui/Button/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

2. **Hook Testing**

```tsx
// filepath: src/components/ui/Button/__tests__/useButton.test.tsx
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useButton } from '../useButton';

describe('useButton', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useButton());
    expect(result.current.isPressed).toBe(false);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useButton());

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.isPressed).toBe(true);
  });
});
```

### Best Practices

1. **Test Structure**

   - Use descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)
   - Group related tests using `describe` blocks
   - Keep tests focused and concise

2. **Component Testing**

   - Test user interactions
   - Verify rendered output
   - Check accessibility attributes
   - Test different prop combinations

3. **Hook Testing**

   - Test initial values
   - Verify state updates
   - Test side effects
   - Mock external dependencies

4. **Mocking**

```tsx
// Mocking API calls
vi.mock('@/services/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'mocked' }),
}));

// Mocking hooks
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));
```

### Common Testing Patterns

1. **Async Operations**

```tsx
it('handles async operations', async () => {
  render(<AsyncComponent />);

  // Wait for loading state
  expect(screen.getByRole('progressbar')).toBeInTheDocument();

  // Wait for content
  await screen.findByText('Loaded Content');

  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
```

2. **Context Testing**

```tsx
const wrapper = ({ children }) => (
  <ThemeProvider>
    <AuthContext.Provider value={mockAuthValue}>{children}</AuthContext.Provider>
  </ThemeProvider>
);

const { result } = renderHook(() => useAuth(), { wrapper });
```

3. **Event Testing**

```tsx
it('handles form submission', async () => {
  const onSubmit = vi.fn();
  render(<Form onSubmit={onSubmit} />);

  await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(onSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      email: 'test@example.com',
    }),
  );
});
```

### Testing Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Update snapshots
npm run test:update

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```
