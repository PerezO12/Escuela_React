import React from 'react';

const Header = () => {
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'
  }

  return (
    <header className="px-6 py-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 text-white shadow-lg">
      <div className="md:flex md:justify-between items-center">
        
        <h2 className="text-4xl font-extrabold tracking-wide text-blue-700 text-center md:text-left">
          Andar<span className='text-black'>UCI</span>
        </h2>

        <input 
          type="search" 
          placeholder="Buscar Formulario"
          className="rounded-full lg:w-96 w-full max-w-md mt-3 md:mt-0 p-3 bg-gray-100
           border-none focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 
           transition duration-200 transform hover:scale-105 shadow-md text-gray-900"
        />

        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm bg-sky-600 p-3 rounded-full
            uppercase font-bold tracking-wider shadow-lg 
            hover:scale-110 hover:shadow-xl hover:bg-red-700 
            transition-all duration-300"
          >
            Cerrar Sesión
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;
