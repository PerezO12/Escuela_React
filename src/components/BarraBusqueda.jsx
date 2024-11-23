import { FaSearch } from 'react-icons/fa';
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react';
import useQuery from '../hooks/useQuery';

const BarraBusqueda = ( ) => {

  const [ busqueda, setBusqueda ] = useState('');
  const [ buscarPor, setBuscarPor ] = useState('encargado')
  const {setQuery} = useQuery();
  const handleBuscar = () => {
    const query = `?${buscarPor}=${busqueda}`;
    console.log("Desde la barra: ", query)
    setQuery(query);
  } 

  return (
    <div className="flex items-stretch w-full lg:max-w-3xl max-w-md mx-auto rounded-full overflow-hidden">
      {/* Selector de tipo de búsqueda */}
      <select 
        className="p-2 lg:w-28 w-12 bg-gray-100 border-none focus:outline-none focus:ring-2 hover:ring-zinc-400 transition duration-200 shadow-md text-gray-900 cursor-pointer rounded-l-full "
        value={buscarPor}
        onChange={e => setBuscarPor(e.target.value)}
      >
        <option  value="encargado">Encargado</option>
        <option value="departamento">Departamento</option>
      </select>

{/* Campo de búsqueda con contenedor relativo */}
<div className="relative flex-1">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-3 bg-gray-50 border-none focus:outline-none  hover:ring-zinc-400 transition duration-200 shadow-md text-gray-900 pr-10"  // Añadir padding derecho
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleBuscar();
            }
          }}
        />
        {busqueda !== '' && (
          <AiOutlineClose
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 text-2xl hover:text-zinc-700 cursor-pointer"
            onClick={() => setBusqueda('')}
          />
        )}
      </div>

      {/* Botón de buscar */}
      <button 
        className="p-3 bg-gray-100 border-none focus:outline-none focus:ring-2 hover:ring-zinc-400 transition duration-200 shadow-md cursor-pointer rounded-r-full"
        onClick={handleBuscar}
      >
        <FaSearch className="text-zinc-500 text-xl hover:text-zinc-700" />
      </button>


    </div>
  );
};

export default BarraBusqueda;