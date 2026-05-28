# 🚀 GitHub & Classroom Submission Guide

Complete step-by-step instructions to get your project on GitHub and submit to Google Classroom.

---

## Part 1: Initialize Git Repository

### Step 1: Verify Git is Installed
```bash
git --version
```
Should show version 2.x or higher.

If not installed:
- **Windows:** Download from https://git-scm.com/download/win
- **Mac:** `brew install git`
- **Linux:** `sudo apt-get install git`

### Step 2: Configure Git (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@university.edu"
```

### Step 3: Initialize Repository Locally
```bash
cd "c:\work shi\ai workspace"
git init
git add .
git commit -m "Initial commit: APEX Fitness Coach v1.0 - Full-stack AI fitness application"
```

**Expected output:**
```
[main (root-commit) xxxxx] Initial commit: APEX Fitness Coach v1.0
 XX files changed, XXXX insertions(+)
```

---

## Part 2: Create GitHub Repository

### Step 1: Create Account (if needed)
- Visit https://github.com
- Sign up for free account
- Verify email address

### Step 2: Create New Repository

1. Click **+** icon (top right) → **New repository**
2. Fill in details:
   - **Repository name:** `apex-fitness` (or similar)
   - **Description:** "AI-powered fitness coaching web application using React, Express.js, and Claude API"
   - **Public** (important - allows evaluators to access)
   - **Add README** - Uncheck (we have one)
   - **Add .gitignore** - Uncheck (we have one)
   - **License** - Select "MIT License"
3. Click **Create repository**

### Step 3: Copy Repository URL
You'll see a page with:
```
https://github.com/YOUR_USERNAME/apex-fitness.git
```

Copy this URL.

---

## Part 3: Push Code to GitHub

### Step 1: Connect Local Repository to GitHub
```bash
cd "c:\work shi\ai workspace"
git remote add origin https://github.com/YOUR_USERNAME/apex-fitness.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

**Expected output:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to X threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), 7.XX MiB | X.XX MiB/s

To https://github.com/YOUR_USERNAME/apex-fitness.git
 * [new branch]      main -> main
Branch 'main' is set up to track remote branch 'main' from 'origin'.
```

### Step 2: Verify on GitHub
1. Go to: `https://github.com/YOUR_USERNAME/apex-fitness`
2. Verify you see:
   - ✅ All source code files
   - ✅ README.md displayed beautifully
   - ✅ All documentation files (.md files)
   - ✅ `.gitignore` (but not .env)
   - ✅ LICENSE file
   - ✅ package.json, server.js, vite.config.js

---

## Part 4: Verify Nothing Sensitive Was Committed

### Check for Secrets
```bash
cd "c:\work shi\ai workspace"
git log --all --source --remotes -S "ANTHROPIC" -S "sk_" --full-history
```

**Expected:** No output (no secrets found)

If secrets appear:
```bash
# This is complex - reach out to instructor
# Do NOT push sensitive data to public repo
```

### Verify .env is NOT in Repository
```bash
git ls-files | grep ".env"
```

**Expected:** 
- `.env.example` only (template, safe)
- No `.env` file (secret, properly gitignored)

---

## Part 5: Set Repository Description

### Update Repository Settings
1. Go to your repository
2. Click **Settings** (top right)
3. Edit description:
   ```
   AI-powered fitness coaching application built with React, Express.js, and Anthropic Claude API. Features personalized plan generation, progress tracking, and real-time AI coaching.
   ```
4. Add **Topics:** `react` `express` `ai` `fitness` `anthropic-api`
5. Scroll down and check:
   - [x] **Public** repository
   - [x] Allow **Discussions** (optional)
6. Click **Save changes**

---

## Part 6: Create Submission Folder Structure

Before submitting to Classroom, organize your materials:

```
SUBMISSION/
├── README.txt (Instructions for evaluators)
├── GITHUB_LINK.txt (Your repo URL)
├── apex-fitness-project.zip (optional backup)
└── SUBMISSION_NOTES.txt (Team & implementation notes)
```

