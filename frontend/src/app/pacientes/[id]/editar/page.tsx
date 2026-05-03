'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { PacienteService } from '@/services/paciente.service';
import { Paciente } from '@/interfaces/paciente.interface';

export default function EditarPacientePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [form, setForm] = useState<Paciente | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await PacienteService.getById(id);
        setForm({
          ...data,
          fechaNacimiento: data.fechaNacimiento
            ? new Date(data.fechaNacimiento).toISOString().split('T')[0]
            : '',
        });
      } catch (err) {
        console.error('Error cargando paciente', err);
      } finally {
        setCargando(false);
      }
    })();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    try {
      await PacienteService.update(id, {
        nombre: form.nombre,
        apellido: form.apellido,
        cedula: form.cedula,
        telefono: form.telefono,
        email: form.email,
        fechaNacimiento: form.fechaNacimiento as string,
        direccion: form.direccion,
        antecedentesMedicos: form.antecedentesMedicos,
        alergias: form.alergias,
      });
      router.push('/pacientes');
    } catch (err) {
      console.error('Error actualizando paciente', err);
    }
  };

  if (cargando || !form) {
    return (
      <>
        <Navbar />
        <p className="p-4">Cargando...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">Editar Paciente</h1>
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
            value={form.email || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="date"
            name="fechaNacimiento"
            value={
              typeof form.fechaNacimiento === 'string'
                ? form.fechaNacimiento
                : new Date(form.fechaNacimiento || '').toISOString().split('T')[0]
            }
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          {/* Dirección */}
          <input
            name="direccion"
            placeholder="Dirección"
            value={form.direccion || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          {/* Antecedentes Médicos */}
          <textarea
            name="antecedentesMedicos"
            placeholder="Antecedentes médicos"
            value={form.antecedentesMedicos || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded min-h-[60px]"
          />

          {/* Alergias */}
          <textarea
            name="alergias"
            placeholder="Alergias"
            value={form.alergias || ''}
            onChange={handleChange}
            className="border p-2 w-full rounded min-h-[60px]"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar cambios
          </button>
        </form>
      </div>
    </>
  );
}
