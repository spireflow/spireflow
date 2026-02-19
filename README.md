<div id="user-content-toc" align="center">
  <ul align="center" style="list-style: none;">
    <summary>
      <h1>- Spireflow -</h1>
    </summary>
  </ul>
</div>

<div align="center">
  <a href="https://github.com/matt765/spireflow/blob/main/CHANGELOG.md" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/%20-changelog-blue?logo=readme&logoColor=white&labelColor=grey" alt="Changelog" />
  </a>
  <a href="https://github.com/matt765/spireflow/blob/main/license" style="text-decoration: none;">
    <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
  </a>
  <a href="https://github.com/matt765/spireflow/releases" style="text-decoration: none;">
    <img src="https://img.shields.io/github/package-json/v/matt765/spireflow?color=green" alt="Version" />
  </a>
</div>

<h4 align="center">A modern full-stack dashboard starter built with Next.js and TypeScript</h4>
<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a319429-2b20-466b-af26-3c36fee780c8" alt="Spireflow Dashboard" width="800" />
</div>

## :gear: Tech stack

React 19, Next.js 15, TypeScript, Tailwind, Shadcn, Zustand, Apollo Client, Recharts, Better Auth, Jest

## :sparkles: Features

- 14 data charts (Recharts)
- tables with filtering, sorting, searching, pagination and CSV export (Tanstack-ReactTable v8)
- authentication (Better Auth, React Hook Forms and Yup)
- internationalization: english and polish (next-intl)
- calendar that allows for moving, adding and deleting events (Fullcalendar.io)
- product gallery with Lightbox popup and PDF export (yet-another-react-lightbox, @react-pdf/renderer)
- world map with tooltips (react-simple-maps)
- CI pipeline for testing and linting, working on Github Actions
- code formatter (Prettier), linter (Eslint) and Git Hooks (Husky)
- dark and light mode (next-themes, tw-colors)

## ✨ Features

- 🎨 **90+ Components** - Shadcn UI + custom components
- 📊 **25 Chart Types** - with Recharts
- 🗄️ **Full Backend** - GraphQL + Prisma + PostgreSQL
- 📋 **Advanced Tables** - TanStack Table v8 with filtering/sorting/export
- 📅 **Calendar** - FullCalendar with CRUD operations
- 🎭 **Themes** - Dark/light mode with 111 CSS variables
- 🌍 **i18n** - English & Polish support
- 📦 **Standalone Mode** - Works without backend using mock data
- 🧪 **Testing** - Jest + React Testing Library
- 🔒 **Auth** - Better Auth integration

## :link: Links

