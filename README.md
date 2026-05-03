# 🦷 Sistema de Gestión de Consultorio Odontológico

Proyecto full-stack para la gestión de:

- Pacientes
- Odontólogos
- Citas
- Tratamientos
- Piezas dentales

Desarrollado con NestJS, Next.js, Prisma, PostgreSQL y Docker, siguiendo una arquitectura en capas (Controller → Service → Repository).

---

## 🧱 Estructura del Proyecto

```bash
gestion-consultorio-odontologico/
├── backend/                # API REST (NestJS + Prisma)
├── frontend/               # Frontend (Next.js 13+ App Router)
└── docker-compose.yml      # Orquestación de servicios
⚙️ Tecnologías
Backend: NestJS, TypeScript, Prisma ORM
Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
Base de Datos: PostgreSQL
ORM: Prisma
Contenedores: Docker, Docker Compose
📂 Variables de Entorno
1. Backend (backend/.env)
DATABASE_URL="postgresql://admin:admin123@localhost:5432/consultorio_odontologico"
PORT=3001
2. Frontend (frontend/.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001
3. (Opcional) Docker (.env en la raíz)
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=consultorio_odontologico

Ajusta las credenciales según tu configuración.

🚀 Cómo Ejecutar el Proyecto
🔹 Opción 1: Modo Desarrollo
1. Backend (NestJS)
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev

Disponible en:
👉 http://localhost:3001

2. Frontend (Next.js)
cd frontend
npm install
npm run dev

Disponible en:
👉 http://localhost:3000

🔹 Opción 2: Docker Compose
docker compose up -d

Servicios:

PostgreSQL (db)
Backend (backend)
Frontend (frontend)

Ver estado:

docker compose ps
📚 Funcionalidades Implementadas
🧑‍⚕️ Pacientes
CRUD completo
Campos:
nombre, apellidos, cédula, teléfono, correo
fecha de nacimiento
dirección
antecedentes médicos
alergias
Vista de detalle:
Información completa
Historial de tratamientos
👨‍⚕️ Odontólogos
CRUD completo
Campos:
nombre, apellidos, cédula, teléfono, correo
especialidadId
horarioInicio, horarioFin
Relación con citas y tratamientos
📅 Citas
CRUD completo
Asociadas a:
pacienteId
odontologoId
Campos:
fecha, hora
motivo
estado (Programada, Realizada, Cancelada)
🦷 Piezas Dentales
Catálogo dental
Campos:
número (ej: "11", "36")
nombre
tipo (Incisivo, Canino, Premolar, Molar)
Usadas en tratamientos
💊 Tratamientos
CRUD completo
Asociados a:
pacienteId
odontologoId
piezaDentalId (opcional)
Campos:
fecha
diagnóstico
procedimiento
costo
observaciones
Historial odontológico del paciente
🧭 Rutas Principales (Frontend)
🏠 Inicio
/

Acceso a módulos:

Pacientes
Odontólogos
Citas
Tratamientos
👤 Pacientes
/pacientes
/pacientes/nuevo
/pacientes/[id]
/pacientes/[id]/editar
🦷 Odontólogos
/odontologos
/odontologos/nuevo
/odontologos/[id]
/odontologos/[id]/editar
📅 Citas
/citas
/citas/nuevo
/citas/[id]
/citas/[id]/editar
💊 Tratamientos
/tratamientos
/tratamientos/nuevo
/tratamientos/[id]
/tratamientos/[id]/editar
🧪 Flujo Ejemplar
Crear Paciente → /pacientes/nuevo
Crear Odontólogo → /odontologos/nuevo
Crear Pieza Dental → API o Prisma Studio
Crear Cita → /citas/nuevo
Crear Tratamiento → /tratamientos/nuevo
Ver historial → /pacientes/[id]
👨‍🏫 Notas para el Docente
Estructura monorepo
backend/ → NestJS + Prisma
frontend/ → Next.js
Arquitectura en capas:
Controller → Service → Repository
Backend:
DTOs con class-validator
Prisma como única capa de datos
Frontend:
App Router (Next.js)
Servicios en src/services
Páginas por entidad
📸 Capturas (Opcional)

Puedes agregar:

Dashboard
Listado de pacientes
Detalle con historial
Formularios
📦 Subir cambios
git add README.md
git commit -m "Agregar README con documentación completa del proyecto"
git push

---
