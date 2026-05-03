'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { PacienteService } from '@/services/paciente.service';
import { TratamientoService } from '@/services/tratamiento.service';
import { Paciente } from '@/interfaces/paciente.interface';
import { Tratamiento } from '@/interfaces/tratamiento.interface';

export default function DetallePacientePage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        const [pacienteData, tratamientosData] = await Promise.all([
          PacienteService.getById(id),
          TratamientoService.getByPacienteId(id),
        ]);
        setPaciente(pacienteData);
        setTratamientos(tratamientosData);
      } catch (err) {
        console.error('Error cargando detalle de paciente', err);
        router.push('/pacientes');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id, router]);

  if (cargando || !paciente) {
    return (
      <>
        <Navbar />
        <p className="p-4">Cargando paciente...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded shadow mb-6">
          <h1 className="text-2xl font-bold mb-4">
            {paciente.nombre} {paciente.apellido}
          </h1>
          <p><strong>Cédula:</strong> {paciente.cedula}</p>
          <p><strong>Teléfono:</strong> {paciente.telefono}</p>
          <p><strong>Email:</strong> {paciente.email}</p>
          <p><strong>Dirección:</strong> {paciente.direccion || '—'}</p>
          <p><strong>Antecedentes Médicos:</strong> {paciente.antecedentesMedicos || '—'}</p>
          <p><strong>Alergias:</strong> {paciente.alergias || '—'}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Historial de Tratamientos</h2>
          {tratamientos.length === 0 ? (
            <p className="text-gray-500">Este paciente no tiene tratamientos registrados.</p>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-2 px-4 text-left">Fecha</th>
                  <th className="py-2 px-4 text-left">Odontólogo</th>
                  <th className="py-2 px-4 text-left">Pieza</th>
                  <th className="py-2 px-4 text-left">Diagnóstico</th>
                  <th className="py-2 px-4 text-left">Costo</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {tratamientos.map((t) => (
                  <tr key={t.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2 px-4">
                      {t.fecha ? new Date(t.fecha).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-2 px-4">
                      Dr/a. {t.odontologo?.nombre} {t.odontologo?.apellido}
                    </td>
                    <td className="py-2 px-4">
                      {t.piezaDental
                        ? `${t.piezaDental.numero} - ${t.piezaDental.nombre}`
                        : 'Ninguna'}
                    </td>
                    <td className="py-2 px-4">{t.diagnostico}</td>
                    <td className="py-2 px-4">${t.costo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}
