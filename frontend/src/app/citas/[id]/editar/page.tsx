'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { CitaService } from '@/services/cita.service';
import { PacienteService } from '@/services/paciente.service';
import { OdontologoService } from '@/services/odontologo.service';
import { Cita } from '@/interfaces/cita.interface';
import { Paciente } from '@/interfaces/paciente.interface';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function EditarCitaPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [form, setForm] = useState<Cita | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        const [citaData, pacientesData, odontologosData] = await Promise.all([
          CitaService.getById(id),
          PacienteService.getAll(),
          OdontologoService.getAll(),
        ]);
        
        setForm({
          ...citaData,
          // Asegurarse de que la fecha sea un string "YYYY-MM-DD" para el input type="date"
          fecha: new Date(citaData.fecha).toISOString().split('T')[0],
        });
        setPacientes(pacientesData);
        setOdontologos(odontologosData);
      } catch (err) {
        console.error('Error cargando datos para la edición de cita', err);
        router.push('/citas'); // Redirigir si la cita no existe o hay error de carga
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'pacienteId' || name === 'odontologoId' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    try {
      // Filtramos explícitamente los campos que el backend SÍ acepta para la actualización
      const dataToSend = {
        pacienteId: form.pacienteId,
        odontologoId: form.odontologoId,
        fecha: form.fecha,
        hora: form.hora,
        motivoConsulta: form.motivoConsulta,
        estado: form.estado,
      };

      await CitaService.update(id, dataToSend); // Enviamos solo los campos filtrados
      router.push('/citas');
    } catch (err) {
      console.error('Error actualizando cita', err);
      alert('Ocurrió un error al actualizar la cita');
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
        <h1 className="text-2xl font-bold mb-4">Editar Cita</h1>
        
        {pacientes.length === 0 || odontologos.length === 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Debes tener al menos un paciente y un odontólogo creados.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Selección de Paciente */}
            <div>
              <label className="block mb-1 font-semibold">Paciente</label>
              <select
                name="pacienteId"
                value={form.pacienteId}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.apellido} - {p.cedula}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de Odontólogo */}
            <div>
              <label className="block mb-1 font-semibold">Odontólogo</label>
              <select
                name="odontologoId"
                value={form.odontologoId}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                {odontologos.map((o) => (
                  <option key={o.id} value={o.id}>
                    Dr/a. {o.nombre} {o.apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block mb-1 font-semibold">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-1 font-semibold">Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-semibold">Motivo de consulta</label>
              <textarea
                name="motivoConsulta"
                value={form.motivoConsulta}
                onChange={handleChange}
                className="border p-2 w-full rounded min-h-[80px]"
                placeholder="Ej: Dolor de muela, Limpieza de rutina..."
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Estado</label>
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="Programada">Programada</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Guardar Cambios
            </button>
          </form>
        )}
      </div>
    </>
  );
}
