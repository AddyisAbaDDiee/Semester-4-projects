#!/bin/bash
# APEX Startup Script for Unix/macOS

echo "🚀 APEX Fitness Platform - Startup Script"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✓ npm $(npm --version) detected"

# Check if .env file exists
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✓ Created .env file"
        echo ""
        echo "📝 IMPORTANT: Edit .env and add your ANTHROPIC_API_KEY"
        echo "   Get your key from: https://console.anthropic.com/account/keys"
        exit 1
    else
        echo "❌ .env.example not found"
        exit 1
    fi
fi

# Check if API key is set
if grep -q "ANTHROPIC_API_KEY=your_key_here" .env; then
    echo ""
    echo "⚠️  ANTHROPIC_API_KEY not configured in .env"
    echo "📝 Please edit .env and add your API key"
    echo "   Get your key from: https://console.anthropic.com/account/keys"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✓ Dependencies installed"
fi

echo ""
echo "✓ All checks passed!"
echo ""
echo "Starting APEX with both frontend and backend..."
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Start both servers
npm run dev:all
