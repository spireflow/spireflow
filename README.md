<div id="user-content-toc" align="center">
  <ul align="center" style="list-style: none;">
    <summary>
      <h1>Nellavio</h1>
    </summary>
  </ul>
</div>

<div align="center">
  <a href="https://github.com/nellavio/nellavio/blob/main/CHANGELOG.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/%20-changelog-blue?logo=readme&logoColor=white&labelColor=grey" alt="Changelog" />
  </a>
  <a href="https://github.com/nellavio/nellavio/blob/main/license" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  </a>
  <a href="https://github.com/nellavio/nellavio/releases" style="text-decoration: none;">
    <img src="https://img.shields.io/github/package-json/v/nellavio/nellavio?color=green" alt="Version" />
  </a>
</div>

<h4 align="center">Open source dashboard starter built with Next.js 16, TypeScript and Tailwind 4</h4>
<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/d143f2da-8aec-4a5d-914a-46f15aadf2d4" alt="Nellavio Dashboard" width="800" />
</div>

## 💎 Overview

Nellavio is a free, open-source dashboard starter designed for building modern SaaS products, internal tools and data-rich admin panels. It provides the UI components, pages and patterns you need to create a complete dashboard application - available out of the box.

It will give you a solid head start and save weeks of development time by serving as a practical foundation that you can easily extend and adapt to your specific needs. The project runs as a standalone frontend by default, ready to be integrated with your own API or an optional Nellavio backend that enables a production-ready authentication flow.

## :gear: Tech stack

React 19, Next.js 16, TypeScript, Tailwind 4, Shadcn UI, Zustand, Apollo Client, Recharts, Better-Auth, Vitest

## ✨ Features

- **90+ reusable components** - Built on top of Shadcn UI and Radix primitives
- **60+ chart variations** - Powered by Recharts library
- **Authentication** - Full Better-Auth integration with login, register and forgot password pages + Yup validation
- **i18n** - Multi-language support via next-intl
- **Themes** - Dark/light mode via next-themes library and CSS variables
- **Advanced tables** - Filtering, sorting, search and pagination, via TanStack Table v8
- **Calendar** - Move, add and delete events with FullCalendar.io
- **Product gallery** - Lightbox popup and PDF export
- **World map** - Interactive map with tooltips, powered by react-simple-maps
- **Profile page** - User profile with header card, contact info, bio section with inline editing, account settings and activity feed
- **Error pages** - 401 (Unauthorized), 404 (Not Found) and 500 (Server Error)
- **Security** - OWASP-aligned security headers (CSP, HSTS, X-Frame-Options) configured out of the box
- **Accessibility** - Keyboard navigation, clear focus indicators and ARIA support

## 🛠️ Pre-configured tooling

- **Storybook** - Component documentation and visual testing
- **Testing** - Unit tests written with Vitest + React Testing Library
- **CI Pipeline** - Automated linting, type checking and testing via GitHub Actions
- **Code quality** - Prettier (formatter), Eslint (linter) and Husky (pre-commit hooks)

## :rocket: Quickstart

You can get started with Nellavio by cloning the repository:

```bash
git clone https://github.com/nellavio/nellavio.git
cd nellavio
npm install
npm run dev
```

🎉 **That's it!** Navigate to [http://localhost:3000](http://localhost:3000) to explore the dashboard.

Nellavio starter is designed to work as a standalone front-end application by default. It loads mock data from `public/backendBackup.json` and has routes protection disabled.

Optionally, it can be connected to an associated Node.js backend, which enables authentication and fetching real data on each request. See `Configuration` section below for more details.

## :link: Links

#### Live demo [https://demo.nellavio.com/](https://demo.nellavio.com/)

#### Additional resources

