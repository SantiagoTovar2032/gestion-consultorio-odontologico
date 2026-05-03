'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { TratamientoService } from '@/services/tratamiento.service';
import { PacienteService } from '@/services/paciente.service';
import { OdontologoService } from '@/services/odontologo.service';
import { PiezaDentalService, PiezaDental } from '@/services/pieza_dental.service'; // Importa el servicio y la interfaz
import { Tratamiento } from '@/interfaces/tratamiento.interface';
import { Paciente } from '@/interfaces/paciente.interface';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function NuevoTratamientoPage() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [piezasDentales, setPiezasDentales] = useState<PiezaDental[]>([]);
  const [cargandoDatosIniciales, setCargandoDatosIniciales] = useState(true);

  const [form, setForm] = useState<Tratamiento>({
    pacienteId: 0,
    odontologoId: 0,
    piezaDentalId: null, // Puede ser null
    fecha: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    diagnostico: '',
    procedimiento: '',
    costo: '',
    observaciones: '',
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pacientesData, odontologosData, piezasData] = await Promise.all([
          PacienteService.getAll(),
          OdontologoService.getAll(),
          PiezaDentalService.getAll(),
        ]);
        setPacientes(pacientesData);
        setOdontologos(odontologosData);
        setPiezasDentales(piezasData);

        // Preseleccionar el primer elemento si existen
        if (pacientesData.length > 0) {
          setForm((prev) => ({ ...prev, pacienteId: pacientesData[0].id || 0 }));
        }
        if (odontologosData.length > 0) {
          setForm((prev) => ({ ...prev, odontologoId: odontologosData[0].id || 0 }));
        }
        // No preseleccionar pieza dental, dejarla en null/0 para indicar que es opcional
      } catch (err) {
        console.error('Error cargando datos para el tratamiento', err);
      } finally {
        setCargandoDatosIniciales(false);
      }
    };
    cargarDatos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === 'pacienteId' || name === 'odontologoId' || name === 'piezaDentalId'
          ? value === '' ? null : Number(value) // Manejar piezaDentalId como null si está vacío
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.pacienteId || !form.odontologoId || form.costo === '') {
      alert('Asegúrate de seleccionar paciente, odontólogo y especificar el costo.');
      return;
    }

    try {
      // Filtrar campos para enviar solo los que acepta el backend y convertir costo a string si es necesario
      const dataToSend = {
        pacienteId: form.pacienteId,
        odontologoId: form.odontologoId,
        piezaDentalId: form.piezaDentalId === null ? undefined : form.piezaDentalId, // Enviar undefined si es null
        fecha: form.fecha,
        diagnostico: form.diagnostico,
        procedimiento: form.procedimiento,
        costo: form.costo, // Ya es string
        observaciones: form.observaciones,
      };

      await TratamientoService.create(dataToSend as Tratamiento); // Cast para asegurar tipo
      router.push('/tratamientos');
    } catch (err) {
      console.error('Error creando tratamiento', err);
      alert('Ocurrió un error al crear el tratamiento.');
    }
  };

  if (cargandoDatosIniciales) {
    return (
      <>
        <Navbar />
        <p className="p-4">Cargando datos iniciales...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">Nuevo Tratamiento</h1>

        {(pacientes.length === 0 || odontologos.length === 0) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Debes tener al menos un paciente y un odontólogo creados para registrar un tratamiento.
          </div>
        )}

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
              disabled={pacientes.length === 0}
            >
              <option value="">Selecciona un paciente</option>
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
              disabled={odontologos.length === 0}
            >
              <option value="">Selecciona un odontólogo</option>
              {odontologos.map((o) => (
                <option key={o.id} value={o.id}>
                  Dr/a. {o.nombre} {o.apellido}
                </option>
              ))}
            </select>
          </div>

          {/* Selección de Pieza Dental (Opcional) */}
          <div>
            <label className="block mb-1 font-semibold">Pieza Dental (Opcional)</label>
            <select
              name="piezaDentalId"
              value={form.piezaDentalId || ''} // Usar '' para null en el select
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

          {/* Fecha del Tratamiento */}
          <div>
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

          {/* Diagnóstico */}
          <div>
            <label className="block mb-1 font-semibold">Diagnóstico</label>
            <textarea
              name="diagnostico"
              value={form.diagnostico}
              onChange={handleChange}
              className="border p-2 w-full rounded min-h-[80px]"
              placeholder="Ej: Caries de segundo grado en pieza 15"
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
              placeholder="Ej: Limpieza profunda, obturación con resina composite"
              required
            />
          </div>

          {/* Costo */}
          <div>
            <label className="block mb-1 font-semibold">Costo</label>
            <input
              type="number" // Tipo number para el input, pero se envía como string
              step="0.01" // Permite decimales
              name="costo"
              value={form.costo}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              placeholder="Ej: 120.50"
              required
            />
          </div>

          {/* Observaciones (Opcional) */}
          <div>
            <label className="block mb-1 font-semibold">Observaciones (Opcional)</label>
            <textarea
              name="observaciones"
              value={form.observaciones || ''}
              onChange={handleChange}
              className="border p-2 w-full rounded min-h-[60px]"
              placeholder="Cualquier nota adicional..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={pacientes.length === 0 || odontologos.length === 0}
          >
            Guardar Tratamiento
          </button>
        </form>
      </div>
    </>
  );
}
