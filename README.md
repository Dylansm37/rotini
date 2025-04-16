# CPSC 449 E-Commerce Project

A full-featured e-commerce application built with React, TypeScript, and Firebase.

## Overview

This project is an e-commerce platform that demonstrates modern web development practices using React 19, TypeScript, and Firebase services for authentication, data storage, and hosting.

## Features

- User authentication and account management
- Product browsing and searching
- Shopping cart functionality
- Checkout process
- Order history tracking
- Admin dashboard for product management

## Prerequisites

- Node.js (v18 or higher)
- npm or npx
- Firebase account and CLI tools

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cpsc_449_project
```

2. Install dependencies:
```bash
cd ecommerce_project
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```
Then edit the `.env` file with your Firebase configuration details.

### Development

To start the development server:

```bash
npm run dev
# or using npx
npx vite
```

This will start the development server at [http://localhost:5173](http://localhost:5173).

## Project Structure

```
cpsc_449_project/
├── ecommerce_project/     # Main application code
│   ├── dist/              # Build output
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # Firebase and API services
│   │   └── utils/         # Utility functions
│   ├── firebase.json      # Firebase configuration
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Project dependencies
├── proposal/              # Project proposal documents
└── src/                   # Additional source code
```

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Starts the development server
- `npm run build` - Builds the app for production
- `npm run lint` - Runs ESLint to check for code issues
- `npm run preview` - Previews the production build locally
- `npm run seed` - Seeds the database with initial data

## Deployment

### Building for Production

To build the application for production:

```bash
cd ecommerce_project
npx vite build
```

### Deploying to Firebase

To deploy the application to Firebase:

```bash
cd ecommerce_project
npx firebase deploy
```

The application will be accessible at your Firebase hosting URL (e.g., https://cpsc-449-project.web.app).

## Technologies Used

- **Frontend**:
  - React 19
  - TypeScript
  - React Router 7
  - Vite 6

- **Backend**:
  - Firebase Authentication
  - Firestore Database
  - Firebase Hosting
  - Firebase Storage

- **Development**:
  - ESLint
  - TypeScript
  - Vite

## License

MIT

## Contributors

CPSC 449 Team 