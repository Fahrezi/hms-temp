# Environment Variables & Config Best Practices

We manage environment variables using a structured approach to ensure consistency and maintainability.

## Environment Files

Environment variables should be defined in `.env` files at the root of the project.

## Existing Environment Variables

| Key                             | Example Value           | Description                                                                                                                                              |
| ------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **VITE_API_URL**                | https://backendapi.com  | Base URL for API requests used in axios instance configuration                                                                                           |
| **VITE_SECRET_KEY**             | your-generated-key-here | Secret key used for encrypting/obfuscating authentication state in localStorage. <br/> You can generate the secret key with **openssl rand -base64 32**. |
| **VITE_ENABLE_SMALL_CONTAINER** | false                   | Enable small container mode with max-width of 480px for compact layouts                                                                                  |

### Adding New Environment Variables

1. Add the variable to `.env`:

```bash
# API Configuration
VITE_API_URL=https://api.example.com

# Security
VITE_SECRET_KEY=your-secret-key

# UI
VITE_ENABLE_SMALL_CONTAINER=false

# Your new variable
VITE_NEW_VARIABLE=default-value
```

2. Add the key to the environment constants:

```typescript
// filepath: /src/constants/envs.ts
export const ENVIRONMENT = {
  API_URL: 'API_URL',
  SECRET_KEY: 'SECRET_KEY',
  ENABLE_SMALL_CONTAINER: 'ENABLE_SMALL_CONTAINER',
  NEW_VARIABLE: 'NEW_VARIABLE',
} as const;
```

## Configuration Structure

### Define Environment Variables in Constants

```typescript
// filepath: /src/constants/envs.ts
export const ENVIRONMENT = {
  API_URL: 'API_URL',
  SECRET_KEY: 'SECRET_KEY',
  ENABLE_SMALL_CONTAINER: 'ENABLE_SMALL_CONTAINER',
} as const;
```

### Utility Function to Retrieve Environment Variables

```typescript
// filepath: /src/utils/env.ts
import { ENVIRONMENT } from '@/constants/envs';

const getEnvValue = (env: keyof typeof ENVIRONMENT): string => {
  const value = import.meta.env[`VITE_${env}`] as string | undefined;

  if (!value) {
    throw new Error(`${env} is not defined in the environment variables`);
  }

  return value;
};

export default getEnvValue;
```

### Usage Example

```typescript
// Usage in API Configurations
import getEnvValue from '@/utils/env';
import { ENVIRONMENT } from '@/constants/envs';
import axios from 'axios';

const instance = axios.create({
  baseURL: getEnvValue(ENVIRONMENT.API_URL),
});
```

## Best Practices

### 1. Environment Files

- Never commit `.env` files (except `.env.example`)
- Keep `.env.example` updated with all required variables
- Include descriptive comments in `.env.example`

### 2. Variable Naming

- Use `VITE_` prefix for all environment variables
- Use SCREAMING_SNAKE_CASE after the prefix
- Be descriptive: `VITE_API_URL` instead of `VITE_URL`

### 3. Usage Guidelines

- Store all environment keys in `src/constants/envs.ts`
- Use `getEnvValue` utility instead of direct `import.meta.env`
- Throw errors for missing required variables
- Never use environment variables directly in components
