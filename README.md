# 🦷 Sistema de Gestión de Consultorio Odontológico

<p align="center">
  <strong>Proyecto full-stack · Sistema de Gestión de Consultorio Odontológico</strong><br>
  <em>Corporación Universitaria del Huila — CORHUILA · Ingeniería de Sistemas</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Prisma-5.15-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Proyecto-Consultorio%20Odontol%C3%B3gico-blue?style=flat-square" alt="Proyecto"/>
  <img src="https://img.shields.io/badge/Estado-Desarrollo%20Completo%20✅-brightgreen?style=flat-square" alt="Estado"/>
</p>

---

> **Descripción:**  
> Sistema de gestión para un consultorio odontológico con tres especialistas.  
> Permite administrar pacientes, odontólogos, citas, tratamientos y piezas dentales, con historial odontológico por paciente.

---

## 📋 Tabla de Contenidos

- [🏁 Inicio Rápido](#-inicio-rápido)
- [🧱 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧰 Stack Tecnológico](#-stack-tecnológico)
- [🗄️ Modelo de Datos (Resumen)](#️-modelo-de-datos-resumen)
- [🧩 Módulos y Funcionalidades](#-módulos-y-funcionalidades)
- [🧭 Rutas Principales (Frontend)](#-rutas-principales-frontend)
- [⚙️ Variables de Entorno](#️-variables-de-entorno)
- [🚀 Ejecución del Proyecto](#-ejecución-del-proyecto)
- [🧪 Flujo de Uso Sugerido](#-flujo-de-uso-sugerido)

---

## 🏁 Inicio Rápido

> Si tienes Docker instalado y configurado, puedes levantar todo con `docker compose up -d`.  
> Si prefieres desarrollo local, levanta backend y frontend con hot-reload.

### Prerrequisitos mínimos

| Herramienta         | Versión recomendada | Descarga |
|---------------------|---------------------|----------|
| **Git**             | Cualquiera          | https://git-scm.com/downloads |
| **Docker Desktop**  | 4.x                 | https://www.docker.com/products/docker-desktop |
| **Node.js**         | 20 LTS              | https://nodejs.org |

> ⚠️ Asegúrate de que **Docker Desktop esté corriendo** antes de usar Docker Compose.

---

## 🧱 Estructura del Proyecto

Raíz del repo: `gestion-consultorio-odontologico/`

```bash
gestion-consultorio-odontologico/
├── backend/                         # API REST (NestJS + Prisma + PostgreSQL)
│   ├── src/
│   │   ├── main.ts                  # Punto de entrada NestJS
│   │   ├── app.module.ts            # Módulo raíz
│   │   ├── common/                  # Filters, interceptors, pipes, guards
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── modules/
│   │       ├── pacientes/
│   │       ├── odontologos/
│   │       ├── citas/
│   │       ├── piezas_dentales/
│   │       └── tratamientos/
│   ├── prisma/
│   │   ├── schema.prisma            # Esquema Prisma (modelo de datos)
│   │   └── migrations/              # Migraciones
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/                        # Frontend (Next.js + React + TS + Tailwind)
│   ├── src/
│   │   ├── app/                     # App Router
│   │   │   ├── page.tsx             # Home
│   │   │   ├── pacientes/
│   │   │   ├── odontologos/
│   │   │   ├── citas/
│   │   │   └── tratamientos/
│   │   ├── components/
│   │   │   └── Navbar.tsx
│   │   ├── services/                # Acceso a la API
│   │   └── interfaces/              # Tipos TypeScript
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local
│
├── docker-compose.yml               # Orquestación de db + backend + frontend
├── .gitignore
└── README.md

```
## 🧰 Stack Tecnológico

### 🗄️ Backend

- **Node.js**  
  - Entorno de ejecución JavaScript

- **NestJS 11**  
  - Framework de Node.js basado en TypeScript  
  - Arquitectura modular y en capas (Controller → Service → Repository)

- **TypeScript 5**  
  - Tipado estático y soporte avanzado para el editor

- **Prisma ORM 5.15**  
  - ORM para Node.js / TypeScript  
  - Manejo de migraciones y cliente tipado para PostgreSQL

- **PostgreSQL 16**  
  - Base de datos relacional  
  - Uso de llaves foráneas y relaciones entre entidades

---

### 🖥️ Frontend

- **Next.js 15 (App Router)**  
  - Framework de React para producción  
  - Enrutamiento basado en archivos dentro de `src/app`  
  - Soporte para renderizado híbrido (SSR/CSR)

- **React**  
  - Biblioteca para construir interfaces de usuario

- **TypeScript**  
  - Tipado estático también en el frontend

- **Tailwind CSS**  
  - Framework de utilidades CSS para diseño rápido y responsivo

---

### 🧱 Infraestructura

- **Docker**  
  - Contenedores para base de datos, backend y frontend

- **Docker Compose**  
  - Orquestación de servicios (`db`, `backend`, `frontend`)  
  - Facilita levantar todo el sistema con un solo comando

- **Git / GitHub**  
  - Control de versiones y alojamiento del código

## 🗄️ Modelo de Datos (Resumen)

### Entidades principales

- **Paciente**
  - id
  - nombre
  - apellido
  - cedula (única)
  - telefono
  - email
  - fechaNacimiento
  - direccion
  - antecedentesMedicos
  - alergias
  - createdAt
  - updatedAt

- **Especialidad**
  - id
  - nombre (único)
  - descripcion
  - createdAt
  - updatedAt

- **Odontologo**
  - id
  - nombre
  - apellido
  - cedula (única)
  - telefono
  - email (único)
  - especialidadId (FK → Especialidad)
  - horarioInicio
  - horarioFin
  - createdAt
  - updatedAt

## 🧭 Rutas Principales (Frontend)

### 🏠 Inicio

- `/`  
  Página principal del sistema con tarjetas de acceso rápido a:
  - Pacientes  
  - Odontólogos  
  - Citas  
  - Tratamientos  

---

### 👤 Pacientes

- `/pacientes`  
  Listado de pacientes (tabla con acciones Ver / Editar / Eliminar).

- `/pacientes/nuevo`  
  Formulario para crear un nuevo paciente.

- `/pacientes/[id]`  
  Detalle del paciente seleccionado:
  - Datos generales  
  - Historial de tratamientos (diagnóstico, procedimiento, pieza dental, costo).

- `/pacientes/[id]/editar`  
  Formulario para editar los datos del paciente (incluye antecedentes y alergias).

---

### 👨‍⚕️ Odontólogos

- `/odontologos`  
  Listado de odontólogos (nombre, cédula, teléfono, especialidad).

- `/odontologos/nuevo`  
  Formulario para crear un nuevo odontólogo.

- `/odontologos/[id]`  
  Detalle del odontólogo seleccionado:
  - Datos generales  
  - Especialidad  
  - Horario.

- `/odontologos/[id]/editar`  
  Formulario para editar datos del odontólogo.

---

### 📅 Citas

- `/citas`  
  Listado de citas (fecha, hora, paciente, odontólogo, estado).

- `/citas/nuevo`  
  Formulario para crear una nueva cita seleccionando paciente y odontólogo.

- `/citas/[id]`  
  Detalle de la cita:
  - Fecha y hora  
  - Paciente  
  - Odontólogo  
  - Motivo de consulta  
  - Estado.

- `/citas/[id]/editar`  
  Formulario para modificar fecha, hora, estado o motivo de la cita.

---

### 💊 Tratamientos

- `/tratamientos`  
  Listado de tratamientos (paciente, odontólogo, pieza dental, diagnóstico, costo).

- `/tratamientos/nuevo`  
  Formulario para registrar un nuevo tratamiento:
  - Paciente  
  - Odontólogo  
  - Pieza dental (opcional)  
  - Diagnóstico  
  - Procedimiento  
  - Costo.

- `/tratamientos/[id]`  
  Detalle del tratamiento:
  - Paciente  
  - Odontólogo  
  - Pieza dental  
  - Diagnóstico, procedimiento, costo, observaciones.

- `/tratamientos/[id]/editar`  
  Formulario para editar información del tratamiento.

- **Cita**
  - id
  - pacienteId (FK → Paciente)
  - odontologoId (FK → Odontologo)
  - fecha
  - hora
  - motivoConsulta
  - estado (`Programada`, `Realizada`, `Cancelada`)
  - createdAt
  - updatedAt

- **PiezaDental**
  - id
  - numero (único, código FDI: "11", "21", "36", etc.)
  - nombre
  - tipo (`Incisivo`, `Canino`, `Premolar`, `Molar`, etc.)
  - createdAt
  - updatedAt

- **Tratamiento**
  - id
  - pacienteId (FK → Paciente)
  - odontologoId (FK → Odontologo)
  - piezaDentalId (FK opcional → PiezaDental)
  - fecha
  - diagnostico
  - procedimiento
  - costo (Decimal)
  - observaciones
  - createdAt
  - updatedAt

---

### Relaciones principales

- Un **Paciente** tiene:
  - muchas **Citas**
  - muchos **Tratamientos**

- Un **Odontólogo** tiene:
  - muchas **Citas**
  - muchos **Tratamientos**
  - una **Especialidad**

- Una **Especialidad** tiene:
  - muchos **Odontólogos**

- Una **PiezaDental** puede estar asociada a:
  - muchos **Tratamientos**

- Cada **Cita** se asocia a:
  - un **Paciente**
  - un **Odontólogo**

- Cada **Tratamiento** se asocia a:
  - un **Paciente**
  - un **Odontólogo**
  - (opcional) una **PiezaDental**

## ⚙️ Variables de Entorno

Para que el proyecto funcione correctamente necesitas configurar variables de entorno en **backend**, **frontend** y (opcionalmente) en la **raíz**.

---

### 1️⃣ Backend (`backend/.env`)

Archivo: `gestion-consultorio-odontologico/backend/.env`

Variables típicas para desarrollo local:

```env
# Conexión a la base de datos PostgreSQL
DATABASE_URL="postgresql://admin:admin123@localhost:5432/consultorio_odontologico"

# Puerto donde se expone la API NestJS
PORT=3001

# Entorno de ejecución
NODE_ENV=development



## 🚀 Ejecución del Proyecto

Existen dos formas principales de ejecutar el sistema:

1. Usando **Docker Compose** (recomendado para levantar todo rápido)  
2. En **modo desarrollo local** (backend y frontend con hot-reload)

---

### 🐳 Opción A — Con Docker Compose (todo en contenedores)

Requisitos:

- Docker Desktop instalado y corriendo
- Docker Compose disponible en la línea de comandos

Pasos (desde la raíz del proyecto `gestion-consultorio-odontologico`):

```bash
# 1. Clonar el repositorio
git clone https://github.com/SantiagoTovar2032/gestion-consultorio-odontologico.git
cd gestion-consultorio-odontologico

# 2. (Opcional) crear archivo .env en la raíz si lo usas
# cp .env.example .env    (Linux / macOS)
# copy .env.example .env  (Windows)

# 3. Levantar todos los servicios (db + backend + frontend)
docker compose up --build

```

Servicios (URLs por defecto):

Servicio	URL
Interfaz	http://localhost:3000
Backend	http://localhost:3001
PostgreSQL	localhost:5432 (dentro de Docker)
La primera vez puede tardar varios minutos (descarga de imágenes y compilación).

Comandos útiles:

intento

Colapsar


 Copiar

# Ver estado de los contenedores
docker compose ps

# Ver logs del backend
docker compose logs backend

# Detener y eliminar contenedores (manteniendo datos)
docker compose down

# Detener, eliminar contenedores y eliminar datos (volúmenes)
docker compose down -v
🧑‍💻 Opción B — Desarrollo local (recarga en caliente)
Ideal cuando estás trabajando en el código y quieres ver cambios al instante.

1️⃣ Clonar el repositorio
intento

Colapsar


 Copiar

git clone https://github.com/SantiagoTovar2032/gestion-consultorio-odontologico.git
cd gestion-consultorio-odontologico
2️⃣ Levantar solo la base de datos con Docker
intento

Colapsar


 Copiar

docker compose up db
Esto levanta PostgreSQL usando la configuración de docker-compose.yml.

3️⃣ Servidor (NestJS + Prisma)
En otra terminal:

intento

Colapsar


 Copiar

cd backend

# Instalar dependencias
npm install

# Ejecutar migraciones y generar cliente Prisma
npx prisma migrate dev
npx prisma generate

# Levantar el backend en modo desarrollo (hot-reload)
npm run start:dev
Backend disponible en:

http://localhost:3001
4️⃣ Frontend (Next.js)
En otra terminal:

intento

Colapsar


 Copiar

cd frontend

# Instalar dependencias
npm install

# Levantar el frontend en modo desarrollo (hot-reload)
npm run dev
Frontend disponible en:

http://localhost:3000
Asegúrate de que la variable NEXT_PUBLIC_API_URLen frontend/.env.localpunte al backend, por ejemplo:
NEXT_PUBLIC_API_URL=http://localhost:3001

✅ Verificar rápido funcionamiento
Abre http://localhost:3000en el navegador
Navega a:
/pacientes
/odontologos
/citas
/tratamientos
Crea un paciente, un odontólogo, una cita y un tratamiento para validar el flujo completo.
Si algo no responde, revisa:

Que el backend esté corriendo ( npm run start:devsin errores).
Que DATABASE_URLen backend/.envapunte a la base correcta.
Que NEXT_PUBLIC_API_URLen frontend/.env.localapunte al backend.

# Sistema de Gestión de Consultorio Odontológico 

  Proyecto desarrollado por los Ingenieros Santiago Tovar Monje y Luis Angel Garcia Guarin
