# Patient Management System

A React application for managing patient data.

## Prerequisites

- Node.js (version 18 or higher)
- npm

## Technologies Used

- **Vite** - Build tool and development server
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework with Open Sans font
- **Prettier** - Code formatter
- **ESLint** - Code linter (configured to work with Prettier)

## Project Structure

The project includes:

- **Configuration Files:**
  - `tailwind.config.js` - Tailwind CSS configuration with Open Sans font family
  - `postcss.config.js` - PostCSS configuration for Tailwind CSS processing
  - `eslint.config.js` - ESLint configuration with Prettier integration
  - `.prettierrc.json` - Prettier formatting rules
  - `.prettierignore` - Files to ignore during formatting

- **Styling:**
  - `src/styles/reset.css` - CSS reset for consistent cross-browser styling
  - `src/styles/index.css` - Main stylesheet with Tailwind CSS imports

- **Fonts:**
  - Open Sans font family loaded from Google Fonts

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

To build the application for production, run:

```bash
npm run build
```

This will compile the application and output the production files to the `dist` directory.

To preview the production build locally, run:

```bash
npm run preview
```

This command will serve the built files so you can test the application as it will appear in production.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly without making changes
