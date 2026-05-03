import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const PacienteService = {
  async getAll() {
    const response = await axios.get(`${API_URL}/pacientes`);
    return response.data;
  },

  async create(paciente) {
    const response = await axios.post(`${API_URL}/pacientes`, paciente);
    return response.data;
  },

  async getById(id: number) {
    const response = await axios.get(`${API_URL}/pacientes/${id}`);
    return response.data;
  },

  async update(id: number, paciente) {
    const response = await axios.put(`${API_URL}/pacientes/${id}`, paciente);
    return response.data;
  },

  async delete(id: number) {
    const response = await axios.delete(`${API_URL}/pacientes/${id}`);
    return response.data;
  }
};
