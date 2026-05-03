'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { TratamientoService } from '@/services/tratamiento.service';
import { Tratamiento } from '@/interfaces/tratamiento.interface';

export default function TratamientosPage() {
  const [tratamientos, setTratamientos] = useState<Tratamiento[]>([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await TratamientoService.getAll();
        setTratamientos(data);
      } catch (err) {
        console.error('Error cargando tratamientos', err);
      }
    };
    cargar();
  }, []);

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este tratamiento?')) return;
    try {
      await TratamientoService.delete(id);
      setTratamientos((prev) => prev.filter((t) => t.id !== id));
      alert('Tratamiento eliminado correctamente');
    } catch (err) {
      console.error('Error eliminando tratamiento', err);
      alert('No se pudo eliminar el tratamiento');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tratamientos</h1>
            <p className="text-sm text-gray-600">
              Registra diagnósticos, procedimientos, piezas dentales y costos.
            </p>
          </div>
          <Link
            href="/tratamientos/nuevo"
            className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-rose-700"
          >
            Nuevo Tratamiento
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Paciente</th>
                <th className="py-3 px-4 text-left">Odontólogo</th>
                <th className="py-3 px-4 text-left">Pieza Dental</th>
                <th className="py-3 px-4 text-left">Diagnóstico</th>
                <th className="py-3 px-4 text-left">Costo</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tratamientos.length > 0 ? (
                tratamientos.map((t) => (
                  <tr
                    key={t.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-2.5 px-4">
                      {t.paciente?.nombre} {t.paciente?.apellido}
                    </td>
                    <td className="py-2.5 px-4">
                      Dr/a. {t.odontologo?.nombre} {t.odontologo?.apellido}
                    </td>
                    <td className="py-2.5 px-4">
                      {t.piezaDental
                        ? `${t.piezaDental.numero} - ${t.piezaDental.nombre}`
                        : 'Ninguna'}
                    </td>
                    <td className="py-2.5 px-4">{t.diagnostico}</td>
                    <td className="py-2.5 px-4">${t.costo}</td>
                    <td className="py-2.5 px-4 text-center space-x-2">
                      <Link
                        href={`/tratamientos/${t.id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/tratamientos/${t.id}/editar`}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => t.id && handleEliminar(t.id)}
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
                    colSpan={6}
                  >
                    No hay tratamientos registrados
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
