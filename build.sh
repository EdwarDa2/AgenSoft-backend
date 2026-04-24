#!/bin/bash
set -e

echo "📦 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client ready"

echo "🔨 Building backend..."
npm run build
echo "✅ Build complete"

echo "🗄️ Syncing database schema..."
npx prisma db push --skip-generate
echo "✅ Database synced"