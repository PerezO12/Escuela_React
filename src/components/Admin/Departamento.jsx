import { useState, useEffect } from 'react';
import formatearFecha from '../../helpers/convertirFechas';
import clienteAxios from '../../config/clienteAxios';
import CrearEditarDepartamento from './CrearEditarDepartamento';

const Departamento = ({ departamento, EditarDepartamento, mensaje }) => {
  const { id, nombre, fechaCreacion, facultad, encargadoNombre } = departamento;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);
  const handleCloseModal = () => {
    setMostrarEditar(false);
  };

  return (
    <div>
      {mostrarEditar && (
        <CrearEditarDepartamento 
          handleCloseModal={handleCloseModal} 
          crearEditarDepartamento={EditarDepartamento} 
          editar={true}
          id={id}
          nombre={nombre}
          facultadNombre={facultad}
          mensaje={mensaje}
          setMostrarEditar={setMostrarEditar}
        />
      )}
      <div 
        className="relative px-3 py-2 bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer"
        onClick={() => setMostrarEditar(true)}
      >
        <div className="grid grid-cols-4 lg:gap-24 md:gap-8 hover:cursor-pointer">
          <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombre}</p>
          <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{encargadoNombre}</p>
          <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{facultad}</p>
          <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{formatearFecha(fechaCreacion)}</p>
        </div>
      </div>
    </div>
  );
}

export default Departamento;
