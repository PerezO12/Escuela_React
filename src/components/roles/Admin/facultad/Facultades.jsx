import { useState} from 'react'
import PropTypes from 'prop-types';

import convertirFechas from '../../../../utils/convertirFechas';
import CrearEditarFacultad from './CrearEditarFacultad';
import ListaColumnasElementos from '../../../common/ListaColumnasElementos';

const Facultades = ({ facultad, editarFacultad }) => {
  const {nombre, fechaCreacion } = facultad;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);
  const handleCloseModal = () => {
    setMostrarEditar(false);
  };

  return (
    <div>
      {mostrarEditar && (
        <CrearEditarFacultad 
          handleCloseModal={handleCloseModal} 
          crearEditarFacultad={editarFacultad} 
          facultad={facultad}
        />
      )}
        <ListaColumnasElementos 
          handleFuncionEjecutar={()=> setMostrarEditar(true)} 
          elementos={[nombre, convertirFechas(fechaCreacion)]}
        />

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