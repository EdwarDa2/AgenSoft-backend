#!/bin/bash
set -e

echo "📦 Generating Prisma client..."
npx prisma generate
echo "✅ Prisma client ready"

echo "🔨 Building backend..."
npm run build
echo "✅ Build complete"

echo "🗄️ Syncing database schema..."
if [ -z "${DATABASE_URL}" ]; then
	echo "⚠️ DATABASE_URL not set — skipping prisma db push (safe for local dev)."
	echo "If you want to push migrations in CI, set DATABASE_URL in the environment."
else
	npx prisma db push
fi
echo "✅ Database synced"