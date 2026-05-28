# 🏋️ APEX: AI Fitness Coach

A full-stack web application that uses artificial intelligence to create personalized fitness plans and provide real-time coaching guidance.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-4-lightgrey)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## ✨ Features

- **🎯 Smart Onboarding** - Understand your fitness level, goals, and preferences
- **💪 AI-Powered Plans** - Generate personalized 8-week workout programs with Claude AI
- **📊 Progress Tracking** - Monitor workouts, track metrics, and visualize improvements
- **🤖 AI Coach** - Chat with an intelligent fitness coach in real-time
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🔒 Secure Architecture** - API keys stay server-side, never exposed to browser

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher
- Anthropic API key ([get one free](https://console.anthropic.com/account/keys))

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd apex-fitness

# 2. Install dependencies
npm install

# 3. Configure API key
# Create .env file with your Anthropic API key:
echo "ANTHROPIC_API_KEY=sk_YOUR_KEY_HERE" > .env
echo "PORT=5000" >> .env
echo "NODE_ENV=development" >> .env
echo "CLIENT_URL=http://localhost:5173" >> .env

# 4. Validate setup
npm run validate

# 5. Start the application
npm run dev:all
```

Visit `http://localhost:5173` in your browser.

## 📋 Documentation

- **[USER_MANUAL.md](USER_MANUAL.md)** - Complete user guide with feature walkthrough and troubleshooting
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Detailed setup instructions and common issues
- **[README_PRODUCTION.md](README_PRODUCTION.md)** - Deployment guide for production environments
- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Architecture overview and technical details
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Command cheat sheet

## 🏗️ Architecture

### Frontend
- **Framework:** React 18 with Vite
- **State Management:** React Context API
- **Styling:** CSS with design tokens
- **HTTP Client:** Axios with centralized configuration

### Backend
- **Framework:** Express.js
- **API Proxy:** Secure communication with Anthropic API
- **Validation:** Input sanitization and error handling
- **Configuration:** Environment-based setup

### Security
- ✅ API keys stored server-side only
- ✅ CORS configured for development/production
- ✅ Input validation on all endpoints
- ✅ Comprehensive error handling

## 📁 Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── App.jsx
│   │   ├── Home.jsx
│   │   ├── Onboard.jsx
│   │   ├── Generation.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Chat.jsx
│   │   ├── Plan.jsx
│   │   └── Progress.jsx
│   ├── context/
│   │   └── AppContext.jsx # Global state management
│   ├── api/
│   │   └── client.js      # API communication layer
│   ├── styles/
│   │   ├── variables.css  # Design tokens
│   │   └── components.css # Component styles
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── server.js              # Express backend
├── vite.config.js         # Vite configuration
├── package.json           # Dependencies
├── .env                   # Configuration (not committed)
├── .env.example           # Configuration template
└── .gitignore             # Git exclusions
```

## 🎮 Available Commands

```bash
# Development
npm run dev              # Start frontend only
npm run server           # Start backend only
npm run dev:all          # Start both servers (recommended)
npm run validate         # Check setup configuration

# Production
npm run build            # Create production build
npm run preview          # Preview production build

# Maintenance
npm install              # Install dependencies
npm run lint             # Run ESLint
npm cache clean --force  # Clear npm cache
```

## 🖥️ System Requirements

| Requirement | Minimum |
|-------------|---------|
| Node.js | 18.0 LTS |
| npm | 9.0 |
| RAM | 2GB |
| Disk Space | 500MB |
| Browser | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |

## 🔧 Configuration

Create a `.env` file in the project root:

```env
# Backend Configuration
ANTHROPIC_API_KEY=sk_YOUR_API_KEY_HERE
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Get your API key from: https://console.anthropic.com/account/keys

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Windows
taskkill /IM node.exe /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

**API Key Not Found**
- Ensure `.env` file exists in project root
- Verify `ANTHROPIC_API_KEY` is set correctly
- Restart the application

**Backend Connection Failed**
- Verify backend is running on `http://localhost:5000/health`
- Check `.env.local` has correct `VITE_API_URL`
- Clear browser cache and restart

For more help, see [USER_MANUAL.md#troubleshooting](USER_MANUAL.md#troubleshooting).

## 📊 Features in Detail

### Onboarding
Comprehensive 4-step questionnaire collecting:
- Personal information (name, age, gender)
- Fitness level and experience
- Fitness goals and timeline
- Preferences and constraints

### Plan Generation
AI creates personalized workout programs featuring:
- 8-week structured training plan
- Exercise-specific guidance (sets, reps, duration)
- Progressive difficulty scaling
- Rest days and recovery periods

### Dashboard
Central hub displaying:
- Today's workout with quick completion button
- Upcoming 7-day workout preview
- Fitness statistics and progress
- Quick action menu

### AI Coach Chat
Real-time interaction with Claude AI providing:
- Form tips and exercise modifications
- Goal-setting and motivation
- Nutrition and recovery guidance
- Progress celebration and adjustments

### Progress Tracking
Monitor your fitness journey with:
- Workout completion logging
- Weight and measurement tracking
- Visual progress charts
- Historical data retention

## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel** - Recommended for frontend (see README_PRODUCTION.md)
- **Heroku** - Backend and frontend deployment
- **AWS** - Full cloud infrastructure setup
- **DigitalOcean** - Docker and app platform options

See [README_PRODUCTION.md](README_PRODUCTION.md) for detailed deployment instructions.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a course project. All team members are responsible for understanding the complete codebase.

### Code Quality Standards
- Clean, readable code with meaningful variable names
- Modular architecture with clear separation of concerns
- Comments on complex logic
- Comprehensive error handling
- Consistent formatting and style

## 📞 Support

For issues or questions:

1. Check [USER_MANUAL.md](USER_MANUAL.md) troubleshooting section
2. Review relevant documentation files
3. Check server logs for detailed error messages
4. Verify all configuration is correct

## ✅ Checklist for Submission

- [x] Complete source code (all files present)
- [x] Working backend with API proxy
- [x] Functional frontend with all features
- [x] Comprehensive documentation
- [x] Configuration management (.env setup)
- [x] Error handling and validation
- [x] Environment-based deployment ready
- [x] User manual with troubleshooting
- [x] Clean code with proper separation of concerns
- [x] Modular, maintainable architecture

## 👥 Team

This is an academic project developed as part of a software development course.

**Submitted:** 2026-05-28  
**Version:** 1.0  
**Status:** Production Ready ✅

---

**Ready to transform your fitness journey with AI? Get started in 5 minutes!** 🚀
