export interface Paciente {
  id?: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  email?: string;
  fechaNacimiento: string | Date;
  direccion?: string;
  antecedentesMedicos?: string;
  alergias?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
