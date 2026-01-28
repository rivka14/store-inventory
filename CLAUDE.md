## Code Style

**No unnecessary comments** - Code should be self-documenting. Only add comments where logic isn't self-evident or for critical business rules.

## Git Workflow

### Commits
Use **Conventional Commits**: `<type>(<scope>): <subject>`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Critical: Commit after completing each small feature or logical unit of work.**
- Don't wait for the entire feature to be complete
- Commit when a discrete piece of functionality is working
- Each commit should represent a complete, tested mini-feature

### Branches
**Always ask before naming the branch.**

Naming: `feature/`, `fix/`, `refactor/`, `docs/` + descriptive name

Branch from main unless working on dependent feature.

### Before Push
1. **Test your changes** - verify the feature works
2. **No console errors** - check browser/terminal for errors
3. **Update docs if needed** - reflect changes in documentation

### Before Commit
1. **Commit the completed feature** with descriptive conventional commit message
2. Run `unset GITHUB_TOKEN` before pushing to avoid authentication conflicts
