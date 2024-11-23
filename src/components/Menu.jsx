import { useState } from 'react';
import CambiarPassword from "../components/CambiarPassword";
import useAuth from '../hooks/useAuth';

const Menu = () => {
    
    const [ cambiarPassword, setCambiarPassword ] = useState(false);
    const { auth } = useAuth();
    const rol = auth.rol

    const handleCambiarPassword = () => {
        setCambiarPassword(true);
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    const handleGenerarLlavePublica = () => {
        console.log("generar llave publica")
    }
    const handleCambiarLlavePublica = () => {
        console.log("Cambiando llave publica")
    }
    return (
        <>
            
            <div className=" absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
            <button
                onClick={handleCambiarPassword}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
            Cambiar contraseña
            </button>
            {rol == "encargado" &&
            (
                <div className=''>
                    <button
                        onClick={handleCambiarLlavePublica}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                    Cambiar Llave Publica
                    </button>

                    <button
                        onClick={handleGenerarLlavePublica}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                    Generar LLave Publica
                    </button>
                </div>
            )}
            <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
            Cerrar sesión
            </button>
        </div>
        
         {cambiarPassword && <CambiarPassword />} 
      </>
      )
    }
    
export default Menu