import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Consultorio Dental
        </Link>
        <div className="space-x-4">
          <Link href="/pacientes" className="text-gray-800 hover:text-blue-600">
            Pacientes
          </Link>
          <Link href="/odontologos" className="text-gray-800 hover:text-blue-600">
            Odontólogos
          </Link>
          <Link href="/citas" className="text-gray-800 hover:text-blue-600">
            Citas
          </Link>
          <Link href="/tratamientos" className="text-gray-800 hover:text-blue-600">
            Tratamientos
          </Link>
        </div>
      </div>
    </nav>
  );
}
