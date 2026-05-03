'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { OdontologoService } from '@/services/odontologo.service';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function EditarOdontologoPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [form, setForm] = useState<Odontologo | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await OdontologoService.getById(id);
        setForm(data);
      } catch (err) {
        console.error('Error cargando odontólogo', err);
      } finally {
        setCargando(false);
      }
    })();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!form) return;
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
    if (!form) return;
    try {
      await OdontologoService.update(id, {
        nombre: form.nombre,
        apellido: form.apellido,
        cedula: form.cedula,
        telefono: form.telefono,
        email: form.email,
        especialidadId: form.especialidadId,
        horarioInicio: form.horarioInicio,
        horarioFin: form.horarioFin,
      });
      router.push('/odontologos');
    } catch (err) {
      console.error('Error actualizando odontólogo', err);
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
        <h1 className="text-2xl font-bold mb-4">Editar Odontólogo</h1>
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
            placeholder="Horario Inicio"
            value={form.horarioInicio}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
          <input
            name="horarioFin"
            placeholder="Horario Fin"
            value={form.horarioFin}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
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
