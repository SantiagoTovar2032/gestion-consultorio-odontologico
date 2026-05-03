export interface Odontologo {
  id?: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  email: string;
  especialidadId: number;
  horarioInicio: string;
  horarioFin: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  especialidad?: {
    id: number;
    nombre: string;
    descripcion?: string;
  } | null;
}
