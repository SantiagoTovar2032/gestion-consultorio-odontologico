'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { CitaService } from '@/services/cita.service';
import { PacienteService } from '@/services/paciente.service';
import { OdontologoService } from '@/services/odontologo.service';
import { Cita } from '@/interfaces/cita.interface';
import { Paciente } from '@/interfaces/paciente.interface';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function NuevaCitaPage() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [cargando, setCargando] = useState(true);

  const [form, setForm] = useState<Cita>({
    pacienteId: 0,
    odontologoId: 0,
    fecha: new Date().toISOString().split('T')[0],
    hora: '09:00',
    motivoConsulta: '',
    estado: 'Programada',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pacientesData, odontologosData] = await Promise.all([
          PacienteService.getAll(),
          OdontologoService.getAll(),
        ]);
        setPacientes(pacientesData);
        setOdontologos(odontologosData);

        // Si hay datos, preseleccionamos el primero por defecto
        if (pacientesData.length > 0) {
          setForm((prev) => ({ ...prev, pacienteId: pacientesData[0].id || 0 }));
        }
        if (odontologosData.length > 0) {
          setForm((prev) => ({ ...prev, odontologoId: odontologosData[0].id || 0 }));
        }
      } catch (err) {
        console.error('Error cargando datos para la cita', err);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === 'pacienteId' || name === 'odontologoId' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.pacienteId || !form.odontologoId) {
      alert('Debes seleccionar un paciente y un odontólogo');
      return;
    }

    try {
      await CitaService.create(form);
      router.push('/citas');
    } catch (err) {
      console.error('Error creando cita', err);
      alert('Ocurrió un error al crear la cita');
    }
  };

  if (cargando) {
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
        <h1 className="text-2xl font-bold mb-4">Nueva Cita</h1>
        
        {pacientes.length === 0 || odontologos.length === 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Debes tener al menos un paciente y un odontólogo creados para programar una cita.
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

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Guardar Cita
            </button>
          </form>
        )}
      </div>
    </>
  );
}
