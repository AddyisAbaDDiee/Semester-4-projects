# APEX: AI Fitness Coach - User Manual

## 📖 Table of Contents
1. [Introduction](#introduction)
2. [System Requirements](#system-requirements)
3. [Installation & Setup](#installation--setup)
4. [Getting Started](#getting-started)
5. [Feature Walkthrough](#feature-walkthrough)
6. [Troubleshooting](#troubleshooting)
7. [Technical Architecture](#technical-architecture)

---

## Introduction

**APEX** is an intelligent fitness coaching application powered by AI. It guides users through personalized fitness planning, workout tracking, and interactive coaching conversations.

### Key Features
- 🎯 **Personalized Onboarding** - 4-step questionnaire to understand your fitness profile
- 💪 **AI-Generated Fitness Plans** - Custom workout plans created by Claude AI
- 📊 **Dashboard & Progress Tracking** - Monitor workouts, track metrics, and log progress
- 🤖 **AI Coach Chat** - Real-time interaction with an intelligent fitness coach
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

---

## System Requirements

### Minimum Requirements
| Requirement | Version |
|-------------|---------|
| Node.js | 18.0 or higher |
| npm | 9.0 or higher |
| Operating System | Windows 10+, macOS 10.15+, Ubuntu 20.04+ |
| RAM | 2GB minimum |
| Disk Space | 500MB for node_modules |
| Internet Connection | Required (for Anthropic API) |

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Installation & Setup

### Step 1: Prerequisites
Ensure you have Node.js installed:
```bash
node --version  # Should be v18.0 or higher
npm --version   # Should be 9.0 or higher
```

If not installed, download from: https://nodejs.org/

### Step 2: Get the Source Code

#### Option A: GitHub Repository
```bash
git clone <your-github-repo-url>
cd apex-fitness
```

#### Option B: From ZIP File
1. Extract the zip file
2. Open terminal/command prompt in the extracted folder

### Step 3: Install Dependencies
```bash
npm install
```

This installs:
- React + Vite (frontend)
- Express.js (backend)
- Axios (HTTP client)
- dotenv (configuration management)
- Concurrently (multi-process runner)

### Step 4: Configure API Key

**Critical:** Your Anthropic API key must be set up before the app works.

1. Get a free API key:
   - Visit: https://console.anthropic.com/account/keys
   - Sign up or log in with your Anthropic account
   - Copy your API key

2. Create/Edit `.env` file in the project root:
   ```
   ANTHROPIC_API_KEY=sk_YOUR_ACTUAL_KEY_HERE
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

3. **Never share this file** - it's already in `.gitignore`

### Step 5: Validate Setup
```bash
npm run validate
```

Expected output:
```
✅ Node.js 18+
✅ npm installed
✅ .env file exists
✅ API key configured
✅ Dependencies installed
✅ File: server.js
✅ File: src/App.jsx
... (all files present)

Result: 10/10 checks passed
```

### Step 6: Start the Application

**Windows:**
```bash
start.cmd
```

**macOS/Linux:**
```bash
bash start.sh
```

**Manual:**
```bash
npm run dev:all
```

Expected output:
```
> concurrently "npm run server" "npm run dev"

[0] Server started on http://localhost:5000
[1] VITE v4.x.x  ready in XXX ms

[1] ➜  Local:   http://localhost:5173/
```

### Step 7: Access the Application
Open your browser and navigate to:
```
http://localhost:5173
```

---

## Getting Started

### First Time User Flow

#### 1. **Home Screen**
   - Read the welcome message
   - Click "Get Started" button
   - Or skip directly to onboarding

#### 2. **Onboarding (4 Steps)**

**Step 1: Basic Info**
   - Enter your name
   - Select your gender
   - Enter your age

**Step 2: Fitness Level**
   - Choose your current fitness level
   - Select experience with weight training
   - Choose preferred workout type

**Step 3: Goals**
   - Pick primary goal (weight loss, muscle gain, etc.)
   - Select secondary goals
   - Set your target timeline

**Step 4: Preferences**
   - Choose workout frequency
   - Select preferred time of day
   - Note any injuries or limitations

Click "Complete Profile" to proceed.

#### 3. **Generate Your Plan**
   - Click "Generate AI Plan"
   - The system creates a personalized 8-week fitness plan
   - Review your customized workout schedule

#### 4. **View Your Dashboard**
   - See today's workout
   - Check upcoming workouts
   - View your fitness stats

#### 5. **Chat with AI Coach**
   - Ask questions about your workout
   - Get form tips and modifications
   - Receive encouragement and guidance

---

## Feature Walkthrough

### 🏠 **Home Page**
- Introduction to APEX
- Feature highlights
- Call-to-action button to start onboarding
- Clean, modern design

### 📋 **Onboarding Module**
- Multi-step form with progress indicator
- Input validation and helpful hints
- Saves your fitness profile
- Estimated duration: 2-3 minutes

### 💪 **Plan Generation**
- AI analyzes your profile
- Creates customized 8-week plan
- Shows daily workout breakdown
- Includes exercise details (sets, reps, duration)
- **Status Indicator:** Shows when plan is being generated

**If plan generation fails:**
- A fallback plan is provided immediately
- You can try again with the "Regenerate" button
- Contact support if persistent issues occur

### 📊 **Dashboard**
The main hub with multiple sections:

**Today's Workout**
- Current day's exercise
- Sets and reps
- Estimated duration
- "Mark Complete" button

**Upcoming Workouts**
- Next 7 days at a glance
- Quick preview of each day
- Click to see full details

**Fitness Stats**
- Workouts completed this week
- Total workouts in program
- Progress percentage
- Goals summary

**Quick Actions**
- View full program
- Chat with coach
- Log progress
- Edit profile

### 📱 **Program View (Plan Tab)**
- View the complete 8-week program
- Tabbed navigation by week
- Detailed exercise breakdown
- Notes and form tips
- Print-friendly format

### 💬 **AI Coach Chat**
- Real-time conversation interface
- Context-aware responses (coach knows your plan)
- Message history retained during session
- Typing indicators while coach responds
- Support for questions about:
  - Exercise form and technique
  - Modifications and alternatives
  - Recovery and nutrition tips
  - Motivation and goal-setting

**Chat Features:**
- Type your question in the input box
- Send with button or Enter key
- Messages appear instantly
- Coach response appears below
- Clear chat to start fresh

### 📈 **Progress Tracking**
- Log completed workouts
- Track metrics (weight, measurements)
- View progress charts
- Calculate body metrics
- Historical data retention

**Log Types:**
- Workout completion (yes/no)
- Weight tracking
- Measurement tracking (chest, arms, waist, legs)
- Notes and achievements

### ⚙️ **Settings & Profile**
- Edit fitness profile
- Update preferences
- Change API configuration (if needed)
- Reset application data

---

## Troubleshooting

### Common Issues & Solutions

#### **"Port 5000 is already in use"**
```bash
# Windows: Kill the process
taskkill /IM node.exe /F

# macOS/Linux: Find and kill the process
lsof -i :5000
kill -9 <PID>
```

Then try again:
```bash
npm run dev:all
```

---

#### **"API key not configured"**
Error message appears when trying to use AI features.

**Solution:**
1. Edit `.env` file in project root
2. Add: `ANTHROPIC_API_KEY=sk_YOUR_KEY_HERE`
3. Get key from: https://console.anthropic.com/account/keys
4. Restart the application (Ctrl+C, then `npm run dev:all`)

---

#### **"Backend not responding"**
Frontend shows "Connection failed" error.

**Checklist:**
- [ ] Backend is running (check terminal - should show "Server started on port 5000")
- [ ] Port 5000 is available (no other service using it)
- [ ] `.env` file exists in project root
- [ ] No firewall blocking localhost:5000

**Fix:**
```bash
# Kill and restart
npm run dev:all
```

---

#### **"Module not found" errors**
Error during npm install or startup.

**Solution:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev:all
```

---

#### **"Build failed"**
Application won't start.

**Steps:**
1. Check Node version: `node --version` (must be 18+)
2. Check npm version: `npm --version` (must be 9+)
3. Clear cache: `npm cache clean --force`
4. Reinstall: `rm -rf node_modules && npm install`
5. Try again: `npm run dev:all`

---

#### **"CORS Error in browser console"**
Error message about cross-origin requests.

**Solution:**
1. Check `.env.local` file has:
   ```
   VITE_API_URL=http://localhost:5000
   ```
2. Verify backend is running on port 5000
3. Clear browser cache: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)
4. Restart both servers

---

#### **Chat not responding or slow**
AI coach takes >30 seconds to respond or doesn't respond at all.

**Possible causes:**
- API rate limit exceeded (too many requests)
- Anthropic API is down
- Network connection issue
- Invalid API key

**Solution:**
1. Wait 60 seconds before trying again
2. Check your API key is correct in `.env`
3. Verify internet connection
4. Check API status at: https://status.anthropic.com/

---

#### **Plan generation keeps failing**
"Failed to generate plan" error repeatedly.

**Steps:**
1. Check API key is valid and has credits
2. Verify internet connection
3. Try with a simpler profile (shorter answers)
4. Wait a few minutes and retry
5. Check server logs for specific errors

Server logs visible in terminal where you ran `npm run dev:all`

---

### Getting Help

If issues persist:

1. **Check the logs:**
   - Browser console (F12 → Console tab)
   - Server terminal where you ran `npm run dev:all`

2. **Review the guides:**
   - `GETTING_STARTED.md` - Setup and troubleshooting
   - `README_PRODUCTION.md` - Deployment issues
   - `SETUP_COMPLETE.md` - Architecture overview

3. **Common commands:**
   ```bash
   npm run validate          # Check all configurations
   npm run dev:all          # Start everything
   npm install              # Reinstall dependencies
   npm run build            # Create production build
   npm run preview          # Test production build
   ```

---

## Technical Architecture

### System Overview
```
┌─────────────────────────────────────────────────┐
│           APEX Fitness Application              │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────┐    ┌────────────────────┐ │
│  │   FRONTEND      │    │     BACKEND        │ │
│  │  (React/Vite)   │←──→│  (Express.js)      │ │
│  │                 │    │                    │ │
│  │ Components:     │    │ • /api/chat        │ │
│  │ • Home          │    │ • /api/plan        │ │
│  │ • Onboard       │    │ • /health          │ │
│  │ • Generation    │    │                    │ │
│  │ • Dashboard     │    │ API Key Protection │ │
│  │ • Chat          │    │ (Anthropic API)    │ │
│  │ • Plan          │    │                    │ │
│  │ • Progress      │    │                    │ │
│  │                 │    │                    │ │
│  │ Port: 5173      │    │ Port: 5000         │ │
│  └─────────────────┘    └────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
                         │
                         ↓
        ┌────────────────────────────┐
        │   Anthropic API (Claude)   │
        │   https://api.anthropic.com│
        └────────────────────────────┘
```

### Key Components

**Frontend (src/)**
- `App.jsx` - Root component with navigation
- `AppContext.jsx` - Global state management
- `components/` - Feature modules (Home, Dashboard, Chat, etc.)
- `api/client.js` - Backend communication layer
- `styles/` - CSS variables and component styles

**Backend (server.js)**
- Express.js HTTP server
- API endpoints for chat and plan generation
- Request validation and error handling
- CORS configuration for frontend access
- Environment variable management

**Configuration**
- `.env` - Backend secrets (API key, ports)
- `.env.local` - Frontend configuration
- `vite.config.js` - Frontend build configuration
- `package.json` - Dependencies and scripts

### Data Flow

1. **User Input** → Frontend captures input (onboarding form)
2. **Local Processing** → React Context stores user profile
3. **API Request** → Frontend sends to backend via `api/client.js`
4. **Validation** → Backend validates request structure
5. **Secure Proxy** → Backend forwards to Anthropic API with stored key
6. **Response Processing** → Backend handles response and errors
7. **UI Update** → Frontend displays result in React components

### Security Features

✅ **API Key Protection**
- Anthropic API key stored on server only
- Never exposed to browser
- Transmitted only via HTTPS in production

✅ **Input Validation**
- All user inputs validated on backend
- Message length limits enforced
- Request structure verified

✅ **Error Handling**
- Graceful error messages to users
- Detailed logging for debugging
- No sensitive data in error messages

✅ **Environment Management**
- Configuration via `.env` (not committed)
- `.env.example` template for documentation
- Separate configs for development/production

---

## Appendix: Command Reference

### Development
```bash
npm run dev              # Frontend only (Vite dev server)
npm run server           # Backend only (Express)
npm run dev:all          # Both servers (recommended)
npm run validate         # Check setup configuration
```

### Building & Deployment
```bash
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm install              # Install/update dependencies
```

### Troubleshooting
```bash
npm cache clean --force  # Clear npm cache
npm update               # Update dependencies
npm audit                # Check for vulnerabilities
```

---

## Support & Documentation

| Document | Purpose |
|----------|---------|
| `QUICK_REFERENCE.md` | Start here - quick commands |
| `GETTING_STARTED.md` | Detailed setup & troubleshooting |
| `README_PRODUCTION.md` | Deployment to production |
| `SETUP_COMPLETE.md` | Architecture & technical overview |
| `USER_MANUAL.md` | This document - user guide |

---

## Version Information
- **Application:** APEX Fitness Coach v1.0
- **Frontend:** React 18 + Vite 4
- **Backend:** Express.js 4
- **API:** Anthropic Claude API
- **Last Updated:** 2026-05-28

---

**Happy fitness journey! 💪**

For questions or feedback, refer to the documentation files in the project root.
