# 📦 Instalación de Dependencias

El feature de Usuarios requiere las siguientes dependencias. Si aún no las has instalado, ejecuta:

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

## Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|----------|
| `bcryptjs` | ^2.4.3 | Encriptación de contraseñas |
| `express` | ^4.x | Framework HTTP |
| `@prisma/client` | ^5.x | ORM para base de datos |
| `cors` | ^2.8.x | CORS middleware |

## Dependencias de Desarrollo

| Paquete | Propósito |
|---------|----------|
| `@types/bcryptjs` | Tipos TypeScript para bcryptjs |
| `@types/express` | Tipos TypeScript para express |
| `typescript` | Compilador TypeScript |
| `tsx` | Ejecución de TypeScript en desarrollo |

## Verificación

Después de instalar, verifica que todo esté correcto:

```bash
# Generar cliente Prisma
npx prisma generate

# Compilar TypeScript
npm run build

# Ejecutar en desarrollo
npm run dev
```

## Conexión a Base de Datos

Asegúrate de que tu `.env` tenga la conexión correcta:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/agensoft"
```

Luego sincroniza la BD:

```bash
npx prisma db push
```
