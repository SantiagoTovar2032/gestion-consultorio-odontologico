'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { TratamientoService } from '@/services/tratamiento.service';
import { PacienteService } from '@/services/paciente.service';
import { OdontologoService } from '@/services/odontologo.service';
import { PiezaDentalService, PiezaDental } from '@/services/pieza_dental.service';
import { Tratamiento } from '@/interfaces/tratamiento.interface';
import { Paciente } from '@/interfaces/paciente.interface';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function EditarTratamientoPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [piezasDentales, setPiezasDentales] = useState<PiezaDental[]>([]);
  const [form, setForm] = useState<Tratamiento | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        const [tratData, pacientesData, odontologosData, piezasData] = await Promise.all([
          TratamientoService.getById(id),
          PacienteService.getAll(),
          OdontologoService.getAll(),
          PiezaDentalService.getAll(),
        ]);
        setForm({
          ...tratData,
          fecha: tratData.fecha ? new Date(tratData.fecha).toISOString().split('T')[0] : '',
        });
        setPacientes(pacientesData);
        setOdontologos(odontologosData);
        setPiezasDentales(piezasData);
      } catch (err) {
        console.error('Error cargando datos para edición de tratamiento', err);
        router.push('/tratamientos');
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    if (!form) return;
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === 'pacienteId' || name === 'odontologoId' || name === 'piezaDentalId'
          ? value === '' ? null : Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    try {
      const dataToSend = {
        pacienteId: form.pacienteId,
        odontologoId: form.odontologoId,
        piezaDentalId: form.piezaDentalId === null ? undefined : form.piezaDentalId,
        fecha: form.fecha,
        diagnostico: form.diagnostico,
        procedimiento: form.procedimiento,
        costo: form.costo,
        observaciones: form.observaciones,
      };

      await TratamientoService.update(id, dataToSend);
      router.push('/tratamientos');
    } catch (err) {
      console.error('Error actualizando tratamiento', err);
      alert('Ocurrió un error al actualizar el tratamiento.');
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
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">Editar Tratamiento</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Paciente */}
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

          {/* Odontólogo */}
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

          {/* Pieza Dental */}
          <div>
            <label className="block mb-1 font-semibold">Pieza Dental (Opcional)</label>
            <select
              name="piezaDentalId"
              value={form.piezaDentalId || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="">Ninguna</option>
              {piezasDentales.map((pd) => (
                <option key={pd.id} value={pd.id}>
                  {pd.numero} - {pd.nombre} ({pd.tipo})
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="block mb-1 font-semibold">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Diagnóstico */}
          <div>
            <label className="block mb-1 font-semibold">Diagnóstico</label>
            <textarea
              name="diagnostico"
              value={form.diagnostico}
              onChange={handleChange}
              className="border p-2 w-full rounded min-h-[80px]"
              required
            />
          </div>

          {/* Procedimiento */}
          <div>
            <label className="block mb-1 font-semibold">Procedimiento</label>
            <textarea
              name="procedimiento"
              value={form.procedimiento}
              onChange={handleChange}
              className="border p-2 w-full rounded min-h-[80px]"
              required
            />
          </div>

          {/* Costo */}
          <div>
            <label className="block mb-1 font-semibold">Costo</label>
            <input
              type="number"
              step="0.01"
              name="costo"
              value={form.costo}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* Observaciones */}
          <div>
            <label className="block mb-1 font-semibold">Observaciones</label>
            <textarea
              name="observaciones"
              value={form.observaciones || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded min-h-[60px]"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </>
  );
}
