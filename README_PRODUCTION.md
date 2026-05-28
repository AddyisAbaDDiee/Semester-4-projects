# APEX — AI Fitness Platform

A full-stack, production-ready fitness application with an AI coach powered by Claude.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Anthropic API key (get it from https://console.anthropic.com/account/keys)

### Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
```bash
# Copy the example env file
cp .env.example .env

# Add your Anthropic API key to .env
# Edit .env and set ANTHROPIC_API_KEY=sk_...
```

3. **Run both frontend and backend:**
```bash
# Option 1: Run both concurrently (recommended)
npm run dev:all

# Option 2: Run separately in different terminals
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend
npm run dev
```

4. **Open in browser:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
.
├── server.js                 # Express backend server
├── src/
│   ├── api/
│   │   └── client.js        # API client for backend communication
│   ├── components/
│   │   ├── Home.jsx         # Landing page
│   │   ├── Onboard.jsx      # 4-step onboarding flow
│   │   ├── Generation.jsx   # Plan generation screen
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Chat.jsx         # AI coach chatbot
│   │   ├── Plan.jsx         # Program viewer
│   │   ├── Progress.jsx     # Progress tracker
│   │   └── App.jsx          # Main app wrapper
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── styles/
│   │   ├── variables.css    # Design tokens & base styles
│   │   └── components.css   # Component-specific styles
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── .env                     # Environment variables (local)
├── .env.example             # Example env file (template)
├── .env.local               # Frontend Vite config (local)
└── vite.config.js           # Vite configuration

```

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `CLIENT_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)

**Frontend (.env.local):**
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## 🌐 API Endpoints

### Health Check
```bash
GET /health
```
Returns server status.

### Chat Endpoint
```bash
POST /api/chat

Request:
{
  "messages": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" }
  ],
  "system": "You are a fitness coach",  // optional
  "max_tokens": 500                      // optional (default: 500, max: 4000)
}

Response:
{
  "success": true,
  "data": { ... Anthropic API response ... }
}
```

### Plan Generation Endpoint
```bash
POST /api/plan

Request:
{
  "prompt": "Generate a fitness plan for..."
}

Response:
{
  "success": true,
  "data": { ... Anthropic API response ... }
}
```

## 🔐 Security Features

✅ **API Key Protection**
- Anthropic API key stored server-side only
- Never exposed to client

✅ **Request Validation**
- Input validation on all endpoints
- Message structure validation
- Max token limits enforced

✅ **CORS Configuration**
- Restricted to configured client URLs
- Development and production support

✅ **Error Handling**
- Comprehensive error messages
- Proper HTTP status codes
- Server-side error logging

✅ **Rate Limiting Ready**
- Error handling for 429 (rate limit) responses
- Graceful degradation

## 📦 Dependencies

### Frontend
- **react** 19.2 - UI framework
- **react-dom** 19.2 - DOM rendering

### Backend
- **express** 5.2 - Web server
- **axios** 1.16 - HTTP client
- **cors** 2.8 - CORS middleware
- **dotenv** 17.4 - Environment management

### Development
- **vite** 8.0 - Frontend bundler
- **concurrently** 8.x - Run multiple scripts
- **eslint** 10.3 - Code linting

## 🚀 Production Deployment

### Backend

1. **Set environment variables:**
```bash
export NODE_ENV=production
export ANTHROPIC_API_KEY=your_key_here
export CLIENT_URL=https://yourfrontend.com
```

2. **Start server:**
```bash
node server.js
```

3. **Use a process manager:**
```bash
npm install -g pm2
pm2 start server.js --name apex-api
```

### Frontend

1. **Build the app:**
```bash
npm run build
```

2. **Deploy dist/ folder** to your hosting (Vercel, Netlify, AWS S3, etc.)

3. **Update API URL:**
```bash
# In your hosting environment
VITE_API_URL=https://your-api-domain.com
```

## 🧪 Testing

### Test the API locally
```bash
# Health check
curl http://localhost:5000/health

# Chat request
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 100
  }'

# Plan generation
curl -X POST http://localhost:5000/api/plan \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Create a basic fitness plan"}'
```

## 📋 Features

### User Onboarding
- 4-step questionnaire for fitness profile
- Collects: basics, goals, training preferences, nutrition

### AI Coach
- Generates personalized fitness plans
- Real-time chat for fitness advice
- Context-aware responses

### Dashboard
- Weekly task overview
- Progress tracking
- Goal visualization
- Daily task management

### Progress Tracking
- Log weight, strength, and metrics
- Historical data storage
- Progress visualization

## 🐛 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "ANTHROPIC_API_KEY not set"
1. Create `.env` file in root
2. Add your API key: `ANTHROPIC_API_KEY=sk_...`
3. Restart the server

### Frontend can't reach backend
1. Ensure backend is running on http://localhost:5000
2. Check CORS settings in `server.js`
3. Verify `VITE_API_URL` in `.env.local`

### "Port 5000 already in use"
```bash
# Change PORT in .env
PORT=5001

# Or kill the process
# Windows: taskkill /IM node.exe /F
# Mac/Linux: pkill node
```

## 📝 Git Workflow

### Files to never commit
```
.env
.env.local
node_modules/
dist/
.DS_Store
```

### Already in .gitignore
✓ Environment files
✓ Node modules
✓ Build outputs
✓ OS files

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes and test
3. Commit: `git commit -m "Add feature"`
4. Push and create a PR

## 📚 Documentation

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Anthropic API Docs](https://docs.anthropic.com/)

## 📄 License

MIT License - feel free to use for personal or commercial projects

---

**Built with ❤️ using React, Express, and Claude AI**
