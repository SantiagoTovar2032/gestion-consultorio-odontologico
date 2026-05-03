# 🦷 Sistema de Gestión de Consultorio Odontológico

<p align="center">
  <strong>Proyecto full-stack · Sistema de Gestión de Consultorio Odontológico</strong><br>
  <em>Corporación Universitaria del Huila — CORHUILA · Ingeniería de Sistemas</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS"/>
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Proyecto-Consultorio%20Odontol%C3%B3gico-blue?style=flat-square" alt="Proyecto"/>
  <img src="https://img.shields.io/badge/Estado-Desarrollo%20Completo%20✅-brightgreen?style=flat-square" alt="Estado"/>
</p>

---

> **Descripción:**  
> Sistema de gestión para un consultorio odontológico con 3 especialistas.  
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
> Si prefieres desarrollo local, usa Backend + Frontend con hot-reload.

---

## 🧱 Estructura del Proyecto

Raíz del repo: `gestion-consultorio-odontologico/`

```bash
gestion-consultorio-odontologico/
├── backend/                 # API REST (NestJS + Prisma + PostgreSQL)
├── frontend/                # Frontend (Next.js + React + TS + Tailwind)
└── docker-compose.yml       # Orquestación de servicios (db, backend, frontend)
