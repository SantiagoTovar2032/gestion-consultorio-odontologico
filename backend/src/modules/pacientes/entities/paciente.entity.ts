export class Paciente {
  id: number | undefined;
  nombre: string | undefined;
  apellido: string | undefined;
  cedula: string | undefined;
  telefono: string | undefined;
  email?: string;
  fechaNacimiento: Date | undefined;
  direccion?: string;
  antecedentesMedicos?: string;
  alergias?: string;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
