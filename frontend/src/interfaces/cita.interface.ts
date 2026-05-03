export interface Cita { // <--- ESTO ES CRUCIAL
  id?: number;
  pacienteId: number;
  odontologoId: number;
  fecha: string;
  hora: string;
  motivoConsulta: string;
  estado?: string;
  paciente?: { nombre: string; apellido: string };
  odontologo?: { nombre: string; apellido: string };
}
