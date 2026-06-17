@echo off
REM APEX Startup Script for Windows

echo.
echo 🚀 APEX Fitness Platform - Startup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% detected

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm %NPM_VERSION% detected

REM Check if .env file exists
if not exist .env (
    echo.
    echo ⚠️  .env file not found!
    if exist .env.example (
        echo Creating .env from .env.example...
        copy .env.example .env >nul
        echo ✓ Created .env file
        echo.
        echo 📝 IMPORTANT: Edit .env and add your ANTHROPIC_API_KEY
        echo    Get your key from: https://console.anthropic.com/account/keys
        pause
        exit /b 1
    ) else (
        echo ❌ .env.example not found
        pause
        exit /b 1
    )
)

REM Check if API key is set
findstr /m "ANTHROPIC_API_KEY=your_key_here" .env >nul
if %errorlevel% equ 0 (
    echo.
    echo ⚠️  ANTHROPIC_API_KEY not configured in .env
    echo 📝 Please edit .env and add your API key
    echo    Get your key from: https://console.anthropic.com/account/keys
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules (
    echo.
    echo 📦 Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
)

echo.
echo ✓ All checks passed!
echo.
echo Starting APEX with both frontend and backend...
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:5000
echo.
echo Press Ctrl+C to stop
echo.

REM Start both servers
call npm run dev:all
pause
