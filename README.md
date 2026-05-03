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

---

## 🧰 Stack Tecnológico

### Backend

- NestJS (Node.js + TypeScript)  
- Prisma ORM  
- PostgreSQL  

### Interfaz

- Next.js (App Router)  
- React  
- TypeScript  
- Tailwind CSS  

### Infraestructura

- Docker  
- Docker Compose  

---

## 🗄️ Modelo de Datos (Resumen)

### Entidades principales

- `Paciente`  
- `Odontologo`  
- `Especialidad`  
- `Cita`  
- `Tratamiento`  
- `PiezaDental`  

### Relaciones

- Un **Paciente** tiene muchas **Citas** y muchos **Tratamientos**  
- Un **Odontólogo** tiene muchas **Citas** y muchos **Tratamientos**  
- Una **PiezaDental** puede estar asociada a muchos **Tratamientos**  
- Cada **Tratamiento** se asocia a:
  - un **Paciente**  
  - un **Odontólogo**  
  - (opcional) una **PiezaDental**  

---

## 🧩 Módulos y Funcionalidades

### 👤 Pacientes

- CRUD completo (crear, listar, ver, editar, eliminar)

**Campos:**

- nombre, apellidos, cédula, teléfono, correo electrónico  
- fecha de nacimiento  
- dirección  
- antecedentes médicos  
- alergias  

**Vista de detalle muestra:**

- Datos generales del paciente  
- Historial de tratamientos (diagnóstico, procedimiento, pieza, costo)  

---

### 👨‍⚕️ Odontólogos

- CRUD completo

**Campos:**

- nombre, apellidos, cédula, teléfono, correo electrónico  
- `especialidadId` (relación con `Especialidad`)  
- `horarioInicio`, `horarioFin`  

**Relacionado con:**

- Citas (agenda por odontólogo)  
- Tratamientos realizados  

---

### 📅 Citas

- CRUD completo

**Relaciones:**

- `pacienteId` → Paciente  
- `odontologoId` → Odontólogo  

**Campos:**

- fecha, hora  
- motivo de consulta  
- estado (`Programada`, `Realizada`, `Cancelada`)  

---

### 🦷 Piezas Dentales

- Catálogo de piezas dentales

**Campos:**

- `numero` → código FDI (ej: `"11"`, `"21"`, `"36"`)  
- `nombre` → descripción (ej: `"Incisivo Central Superior Derecho"`)  
- `tipo` → (`Incisivo`, `Canino`, `Premolar`, `Molar`, etc.)  

**Se utilizan en:**

- Tratamientos (para indicar la pieza tratada)  

---

### 💊 Tratamientos

- CRUD completo

**Relaciones:**

- `pacienteId` → Paciente  
- `odontologoId` → Odontólogo  
- `piezaDentalId` (opcional) → PiezaDental  

**Campos:**

- fecha  
- diagnóstico  
- procedimiento  
- costo (Decimal)  
- observaciones  

**Uso:**

- Mostrados como **historial odontológico** en el detalle del paciente  

---

## 🧭 Rutas Principales (Frontend)

### Inicio

- `/`  
  Página principal del sistema con tarjetas de acceso a:
  - Pacientes  
  - Odontólogos  
  - Citas  
  - Tratamientos  

---

### Pacientes

- `/pacientes` → listado de pacientes  
- `/pacientes/nuevo` → crear paciente  
- `/pacientes/[id]` → detalle + historial de tratamientos  
- `/pacientes/[id]/editar` → editar paciente  

---

### Odontólogos

- `/odontologos` → listado de odontólogos  
- `/odontologos/nuevo` → crear odontólogo  
- `/odontologos/[id]` → detalle de odontólogo  
- `/odontologos/[id]/editar` → editar odontólogo  

---

### Citas

- `/citas` → listado de citas  
- `/citas/nuevo` → crear cita  
- `/citas/[id]` → detalle de cita  
- `/citas/[id]/editar` → editar cita  

---

### Tratamientos

- `/tratamientos` → listado de tratamientos  
- `/tratamientos/nuevo` → crear tratamiento  
- `/tratamientos/[id]` → detalle de tratamiento  
- `/tratamientos/[id]/editar` → editar tratamiento  
