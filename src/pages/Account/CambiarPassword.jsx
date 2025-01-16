import { useState, useEffect } from 'react';
import { FiKey, FiLock } from 'react-icons/fi';
import Mensaje from '../../components/common/Mensaje';
import PasswordChange from '../../components/FormInput/PasswordChange';
import { cambiarPassword } from '../../api/auth';
import { errorMapper } from '../../utils/errorMapper';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const CambiarPassword = () => {
    const [passwordActual, setPasswordActual] = useState('');
    const [passwordNueva, setPasswordNueva] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

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
        if (passwordNueva === passwordActual) {
        setMensaje('La contraseña antigua y la nueva son iguales.');
        return;
        }
        try {
        await cambiarPassword(passwordActual, passwordNueva);
        setMensaje('La contraseña fue cambiada exitosamente.');
        setTimeout(() => {
            setMensaje('');
            setAuth({ ...auth, mustChangePassword: false });
            navigate("/");
        }, 600);
        } catch (error) {
        setMensaje(errorMapper(error)?.values || 'Ocurrió un error.');
        }
    };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-50 shadow-2xl rounded-3xl p-10 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Cambiar Contraseña
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Contraseña actual */}
          <PasswordChange
            value={passwordActual}
            Componente={FiLock}
            onChange={(e) => setPasswordActual(e.target.value)}
            placeholder="Contraseña actual"
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
            placeholder="Repetir nueva contraseña"
          />
          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Cambiar Contraseña
          </button>
          {/* Mensaje de error o éxito */}
          {mensaje && <Mensaje msg={mensaje} />}
        </form>
      </div>
    </div>
  );
};

export default CambiarPassword;
