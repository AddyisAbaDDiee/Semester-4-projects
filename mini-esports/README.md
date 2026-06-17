# Mini Esports - Tournament Management System 🎮

<div align="center">

**A modern, full-stack web platform for organizing and managing gaming tournaments seamlessly.**

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)]()
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-blue)]()
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)]()

</div>

---

## 🎯 Overview

Mini Esports solves the chaos of organizing gaming tournaments. Forget Discord, spreadsheets, and manual coordination. Our unified platform lets organizers create tournaments, manage registrations, generate brackets, and track results—all in one place.

**Perfect for:**
- 🎓 University gaming clubs
- 👥 Friend groups hosting tournaments
- 🏆 Local esports communities
- 🎪 Small competitive gaming events

---

## ✨ Key Features

### 🔐 User Authentication
- Secure signup/login with bcrypt hashing
- JWT-based session management
- Password validation

### 🏛️ Tournament Management
- Create tournaments with custom settings
- Support for 10+ popular games
- Real-time player registration tracking
- Automatic tournament status management

### 🎪 Bracket Generation
- Automated single-elimination bracket generation
- Smart bye handling for odd player counts
- Randomized seeding for fairness

### ⚡ Match Management
- Intuitive bracket visualization
- Match result tracking
- Automatic progression to next round
- Multi-round tournament flow

### 📊 Leaderboard & History
- Live tournament standings
- Final placements tracking
- Historical tournament data

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL or Supabase

### Installation

```bash
# Clone repository
git clone https://github.com/AddyisAbaDDiee/mini-esports.git
cd mini-esports

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

**Frontend:** http://localhost:3000 | **Backend:** http://localhost:5000

---

## 📖 Documentation

- **[Getting Started Guide](./GETTING_STARTED.md)** - First time? Start here
- **[User Manual](./USER_MANUAL.md)** - Complete feature walkthrough
- **[Setup Instructions](./SETUP.md)** - Detailed installation
- **[Project Summary](./PROJECT_SUMMARY.md)** - Technical overview
- **[Submission Checklist](./SUBMISSION_CHECKLIST.md)** - Project requirements

---

## 🏗️ Architecture

### Backend Stack
- **Express.js** - RESTful API
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend Stack
- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation

---

## 📱 User Workflows

### For Organizers
1. Create tournament → Set game, player limit, deadline
2. Share link with friends
3. Monitor registrations
4. Lock bracket when ready
5. Update match results as games finish
6. View final standings

### For Players
1. Sign up / Login
2. Browse available tournaments
3. Join tournament of choice
4. Wait for bracket generation
5. Play your matches
6. View final placement

---

## 🔒 Security Features

✅ Input validation on all endpoints  
✅ Permission-based authorization  
✅ Password hashing (bcrypt)  
✅ JWT token expiration (7 days)  
✅ SQL injection protection  
✅ CORS configured  
✅ Sensitive data in .env (gitignored)  

---

## 🎮 Supported Games

Tekken 8 • Street Fighter 6 • Valorant • League of Legends • Counter-Strike 2 • Dota 2 • Super Smash Bros • Fortnite • Apex Legends • Overwatch 2

---

## 📊 Project Statistics

- **Backend Routes:** 5 core endpoints
- **Frontend Pages:** 7 complete pages
- **Database Tables:** 6 normalized tables
- **Development Time:** 3 days
- **Status:** Production Ready

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite + TailwindCSS |
| **Backend** | Express.js + Node.js |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | JWT + Bcrypt |

---

## 🚀 Deployment

Ready for production on:
- Railway
- Vercel (frontend)
- Heroku
- Any Node.js host

---

## 📝 API Endpoints

```
POST   /api/auth/signup           - Create account
POST   /api/auth/login            - Login
GET    /api/tournaments           - List tournaments
GET    /api/tournaments/:id       - Tournament details
POST   /api/tournaments           - Create tournament
POST   /api/tournaments/:id/join  - Join tournament
POST   /api/tournaments/:id/lock-bracket - Lock & start
GET    /api/matches/tournament/:id - Get bracket
POST   /api/matches/:id/result    - Update result
GET    /api/games                 - List games
```

---

## 🐛 Known Limitations

- Single elimination format only
- No real-time WebSocket updates
- No mobile app (responsive web only)

---

## 📈 Future Roadmap

- [ ] Double elimination & round-robin formats
- [ ] WebSocket real-time updates
- [ ] Mobile app
- [ ] Tournament scheduling
- [ ] Player ratings & rankings
- [ ] Stream integration

---

## 📄 License

MIT License - Open source and free to use

---

<div align="center">

**Built with ❤️ for gaming communities**

[GitHub](https://github.com/AddyisAbaDDiee/mini-esports)

</div>
