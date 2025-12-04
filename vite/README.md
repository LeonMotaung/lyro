# Lyro React Frontend

This is the frontend application for Lyro React, built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **KaTeX** - Math rendering
- **React LaTeX Next** - LaTeX support

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

The production build will be output to the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## Project Structure

```
vite/
├── src/
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── Home.tsx          # Home page
│   ├── Learn.tsx         # Learn page
│   ├── Login.tsx         # Login page
│   ├── Signup.tsx        # Signup page
│   ├── Onboarding.tsx    # Onboarding flow
│   ├── FormulaSheet.tsx  # Formula reference
│   └── assets/           # Images and static files
├── public/               # Public static files
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## Environment Variables

Create a `.env` file in this directory for environment-specific configuration:

```env
VITE_API_URL=http://localhost:3000
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- All environment variables must be prefixed with `VITE_` to be accessible in the frontend
- The dev server runs on port 5173 by default
- Hot Module Replacement (HMR) is enabled for fast development
