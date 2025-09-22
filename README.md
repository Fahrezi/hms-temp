# Codebase React + Vite + TypeScript

A modern React project foundation built with Vite and TypeScript for rapid development.

## Prerequisites

- Node.js 20.x or later
- npm or yarn package manager
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Supported operating systems: Windows (including WSL), Linux, and macOS

## Quick Start

1. Clone the repository:

```bash
git clone [repository-url]
cd codebase-react-vite-ts
```

2. Install dependencies and set up Git hooks:

```bash
npm install

# Run this once after cloning and install
npm run prepare
```

> Note: The `prepare` script only needs to be run once after cloning. It sets up Git hooks using Husky for code quality enforcement.

3. Start development server:

```bash
npm run dev
```

Visit `http://localhost:portshowincli` to view your application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the project with type checking
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run Vitest tests once
- `npm run test:watch` - Run Vitest tests in watch mode
- `npm run test:update` - Update test snapshots
- `npm run test:ui` - Run Vitest with UI interface and coverage
- `npm run test:coverage` - Run tests with coverage report
- `npm run generate-pwa-assets` - Generate PWA assets from logo

## Core Technologies

### Main Dependencies

- **React** - UI library
- **React Router DOM** - Routing solution
- **TanStack Query** - Data fetching and state management
- **React Hook Form** - Form state management and validation
- **Zod** - TypeScript-first schema validation

### Development Tools

- **Vite** - Build tool and dev server
- **TypeScript** - Type safety and developer experience
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **SASS** - CSS preprocessing
- **Husky** - Git hooks for code quality enforcement
- **Vitest** - Fast unit testing framework with snapshot and coverage support

## Code Quality

This project uses:

- TypeScript for static type checking
- ESLint for code linting
- Prettier for consistent code formatting
- Various ESLint plugins for React, and TypeScript

### ESLint Configuration Note

This project uses ESLint 9 with flat config. To ensure proper functioning in VS Code:

1. Open VS Code Command Palette (`Ctrl+Shift+P` on Windows, `Cmd+Shift+P` on macOS)
2. Type and select "Preferences: Open User Settings (JSON)"
3. Find and remove or comment out the `eslint.options.extensions` setting:

```jsonc
{
  // Comment out or remove this if it exists
  // "eslint.options": {
  //   "extensions": [".js", ".jsx", ".ts", ".tsx"]
  // }
}
```

## Development Guidelines

For detailed development guidelines, please refer to:

- [Development Guidelines](./docs/DEVELOPMENT-GUIDELINES.md)

## Environment Variables

This project uses environment variables for configuration. For detailed environment configuration and best practices, please refer to:

- [Environment Variables Guidelines](./docs/ENVIRONMENT-VARIABLES.md)

## Progressive Web App (PWA)

This project includes built-in PWA support for creating installable, offline-capable web applications. For detailed configuration options and best practices, please refer to:

- [Progressive Web App Guidelines](./docs/PROGRESSIVE-WEB-APP.md)

## Docker

This project includes Docker support for containerization. For detailed Docker configuration and best practices, please refer to:

- [Docker Guidelines](./docs/DOCKER-GUIDELINES.md)

## Contributing

Please read our [Contributing Guidelines](./docs/CONTRIBUTING.md) for details on our branch naming convention and commit message format.

Key points for contribution:

- Branch naming: `type/jira-code/subject` (e.g., `feat/BCRT-1000/add-login-page`)
- Commit messages: `type(jira-code): subject` (e.g., `feat(BCRT-1000): implement login form`)
- Always create branch from `develop`

---

For questions or support, please reach out to the development team. Happy coding! 🚀.
