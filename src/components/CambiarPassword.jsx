import { useState, useEffect } from 'react';

import clienteAxios from '../config/clienteAxios';

const CambiarPassword = () => {
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
    <div className='absolute right-0 top-0 mt-12 w-80 min-w-min bg-white rounded-lg shadow-lg py-4 px-5 z-10'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        {/* Contraseña actual */}
        <div className='mb-3'>
          <label htmlFor='password-actual' className='block text-lg font-medium text-gray-700 mb-1'>
            Contraseña actual
          </label>
          <input
            id='password-actual'
            type='password'
            value={passwordActual}
            onChange={(e) => setPasswordActual(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        {/* Nueva contraseña */}
        <div className='mb-3'>
          <label htmlFor='password-nueva' className='block text-lg font-medium text-gray-700 mb-1'>
            Nueva contraseña
          </label>
          <input
            id='password-nueva'
            type='password'
            value={passwordNueva}
            onChange={(e) => setPasswordNueva(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>

        {/* Repetir nueva contraseña */}
        <div className='mb-3'>
          <label htmlFor='repetir-password' className='block text-lg font-medium text-gray-700 mb-1'>
            Repetir contraseña
          </label>
          <input
            id='repetir-password'
            type='password'
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
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
  );
};

export default CambiarPassword;
