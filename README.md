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

<h4 align="center">Open source and free dashboard starter template written in NextJS and TypeScript</h2>
<br />

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a319429-2b20-466b-af26-3c36fee780c8" alt="Spireflow Dashboard" width="800" />
</div>

## :gear: Tech stack

React 19, NextJS 15, TypeScript, Tailwind, Shadcn, Zustand, Apollo Client, Recharts, Better Auth, Jest

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
- 📊 **25 Chart Types** - Production-ready with Recharts
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

The app can be connected to an associated Node.js backend, which is also open source and available on my GitHub. You can deploy it on platforms like Heroku or Render.

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

## 🧾 Pages

| Path         | Description                                        |
| ------------ | -------------------------------------------------- |
| `/`          | Homepage with key metrics and widgets              |
| `/orders`    | View, track, and manage all orders                 |
| `/customers` | Browse customer information                        |
| `/analytics` | Sales and performance charts                       |
| `/calendar`  | Interactive calendar for events and scheduling     |
| `/products`  | Product management with gallery and export options |
| `/login`     | Sign in to your account                            |
| `/register`  | Create a new account                               |
| `/profile`   | User profile page                                  |

There are also four filler pages with single charts: `/area`, `/bars`, `/scatter` and `/line`

## 🤝 Community and contributions

Check out [CONTRIBUTING.md](https://github.com/matt765/spireflow/blob/main/CONTRIBUTING.md) to learn how to get started with contributions.

All forms of project support are valued and appreciated, including code contributions, issue reporting, and sponsorship through GitHub Sponsors.

## 📝 License

This project is licensed under the MIT License - see the [license](https://github.com/matt765/spireflow/blob/main/license) file for more information.
