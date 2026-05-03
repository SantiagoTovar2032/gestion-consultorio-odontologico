import axios from 'axios';
import { Tratamiento } from '@/interfaces/tratamiento.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const TratamientoService = {
  async getAll(): Promise<Tratamiento[]> {
    const res = await axios.get(`${API_URL}/tratamientos`);
    return res.data;
  },

  async getById(id: number): Promise<Tratamiento> {
    const res = await axios.get(`${API_URL}/tratamientos/${id}`);
    return res.data;
  },

  // 👇 Historial de tratamientos por paciente
  async getByPacienteId(pacienteId: number): Promise<Tratamiento[]> {
    const res = await axios.get(`${API_URL}/tratamientos/paciente/${pacienteId}`);
    return res.data;
  },

  async create(data: Tratamiento): Promise<Tratamiento> {
    const res = await axios.post(`${API_URL}/tratamientos`, data);
    return res.data;
  },

  async update(id: number, data: Partial<Tratamiento>): Promise<Tratamiento> {
    const res = await axios.put(`${API_URL}/tratamientos/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/tratamientos/${id}`);
  },
};