### Create README.txt for Evaluators
```
APEX FITNESS COACH - SUBMISSION

GITHUB REPOSITORY:
https://github.com/YOUR_USERNAME/apex-fitness

QUICK START:
1. Clone: git clone https://github.com/YOUR_USERNAME/apex-fitness.git
2. Install: npm install
3. Configure: Add ANTHROPIC_API_KEY to .env
4. Run: npm run dev:all
5. Open: http://localhost:5173

FEATURES:
✅ Smart onboarding questionnaire
✅ AI-powered fitness plan generation
✅ Interactive AI coach chat
✅ Progress tracking dashboard
✅ Responsive design (mobile/tablet/desktop)

DOCUMENTATION:
- USER_MANUAL.md - Complete user guide
- GETTING_STARTED.md - Setup instructions
- README_PRODUCTION.md - Deployment guide
- PROJECT_SUMMARY.md - Technical overview

TEAM MEMBERS:
[Names here]

All source code, documentation, and executable files are in the GitHub repository.
```

---

## Part 7: Submit to Google Classroom

### Step 1: Open Google Classroom
- Visit https://classroom.google.com
- Find your course
- Locate this assignment

### Step 2: Prepare Submission

Have ready:
- ✅ GitHub repository URL (public)
- ✅ List of team members
- ✅ Brief description of features

### Step 3: Submit Assignment

Click on the assignment and fill:

**Title:** APEX Fitness Coach - Final Submission

**Description / Comment:**
```
Project: APEX Fitness Coach v1.0
Repository: https://github.com/YOUR_USERNAME/apex-fitness

FEATURES IMPLEMENTED:
✅ Smart Onboarding - 4-step fitness profile questionnaire
✅ AI Plan Generation - Claude AI creates personalized 8-week workouts
✅ Dashboard - Workout display, statistics, progress tracking
✅ AI Coach Chat - Real-time interaction with fitness guidance
✅ Progress Tracking - Log workouts, track metrics
✅ Responsive Design - Works on mobile, tablet, desktop

TEAM MEMBERS:
- [Name] - Full-stack development
- [Name] - Frontend components
- [Name] - Backend API & integration

TECHNOLOGY STACK:
- Frontend: React 18 + Vite
- Backend: Express.js
- API: Anthropic Claude
- State: React Context API
- Database: N/A (in-memory for this version)

INSTALLATION & RUNNING:
See README.md in repository for detailed instructions.

Quick start:
1. npm install
2. Add ANTHROPIC_API_KEY to .env
3. npm run dev:all
4. Open http://localhost:5173

DOCUMENTATION:
All documentation files included in repository:
- USER_MANUAL.md - User guide with screenshots
- GETTING_STARTED.md - Setup with troubleshooting
- README_PRODUCTION.md - Deployment instructions
- PROJECT_SUMMARY.md - Architecture & design decisions

REPOSITORY STATUS:
- All source code committed to GitHub
- Public repository (accessible for evaluation)
- No sensitive data committed (.env properly gitignored)
- Code freeze: Ready for final review
```

### Step 4: Attach Files (Optional)
You can attach a ZIP file as backup:
1. Create zip: `apex-fitness-source.zip`
2. Exclude: `node_modules/`, `.git/`, `.env`
3. Upload to assignment

### Step 5: Submit
Click **Submit** button

**You should see:** "Submitted" status with timestamp

---

## Part 8: Final Verification Checklist

### GitHub Repository
- [ ] Public (not private)
- [ ] README.md displays beautifully
- [ ] All documentation files present
- [ ] No `.env` file visible
- [ ] `.env.example` visible
- [ ] LICENSE file present
- [ ] All source code visible
- [ ] Repository description filled
- [ ] Topics added (react, express, ai, fitness)

### Classroom Submission
- [ ] Assignment submitted
- [ ] GitHub link included
- [ ] Team members listed
- [ ] Description clear and complete
- [ ] Submission timestamp visible

### Code Quality
- [ ] No hardcoded secrets
- [ ] No console.log spam
- [ ] Proper error handling
- [ ] Meaningful variable names
- [ ] Modular architecture
- [ ] Clean .gitignore

### Documentation
- [ ] README.md - Overview ✅
- [ ] USER_MANUAL.md - User guide ✅
- [ ] GETTING_STARTED.md - Setup guide ✅
- [ ] README_PRODUCTION.md - Deployment ✅
- [ ] PROJECT_SUMMARY.md - Architecture ✅
- [ ] QUICK_REFERENCE.md - Commands ✅
- [ ] SUBMISSION_CHECKLIST.md - Prep guide ✅

