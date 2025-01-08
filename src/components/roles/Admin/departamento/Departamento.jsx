import PropTypes from 'prop-types';
import { useState } from 'react';

import convertirFechas from '../../../../utils/convertirFechas';
import CrearEditarDepartamento from './CrearEditarDepartamento';
import ListaColumnasElementos from '../../../common/ListaColumnasElementos';

const Departamento = ({ departamento, editarDepartamento }) => {
  const { nombre, fechaCreacion, facultad, encargadoNombre } = departamento;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);
  const handleCloseModal = () => {
    setMostrarEditar(false);
  };
  

  return (
    <div>
      {mostrarEditar && (
        <CrearEditarDepartamento 
          handleCloseModal={handleCloseModal} 
          crearEditarDepartamento={editarDepartamento} 
          departamento={departamento}
        />
      )}
      <ListaColumnasElementos 
        handleFuncionEjecutar={()=> setMostrarEditar(true)} 
        elementos={[nombre, encargadoNombre, facultad, convertirFechas(fechaCreacion)]}
      />
    </div>
  );
}

Departamento.propTypes = {
  editarDepartamento: PropTypes.func.isRequired, 
  departamento: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
    nombre: PropTypes.string.isRequired,
    fechaCreacion: PropTypes.string.isRequired, 
    facultad: PropTypes.string.isRequired, 
    encargadoNombre: PropTypes.string.isRequired,
  }).isRequired,
};

export default Departamento;
