# 🚀 APEX - Getting Started Guide

## What is APEX?

APEX is a **full-stack AI fitness platform** that generates personalized workout and nutrition plans using Claude AI. It includes:

- 📱 **React frontend** with Vite
- 🔧 **Express backend** with API proxy
- 🤖 **Claude AI integration** for personalized coaching
- 🔒 **Secure API key management** (server-side only)

## Prerequisites

Before you start, make sure you have:

1. **Node.js 18+** - Download from https://nodejs.org/
   ```bash
   node --version  # Should show v18 or higher
   npm --version   # Should show 9 or higher
   ```

2. **Anthropic API Key** - Get it for free from https://console.anthropic.com/account/keys
   - Sign up with email
   - Go to Account → API Keys
   - Create a new API key
   - Keep it safe (you'll need it for setup)

## Installation Steps

### 1. Clone or Download the Project

```bash
cd path/to/apex
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages for both frontend and backend.

### 3. Configure Environment Variables

**Option A: Automatic (Recommended)**

Windows:
```bash
start.cmd
```

macOS/Linux:
```bash
bash start.sh
```

These scripts will:
- Check your setup
- Create `.env` file if needed
- Guide you through configuration
- Start the app

**Option B: Manual**

1. Copy the example file:
   ```bash
   # Windows
   copy .env.example .env
   
   # macOS/Linux
   cp .env.example .env
   ```

2. Edit `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=sk_your_actual_key_here
   ```

3. Save the file

### 4. Start the Application

Choose one of these methods:

**Method 1: Run Both Servers Together (Recommended)**
```bash
npm run dev:all
```

**Method 2: Run Servers Separately**

Terminal 1 (Backend):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 5. Open in Browser

Once you see this output:
```
VITE v8.0.14 ready in XXX ms

➜  Local:   http://localhost:5173/
```

Open your browser to: **http://localhost:5173/**

## First Time Setup

1. Click "BUILD MY PLAN →"
2. Fill out the 4-step questionnaire:
   - **Step 1**: Basic info (age, weight, fitness level)
   - **Step 2**: Your goals (what you want to achieve)
   - **Step 3**: Training preferences (equipment, duration, exercises)
   - **Step 4**: Nutrition & lifestyle (diet, sleep, injuries)
3. Click "GENERATE MY PLAN →"
4. Wait for Claude to generate your personalized program
5. Explore your dashboard!

## Features to Try

### 💪 Dashboard
- View today's tasks
- Track weekly progress
- See your primary goal
- Daily task checklist

### 🤖 AI Coach
- Ask fitness questions
- Get personalized advice
- Chat in real-time
- Context-aware responses

### 📋 My Plan
- View workout program
- Nutrition plan details
- Supplement protocol
- Recovery strategy

### 📊 Progress
- Log your metrics (weight, pushups, etc.)
- Track energy levels
- Add personal notes
- See historical data

## Troubleshooting

### Problem: "API key not configured"

**Solution:**
1. Open `.env` file
2. Find the line: `ANTHROPIC_API_KEY=your_key_here`
3. Replace with your actual key: `ANTHROPIC_API_KEY=sk_...`
4. Save the file
5. Restart the app

### Problem: "Cannot connect to backend"

**Solution:**
1. Make sure backend is running:
   - You should see: `✅ APEX Backend Server running on http://localhost:5000`
2. Check port 5000 is free (no other app using it)
3. If stuck, restart with: `npm run dev:all`

### Problem: "Port 5173 already in use"

**Solution:**
1. Kill the process using that port:
   - Windows: `netstat -ano | findstr :5173` then `taskkill /PID <PID> /F`
   - Mac/Linux: `lsof -i :5173` then `kill -9 <PID>`
2. Or change port in `vite.config.js`

### Problem: "Node_modules error"

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules & del package-lock.json  # Windows

npm install
npm run dev:all
```

### Problem: Dependencies won't install

**Solution:**
1. Check internet connection
2. Try clearing npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```
3. Or use yarn:
   ```bash
   npm install -g yarn
   yarn install
   ```

## Project Structure

```
apex/
├── server.js                    # Backend API server
├── src/
│   ├── api/client.js           # API client (frontend)
│   ├── components/             # React components
│   ├── context/                # State management
│   ├── styles/                 # CSS files
│   └── App.jsx                 # Main app
├── .env                        # Your configuration (NEVER commit)
├── .env.example                # Template (commit this)
├── package.json                # Dependencies
├── vite.config.js              # Vite configuration
├── start.cmd                   # Windows startup
└── start.sh                    # Mac/Linux startup
```

## Environment Variables Explained

### Backend (.env)
- `PORT=5000` - Server port
- `NODE_ENV=development` - Environment mode
- `CLIENT_URL=http://localhost:5173` - Frontend URL (CORS)
- `ANTHROPIC_API_KEY=sk_...` - YOUR API KEY (REQUIRED)

### Frontend (.env.local)
- `VITE_API_URL=http://localhost:5000` - Backend API URL

## API Endpoints (For Developers)

### Health Check
```bash
curl http://localhost:5000/health
```

### Send Chat Message
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 500
  }'
```

### Generate Fitness Plan
```bash
curl -X POST http://localhost:5000/api/plan \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Generate a fitness plan..."}'
```

## Common Commands

```bash
# Start both servers
npm run dev:all

# Start only backend
npm run server

# Start only frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Security Notes

✅ **Your API key is safe!**
- Never exposed to the browser
- All API calls go through your server
- Stored only in your `.env` file

⚠️ **NEVER:**
- Commit `.env` to git
- Share your API key
- Paste your API key in browser console
- Push your API key to public repositories

## Getting Help

### Errors in browser console?
1. Open DevTools (F12)
2. Check Console tab for error messages
3. Verify `.env` configuration

### Backend not responding?
1. Check terminal for error messages
2. Verify port 5000 is free
3. Check API key in `.env`

### Anthropic API errors?
1. Verify API key is correct
2. Check you have API quota
3. Try a simpler prompt first

## Next Steps

1. ✅ Complete setup (you're here!)
2. 🏋️ Create your fitness plan
3. 💬 Chat with your AI coach
4. 📊 Log your progress
5. 🚀 Deploy to production (when ready)

## Production Deployment

When you're ready to deploy:

1. **Build the frontend:**
   ```bash
   npm run build
   ```
   This creates a `dist/` folder

2. **Deploy frontend** to:
   - Vercel (recommended, free tier available)
   - Netlify
   - AWS S3
   - Any static host

3. **Deploy backend** to:
   - Heroku
   - Railway
   - AWS Lambda
   - DigitalOcean
   - Any Node.js host

4. **Update environment variables** on hosting:
   - Set your production API key
   - Update `CLIENT_URL` to your frontend domain

See `README_PRODUCTION.md` for detailed deployment instructions.

## Support

Need help? Check:
- 📖 `README_PRODUCTION.md` - Production guide
- 🔧 Error messages in browser/terminal
- 📝 Code comments in source files

---

**Happy training! Let Claude help you reach your fitness goals! 💪**
