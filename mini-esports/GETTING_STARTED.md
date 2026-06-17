# Getting Started with Mini Esports 🎮

Welcome! This guide will get you up and running in 5 minutes.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A text editor (VS Code recommended)
- PostgreSQL or Supabase account

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/AddyisAbaDDiee/mini-esports.git
cd mini-esports
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.your-project.supabase.co:5432/postgres
JWT_SECRET=your-secret-key-here
PORT=5000
```

Start the backend:
```bash
npm run dev
```

✅ Backend running on `http://localhost:5000`

### 3. Set Up the Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running on `http://localhost:3000`

## First Test Run

1. Open `http://localhost:3000` in your browser
2. Click **Sign Up** and create an account
3. Click **Create Tournament** to start a tournament
4. Fill in the form and submit
5. See your tournament on the dashboard!

## What to Do Next

- **[Read the User Manual](./USER_MANUAL.md)** - Learn all features
- **[Check the API docs](./PROJECT_SUMMARY.md)** - Understand the backend
- **[Review the checklist](./SUBMISSION_CHECKLIST.md)** - Verify everything

## Troubleshooting

### Backend won't start
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL/Supabase is accessible
- Try: `npm install` again

### Frontend won't start
- Kill any process on port 3000
- Try: `npm install` again
- Check Node.js version: `node --version`

### Can't connect to database
- Verify connection string in `.env`
- Check firewall/network
- Supabase: use Supabase MCP setup

## Support

For issues, check:
- Terminal error messages
- Database connection settings
- .env file configuration
