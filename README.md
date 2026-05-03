# 🦷 Sistema de Gestión de Consultorio Odontológico

Un sistema completo de gestión para consultorios dentales desarrollado con tecnologías modernas.

## 📋 Descripción

Sistema integral para la administración de consultorios odontológicos que permite gestionar pacientes, citas, tratamientos, historial médico y facturación de manera eficiente y segura.

## ✨ Características Principales

- 👥 **Gestión de Pacientes**: Registro completo con historial médico
- 📅 **Sistema de Citas**: Calendario interactivo con recordatorios
- 🦷 **Tratamientos Dentales**: Catálogo completo de procedimientos
- 📊 **Reportes y Estadísticas**: Dashboard con métricas del consultorio
- 💰 **Facturación**: Generación automática de facturas y presupuestos
- 🔐 **Autenticación Segura**: Sistema de usuarios con roles diferenciados
- 📱 **Diseño Responsivo**: Acceso desde cualquier dispositivo

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **NestJS** - Framework para APIs robustas
- **TypeScript** - Tipado estático
- **PostgreSQL** - Base de datos relacional
- **Prisma ORM** - Mapeo objeto-relacional
- **JWT** - Autenticación y autorización
- **bcrypt** - Encriptación de contraseñas

### Frontend
- **React** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios

## 📁 Estructura del Proyecto

Raíz del repo: `gestion-consultorio-odontologico/`

```bash
gestion-consultorio-odontologico/
├── backend/                         # API REST (NestJS + Prisma + PostgreSQL)
│   ├── src/
│   │   ├── main.ts                  # Punto de entrada NestJS
│   │   ├── app.module.ts            # Módulo raíz
│   │   ├── common/                  # Elementos compartidos
│   │   │   ├── filters/
│   │   │   ├── interceptors/
│   │   │   ├── pipes/
│   │   │   └── guards/
│   │   ├── config/                  # Configuración (env, etc.)
│   │   ├── prisma/                  # PrismaService y PrismaModule
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── modules/                 # Módulos de dominio
│   │       ├── pacientes/
│   │       │   ├── paciente.module.ts
│   │       │   ├── controller/
│   │       │   │   └── paciente.controller.ts
│   │       │   ├── service/
│   │       │   │   └── paciente.service.ts
│   │       │   ├── repository/
│   │       │   │   └── paciente.repository.ts
│   │       │   └── dto/
│   │       │       ├── create-paciente.dto.ts
│   │       │       └── update-paciente.dto.ts
│   │       ├── odontologos/
│   │       │   ├── odontologo.module.ts
│   │       │   ├── controller/
│   │       │   │   └── odontologo.controller.ts
│   │       │   ├── service/
│   │       │   │   └── odontologo.service.ts
│   │       │   ├── repository/
│   │       │   │   └── odontologo.repository.ts
│   │       │   └── dto/
│   │       ├── citas/
│   │       │   ├── cita.module.ts
│   │       │   ├── controller/
│   │       │   │   └── cita.controller.ts
│   │       │   ├── service/
│   │       │   │   └── cita.service.ts
│   │       │   ├── repository/
│   │       │   │   └── cita.repository.ts
│   │       │   └── dto/
│   │       ├── piezas_dentales/
│   │       │   ├── pieza_dental.module.ts
│   │       │   ├── controller/
│   │       │   │   └── pieza_dental.controller.ts
│   │       │   ├── service/
│   │       │   │   └── pieza_dental.service.ts
│   │       │   ├── repository/
│   │       │   │   └── pieza_dental.repository.ts
│   │       │   └── dto/
│   │       └── tratamientos/
│   │           ├── tratamiento.module.ts
│   │           ├── controller/
│   │           │   └── tratamiento.controller.ts
│   │           ├── service/
│   │           │   └── tratamiento.service.ts
│   │           ├── repository/
│   │           │   └── tratamiento.repository.ts
│   │           └── dto/
│   ├── prisma/
│   │   ├── schema.prisma             # Esquema Prisma (BD)
│   │   └── migrations/               # Migraciones
│   ├── test/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/                        # Frontend (Next.js + React + TS + Tailwind)
│   ├── src/
│   │   ├── app/                     # App Router
│   │   │   ├── layout.tsx           # Layout principal
│   │   │   ├── page.tsx             # Home
│   │   │   ├── pacientes/
│   │   │   │   ├── page.tsx         # Listado de pacientes
│   │   │   │   ├── nuevo/
│   │   │   │   │   └── page.tsx     # Crear paciente
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx     # Detalle de paciente
│   │   │   │       └── editar/
│   │   │   │           └── page.tsx # Editar paciente
│   │   │   ├── odontologos/
│   │   │   ├── citas/
│   │   │   └── tratamientos/
│   │   ├── components/
│   │   │   └── Navbar.tsx           # Barra de navegación
│   │   ├── services/                # Acceso a la API
│   │   │   ├── paciente.service.ts
│   │   │   ├── odontologo.service.ts
│   │   │   ├── cita.service.ts
│   │   │   ├── tratamiento.service.ts
│   │   │   └── pieza_dental.service.ts
│   │   ├── interfaces/
│   │   │   ├── paciente.interface.ts
│   │   │   ├── odontologo.interface.ts
│   │   │   ├── cita.interface.ts
│   │   │   └── tratamiento.interface.ts
│   │   └── styles/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.local
│
├── docker-compose.yml               # Orquestación de db + backend + frontend
├── .gitignore
└── README.md




## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- PostgreSQL (v14 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/consultorio-odontologico.git
cd consultorio-odontologico

