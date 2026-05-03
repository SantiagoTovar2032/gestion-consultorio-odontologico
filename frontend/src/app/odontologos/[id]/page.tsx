'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { OdontologoService } from '@/services/odontologo.service';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function DetalleOdontologoPage() {
  const params = useParams();
  const id = Number(params.id);
  const [odontologo, setOdontologo] = useState<Odontologo | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await OdontologoService.getById(id);
        setOdontologo(data);
      } catch (err) {
        console.error('Error cargando odontólogo', err);
      }
    })();
  }, [id]);

  if (!odontologo) {
    return (
      <>
        <Navbar />
        <p className="p-4">Cargando odontólogo...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-4">
        <h1 className="text-2xl font-bold mb-4">
          {odontologo.nombre} {odontologo.apellido}
        </h1>
        <p><strong>Cédula:</strong> {odontologo.cedula}</p>
        <p><strong>Teléfono:</strong> {odontologo.telefono}</p>
        <p><strong>Email:</strong> {odontologo.email}</p>
        <p><strong>Especialidad:</strong> {odontologo.especialidad?.nombre ?? '—'}</p>
        <p><strong>Horario:</strong> {odontologo.horarioInicio} - {odontologo.horarioFin}</p>
      </div>
    </>
  );
}