- [Storybook](https://storybook.nellavio.com/)
- [Authentication docs](https://auth.nellavio.com/)
- [Node.js backend](https://github.com/nellavio/nellavio-backend)

#### Lightweight version

- [Live demo](https://layout.nellavio.com/)
- [Repository](https://github.com/nellavio/nellavio-layout)

## :file_folder: Project structure

```shell
├── src
│   ├── app                       # Next.js pages (App Router)
│   │   ├── [locale]              # Dynamic locale folder for i18n
│   │   │   ├── (auth)            # Auth & error pages
│   │   │   └── (protected)       # Protected pages (require auth)
│   │   └── api                   # API routes
│   ├── assets                    # Static assets
│   │   ├── icons                 # Icon components
│   │   └── images                # Image files
│   ├── components                # Main components folder
│   │   ├── auth                  # Authentication related components
│   │   ├── common                # Reusable components
│   │   ├── layout                # Layout components
│   │   └── views                 # Page-specific components
│   ├── hooks                     # Custom reusable hooks
│   │   └── auth                  # Authentication hooks
│   ├── i18n                      # Internationalization config
│   ├── queries                   # GraphQL queries
│   ├── services                  # Services utils
│   ├── store                     # Zustand stores
│   ├── styles                    # Themes and global styles
│   │   ├── themes                # Colors for themes
│   │   └── overrides             # Style overrides
│   ├── tests                     # Test files
│   │   ├── config                # Test configuration
│   │   ├── unit                  # Unit tests
│   │   └── utils                 # Test utilities
│   ├── utils                     # Utility functions
│   └── proxy.ts                  # Next.js proxy configuration
└── package.json                  # Project dependencies and scripts
```

## ⚙️ Configuration (optional)

### Connect to backend & enable authentication

Want to use real backend and authentication? Follow these steps:

#### 1. Set up the backend

Clone and run the [Nellavio Backend](https://github.com/nellavio/nellavio-backend)

Follow the instructions in the backend README to initialize and seed the database. The backend will run on `http://localhost:4000` by default.

#### 2. Configure environment variables

Create a `.env` file in your project root:

```env
# Backend GraphQL API
GRAPHQL_URL=http://localhost:4000/graphql

# Better Auth Configuration
NEXT_PUBLIC_AUTH_URL=http://localhost:4000/api/auth
```

#### 3. Restart the dev server

```bash
npm run dev
```

That's it! The dashboard will automatically:

- ✅ Connect to your backend for real data
- ✅ Enable route protection
- ✅ Allow user registration and login

### How it works

The application automatically detects your configuration:

**Standalone mode** (no env vars)

- Uses mock data from `backendBackup.json`, all routes accessible without login
- `npm run build` pre-renders pages as static HTML, `npm start` serves them instantly

**Backend online** (env vars set, backend running)

- Fetches real data from GraphQL backend, route protection is enabled
- `npm run build` and `npm start` treat pages as dynamic, fetching fresh data on each request

**Backend offline** (env vars set, backend unreachable)

- Route protection enabled, but login is not possible while the backend is down
- Same build and runtime behavior as `Backend online` mode, but pages will fail to load data

> Note: `npm run dev` always tries to render pages dynamically regardless of the configuration

If you use `npm start` (production mode), please remember that `npm run build` must be run after configuring environment variables for changes to take effect. This is not needed when using `npm run dev`.

### One-click deploy

For remote hosting, you can easily deploy your own instance of Nellavio dashboard on Vercel using the link below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nellavio/nellavio)

## 🧾 Pages

| Path               | Description                                                                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                | Homepage with key metrics cards (switchable 3/4 card layout via Settings drawer), multiple Recharts visualizations and an interactive world map with country-level revenue tooltips powered by react-simple-maps.                                                   |
| `/orders`          | Orders management table built with TanStack Table v8, featuring text search, date range picker, multi-select filters (status, payment, shipping), column sorting, pagination with configurable page size, and XLSX export.                                          |
| `/customers`       | Customer list table featuring text search, country filter dropdown, sort dropdown (name, orders, spend - ascending/descending), active filter chips with inline removal, pagination, and XLSX export.                                                               |
| `/products`        | Product catalog with a categorized sidebar navigation, detailed product view showing image with lightbox gallery, parameters grid, circular progress metrics, copy-to-clipboard product ID, and PDF export via @react-pdf/renderer.                                 |
| `/analytics`       | Sales and performance page with multiple Recharts visualizations across different chart types, covering revenue, profit, and market data.                                                                                                                           |
| `/profile`         | User profile page with header card, contact info sidebar, bio section with inline editing, account settings with toggle switches and recent activity feed.                                                                                                          |
| `/calendar`        | Interactive event calendar powered by FullCalendar with month, week, day, and list views. Supports drag-and-drop event moving, date range selection for creating new events, and event deletion with confirmation modals.                                           |
| `/login`           | Sign-in page with Better-Auth authentication, email/password form validated by react-hook-form and Yup, show/hide password toggle, "Remember me" checkbox and error tooltips. Styled with themed auth background pattern and centered modal.                        |
| `/register`        | Registration page with Better-Auth authentication and sign-up form using the same validation and styling approach as login - Yup schema validation, accessible error handling, and themed auth modal layout with background pattern.                                |
| `/forgot-password` | Password reset page (UI only, no backend integration) with email input form, Yup validation, and consistent auth page design matching login and registration - centered modal with background pattern.                                                              |
| `/error-401`       | Showcase error page for 401 Unauthorized with full-page layout, themed background pattern on dark mode, and a back-to-homepage button.                                                                                                                              |
| `/error-404`       | Showcase error page for 404 Not Found with full-page layout, themed background pattern on dark mode, and a back-to-homepage button.                                                                                                                                 |
| `/error-500`       | Showcase error page for 500 Server Error with full-page layout, themed background pattern on dark mode, and a back-to-homepage button.                                                                                                                              |
| `/ui-elements`     | Showcase of styled Shadcn UI components displayed in a responsive two-column grid: buttons, command palette, avatars, tooltips, alerts, toasts, skeletons, dialogs, dropdown menus, badges, popovers, progress bars, breadcrumbs, tabs, separators, and pagination. |
| `/forms`           | Collection of form components in a responsive two-column grid: input fields, select inputs, textareas, color picker, form validation, checkboxes, radio buttons, toggle switches, date picker, file upload, and sliders.                                            |
| `/tables`          | Four TanStack Table variants demonstrating different table configurations and use cases: basic table, advanced table with enhanced filtering and sorting, user management table, and inventory tracking table.                                                      |
| `/charts`          | Gallery of Recharts chart types displayed in a responsive grid: area, scatter, pie, radar, composed, stacked bar, radial bar, two-axis line, mixed line, vertical bar, area fill by value, gradient pie, and a full-width line chart.                               |

## 🔧 How to customize

#### Add a new page

1. Create a folder in `src/app/[locale]/(protected)/` with a `page.tsx` file
2. Add an entry to `src/config/navigationConfig.ts` to show it in the sidebar
3. Wrap your content with `<PageWrapper pageName="YourPage">` for breadcrumbs and layout

#### Add a new color token

1. Add the CSS variable to both `src/styles/themes/light.css` and `dark.css`
2. For consistency, consider placing it in one of the existing groups (Texts, Icons, Backgrounds or Borders) following the naming convention
3. Tailwind 4 auto-generates utility classes from the `--color-` prefix - use `bg-yourToken`, `text-yourToken` etc.

#### Add a new language

1. Create a new JSON file in `messages/` (e.g. `de.json`) based on `en.json`
2. Add the locale to `src/i18n/routing.ts` in the `locales` array
3. Add a language option in `UserMenuDropdown.tsx`

#### Change default settings

Edit `src/config/appDefaults.ts` to change the default theme, font, sidebar state, chart animations, toast duration and other global defaults. These values are used by Zustand stores on first visit.

## ⌨️ Accessibility

- Keyboard navigation with Tab and arrow buttons across all interactive elements
- Visible focus indicators (focus-visible) with single CSS variable for consistent outline color
- ARIA attributes wherever needed across components
- UI components are built on top of Radix UI primitives which provide core accessibility support
- Tested with Storybook a11y addon and Chrome Lighthouse (95+)

### Keyboard shortcuts

Desktop-only shortcuts (active above 1280px). Disabled when focus is inside a text input (except `Ctrl+K`).

| Shortcut   | Action         |
| ---------- | -------------- |
| `Ctrl + K` | Focus search   |
| `Ctrl + \` | Toggle sidebar |
| `Ctrl + /` | Toggle theme   |

On macOS use `Cmd` instead of `Ctrl`.

## 📋 Available commands

| Command                | Action                                |
| :--------------------- | :------------------------------------ |
| `npm install`          | Installs dependencies                 |
| `npm run prepare`      | Sets up Husky git hooks               |
| `npm run dev`          | Starts dev server at `localhost:3000` |
| `npm run build`        | Builds your production site           |
| `npm start`            | Starts server at `localhost:3000`     |
| `npm run lint`         | Runs ESLint to check code quality     |
| `npm run lint:fix`     | Runs ESLint and auto-fixes issues     |
| `npm run type-check`   | Runs TypeScript type checking         |
| `npm run test`         | Runs Vitest tests                     |
| `npm run test:watch`   | Runs Vitest tests in watch mode       |
| `npm run format`       | Formats code with Prettier            |
| `npm run format:check` | Checks if code is properly formatted  |

## 🤝 Community and support

Check out [CONTRIBUTING.md](https://github.com/nellavio/nellavio/blob/main/CONTRIBUTING.md) to learn how to get started with contributions.

All forms of project support are valued and appreciated, including code contributions, issue reporting, and sponsorship through GitHub Sponsors or [Buy Me A Coffee](https://buymeacoffee.com/matt765) service.

## 📝 License

This project is open source and available under the MIT License. Feel free to use it to build any personal or commercial applications (SaaS, internal tools etc.). Although the license allows redistribution, I would greatly appreciate it if you did not repackage or resell this project as a standalone UI kit or a template.

## 💌 Stay updated

Subscribe to the [Nellavio newsletter](https://nellavio.kit.com/) to get notified about major updates and new features.

## Author

Made by [matt765](https://github.com/matt765/)
