# Patient Management System

A React application for managing patient data.

## Features

- **Patient List Display** - Grid layout showing all patients with cards
- **Create Patients** - Add new patients with validation
- **Edit Patients** - Update existing patient information
- **Patient Cards** - Expandable cards showing patient details, avatar, website, and description
- **Form Validation** - Comprehensive validation using Yup schema
- **Modal Interface** - Clean modal dialogs for creating and editing patients
- **Data Fetching** - React Query integration for efficient API data management
- **Local State Management** - Context API for managing patient state
- **Responsive Design** - Mobile-friendly layout with Tailwind CSS
- **Error Handling** - Graceful error states and loading indicators
- **Accessibility** - ARIA labels and keyboard navigation support

## Prerequisites

- Node.js (version 18 or higher)
- npm

## Technologies Used

- **Vite** - Build tool and development server
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework with Open Sans font
- **React Query (@tanstack/react-query)** - Data fetching and caching
- **Formik** - Form state management and validation
- **Yup** - Schema-based validation
- **Phosphor Icons** - Icon library
- **Prettier** - Code formatter
- **ESLint** - Code linter (configured to work with Prettier)

## Project Structure

The project includes:

- **Configuration Files:**
  - `tailwind.config.js` - Tailwind CSS configuration with Open Sans font family
  - `postcss.config.js` - PostCSS configuration for Tailwind CSS processing
  - `eslint.config.js` - ESLint configuration with Prettier integration
  - `vite.config.ts` - Vite configuration
  - `tsconfig.json` - TypeScript configuration

- **Source Code (`src/`):**
  - `App.tsx` - Main application component with patient list
  - `main.tsx` - Application entry point
  
  - **Components (`components/`):**
    - `PatientCard.tsx` - Patient card component with expandable description
    - `patientModal/PatientModal.tsx` - Modal wrapper for patient forms
    - `patientModal/PatientForm.tsx` - Form component with validation
  
  - **Contexts (`contexts/`):**
    - `PatientContext.tsx` - Context provider for patient state management
  
  - **Hooks (`hooks/`):**
    - `usePatients.ts` - React Query hook for fetching patients
    - `useLocalPatients.ts` - Hook for managing local patient state (CRUD operations)
    - `usePatientModal.ts` - Hook for managing modal state
  
  - **Services (`services/`):**
    - `patientService.ts` - API service for fetching and updating patients
  
  - **Types (`types/`):**
    - `patient.ts` - Patient type definitions
    - `modalMode.ts` - Modal mode type (Create/Edit)
  
  - **Schemas (`schemas/`):**
    - `patientSchema.ts` - Yup validation schema for patient forms
  
  - **Styles (`styles/`):**
    - `reset.css` - CSS reset for consistent cross-browser styling
    - `index.css` - Main stylesheet with Tailwind CSS imports

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
