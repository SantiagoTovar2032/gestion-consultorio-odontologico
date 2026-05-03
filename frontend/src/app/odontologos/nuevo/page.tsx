'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { OdontologoService } from '@/services/odontologo.service';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function NuevoOdontologoPage() {
  const router = useRouter();
  const [form, setForm] = useState<Odontologo>({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    especialidadId: 1,
    horarioInicio: '08:00',
    horarioFin: '16:00',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === 'especialidadId'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await OdontologoService.create(form);
      router.push('/odontologos');
    } catch (err) {
      console.error('Error creando odontólogo', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">Nuevo Odontólogo</h1>
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
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />

          <input
            type="number"
            name="especialidadId"
            placeholder="ID Especialidad"
            value={form.especialidadId}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            min={1}
            required
          />

          <input
            name="horarioInicio"
            placeholder="Horario Inicio (ej: 08:00)"
            value={form.horarioInicio}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="horarioFin"
            placeholder="Horario Fin (ej: 16:00)"
            value={form.horarioFin}
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
