import axios from 'axios';
import { Cita } from '@/interfaces/cita.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const CitaService = {
  async getAll(): Promise<Cita[]> {
    const res = await axios.get(`${API_URL}/citas`);
    return res.data;
  },

  async getById(id: number): Promise<Cita> {
    const res = await axios.get(`${API_URL}/citas/${id}`);
    return res.data;
  },

  async create(data: Cita): Promise<Cita> {
    const res = await axios.post(`${API_URL}/citas`, data);
    return res.data;
  },

  async update(id: number, data: Partial<Cita>): Promise<Cita> {
    const res = await axios.put(`${API_URL}/citas/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/citas/${id}`);
  },
};
