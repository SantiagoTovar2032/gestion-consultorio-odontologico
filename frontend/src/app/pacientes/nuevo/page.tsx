'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { PacienteService } from '@/services/paciente.service';
import { Paciente } from '@/interfaces/paciente.interface';

export default function NuevoPacientePage() {
  const router = useRouter();
  const [form, setForm] = useState<Paciente>({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    fechaNacimiento: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await PacienteService.create(form);
      router.push('/pacientes');
    } catch (error) {
      console.error('Error creando paciente', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Nuevo Paciente</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="cedula"
            placeholder="Cédula"
            value={form.cedula}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo (opcional)"
            value={form.email || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}