---

## Part 9: Handle Evaluation Period

### Before Live Demo
1. Verify local application still runs: `npm run dev:all`
2. Test all features work
3. Prepare talking points (architecture, design decisions)
4. Know how to explain each component
5. Have backup deployed version (optional but recommended)

### During Evaluation
1. Show GitHub repository (README quality, code organization)
2. Run application locally
3. Walk through features (onboarding → plan → chat → dashboard)
4. Explain architecture (frontend, backend, API flow)
5. Show error handling and edge cases
6. Discuss code quality and design decisions

### Answering Questions
Be ready to explain:
- Why you chose React/Express/Context API
- How API key security is implemented
- What would you add/improve
- How team members contributed
- Challenges and how you solved them

---

## Troubleshooting Submission

### GitHub Issues

**"Permission denied" when pushing**
```bash
# Regenerate SSH key or use HTTPS instead of SSH
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/apex-fitness.git
git push -u origin main
```

**".env file visible in GitHub"**
⚠️ **CRITICAL:** Don't commit .env
```bash
# Remove from GitHub history (dangerous):
git rm --cached .env
git commit -m "Remove .env file"
git push
# Then verify not visible on GitHub
```

**Repository looks empty**
- Verify you pushed: `git push origin main`
- Verify public access: Repository settings → public
- Refresh browser page

### Classroom Issues

**Can't find assignment**
- Verify you're in correct class
- Check assignment deadline hasn't passed
- Contact instructor if assignment missing

**"Link doesn't work"**
- Copy exact URL from browser address bar
- Paste into assignment
- Include full URL: `https://github.com/YOUR_USERNAME/apex-fitness`

---

## After Submission

### What Happens Next
1. **Code Review** - Evaluators review code on GitHub
2. **Live Demo** - You demonstrate the application
3. **Q&A** - Answer technical questions
4. **Grading** - Based on:
   - Functionality & Completeness (85%)
   - Code Quality & Maintainability (15%)

### Keep the Repository Active
- ❌ Don't delete the repository after submission
- ❌ Don't make breaking changes to main branch
- ✅ Do keep it accessible during evaluation period
- ✅ Do be ready to answer questions about code

---

## Final Checklist Before Declaring "DONE"

- [ ] Git repository initialized locally
- [ ] GitHub repository created (public)
- [ ] All code pushed to GitHub main branch
- [ ] README.md displays correctly on GitHub
- [ ] .env file NOT in repository
- [ ] .env.example file IS in repository
- [ ] LICENSE file included
- [ ] All documentation files present
- [ ] Classroom submission completed
- [ ] GitHub link in Classroom is correct
- [ ] Application runs: `npm run dev:all`
- [ ] All features verified working
- [ ] No console errors or warnings
- [ ] Code Quality meets standards
- [ ] Team members can explain codebase

---

## Contact & Support

### If Something Goes Wrong

1. **Git Issues:** See GitHub documentation at https://docs.github.com
2. **Classroom Issues:** Contact your instructor
3. **Application Issues:** Check troubleshooting in USER_MANUAL.md
4. **Code Questions:** Review PROJECT_SUMMARY.md and SETUP_COMPLETE.md

---

## Quick Reference

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/apex-fitness.git

# Check git status
git status

# View commit history
git log --oneline

# Push to GitHub
git push origin main

# Create new branch (for ongoing development)
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
```

---

**🎉 Congratulations! Your project is ready for submission.**

All deliverables are complete:
- ✅ Complete source code
- ✅ Comprehensive documentation
- ✅ Working application
- ✅ User manual
- ✅ GitHub repository
- ✅ Classroom submission

**Good luck with your evaluation!** 🚀

---

## Appendix: Getting Help

| Issue | Solution |
|-------|----------|
| Forgot GitHub username | Visit profile.github.com |
| Can't find repository URL | It's in GitHub repo page top right |
| API key not working | Verify in .env, get new key from console.anthropic.com |
| Application won't start | Run `npm install` and `npm run validate` |
| Port 5000 in use | `taskkill /IM node.exe /F` then restart |
| Can't push to GitHub | Verify public repo, check credentials |
| Classroom not accepting link | Verify URL starts with https:// |

For more help, consult the full documentation in your repository.