Live (dashboard) [https://spireflow.vercel.app/](https://spireflow.vercel.app/)

## :cloud: Backend

The app can be connected to an associated Node.js backend, which is also open source and available on my GitHub. You can deploy it locally or remotely on platforms like Heroku or Render.

The dashboard is designed to work as a standalone front-end application by default, so setting up the backend is entirely optional.

[https://github.com/matt765/spireflow-backend](https://github.com/matt765/spireflow-backend)

## :file_folder: Project structure

```shell
├── src
│   ├── app                       # NextJS pages (App Router)
│   │   └── locale                # Locale folder for i18n
│   ├── assets                    # Static assets
│   │   ├── icons                 # Icon components
│   │   └── images                # Image files
│   ├── components                # Main components folder
│   │   ├── auth                  # Authentication related components
│   │   ├── common                # Reusable components
│   │   ├── forms                 # Form components
│   │   └── views                 # Page-specific components
│   │       ├── analytics         # Analytics page components
│   │       ├── calendar          # Calendar page components
│   │       ├── customers         # Customers page components
│   │       ├── homepage          # Homepage components
│   │       ├── orders            # Orders page components
│   │       └── products          # Products page components
│   ├── hooks                     # Custom reusable hooks
│   │   └── auth                  # Authentication hooks
│   ├── i18n                      # Internationalization config
│   ├── layout                    # Layout components
│   │   ├── navbar                # Upper bar components
│   │   └── sideMenu              # Side menu components
│   ├── queries                   # GraphQL queries
│   ├── services                  # Services utils
│   ├── store                     # Zustand store
│   ├── styles                    # Themes and global styles
│   │   └── themes                # Colors for themes
│   ├── tests                     # Test files
│   │   ├── components            # Component tests
│   │   ├── config                # Jest configuration
│   │   └── hooks                 # Hook tests
│   ├── utils                     # Utility functions
│   └── middleware.ts             # NextJS middleware
└── package.json                  # Project dependencies and scripts
```

## :rocket: Quickstart

You can get started with Spireflow by cloning the repository:

```bash
git clone https://github.com/matt765/spireflow.git
cd spireflow
npm install
npm run dev
```

🎉 **That's it!** Navigate to [http://localhost:3000](http://localhost:3000) to explore the dashboard.

The app works with mock data from `public/backendBackup.json` on default and has routes protection disabled. You can connect backend by adding `.env` variables similar to those in `.env.example` file.

## 📋 Available commands

| Command                | Action                                |
| :--------------------- | :------------------------------------ |
| `npm install`          | Installs dependencies                 |
| `npm run prepare`      | Sets up Husky git hooks               |
| `npm run dev`          | Starts dev server at `localhost:3000` |
| `npm run build`        | Builds your production site           |
| `npm start`            | Starts server at `localhost:3000`     |
| `npm run lint`         | Runs ESLint to check code quality     |
| `npm run test`         | Runs Jest tests                       |
| `npm run test:watch`   | Runs Jest tests in watch mode         |
| `npm run format`       | Formats code with Prettier            |
| `npm run format:check` | Checks if code is properly formatted  |

## 🚀 Why Spireflow?

- 90+ reusable components built on Radix UI primitives and Shadcn patterns
- Focus on accessibility and consistent UI behavior (keyboard-friendly interactions, ARIA where needed)
- Modular structure designed for long-term extension (not a one-off demo)
- Standalone mode with mock data (works without backend)
- Optional full-stack path: connect an external backend when you need real data/auth
- Data-driven UI out of the box: charts, tables, analytics-style pages
- Advanced tables patterns included (filtering, sorting, search, pagination, CSV export)
- Multiple chart types and ready-made chart pages for common dashboard use cases
- Internationalization built-in (next-intl) with English + Polish support
- Dark/light mode support with theme variables (easy to extend with more themes)
- Page structure already scaffolded (dashboard, e-commerce area, analytics, profile, calendar, auth pages)
- Navigation and layout patterns ready (sidebar with collapse/expand, categories, nested routes)
- State management with Zustand (simple, predictable, easy to extend)
- Form patterns included (React Hook Form + Yup validation flow)
- Authentication integration included (Better Auth) with login/register pages
- Calendar with CRUD interactions (move/add/delete events)
- Product/gallery patterns included (lightbox + PDF export)
- Project-level quality tools: ESLint + Prettier + Husky hooks
- CI pipeline for linting/testing via GitHub Actions
- Testing setup included (Jest + React Testing Library)
- Clear project structure (components/views/layout/hooks/services/utils separated)
- Designed for internal tools and admin panels (not just a marketing UI template)
- Easy local start: clone → install → dev, with sensible defaults

## ⚙️ Configuration (optional)

### Connect to backend & enable authentication

Want to use real backend and authentication? Follow these steps:

#### 1. Set up the backend

Clone and run the [Spireflow Backend](https://github.com/matt765/spireflow-backend)

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

- **No env vars**: Standalone demo mode with mock data, all routes accessible
- **Env vars configured**: Fetching data from backend if it's online, with route protection enabled (redirects to /login if not authenticated)

### Remote deployment

For remote services (e.g., Vercel):

1. Deploy your backend to a hosting service (e.g. Heroku/Render)
2. Set environment variables in your Vercel project settings
3. Deploy front-end app with proper env variables - it automatically detects and uses the backend

### One-click deploy

You can deploy your own instance of Spireflow on Vercel using the link below. The app will work in standalone mode with mock data out of the box.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/spireflow/Spireflow)

## 🧾 Pages

| Path           | Description                                        |
| -------------- | -------------------------------------------------- |
| `/`            | Homepage with key metrics and widgets              |
| `/orders`      | View, track, and manage all orders                 |
| `/customers`   | Browse customer information                        |
| `/analytics`   | Sales and performance charts                       |
| `/calendar`    | Interactive calendar for events and scheduling     |
| `/products`    | Product management with gallery and export options |
| `/login`       | Sign in to your account                            |
| `/register`    | Create a new account                               |
| `/profile`     | User profile page                                  |
| `/ui-elements` | Collection of shadcn                               |
| `/forms`       | Collection of shadcn part 2                        |
| `/tables`      | 4 tanstack tables                                  |
| `/charts`      | 10 charts                                          |

## 🤝 Community and contributions

Check out [CONTRIBUTING.md](https://github.com/matt765/spireflow/blob/main/CONTRIBUTING.md) to learn how to get started with contributions.

All forms of project support are valued and appreciated, including code contributions, issue reporting, and sponsorship through GitHub Sponsors.

## 📝 License

This project is open source and available under the MIT License. Feel free to use it to build any personal or commercial applications (SaaS, internal tools etc.). Although the license allows redistribution, I would greatly appreciate it if you did not repackage or resell this project as a standalone UI kit or template.
