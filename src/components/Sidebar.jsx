import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { auth } = useAuth();

  return (
    <aside className="md:w-80 lg:w-86 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 shadow-xl p-8 rounded-2xl flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-10">
        <p className="text-2xl font-semibold text-gray-800 text-center capitalize">
          Hola, {auth.nombreCompleto}
        </p>
        <p className="text-sm text-gray-600 italic text-center mt-1">
          Bienvenido de nuevo
        </p>
      </div>

      <Link
        to=""
        className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600
                 text-white font-semibold py-3 px-5 mb-4 rounded-full shadow-lg transition duration-300 
                 transform hover:scale-105"
      >
        Ver Formularios
      </Link>


      <Link
        to="crear-formulario"
        className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600
                 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                 transform hover:scale-105"
      >
        Nuevo Formulario
      </Link>
    </aside>
  );
};

export default Sidebar;
