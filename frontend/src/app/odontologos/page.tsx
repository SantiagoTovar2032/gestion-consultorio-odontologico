'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { OdontologoService } from '@/services/odontologo.service';
import { Odontologo } from '@/interfaces/odontologo.interface';

export default function OdontologosPage() {
  const [odontologos, setOdontologos] = useState<Odontologo[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await OdontologoService.getAll();
        setOdontologos(data);
      } catch (err) {
        console.error('Error cargando odontólogos', err);
      }
    };
    cargar();
  }, []);

  const filtrados = odontologos.filter((o) => {
    const term = busqueda.toLowerCase();
    return (
      o.nombre.toLowerCase().includes(term) ||
      o.apellido.toLowerCase().includes(term) ||
      o.cedula.toLowerCase().includes(term)
    );
  });

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este odontólogo?')) return;
    try {
      await OdontologoService.delete(id);
      setOdontologos((prev) => prev.filter((o) => o.id !== id));
      alert('Odontólogo eliminado correctamente');
    } catch (err: any) {
      console.error('Error eliminando odontólogo', err);
      const msg = err?.response?.data?.message || 'No se pudo eliminar el odontólogo';
      alert(msg);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Odontólogos</h1>
            <p className="text-sm text-gray-600">
              Administra tu equipo de profesionales y sus especialidades.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o cédula..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
            />
            <Link
              href="/odontologos/nuevo"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
            >
              Nuevo Odontólogo
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Cédula</th>
                <th className="py-3 px-4 text-left">Teléfono</th>
                <th className="py-3 px-4 text-left">Especialidad</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length > 0 ? (
                filtrados.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-2.5 px-4">
                      Dr/a. {o.nombre} {o.apellido}
                    </td>
                    <td className="py-2.5 px-4">{o.cedula}</td>
                    <td className="py-2.5 px-4">{o.telefono}</td>
                    <td className="py-2.5 px-4">
                      {(o as any).especialidad?.nombre || '—'}
                    </td>
                    <td className="py-2.5 px-4 text-center space-x-2">
                      <Link
                        href={`/odontologos/${o.id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/odontologos/${o.id}/editar`}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => o.id && handleEliminar(o.id)}
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
                    No hay odontólogos registrados
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
