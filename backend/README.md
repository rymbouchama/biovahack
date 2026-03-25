# BiovaHack Backend API

A TypeScript Express.js backend for the BiovaHack application.

## Features

- TypeScript support
- Express.js server
- SQLite database via Prisma ORM
- JWT authentication (login/register)
- CORS enabled
- Helmet security middleware
- Morgan logging
- Error handling middleware
- Modular routing structure
- Environment configuration

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3001`

## Available Scripts

- `npm run build` - Build the TypeScript code
- `npm run start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT

### Users (protected)
> Requires `Authorization: Bearer <token>`
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Events (protected)
> Requires `Authorization: Bearer <token>`
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create a new event (requires authenticated user)

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── lib/
│   │   └── prisma.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── eventRoutes.ts
│   ├── services/
│   │   └── authService.ts
│   ├── types/
│   │   └── index.ts
│   └── server.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Development

The backend is structured with:
- **Routes**: API endpoint definitions
- **Middleware**: Custom middleware for error handling, logging, etc.
- **Types**: TypeScript interfaces and types
- **Server**: Main application setup

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include error handling
4. Write tests for new features
5. Update documentation