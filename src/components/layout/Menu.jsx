import { useState } from 'react';
import CambiarPassword from '../common/CambiarPassword';
import GestionarLlaves from '../roles/Encargado/GestionarLlaves';
import MenuButton from '../common/MenuButton';
import PropTypes from 'prop-types';

const Menu = ({
  rol = "",
  mostrarOcultarMenu
}) => {
    
    const [ cambiarPassword, setCambiarPassword ] = useState(false);
    const [ gestionLlaves, setGestionLlaves ] = useState(false);


    const handleCambiarPassword = () => {
        setCambiarPassword(true);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    const handleGestionarLlaves = () => {
        setGestionLlaves(!gestionLlaves);
        mostrarOcultarMenu(false)
    }
    const handleCloseModal = () => {
        setCambiarPassword(false);
        mostrarOcultarMenu(false)
    }
    return (
      <>
        <div className=" absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
            
            {/* Cambiar password */}
            <MenuButton onClick={handleCambiarPassword}>Cambiar contraseña </MenuButton>

            {/* Opciones para los encargados */}
            {rol == "encargado" &&
            (
              <MenuButton onClick={handleGestionarLlaves}>Gestionar Llaves</MenuButton>
            )}

            {/* Opcioens para los estudiantes */}
            {/* no hay de moment */}
            
            {/* Cerrar sesion */}
            <MenuButton onClick={handleLogout}>Cerrar sesión</MenuButton>
        </div>
        
         {cambiarPassword && <CambiarPassword handleCloseModal={handleCloseModal} />} 
         {gestionLlaves && <GestionarLlaves />}
      </>
      )
    }

Menu.propTypes = {
  rol: PropTypes.string.isRequired,
  mostrarOcultarMenu: PropTypes.func.isRequired,
};
export default Menu

