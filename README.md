# Backend Bancario con TypeScript, Express y PostgreSQL

Este proyecto es un **backend** para una aplicación bancaria que permite gestionar usuarios, realizar transferencias, consultar historial de transacciones y enviar correos de confirmación. Está desarrollado con **TypeScript**, **Express**, **PostgreSQL** y **TypeORM**, y utiliza **JWT** para autenticación, **bcrypt** para cifrado de contraseñas, **Nodemailer** con plantillas **Pug** para el envío de correos.

---

## 📋 Tabla de contenido

* [Instalación](#-instalación)
* [Configuración](#-configuración)
* [Scripts disponibles](#-scripts-disponibles)
* [Estructura de carpetas](#-estructura-de-carpetas)
* [Variables de entorno](#-variables-de-entorno)
* [Endpoints](#-endpoints)
* [Uso](#-uso)
* [Licencia](#-licencia)

---

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/backend-bancario.git
   cd backend-bancario
   ```
2. Instala dependencias:

   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto siguiendo la sección de variables de entorno.
4. Inicia la base de datos PostgreSQL y ajusta las credenciales en `.env`.
5. Para desarrollo con recarga automática:

   ```bash
   npm run dev
   ```
6. Para compilar y ejecutar en producción:

   ```bash
   npm run build
   npm start
   ```

---

## ⚙️ Configuración

En `src/config/env.ts` y `src/config/data-source.ts` se define la carga de variables de entorno y la conexión a la base de datos.

Asegúrate de proporcionar en `.env` las siguientes variables:

```dotenv
# Servidor
PORT=3000

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_contraseña
DATABASE_NAME=banco_db

# JWT
JWT_SECRET=tu_secreto_jwt
JWT_EXPIRES_IN=1h

# SMTP (Nodemailer)
SMTP_HOST=smtp.ejemplo.com
SMTP_PORT=465
SMTP_USER=tu_usuario_smtp
SMTP_PASS=tu_contraseña_smtp
SMTP_FROM="MiBanco <no-reply@mibanco.com>"

# Frontend (para enlaces en correos)
FRONTEND_URL=http://localhost:3000
```

---

## 📦 Scripts disponibles

| Script          | Descripción                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Inicia el servidor con recarga automática  |
| `npm run build` | Compila TypeScript a JavaScript en `dist/` |
| `npm start`     | Ejecuta el build compilado                 |
| `npm test`      | Ejecuta los tests (placeholder)            |

---

## 🗂️ Estructura de carpetas

```
src/
├── config/             # Configuración de env y DataSource
├── controllers/        # Lógica de rutas HTTP
├── services/           # Lógica de negocio
├── middlewares/        # JWT auth y validaciones
├── entities/           # Entidades TypeORM
├── dtos/               # Data Transfer Objects
├── templates/          # Plantillas Pug para correos
├── utils/              # Utilidades (mailer, generador de cuenta)
├── routes/             # Definición de rutas
├── app.ts              # Inicialización de Express
└── server.ts           # Levantar el servidor
```

---

## 🔑 Endpoints

| Método | Ruta                         | Descripción                                             |
| ------ | ---------------------------- | ------------------------------------------------------- |
| POST   | `/api/auth/register`         | Registrar nuevo usuario y enviar correo de confirmación |
| POST   | `/api/auth/login`            | Iniciar sesión y recibir JWT                            |
| POST   | `/api/auth/confirm`          | Confirmar correo con token                              |
| GET    | `/api/users/me`              | Obtener perfil del usuario (token JWT requerido)        |
| POST   | `/api/transactions/transfer` | Realizar transferencia (autenticado)                    |
| GET    | `/api/transactions`          | Listar historial de transacciones                       |
| GET    | `/api/transactions/:id`      | Detalles de una transacción específica                  |

---

## ⚙️ Uso

1. Regístrate en `/api/auth/register` con nombre, email y contraseña.
2. Confirma tu correo usando el enlace recibido.
3. Inicia sesión en `/api/auth/login` para obtener tu token JWT.
4. Incluye el header `Authorization: Bearer <token>` en peticiones protegidas.
5. Realiza transferencias en `/api/transactions/transfer` enviando `{ toAccount, amount }`.
6. Consulta tu historial en `/api/transactions`.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Mira el archivo `LICENSE` para más detalles.
