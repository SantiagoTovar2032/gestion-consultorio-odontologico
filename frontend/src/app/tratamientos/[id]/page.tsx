'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { TratamientoService } from '@/services/tratamiento.service';
import { Tratamiento } from '@/interfaces/tratamiento.interface';

export default function DetalleTratamientoPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [tratamiento, setTratamiento] = useState<Tratamiento | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await TratamientoService.getById(id);
        setTratamiento(data);
      } catch (err) {
        console.error('Error cargando tratamiento', err);
        router.push('/tratamientos');
      }
    })();
  }, [id, router]);

  if (!tratamiento) {
    return (
      <>
        <Navbar />
        <p className="p-4">Cargando tratamiento...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">Detalle del Tratamiento</h1>
        <p><strong>ID:</strong> {tratamiento.id}</p>
        <p><strong>Fecha:</strong> {tratamiento.fecha ? new Date(tratamiento.fecha).toLocaleDateString() : '—'}</p>
        <p><strong>Paciente:</strong> {tratamiento.paciente?.nombre} {tratamiento.paciente?.apellido} (ID: {tratamiento.pacienteId})</p>
        <p><strong>Odontólogo:</strong> Dr/a. {tratamiento.odontologo?.nombre} {tratamiento.odontologo?.apellido} (ID: {tratamiento.odontologoId})</p>
        <p><strong>Pieza dental:</strong> {tratamiento.piezaDental ? `${tratamiento.piezaDental.numero} - ${tratamiento.piezaDental.nombre}` : 'Ninguna'}</p>
        <p><strong>Diagnóstico:</strong> {tratamiento.diagnostico}</p>
        <p><strong>Procedimiento:</strong> {tratamiento.procedimiento}</p>
        <p><strong>Costo:</strong> ${tratamiento.costo}</p>
        <p><strong>Observaciones:</strong> {tratamiento.observaciones || '—'}</p>
      </div>
    </>
  );
}
