# Proyecto: Watchlist App

**Lista de Películas y Series Favoritas**  
**Desarrollo Web con Node.js**

---

## 1. Descripción general del proyecto

El proyecto consiste en una aplicación web completa donde los usuarios pueden registrarse, iniciar sesión y gestionar su lista personal de películas y series favoritas. Cada usuario tendrá acceso únicamente a su propio catálogo, lo que introduce conceptos clave como **autenticación**, **autorización** y **relaciones entre modelos de datos**.

El alcance es corto e intencionalmente acotado para que pueda completarse en pocas sesiones, cubriendo los pilares fundamentales del desarrollo web con Node.js:

- Configuración de un servidor HTTP con **Express**
- Registro e inicio de sesión con **hashing de contraseñas (bcrypt)** y **tokens JWT**
- Operaciones **CRUD protegidas por autenticación**
- Conexión y modelado de datos con **MongoDB y Mongoose**
- Buenas prácticas: **variables de entorno, middleware y validación de entradas**

---

## 2. Diagrama del sistema

La arquitectura sigue el patrón **cliente–servidor de tres capas**. El diagrama muestra las capas del sistema y los módulos que componen cada una.
<img src="./docs//watchlist_system_diagram.svg">
**Figura 1. Arquitectura general de la Watchlist App**

---

## 3. Descripción de módulos

### 3.1 Módulo de autenticación (Auth)

Este módulo es el punto de entrada de cualquier usuario. Se encarga de dos responsabilidades principales: **el registro de nuevos usuarios** y **el inicio de sesión de usuarios existentes**.

En el registro, el sistema recibe **nombre, correo y contraseña**. Antes de guardar el usuario en la base de datos, la contraseña se **hashea con bcrypt** para que nunca se almacene en texto plano.

En el login, se validan las credenciales y, si son correctas, se emite un **JSON Web Token (JWT)** que el cliente deberá enviar en todas las peticiones posteriores.

El middleware `verifyToken` actúa como **guardián de todas las rutas protegidas**: intercepta cada petición, verifica que el token sea válido y extrae el **ID del usuario** para utilizarlo en la lógica de negocio.

| Método | Ruta | Descripción |
|------|------|-------------|
| POST | `/api/auth/register` | Crea un nuevo usuario y devuelve un token JWT |
| POST | `/api/auth/login` | Valida credenciales y devuelve un token JWT |
| POST | `/api/auth/logout` | Invalida la sesión del usuario (el cliente borra el token) |

---

### 3.2 Módulo Watchlist (CRUD)

Es el **corazón del proyecto**. Permite a cada usuario gestionar su catálogo personal de películas y series mediante las **cuatro operaciones fundamentales del CRUD**.

Todas las rutas de este módulo están protegidas por el **middleware de autenticación**, garantizando que un usuario solo pueda ver y modificar sus propios registros.

Cada entrada en la watchlist incluye:

- Título
- Tipo (película o serie)
- Género
- Calificación personal (1–5)
- Estado (visto / pendiente / en progreso)
- URL de portada
- Notas opcionales

| Método | Ruta | Descripción |
|------|------|-------------|
| GET | `/api/watchlist` | Lista todos los títulos del usuario autenticado |
| GET | `/api/watchlist/:id` | Devuelve el detalle de un título específico |
| POST | `/api/watchlist` | Crea un nuevo título en la lista del usuario |
| PUT | `/api/watchlist/:id` | Actualiza los datos de un título existente |
| DELETE | `/api/watchlist/:id` | Elimina un título de la lista |

---

### 3.3 Módulo de perfil de usuario

Este módulo complementa el módulo de autenticación permitiendo al usuario **consultar y actualizar sus datos básicos**.

Es un módulo sencillo, ideal para que los estudiantes practiquen **rutas protegidas** sin la complejidad de un CRUD completo.

| Método | Ruta | Descripción |
|------|------|-------------|
| GET | `/api/profile` | Devuelve los datos del usuario autenticado |
| PUT | `/api/profile` | Actualiza nombre y/o correo electrónico del usuario |

---

## 4. Modelos de datos

La aplicación utiliza **dos colecciones principales en MongoDB**. La relación entre ambas se establece a través del campo `userId` en la colección **Watchlist**, que hace referencia al `_id` del usuario propietario.

### Modelo: Users

| Campo | Tipo | Descripción |
|------|------|-------------|
| `_id` | ObjectId | Identificador único generado automáticamente por MongoDB |
| `name` | String | Nombre completo del usuario (requerido) |
| `email` | String | Correo electrónico único del usuario (requerido) |
| `password` | String | Contraseña hasheada con bcrypt (nunca en texto plano) |
| `role` | String | Rol del usuario: `'user'` o `'admin'` (valor por defecto: `user`) |
| `createdAt` | Date | Fecha de registro generada automáticamente por Mongoose |
| `updatedAt` | Date | Fecha de última actualización del documento |

---

### Modelo: Watchlist

| Campo | Tipo | Descripción |
|------|------|-------------|
| `_id` | ObjectId | Identificador único generado automáticamente por MongoDB |
| `userId` | ObjectId (ref) | Referencia al usuario propietario del registro |
| `title` | String | Título de la película o serie (requerido) |
| `type` | String | Tipo de contenido: `'movie'` o `'series'` (requerido) |
| `genre` | String | Género principal del contenido (ej. Acción, Drama) |
| `rating` | Number | Calificación personal del 1 al 5 |
| `status` | String | Estado: `'pending'`, `'watching'` o `'watched'` |
| `coverImg` | String | URL de la imagen de portada (opcional) |
| `notes` | String | Notas personales sobre el contenido (opcional) |
| `createdAt` | Date | Fecha en que se agregó el título a la lista |

---

## 5. Stack tecnológico

La selección de tecnologías está orientada a **maximizar el aprendizaje en el menor tiempo posible**, utilizando herramientas ampliamente utilizadas en la industria.

| Capa | Tecnología | Uso principal |
|------|------|-------------|
| Backend | Node.js + Express | Servidor HTTP y manejo de rutas REST |
| Autenticación | JWT + bcrypt | Generación de tokens y hash de contraseñas |
| Base de datos | MongoDB + Mongoose | Persistencia y modelado de documentos |
| Frontend | EJS o React básico | Renderizado de vistas e interacción con la API |
| Variables de entorno | dotenv | Gestión segura de configuraciones sensibles |
| Validación | express-validator | Sanitización y validación de entradas del usuario |

---

## 6. Variables de entorno (.env)

Todas las configuraciones sensibles se gestionan mediante un archivo `.env` que **nunca debe subirse al repositorio** (debe incluirse en `.gitignore`). Esta práctica es uno de los primeros hábitos de seguridad que los estudiantes deben incorporar.

| Variable | Descripción |
|------|------|
| `PORT` | Puerto en el que correrá el servidor (ej. 3000) |
| `DB_URI` | Cadena de conexión a MongoDB (local o Atlas) |
| `JWT_SECRET` | Clave secreta para firmar y verificar los tokens JWT |
| `SALT_ROUNDS` | Número de rondas de bcrypt para el hasheo (recomendado: 10) |
| `NODE_ENV` | Entorno de ejecución: `development`, `test` o `production` |

---
