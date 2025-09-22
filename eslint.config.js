import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginQuery from '@tanstack/eslint-plugin-query';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'vitest.config.ts'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...pluginQuery.configs['flat/recommended'],
      importPlugin.flatConfigs.recommended,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: prettierPlugin,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@tanstack/query': pluginQuery,
      'simple-import-sort': simpleImportSort,
      sonarjs,
    },
    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          paths: ['src'],
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      },
      react: { version: '18.3' },
    },
    rules: {
      // extend all rules from recommended configs
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // custom react rules
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/prop-types': 'off',
      'react/function-component-definition': ['error', { namedComponents: ['function-declaration', 'arrow-function'] }],
      'react/no-unstable-nested-components': 'off',
      'react/require-default-props': 'off',

      // import sorting rules
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // First group: external modules, library & side effect imports
            ['^@?\\w', '^\\u0000'],
            // Second group: components
            ['^@/components'],
            // Third group: custom hooks
            ['^@/hooks'],
            // Fourth group: services
            ['^@/services'],
            // Fifth group: utils, contansts or types
            ['^@/utils', '^@/constants', '^@/types'],
            // Sixth group: relative paths up until 3 level
            [
              '^\\./?$',
              '^\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\.(?!/?$)',
              '^\\.\\./\\.\\./\\.\\./?$',
              '^\\.\\./\\.\\./\\.\\.(?!/?$)',
            ],
            // Seventh group: SCSS/CSS
            ['\\.s?css$'],
            // Default group: everything else
            ['^.'],
          ],
        },
      ],
      'import/no-unresolved': 'error',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],

      // maintainability rules
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      // sonarjs rules
      'sonarjs/cognitive-complexity': ['error', 15],
      'sonarjs/no-duplicate-string': 2,
      'sonarjs/no-extra-arguments': 2,
    },
  },
  {
    files: ['vite.config.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
