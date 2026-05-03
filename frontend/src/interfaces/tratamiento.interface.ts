export interface Tratamiento {
  id?: number;
  pacienteId: number;
  odontologoId: number;
  piezaDentalId?: number | null; // Puede ser null
  fecha?: string; // String 'YYYY-MM-DD' o Date
  diagnostico: string;
  procedimiento: string;
  costo: string; // Enviamos como string, backend lo convierte a Decimal
  observaciones?: string;

  // Datos anidados que trae Prisma con el "include"
  paciente?: { id: number; nombre: string; apellido: string } | null;
  odontologo?: { id: number; nombre: string; apellido: string } | null;
  piezaDental?: { id: number; numero: string; nombre: string; tipo: string } | null;
}
