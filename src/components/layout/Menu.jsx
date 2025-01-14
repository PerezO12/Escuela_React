import { useState } from 'react';
import CambiarPassword from '../common/CambiarPassword';
import GestionarLlaves from '../roles/Encargado/GestionarLlaves';
import MenuButton from '../common/MenuButton';
import PropTypes from 'prop-types';
import { cerrarSesion } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const Menu = ({
  rol = "",
  mostrarOcultarMenu
}) => {
    const [ cambiarPassword, setCambiarPassword ] = useState(false);
    const [ gestionLlaves, setGestionLlaves ] = useState(false);
    const navigate = useNavigate();
    const handleCambiarPassword = () => {
        setCambiarPassword(true);
    }
    const handleAgregar2FA = () => {
        //cambiar a otra pagina
        navigate("/ajustes/config2fa");

    }

    const handleLogout = async () => {
      try{
        await cerrarSesion();
        localStorage.removeItem('token');
        window.location.href = '/';
      } catch(error) {
        console.error(error);
      }
    };
    const handleGestionarLlaves = () => {
        setGestionLlaves(!gestionLlaves);
        //mostrarOcultarMenu(false)
    }
    const handleCloseModal = () => {
        setCambiarPassword(false);
        mostrarOcultarMenu(false)
    }
    return (
      <>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
            
            {/* Cambiar password */}
            <MenuButton onClick={handleCambiarPassword}>Cambiar contraseña </MenuButton>
            {/* Agregar 2FA */}
            <MenuButton onClick={handleAgregar2FA}>Autenticación de dos factores</MenuButton>

            {/* Opciones para los encargados */}
            {rol.toLowerCase() == "encargado" &&
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

