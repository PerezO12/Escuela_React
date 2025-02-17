import PropTypes from 'prop-types';
import { useState } from 'react'
import { FiAlertTriangle, FiLock } from 'react-icons/fi';
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

import Mensaje from './Mensaje';


const ConfirmarAccionPassword = ({ 
    funcionEjecutar, 
    handleCloseModal, 
    mensaje, 
    mensajeError = "", 
    accion="Eliminar", 
    alerta="", 
    requiredPassword=true 
}) => {
    const [ password , setPassword ] = useState("");
    const [ mostrarPassword, setMostrarPassword ] = useState(false);
    const [ mostrarAdvertencia, setMostrarAdvertencia ] = useState(true);
    let color = (accion=="Eliminar")?("bg-red-600 hover:bg-red-700"): ("bg-blue-600 hover:bg-blue-700");
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 '>
        <div className='mx-2 bg-white shadow-2xl rounded-3xl lg:px-10 px-7 py-10 w-full max-w-lg relative max-h-[90vh] overflow-y-auto'>
            <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-600 00 hover:text-red-600 transition duration-300 text-3xl"
            >
                &times;
            </button>
            
            <h2 className=' lg:text-3xl md:text-3xl sm:text-3xl  text-xl font-extrabold text-center text-gray-900 lg:mb-8 mb-5'>
                {mensaje}
            </h2>
            {requiredPassword &&
            (    <div className='relative'>
                    <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        id="password"
                        type={`${mostrarPassword ?"text" : "password"}`}
                        placeholder="Contraseña"
                        className="w-full px-8 py-3 border  border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {mostrarPassword 
                    ? (<LiaEyeSolid
                    className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-black hover:scale-110 transition duration-300"
                        onClick={() => setMostrarPassword(false)}
                    />) 
                    : (<LiaEyeSlashSolid
                        className="absolute top-1/2 text-xl right-4 transform -translate-y-1/2 text-gray-500  cursor-pointer hover:text-black hover:scale-110 transition duration-300"
                        onClick={() => setMostrarPassword(true)}
                    />)}

                </div>
            )}
            <div className='relative flex justify-between items-center space-x-4 px-2'>
                <button
                    className={`mt-8 lg:w-32 w-24 flex items-center justify-center text-white font-semibold py-3 px-5 rounded-full 
                                ${(password.length < 7 && requiredPassword) ? "bg-gray-300" : color+" shadow-lg transition duration-300 transform hover:scale-105 capitalize"}`}
                    disabled={password.length < 7 && requiredPassword}
                    onClick={() => funcionEjecutar(password || "")}
                >
                    {accion}
                </button>
                <button
                    className='mt-8 lg:w-32 w-24 flex items-center justify-center bg-blue-700 hover:bg-blue-800
                        text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 border-collapse
                        transform hover:scale-105'
                    onClick={handleCloseModal}
                >
                    Cancelar
                </button>
            </div>
            <Mensaje msg={mensajeError}/>
        {(alerta != "") && (<div>
        <FiAlertTriangle
            className="text-red-500 text-4xl mr-3 hover:cursor-pointer hover:scale-110 transition duration-300"
            onClick={() => setMostrarAdvertencia(!mostrarAdvertencia)}
            />
            {mostrarAdvertencia && (<div className="flex flex-col sm:flex-row items-start sm:items-center bg-red-100 p-4 rounded-lg border border-red-300">
                <p className="text-black lg:text-sm md:text-sm text-xs">
                <strong>Advertencia Técnica:</strong> {alerta}
                 </p>
            </div>)}
        </div>)}
        </div>
    </div>
  )
}

ConfirmarAccionPassword.propTypes = {
    funcionEjecutar: PropTypes.func.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    mensaje: PropTypes.string.isRequired,
    mensajeError: PropTypes.oneOfType([ 
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
    accion: PropTypes.string,
    alerta: PropTypes.string,
    requiredPassword: PropTypes.bool,
  };
  

  
export default ConfirmarAccionPassword