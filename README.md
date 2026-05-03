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
