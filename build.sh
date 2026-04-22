#!/bin/bash
set -e

echo "🔨 Building backend..."
npm run build
echo "✅ Build complete"

echo "📦 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client ready"

echo "🗄️ Syncing database schema..."
npx prisma db push --skip-generate
echo "✅ Database synced"