import { useState, useEffect } from 'react';
import { FiUpload, FiKey, FiLock } from 'react-icons/fi';
import clienteAxios from '../config/clienteAxios';

const CambiarPassword = ({handleCloseModal}) => {
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

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
    // Simulación de lógica de cambio de contraseña (debes conectar con tu API aquí)
    try {
      const { data } = await clienteAxios.post("/account/cambiar-password", {
        passwordActual,
        passwordNueva
      })
      setMensaje(data);
      console.log(data);
    } catch(error)
    {
      console.log(error.response.data.$values[0].description);
      setMensaje(error.response.data.$values[0].description)
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
              type='password'
              value={passwordActual}
              placeholder='Contraseña actual'
              onChange={(e) => setPasswordActual(e.target.value)}
              className='w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
      
          {/* Nueva contraseña */}
          <div className='mb-3 relative'>  
            <FiKey className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id='password-nueva'
              type='password'
              value={passwordNueva}
              placeholder='Nueva contraseña'
              onChange={(e) => setPasswordNueva(e.target.value)}
              className='w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>

          {/* Repetir nueva contraseña */}
          <div className='mb-3 relative'>
            <FiKey className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id='repetir-password'
              type='password'
              value={repetirPassword}
              placeholder='Repetir contraseña'
              onChange={(e) => setRepetirPassword(e.target.value)}
              className='w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
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
            <p className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
              {mensaje}
            </p>
          )}
        </form>
      </div>
      
    </div>
  );
};

export default CambiarPassword;
