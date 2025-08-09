# Vite React TypeScript Boilerplate

A modern, production-ready React application boilerplate built with Vite, TypeScript, and a comprehensive development toolchain.

## 🚀 Features

### Core Technologies

- **[Vite](https://vitejs.dev)** - Lightning fast build tool and development server
- **[React 19](https://react.dev)** - Latest React with modern features
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript development
- **[TanStack Router](https://tanstack.com/router)** - Type-safe client-side routing

### UI & Styling

- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework with CSS variables
- **[shadcn/ui](https://ui.shadcn.com)** - Beautiful components built with Radix UI and Tailwind
- **[Lucide React](https://lucide.dev)** - Beautiful & consistent icon library
- **Dark/Light mode** support with CSS variables

### State Management & Data

- **[Zustand](https://zustand-demo.pmnd.rs)** - Lightweight state management
- **[TanStack Query](https://tanstack.com/query)** - Powerful data fetching and caching
- **[React Hook Form](https://react-hook-form.com)** - Performant forms with validation
- **[Zod](https://zod.dev)** - TypeScript-first schema validation

### Development Tools

- **[ESLint](https://eslint.org)** - Code linting with React and TypeScript rules
- **[Prettier](https://prettier.io)** - Code formatting with import sorting and Tailwind class sorting
- **[Husky](https://typicode.github.io/husky)** - Git hooks for code quality
- **[Commitlint](https://commitlint.js.org)** - Conventional commit message validation
- **[Storybook](https://storybook.js.org)** - Component development and documentation

### Internationalization

- **[react-i18next](https://react.i18next.com)** - Internationalization framework
- **[i18next](https://www.i18next.com)** - Feature-rich i18n library

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (enforced via `only-allow`)

## 🛠️ Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd vite-react-boilerplate
```

2. **Install dependencies:**

```bash
pnpm install
```

3. **Run setup (optional):**

```bash
pnpm run setup
```

## 🚀 Development

### Start development server

```bash
pnpm run dev
```

### Available Scripts

| Script                     | Description                  |
| -------------------------- | ---------------------------- |
| `pnpm run dev`             | Start development server     |
| `pnpm run build`           | Build for production         |
| `pnpm run preview`         | Preview production build     |
| `pnpm run lint`            | Run ESLint                   |
| `pnpm run lint:fix`        | Fix ESLint issues            |
| `pnpm run format`          | Format code with Prettier    |
| `pnpm run type-check`      | Run TypeScript type checking |
| `pnpm run storybook`       | Start Storybook              |
| `pnpm run storybook:build` | Build Storybook              |

## 🏗️ Build & Deployment

### Build for production

```bash
pnpm run build
```

### Deploy to Cloudflare Pages

1. **Git Integration (Recommended):**

   - Connect your repository to Cloudflare Pages
   - Build command: `pnpm run build`
   - Build output directory: `dist`

2. **CLI Deployment:**

```bash
pnpm run build
wrangler pages deploy dist --project-name your-project
```

### Deploy to other platforms

The build outputs static files in the `dist/` directory that can be deployed to:

- Vercel, Netlify, GitHub Pages
- AWS S3, Google Cloud Storage
- Any static hosting service

## 🔧 Configuration

### Package Manager Enforcement

- Only **pnpm** is allowed via `only-allow` package
- Configured in `preinstall` script and `.pnpmfile.cjs`

### Path Aliases

- `@/*` maps to `src/*` directory
- Configured in both `vite.config.ts` and `tsconfig.json`

### Git Hooks (Husky)

Automatic code quality checks on commit:

1. **Pre-commit:**

   - Prettier formatting
   - ESLint auto-fix
   - ESLint linting
   - TypeScript type checking

2. **Commit message:**
   - Conventional commit format validation

### Code Quality Tools

**ESLint Configuration:**

- TypeScript parser for `.ts/.tsx` files
- React and React Hooks rules
- Ignores `.d.ts` declaration files
- Prettier integration

**Prettier Configuration:**

- Import sorting with `prettier-plugin-organize-imports`
- Tailwind class sorting with `prettier-plugin-tailwindcss`
- Single quotes, no trailing commas, 100 char width

## 🎨 UI Components

### shadcn/ui Setup

- CSS variables enabled for theming
- Components in `src/components/ui/`
- Utility functions in `src/lib/utils.ts`

### Adding Components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
```

### Tailwind CSS

- CSS variables for all colors
- Dark mode support with `class` strategy
- Custom border radius using `--radius` variable

## 🌐 Internationalization

### Adding Translations

1. Add translation files in `src/assets/locales/`
2. Import in components:

```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
```

## 📁 Project Structure

```
src/
├── assets/          # Static assets and locales
├── common/          # Shared utilities and types
├── components/      # React components
│   ├── ui/         # shadcn/ui components
│   └── utils/      # Utility components
├── lib/            # Utility libraries
├── pages/          # Page components
├── routes/         # TanStack Router routes
├── styles/         # Global styles
└── main.tsx        # Application entry point
```

## 🤝 Contributing

1. Follow conventional commit format
2. Ensure all pre-commit hooks pass
3. Add tests for new features
4. Update documentation as needed

## 🔍 Code Quality Standards

### TypeScript Configuration

- Strict mode enabled with comprehensive type checking
- Path mapping for clean imports (`@/` alias)
- Modern ES2020+ target with DOM libraries

### ESLint Rules

- No unused variables (disabled for type definitions)
- React JSX prop sorting enforced
- React Hooks dependency validation
- Import/export consistency

### Prettier Formatting

- Arrow functions without parentheses
- Single quotes throughout
- No trailing commas
- 100 character line width
- Automatic import organization

## 🚨 Troubleshooting

### Common Issues

**Build Errors:**

- Ensure all dependencies are installed: `pnpm install`
- Clear cache: `rm -rf node_modules/.cache`
- Check TypeScript errors: `pnpm run type-check`

**Git Hooks Not Running:**

- Reinstall Husky: `pnpm run postinstall`
- Check hook permissions: `chmod +x .husky/*`

**Import Path Issues:**

- Verify `@/` alias in `vite.config.ts` and `tsconfig.json`
- Restart TypeScript server in your editor

## 🔗 Useful Links

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev)
- [TanStack Router Guide](https://tanstack.com/router/latest)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📊 Bundle Analysis

After building, analyze your bundle:

```bash
pnpm run build
npx vite-bundle-analyzer dist
```

## 🔐 Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
```

Access in code:

```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📄 License

MIT License - see LICENSE file for details
