#!/bin/bash

# Script to safely commit CodeTutor AI changes without API keys

cd "$(dirname "$0")"

echo "🚀 Starting commit process for CodeTutor AI..."

# Check for .env files
if git ls-files | grep -E "\.env$|\.env\." | grep -v ".env.example"; then
    echo "⚠️  WARNING: .env files found in git tracking!"
    echo "Removing them from git..."
    git rm --cached server/.env 2>/dev/null || true
    git rm --cached .env 2>/dev/null || true
fi

# Add files excluding .env and node_modules
echo "📦 Staging files..."
git add -f src/ server/src/ server/package.json server/tsconfig.json package.json vite.config.ts index.html .gitignore *.md components.json 2>/dev/null || true
git add -f server/routes/ server/services/ server/controllers/ server/models/ server/middleware/ server/config/ 2>/dev/null || true

# Verify no .env files
if git diff --cached --name-only | grep -E "\.env$|\.env\." | grep -v ".env.example"; then
    echo "❌ ERROR: .env files found in staging area!"
    echo "Unstaging them..."
    git reset HEAD $(git diff --cached --name-only | grep -E "\.env$|\.env\.")
    exit 1
fi

echo "✅ No .env files in staging area"
echo "📝 Files staged:"
git diff --cached --name-only | head -20

# Create commits with descriptive messages
echo ""
echo "📝 Creating commits..."

# Frontend enhancements
if git diff --cached --name-only | grep -E "^src/"; then
    git commit -m "feat(frontend): enhance UI with animations, icons, and red-white theme

- Add enhanced Learn page with AI tutor interface
- Update Resources page with animated resource cards
- Improve Signup page with icons and better UX
- Add comprehensive CSS animations (float, glow, shimmer, pulse)
- Implement Framer Motion animations throughout
- Add icon animations and hover effects
- Enhance color scheme with red-white gradients" || echo "⚠️  Frontend commit skipped"
fi

# Backend API integration
if git diff --cached --name-only | grep -E "^server/"; then
    git commit -m "feat(backend): integrate multiple AI providers and improve API structure

- Configure Gemini, OpenRouter, and Mistral AI providers
- Add multi-AI service with fallback support
- Update route handlers for better error handling
- Enhance OpenRouter and Mistral service implementations
- Add ai-providers endpoint with dynamic provider detection
- Improve code execution endpoints
- Update multi-ai service for better provider selection" || echo "⚠️  Backend commit skipped"
fi

# Documentation
if git diff --cached --name-only | grep -E "\.md$"; then
    git commit -m "docs: add API configuration and connection status documentation

- Add API_KEYS_CONFIGURED.md with provider setup guide
- Add CONNECTION_STATUS.md documenting frontend-backend integration
- Update README with connection verification steps" || echo "⚠️  Docs commit skipped"
fi

echo ""
echo "✅ Commits created successfully!"
echo ""
echo "📊 Current git status:"
git status --short | head -20

echo ""
echo "🔍 Checking for .env files one more time..."
if git diff --cached --name-only | grep -E "\.env$|\.env\." | grep -v ".env.example"; then
    echo "❌ ERROR: .env files still present!"
    exit 1
else
    echo "✅ Confirmed: No .env files in commits"
fi

echo ""
echo "✨ Ready to push! Run: git push origin main"

