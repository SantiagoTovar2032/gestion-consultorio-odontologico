import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PiezaDental {
  id: number;
  numero: string;
  nombre: string;
  tipo: string;
}

export const PiezaDentalService = {
  async getAll(): Promise<PiezaDental[]> {
    const res = await axios.get(`${API_URL}/piezas-dentales`);
    return res.data;
  },
  // Puedes añadir otros métodos si necesitas CRUD completo para PiezaDental
};
