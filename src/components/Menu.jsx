import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CambiarPassword from "../components/CambiarPassword";
import GestionarLlaves from './GestionarLlave';

const Menu = () => {
    
    const [ cambiarPassword, setCambiarPassword ] = useState(false);
    const [ gestionLlaves, setGestionLlaves ] = useState(false);
    const [ mostrarMenu , setMostrarMenu ] = useState(true);

    const { auth } = useAuth();
    const rol = auth.rol
    const navigate = useNavigate();

    const handleCambiarPassword = () => {
        setCambiarPassword(true);
        setMostrarMenu(false);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    const handleGestionarLlaves = () => {
        setGestionLlaves(!gestionLlaves);
        setMostrarMenu(false);
    }
    const handleCloseModal = () => {
        setCambiarPassword(setCambiarPassword(false));
    }
    return (
        <>
            
            {mostrarMenu&&(
            <div className=" absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                <button
                    onClick={handleCambiarPassword}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                Cambiar contraseña
                </button>
                {rol == "encargado" &&
                (
                    <button
                        onClick={handleGestionarLlaves}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                    Gestionar Llaves
                    </button>
                )}
                <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                Cerrar sesión
                </button>
            </div>
            )}
        
         {cambiarPassword && <CambiarPassword handleCloseModal={handleCloseModal} />} 
         {gestionLlaves && <GestionarLlaves />}
      </>
      )
    }
    
export default Menu