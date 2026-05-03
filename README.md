🦷 Sistema de Gestión de Consultorio Odontológico
Proyecto full-stack para la gestión de:

Pacientes
Odontólogos
Citas
Tratamientos
Piezas dentales
Desarrollado con NestJS, Next.js, Prisma, PostgreSQL y Docker, siguiendo una arquitectura en capas (Controlador → Servicio → Repositorio).

🧱 Estructura del Proyecto
intento

Colapsar


 Copiar

gestion-consultorio-odontologico/
├── backend/                # API REST (NestJS + Prisma)
├── frontend/               # Frontend (Next.js 13+ App Router)
└── docker-compose.yml      # Orquestación de servicios (DB, backend, frontend)
⚙️ Tecnologías
Backend: NestJS, TypeScript, Prisma ORM
Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
Base de Datos: PostgreSQL
ORM: Prisma
Contenedores: Docker, Docker Compose
📂 Variables de Entorno
1. Backend ( backend/.env)
entorno

Colapsar


 Copiar

DATABASE_URL="postgresql://admin:admin123@localhost:5432/consultorio_odontologico"
PORT=3001
2. Interfaz de usuario ( frontend/.env.local)
entorno

Colapsar


 Copiar

NEXT_PUBLIC_API_URL=http://localhost:3001
3. (Opcional) Docker / raíz ( .enven la raíz del proyecto)
entorno

Colapsar


 Copiar

DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=consultorio_odontologico
Ajusta las credenciales según tu configuración si es necesario.

🚀 Cómo Ejecutar el Proyecto
Opción 1: Ejecutar Backend y Frontend localmente (modo desarrollo)
1. Backend (NestJS)
intento

Colapsar


 Copiar

cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run start:dev
El backend quedará disponible en:

http://localhost:3001

2. Interfaz de usuario (Next.js)
En otra terminal:

intento

Colapsar


 Copiar

cd frontend
npm install
npm run dev
El frontend quedará disponible en:

http://localhost:3000

Opción 2: Ejecutar todo con Docker Compose
Asegúrate de tener Docker Desktop funcionando.

En la raíz del proyecto:

intento

Colapsar


 Copiar

docker compose up -d
Esto levanta:

PostgreSQL ( db)
Backend NestJS ( backend)
Frontend Next.js ( frontend)
Ver el estado:

intento

Colapsar


 Copiar

docker compose ps
📚 Funcionalidades implementadas
🧑‍⚕️ Pacientes
CRUD completo.
Campos:
nombre, apellidos, cédula, teléfono, correo electrónico
fecha de nacimiento
dirección
antecedentes médicos
alergias
Vista de detalle con:
Datos completos del paciente
Historial de tratamientos asociados
👨‍⚕️ Odontólogos
CRUD completo.
Campos:
nombre, apellidos, cédula, teléfono, correo electrónico
especialidadId (relación con Especialidad)
horarioInicio, horarioFin
Relacionados con citas y tratamientos.
📅 Citas
CRUD completo.
Asociadas a:
Paciente ( pacienteId)
Odontólogo ( odontologoId)
Campos:
fecha, hora
motivo de consulta
estado (Programada, Realizada, Cancelada)
🦷 Piezas Dentales
Catálogo de piezas dentales.
Campos:
numero (IED, ej: "11", "21", "36")
nombre
tipo (Incisivo, Canino, Premolar, Molar)
Usadas en el registro de tratamientos.
💊 Tratamientos
CRUD completo.
Asociados a:
Paciente ( pacienteId)
Odontólogo ( odontologoId)
PiezaDental opcional ( piezaDentalId)
Campos:
fecha (por defecto actual si no se envía)
diagnóstico
procedimiento
costo (Decimal)
observaciones
Mostrados como historial odontológico del paciente.
🧭 Rutas Principales (Frontend)
Página de inicio
/
Tablero con accesorios rápidos a:
Pacientes
Odontólogos
Citas
Tratamientos
Módulo Pacientes
/pacientes→ Listado de pacientes
/pacientes/nuevo→ Crear paciente
/pacientes/[id]→ Detalle de paciente + historial de tratamientos
/pacientes/[id]/editar→ Editar paciente
Módulo Odontólogos
/odontologos→ Listado de odontólogos
/odontologos/nuevo→ Crear odontólogo
/odontologos/[id]→ Detalle de odontólogo
/odontologos/[id]/editar→ Editar odontólogo
Módulo Citas
/citas→ Listado de citas
/citas/nuevo→ Crear cita
/citas/[id]→ Detalle de cita
/citas/[id]/editar→ Editar cita
Módulo Tratamientos
/tratamientos→ Listado de tratamientos
/tratamientos/nuevo→ Crear tratamiento
/tratamientos/[id]→ Detalle de tratamiento
/tratamientos/[id]/editar→ Editar tratamiento
🧪 Flujo Ejemplar
Crear un Paciente desde /pacientes/nuevo.
Crear un Odontólogo desde /odontologos/nuevo.
Crear una Pieza Dental (vía endpoint /piezas-dentaleso Prisma Studio).
Crear una Cita desde /citas/nuevoescogiendo paciente y odontólogo.
Registrar un Tratamiento desde /tratamientos/nuevoasociado:
Paciente
Odontólogo
Pieza Dental (opcional)
Ver el historial odontológico completo del paciente en /pacientes/[id].
👨‍🏫 Notas para el Docente
Estructura monorepo:
backend/para NestJS + Prisma.
frontend/para Next.js.
Arquitectura del backend en capas:
Controller→ Service→Repository
DTOs conclass-validator
Prisma como única capa de acceso a datos.
Frontend usando:
Enrutador de aplicaciones Next.js
Páginas por entidad
Servicios src/servicespara consumir la API.
