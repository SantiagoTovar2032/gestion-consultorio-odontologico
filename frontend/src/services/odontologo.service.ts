import axios from 'axios';
import { Odontologo } from '@/interfaces/odontologo.interface';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const OdontologoService = {
  async getAll(): Promise<Odontologo[]> {
    const res = await axios.get(`${API_URL}/odontologos`);
    return res.data;
  },

  async getById(id: number): Promise<Odontologo> {
    const res = await axios.get(`${API_URL}/odontologos/${id}`);
    return res.data;
  },

  async create(data: Odontologo): Promise<Odontologo> {
    const res = await axios.post(`${API_URL}/odontologos`, data);
    return res.data;
  },

  async update(id: number, data: Partial<Odontologo>): Promise<Odontologo> {
    const res = await axios.put(`${API_URL}/odontologos/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/odontologos/${id}`);
  },
};
