'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { PacienteService } from '@/services/paciente.service';
import { Paciente } from '@/interfaces/paciente.interface';

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await PacienteService.getAll();
        setPacientes(datos);
      } catch (err) {
        console.error('Error cargando pacientes', err);
      }
    };
    cargar();
  }, []);

  const filtrados = pacientes.filter((p) => {
    const term = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(term) ||
      p.apellido.toLowerCase().includes(term) ||
      p.cedula.toLowerCase().includes(term)
    );
  });

  const handleEliminar = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este paciente?')) return;
    try {
      await PacienteService.delete(id);
      setPacientes((prev) => prev.filter((p) => p.id !== id));
      alert('Paciente eliminado correctamente');
    } catch (err: any) {
      console.error('Error eliminando paciente', err);
      const msg = err?.response?.data?.message || 'No se pudo eliminar el paciente';
      alert(msg);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-sm text-gray-600">
              Gestiona la información clínica de tus pacientes.
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
              href="/pacientes/nuevo"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            >
              Nuevo Paciente
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
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length > 0 ? (
                filtrados.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-2.5 px-4">
                      {p.nombre} {p.apellido}
                    </td>
                    <td className="py-2.5 px-4">{p.cedula}</td>
                    <td className="py-2.5 px-4">{p.telefono}</td>
                    <td className="py-2.5 px-4">{p.email || '—'}</td>
                    <td className="py-2.5 px-4 text-center space-x-2">
                      <Link
                        href={`/pacientes/${p.id}`}
                        className="text-blue-600 hover:underline text-xs"
                      >
                        Ver
                      </Link>
                      <Link
                        href={`/pacientes/${p.id}/editar`}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => p.id && handleEliminar(p.id)}
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
                    No hay pacientes registrados
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
