import { useState} from 'react'
import PropTypes from 'prop-types';

import formatearFecha from '../helpers/convertirFechas';
import CrearEditarFacultad from './Admin/CrearEditarFacultad';

const Facultades = ({ facultad, editarFacultad }) => {
  const { id, nombre, fechaCreacion } = facultad;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);
  const handleCloseModal = () => {
    setMostrarEditar(false);
  };
  const handleOpenModal = () => {
    setMostrarEditar(true);
  };

  return (
    <div>
      {mostrarEditar && (
        <CrearEditarFacultad 
          handleCloseModal={handleCloseModal} 
          crearEditarFacultad={editarFacultad} 
          editar={true}
          id = {id}
          nombre = {nombre}
        />
      )}
        <div 
            className="relative px-3 py-2 bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer5"
            onClick={handleOpenModal}
        >
          <div 
            className="grid grid-cols-2 lg:gap-96 hover:cursor-pointer "  
          >
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombre}</p>
              <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{formatearFecha(fechaCreacion)}</p>
          </div>
      </div>

    </div>
  )
}

Facultades.propTypes = {
  editarFacultad: PropTypes.func.isRequired,
  facultad: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    fechaCreacion: PropTypes.string.isRequired,
  }).isRequired,
}

export default Facultades