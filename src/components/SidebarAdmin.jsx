
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SidebarAdmin = () => {
  const { auth } = useAuth();
  const rol = auth?.rol;
  if(rol != 'admin') return

  return (
    <aside className="lg:w-72 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 shadow-xl p-8 rounded-2xl flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-10">
            <p className="text-2xl font-semibold text-gray-800 text-center capitalize">
                Hola, {auth.nombreCompleto}
            </p>
            <p className="text-sm text-gray-600 italic text-center mt-1">
                Bienvenido de nuevo
            </p>
        </div>

        <Link
        to="carreras"
        className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                  text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                    transform hover:scale-105 mb-4"
        >
        Carreras 
        </Link>

        <Link
        to="departamentos"
        className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                  text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                    transform hover:scale-105 mb-4"
        >
        Departamentos 
        </Link>

        <Link
            to="facultades"
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                  text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                  transform hover:scale-105 mb-4"
        >
        Facultades
        </Link>

        <Link
            to="formularios"
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                  text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                  transform hover:scale-105 mb-4"
        >
        Formularios
        </Link>
        <Link
            to=""
            className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                  text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                  transform hover:scale-105 mb-4"
        >
        Usuarios
        </Link>


    </aside>
  );
};

export default SidebarAdmin;
