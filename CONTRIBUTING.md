# Contributing guide

Hi there! 👋 Thanks for checking out this project.
Every form of contribution is valuable. Below are the main ways to get involved:

## 1. Share Feedback and Ideas 💡

- Use the **[Discussions](https://github.com/matt765/spireflow/discussions/1)** on GitHub to share feedback, suggestions, or ideas for improvement.
- Open an **[Issue](https://github.com/matt765/spireflow/issues)** if you've found a bug or something doesn't work as expected.

## 2. Support Development 🔥

If you'd like to support continued work on the project, you can do so through [**GitHub Sponsors**](https://github.com/sponsors/matt765).

## 3. Contribute code

Feel free to fork the repository and submit a merge requests. If you've spotted something that can be improved or fixed, your input is more than welcome.

### Development setup

```bash
git clone https://github.com/matt765/spireflow.git
cd spireflow
npm install
npm run dev
```

The app runs at `http://localhost:3000` in standalone mode with mock data — no backend needed.

### Submitting a pull request

1. Fork the repository
2. Create a branch from `main` (`git checkout -b my-fix`)
3. Make your changes
4. Run checks before pushing:
   ```bash
   npm run lint
   npm run type-check
   npm run test
   ```
5. Push and open a pull request against `main`

Husky pre-commit hooks will automatically run ESLint and Prettier on staged files.

### Code conventions

- Named exports over default exports
- Arrow functions over function declarations
- Keep files under 300 lines — split into smaller modules if needed
- Group imports: external libraries first, then internal imports, separated by blank lines
- Use `async/await` with `try/catch` instead of `.then()/.catch()`
- Always log errors in `catch` blocks
- Test in both dark and light mode when touching UI

### What makes a good PR

- Focused — one concern per PR
- Passes all CI checks (lint, type-check, tests, build)
- Includes a clear description of what changed and why
- Does not introduce console errors or warnings

## License Information for Contributors

By submitting a contribution to this project, you agree that your contributions are licensed under the MIT License.
