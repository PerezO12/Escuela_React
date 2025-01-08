import PropTypes from 'prop-types';
import { useState} from 'react'

import CrearEditarUsuario from './CrearEditarUsuario';
import ListaColumnasElementos from '../../../common/ListaColumnasElementos';

const Usuarios = ({ usuario, editarUsuario }) => {
  const { nombreCompleto, userName, email, roles } = usuario;
  const [ mostrarEditar, setMostrarEditar ] = useState(false);
  const rol = roles?.$values;

  const handleCloseModal = () => {
    setMostrarEditar(false);
  };
  return (
    <div>
      {mostrarEditar && (
        <CrearEditarUsuario 
          handleCloseModal={handleCloseModal} 
          crearEditarUsuario={editarUsuario} 
          usuario={usuario}
        />
      )}
      <ListaColumnasElementos 
          handleFuncionEjecutar={()=> setMostrarEditar(true)} 
          elementos={[nombreCompleto, userName, email, rol]}
        />
    </div>
  )
}
Usuarios.propTypes = {
  usuario: PropTypes.shape({
    nombreCompleto: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    roles: PropTypes.object,
  }).isRequired,
  editarUsuario: PropTypes.func.isRequired,
};
export default Usuarios