# 🚀 Next.js 16 Starter Kit con Better Auth y Drizzle ORM

Este proyecto es un Starter Kit diseñado para construir aplicaciones modernas y de alto rendimiento utilizando **Next.js 16** (App Router), **Better Auth** para autenticación, y **Drizzle ORM** para la gestión de bases de datos con **NeonDB** (PostgreSQL Serverless). Escrito completamente en **TypeScript**, este kit proporciona una base sólida para tus proyectos.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- **Node.js** (versión recomendada: `>=18.x`)
- Una cuenta en [Neon Console](https://neon.tech/)
- **npm** como gestor de paquetes

---

## 🚀 Instalación Paso a Paso

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_DIRECTORIO>
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` basado en `.env.example` y configura las siguientes variables:

   ```env
   DATABASE_URL=postgresql://<usuario>:<contraseña>@<host>:<puerto>/<base_de_datos>
   BETTER_AUTH_SECRET=<tu_secreto>
   BETTER_AUTH_URL=<url_de_tu_proveedor_de_auth>
   ```

   - **DATABASE_URL**: Proporcionado por NeonDB.
   - **BETTER_AUTH_SECRET** y **BETTER_AUTH_URL**: Configuración necesaria para Better Auth.

---

## 🗄️ Base de Datos y Migraciones

Este proyecto utiliza **Drizzle ORM** para la gestión de la base de datos. Sigue estos pasos para manejar las migraciones:

1. **Generar migraciones:**

   ```bash
   npm run drizzle-kit:generate
   ```

2. **Aplicar migraciones:**

   ```bash
   npm run drizzle-kit:push
   ```

3. **Abrir Drizzle Studio:**

   ```bash
   npm run drizzle:studio
   ```

---

## 📜 Scripts Disponibles

En el archivo `package.json` encontrarás los siguientes scripts útiles:

- **Desarrollo:**

  ```bash
  npm run dev
  ```

- **Construcción:**

  ```bash
  npm run build
  ```

- **Linting:**

  ```bash
  npm run lint
  ```

---

## 🔐 Notas sobre Better Auth

**Better Auth** está integrado con **Drizzle ORM** para manejar sesiones y usuarios de manera eficiente. Asegúrate de configurar correctamente las variables de entorno relacionadas con la autenticación para un funcionamiento óptimo.

---

¡Listo! Ahora puedes comenzar a construir tu aplicación con este Starter Kit. 🎉
