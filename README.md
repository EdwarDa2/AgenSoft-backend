# 🩺 AgenSoft - Backend

API REST para el sistema de gestión de citas médicas **AgenSoft**.

## 🌐 Despliegue

- **URL de Producción (Render):** [https://agensoft-backend-ncp1.onrender.com/api/v1](https://agensoft-backend-ncp1.onrender.com/api/v1)

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma
- **Base de Datos**: PostgreSQL (Supabase)
- **Lenguaje**: TypeScript

## 📦 Instalación Local

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Crea un archivo `.env` con:
   ```env
   DATABASE_URL="tu_url_de_supabase"
   PORT=3001
   ```

3. **Ejecutar migraciones**:
   ```bash
   npx prisma db push
   ```

4. **Iniciar servidor**:
   ```bash
   npm run dev
   ```
