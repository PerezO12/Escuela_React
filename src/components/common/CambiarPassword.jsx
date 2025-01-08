import { useState, useEffect } from 'react';
import { FiKey, FiLock } from 'react-icons/fi';
import Mensaje from './Mensaje';
import PasswordChange from '../FormInput/PasswordChange';
import { cambiarPassword } from '../../api/auth';
import { errorMapper } from '../../utils/errorMapper';
import PropTypes from 'prop-types';

const CambiarPassword = ({handleCloseModal}) => {

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
    try {
      await cambiarPassword(passwordActual, passwordNueva)
      setMensaje("La contraseña fue cambiada exitosamente.");
      setTimeout(() => {
        setMensaje("");
        handleCloseModal();
      }, 600);
    } catch(error){
      setMensaje(errorMapper(error)?.values);
    }
  };
  
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50'>
      <div
        className='bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative'
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 text-3xl"
        >
          &times;
        </button>

        <h2 className='text-4xl font-extrabold text-center text-gray-800 mb-8'>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          {/* Contraseña actual */}
          <PasswordChange
            value={passwordActual}
            Componente={FiLock}
            onChange={(e) => setPasswordActual(e.target.value)}
            placeholder='Repetir contraseña'
          />
          {/* Nueva contraseña */}
          <PasswordChange
            value={passwordNueva}
            Componente={FiKey}
            onChange={(e) => setPasswordNueva(e.target.value)}
            placeholder="Nueva contraseña"
          />
          {/* Repetir nueva contraseña */}
          <PasswordChange
            value={repetirPassword}
            Componente={FiKey}
            onChange={(e) => setRepetirPassword(e.target.value)}
            placeholder='Repetir contraseña'
          />
          {/* Botón de enviar */}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300'
          >
            Cambiar Contraseña
          </button>

          {/* Mensaje de error o éxito */}
          {mensaje && <Mensaje msg={mensaje}/>}
        </form>
      </div>
      
    </div>
  );
};

CambiarPassword.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};
export default CambiarPassword;
