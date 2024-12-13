import { useState, useEffect } from 'react';
import { FiKey, FiLock } from 'react-icons/fi';
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import clienteAxios from '../../config/clienteAxios';

const CambiarPassword = ({handleCloseModal}) => {
  const [ mostrarPassword, setMostrarPassword ] = useState(false);
  const [ mostrarNuevaPassword, setMostrarNuevaPassword ] = useState(false);
  const [ mostrarRepetirPassword, setMostrarRepetirPassword ] = useState(false);


  const [ passwordActual, setPasswordActual ] = useState('');
  const [ passwordNueva, setPasswordNueva ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');
  const [ mensaje, setMensaje ] = useState('');

  useEffect(() => {
    if (passwordNueva && repetirPassword && passwordNueva !== repetirPassword) {
      setMensaje('Las contraseñas nuevas no coinciden.');
    } else {
      setMensaje('');
    }
  }, [passwordNueva, repetirPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordNueva !== repetirPassword) {
      setMensaje('Las contraseñas nuevas no coinciden.');
      return;
    }
    if(passwordNueva == passwordActual)
    {
      setMensaje('La contraseña antigua y la nueva son iguales.');
      return;
    }
    // Simulación de lógica de cambio de contraseña (debes conectar con tu API aquí)
    try {
      const { data } = await clienteAxios.post("/account/cambiar-password", {
        passwordActual,
        passwordNueva
      })
      setMensaje("La contraseña fue cambiada exitosamente.");
      setTimeout(() => {
        setMensaje("");
        handleCloseModal();
      }, 2000);
    } catch(error)
    {
      const errores = error.response.data.msg?.$values[0]?.code
      if(errores?.includes("PasswordMismatch"))
      {
        setMensaje("Contraseña incorrecta");
      }
      else if(errores?.includes("PasswordTooShort"))
      {
        setMensaje("La contraseña es muy corta")
      }
      else if(errores?.includes("PasswordRequires"))
      {
        setMensaje("La contraseña debe tener al menos un carácter no alfanumérico (por ejemplo, @, #, $, etc.), al menos un dígito (0-9) y al menos una letra mayúscula (A-Z)")
      }
      else{
        console.log("Errores: ", errores);
        console.log(error.response.data)
        setMensaje("Ocurrió un error")

      }
    }
  };
  
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'>
      <div
        className='bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative'
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 text-2xl"
        >
          &times;
        </button>

        <h2 className='text-4xl font-extrabold text-center text-gray-800 mb-8'>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          {/* Contraseña actual */}
          <div className='mb-3 relative'>
{/*             <label htmlFor='password-nueva' className='block font-medium text-gray-700 mb-1'>
              Contraseña
            </label> */}
            <FiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id='password-actual'
              type={`${mostrarPassword ?"text" : "password"}`}
              value={passwordActual}
              placeholder='Contraseña actual'
              onChange={(e) => setPasswordActual(e.target.value)}
              className='w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            {mostrarPassword 
              ? (<LiaEyeSolid
              className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                onClick={e => setMostrarPassword(false)}
              />) 
              : (<LiaEyeSlashSolid
                  className="absolute top-1/2 text-xl right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                  onClick={e => setMostrarPassword(true)}
              />)}
          </div>
      
          {/* Nueva contraseña */}
          <div className='mb-3 relative'>  
            <FiKey className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id='password-nueva'
              type={`${mostrarNuevaPassword ?"text" : "password"}`}
              value={passwordNueva}
              placeholder='Nueva contraseña'
              onChange={(e) => setPasswordNueva(e.target.value)}
              className='w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            {mostrarNuevaPassword 
              ? (<LiaEyeSolid
              className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                onClick={e => setMostrarNuevaPassword(false)}
              />) 
              : (<LiaEyeSlashSolid
                  className="absolute top-1/2 text-xl right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                  onClick={e => setMostrarNuevaPassword(true)}
              />)}
          </div>

          {/* Repetir nueva contraseña */}
          <div className='mb-3 relative'>
            <FiKey className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id='repetir-password'
              type={`${mostrarRepetirPassword ?"text" : "password"}`}
              value={repetirPassword}
              placeholder='Repetir contraseña'
              onChange={(e) => setRepetirPassword(e.target.value)}
              className='w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
            {mostrarRepetirPassword 
              ? (<LiaEyeSolid
              className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                onClick={e => setMostrarRepetirPassword(false)}
              />) 
              : (<LiaEyeSlashSolid
                  className="absolute top-1/2 text-xl right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                  onClick={e => setMostrarRepetirPassword(true)}
              />)}
          </div>

          {/* Botón de enviar */}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Cambiar Contraseña
          </button>

          {/* Mensaje de error o éxito */}
          {mensaje && (
            <p className={`mt-4 text-center text-sm ${mensaje?.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
      
    </div>
  );
};

export default CambiarPassword;
