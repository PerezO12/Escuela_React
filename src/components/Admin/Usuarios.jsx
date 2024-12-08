import { useState, useEffect} from 'react'

import CrearEditarFacultad from './CrearEditarFacultad';
import CrearEditarUsuario from './CrearEditarUsuario';

const Usuarios = ({ usuario, editarUsuario, mensaje }) => {
  const { id, nombreCompleto, nombreUsuario, email, roles } = usuario;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);
  const rol = roles.$values;

  const handleCloseModal = () => {
    setMostrarEditar(false);
  };
  //TODO: mostrar editar usuario
  return (
    <div>
      {mostrarEditar && (
        <CrearEditarUsuario 
          handleCloseModal={handleCloseModal} 
          crearEditarUsuario={editarUsuario} 
          editar={true}
          rolActual={rol}
          idUsuario={id}
          mensaje={mensaje}
          setMostrarEditar={setMostrarEditar}
          />
      )}
        <div 
            className="relative px-3 py-2 bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer5"
            onClick={e => setMostrarEditar(true)}
        >
          <div 
            className="grid grid-cols-4 lg:gap-24 gap-5 hover:cursor-pointer "  
          >
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreCompleto}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors truncate">{nombreUsuario}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors truncate">{email}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{rol}</p>
          </div>
      </div>

    </div>
  )
}
export default Usuarios