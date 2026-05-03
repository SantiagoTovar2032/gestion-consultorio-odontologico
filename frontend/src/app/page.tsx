import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
          {/* Hero */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
            <div>
              <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
                Consultorio Dental
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                Sistema de Gestión Odontológica
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-6">
                Administra pacientes, odontólogos, citas y tratamientos desde una sola
                plataforma, con una vista clara del historial odontológico de cada paciente.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/pacientes"
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  Ir a Pacientes
                </Link>
                <Link
                  href="/citas/nuevo"
                  className="inline-flex items-center px-5 py-2.5 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition"
                >
                  Programar nueva cita
                </Link>
              </div>
            </div>

            {/* Panel de resumen */}
            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Resumen del Consultorio
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-blue-600 uppercase mb-1">
                    Pacientes
                  </p>
                  <p className="text-2xl font-bold text-blue-800">Gestión</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Registra y consulta datos clínicos y antecedentes.
                  </p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-emerald-600 uppercase mb-1">
                    Odontólogos
                  </p>
                  <p className="text-2xl font-bold text-emerald-800">Equipo</p>
                  <p className="text-xs text-emerald-700 mt-1">
                    Administra especialistas y sus horarios.
                  </p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-purple-600 uppercase mb-1">
                    Citas
                  </p>
                  <p className="text-2xl font-bold text-purple-800">Agenda</p>
                  <p className="text-xs text-purple-700 mt-1">
                    Organiza la agenda por día y profesional.
                  </p>
                </div>
                <div className="bg-rose-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-rose-600 uppercase mb-1">
                    Tratamientos
                  </p>
                  <p className="text-2xl font-bold text-rose-800">Historial</p>
                  <p className="text-xs text-rose-700 mt-1">
                    Registra procedimientos, piezas y costos.
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Usa el menú superior o los accesos rápidos para navegar por cada módulo.
              </p>
            </div>
          </div>

          {/* Tarjetas de módulos */}
          <section>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Módulos principales
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Accede rápidamente a la sección que necesitas trabajar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Pacientes */}
              <Link
                href="/pacientes"
                className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-5 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800">
                    Pacientes
                  </h3>
                  <p className="text-sm text-gray-600">
                    Registra datos personales, antecedentes médicos y alergias.
                  </p>
                </div>
                <span className="mt-3 text-xs font-medium text-blue-600 group-hover:text-blue-800">
                  Ver listado →
                </span>
              </Link>

              {/* Odontólogos */}
              <Link
                href="/odontologos"
                className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-5 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2 group-hover:text-emerald-800">
                    Odontólogos
                  </h3>
                  <p className="text-sm text-gray-600">
                    Gestiona especialidades, horarios y contacto de tu equipo.
                  </p>
                </div>
                <span className="mt-3 text-xs font-medium text-emerald-600 group-hover:text-emerald-800">
                  Ver profesionales →
                </span>
              </Link>

              {/* Citas */}
              <Link
                href="/citas"
                className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-5 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-purple-700 mb-2 group-hover:text-purple-800">
                    Citas
                  </h3>
                  <p className="text-sm text-gray-600">
                    Programa, reprograma y cancela citas según la disponibilidad.
                  </p>
                </div>
                <span className="mt-3 text-xs font-medium text-purple-600 group-hover:text-purple-800">
                  Ver agenda →
                </span>
              </Link>

              {/* Tratamientos */}
              <Link
                href="/tratamientos"
                className="group bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-100 p-5 transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-rose-700 mb-2 group-hover:text-rose-800">
                    Tratamientos
                  </h3>
                  <p className="text-sm text-gray-600">
                    Controla diagnósticos, procedimientos, piezas dentales y costos.
                  </p>
                </div>
                <span className="mt-3 text-xs font-medium text-rose-600 group-hover:text-rose-800">
                  Ver tratamientos →
                </span>
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
