import { useState, useEffect} from 'react'
import formatearFecha from '../helpers/convertirFechas';

import clienteAxios from '../config/clienteAxios';
import CrearEditarFacultad from './CrearEditarFacultad';

const Facultades = ({facultad, EditarFacultad, mensaje}) => {
  const { id, nombre, fechaCreacion } = facultad;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);

  const handleCloseModal = () => {
    setMostrarEditar(false);
  };

  return (
    <>
      {mostrarEditar && (
        <CrearEditarFacultad 
          handleCloseModal={handleCloseModal} 
          crearEditarFacultad={EditarFacultad} 
          editar={true}
          id = {id}
          nombre = {nombre}
          mensaje={mensaje}
          setMostrarEditar={setMostrarEditar}
          />
      )}
        <div 
            className="relative px-3 py-2 bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer5"
            onClick={e => setMostrarEditar(true)}
        >
          <div 
            className="grid grid-cols-2 lg:gap-96 hover:cursor-pointer"  
          >
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombre}</p>
              <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{formatearFecha(fechaCreacion)}</p>
          </div>
      </div>

    </>
  )
}

export default Facultades