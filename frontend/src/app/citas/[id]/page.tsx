'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { CitaService } from '@/services/cita.service';
import { Cita } from '@/interfaces/cita.interface';
import Link from 'next/link';

export default function DetalleCitaPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [cita, setCita] = useState<Cita | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await CitaService.getById(id);
        setCita(data);
      } catch (err) {
        console.error('Error cargando cita', err);
        router.push('/citas'); // Redirigir si la cita no existe
      }
    })();
  }, [id, router]);

  if (!cita) {
    return (
      <>
        <Navbar />
        <p className="p-4">Cargando cita...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">Detalle de Cita</h1>
        <p><strong>ID de Cita:</strong> {cita.id}</p>
        <p><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleDateString()}</p>
        <p><strong>Hora:</strong> {cita.hora}</p>
        <p><strong>Paciente:</strong> {cita.paciente?.nombre} {cita.paciente?.apellido} ({cita.pacienteId})</p>
        <p><strong>Odontólogo:</strong> Dr/a. {cita.odontologo?.nombre} {cita.odontologo?.apellido} ({cita.odontologoId})</p>
        <p><strong>Motivo:</strong> {cita.motivoConsulta}</p>
        <p><strong>Estado:</strong> {cita.estado}</p>

        <div className="mt-6 flex justify-end space-x-3">
          <Link href="/citas" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            Volver al Listado
          </Link>
          <Link href={`/citas/${cita.id}/editar`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Editar Cita
          </Link>
        </div>
      </div>
    </>
  );
}
