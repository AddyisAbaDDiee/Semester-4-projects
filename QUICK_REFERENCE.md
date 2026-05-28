# 🎯 APEX Quick Reference

## Start the App

### Windows
```bash
start.cmd
```

### Mac/Linux
```bash
bash start.sh
```

### Manual
```bash
npm run dev:all
```

## Once Running

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

## File You MUST Edit

### `.env` 
Add your Anthropic API key:
```
ANTHROPIC_API_KEY=sk_YOUR_ACTUAL_KEY_HERE
```

Get key from: https://console.anthropic.com/account/keys

## Project Structure at a Glance

```
src/
├── api/client.js           ← API communication
├── components/             ← React pages & components
├── context/AppContext.jsx  ← Global state
├── styles/                 ← CSS files
└── App.jsx                 ← Root component

server.js                   ← Backend API server
.env                        ← Your config (NEVER commit!)
.env.local                  ← Frontend config
vite.config.js              ← Frontend build config
package.json                ← Dependencies
```

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm run dev:all` | Run both servers together |
| `npm run server` | Backend only |
| `npm run dev` | Frontend only |
| `npm run build` | Production build |
| `npm run preview` | Preview production |
| `npm install` | Install dependencies |

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Server status |
| POST | `/api/chat` | Chat with AI |
| POST | `/api/plan` | Generate fitness plan |

## Troubleshooting

### "API key not found"
→ Edit `.env` and add your API key

### "Backend not running"
→ Make sure port 5000 is free
→ Check terminal for error messages

### "Frontend can't reach backend"
→ Verify backend is running: http://localhost:5000/health
→ Check `.env.local` has correct `VITE_API_URL`

### "Port already in use"
→ Kill process: `taskkill /IM node.exe /F` (Windows)
→ Or change port in `.env`

## Never Do This

❌ Commit `.env` file  
❌ Share your API key  
❌ Paste API key in browser console  
❌ Leave API key in code  

## Got It? You're Ready!

1. Add API key to `.env`
2. Run: `npm run dev:all`
3. Open: http://localhost:5173
4. Have fun! 🚀

---

Need more help? Read:
- `GETTING_STARTED.md` - Full setup guide
- `README_PRODUCTION.md` - Deploy to production
- `SETUP_COMPLETE.md` - Architecture overview
