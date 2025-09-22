# Contributing Guidelines

This document outlines the standards for branch naming and commit message conventions.

## Branch Naming Convention

Format: **type/jira-code/subject**

Examples:

- `feat/BCRT-1000/implement-login-page`
- `fix/NO-JIRA/header-profile-dropdown`

## Commit Message Convention

Format: **type(jira-code): subject**

Examples:

- `feat(BCRT-1000): implement login form validation`
- `fix(NO-JIRA): resolve user state clearing issue`

## Development Workflow

All development work should branch off from the `develop` branch, which serves as the primary integration branch for the project.

## Type Definitions

When creating branches or commit messages, use these predefined types:

- `feat`: New feature implementation (user-facing functionality)
- `fix`: Bug fixes (user-facing issues)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.) without logic changes
- `refactor`: Code refactoring (e.g., renaming variables, restructuring code)
- `test`: Adding or modifying tests (no production code changes)
- `chore`: Maintenance tasks (e.g., dependency updates, build process changes)

## Examples

### Branch Names

```bash
feat/BCRT-1001/add-user-authentication
fix/BCRT-1002/resolve-login-redirect
docs/NO-JIRA/update-api-documentation
refactor/BCRT-1003/restructure-auth-flow
```

### Commit Messages

```bash
feat(BCRT-1001): implement OAuth2 authentication
fix(BCRT-1002): resolve infinite redirect loop on login
docs(NO-JIRA): add API endpoint documentation
refactor(BCRT-1003): restructure authentication flow
```

## Additional Resources

For more detailed information about commit message conventions and best practices, refer to:

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages)
- [Karma Git Commit Message Convention](http://karma-runner.github.io/1.0/dev/git-commit-msg.html)
