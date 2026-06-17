# Setup Instructions

## Prerequisites
- PostgreSQL running locally (check it's accessible)
- Node.js 18+

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
npm install
```

2. Update `.env` with your PostgreSQL connection (default is fine if using standard setup):
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/postgres
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

3. Initialize database (creates DB + tables + seed data):
```bash
node db.js
```

4. Start backend server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

## Quick Start

**Terminal 1 (Backend):**
```bash
cd backend
npm install
node db.js        # Setup database once
npm run dev       # Start server
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3000`

## How to Use

1. Create an account or login
2. Create a new tournament (select game, max players, deadline)
3. Share tournament link with friends
4. Players join before deadline
5. Lock bracket to generate matches
6. Update match results as tournaments progress
7. View final bracket and leaderboard

## Troubleshooting

**Can't connect to PostgreSQL:**
- Make sure PostgreSQL service is running
- Check your password in `.env`
- Default user is `postgres`, default port is `5432`

**"Database already exists" error:**
- This is fine! It will use existing database
- Run `node db.js` again if tables aren't created
