# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build locally

## Architecture

This is a React + Vite application using:
- **React 19** with functional components and hooks
- **Vite** as the build tool and dev server
- **styled-components** for CSS-in-JS styling
- **ESLint** for code quality with React-specific rules

### Project Structure
- `src/main.jsx` - Application entry point with React root rendering
- `src/App.jsx` - Main App component (currently the default Vite template)
- `src/App.css` & `src/index.css` - Styling files
- `public/` - Static assets
- `vite.config.js` - Vite configuration with React plugin

### Key Characteristics
- Uses ES modules (`"type": "module"` in package.json)
- JSX files use `.jsx` extension
- ESLint configured for React hooks and refresh patterns
- styled-components available for component styling