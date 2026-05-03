'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CitaService } from '@/services/cita.service';
import { Cita } from '@/interfaces/cita.interface';

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await CitaService.getAll();
        setCitas(data);
      } catch (err) {
        console.error('Error cargando citas', err);
      }
    };
    cargar();
  }, []);

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta cita?')) return;
    try {
      await CitaService.delete(id);
      setCitas((prev) => prev.filter((c) => c.id !== id));
      alert('Cita eliminada correctamente');
    } catch (err) {
      console.error('Error eliminando cita', err);
      alert('No se pudo eliminar la cita');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Citas</h1>
            <p className="text-sm text-gray-600">
              Programa y gestiona las citas del consultorio.
            </p>
          </div>
          <Link
            href="/citas/nuevo"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
          >
            Nueva Cita
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Fecha y Hora</th>
                <th className="py-3 px-4 text-left">Paciente</th>
                <th className="py-3 px-4 text-left">Odontólogo</th>
                <th className="py-3 px-4 text-left">Estado</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citas.length > 0 ? (
                citas.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-2.5 px-4">
                      {new Date(c.fecha).toLocaleDateString()} - {c.hora}
                    </td>
                    <td className="py-2.5 px-4">
                      {c.paciente?.nombre} {c.paciente?.apellido}
                    </td>
                    <td className="py-2.5 px-4">
                      Dr/a. {c.odontologo?.nombre} {c.odontologo?.apellido}
                    </td>
                    <td className="py-2.5 px-4">{c.estado}</td>
                    <td className="py-2.5 px-4 text-center space-x-2">
                      <Link
                        href={`/citas/${c.id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/citas/${c.id}/editar`}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => c.id && handleEliminar(c.id)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="py-4 px-4 text-center text-gray-500"
                    colSpan={5}
                  >
                    No hay citas programadas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
