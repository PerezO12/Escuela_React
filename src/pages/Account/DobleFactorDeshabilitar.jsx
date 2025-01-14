import { useEffect, useState } from "react";
import Mensaje from "../../components/common/Mensaje";
import { desactivar2FA } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { errorMapper } from "../../utils/errorMapper";
import useAuth from '../../hooks/useAuth';
const DobleFactorDeshabilitar = () => {
    const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const {auth, setAuth } = useAuth();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
        // Llama al endpoint de deshabilitar 2FA
        await desactivar2FA(codigo);
        setMensaje("El doble factor de autenticación se ha deshabilitado correctamente.");
        setAuth({ ...auth, twoFactorEnabled: false });
        setTimeout(() => {
            navigate("/");
        }, 600);
        } catch (error) {
        setMensaje(errorMapper(error)?.values || "Ocurrió un error inesperado.");
        }
    };
    useEffect(() => {
        if (!auth.twoFactorEnabled) {
            navigate("/");
        }
    }, [auth.twoFactorEnabled, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Deshabilitar Doble Factor de Autenticación
        </h1>
        <p className="text-base text-gray-400 text-center mb-6">
          Ingresa el código que enviamos a tu dispositivo para confirmar la desactivación.
        </p>
        <form onSubmit={manejarEnvio}>
          <div className="mb-6">
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-xl p-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Código de 6 dígitos"
              maxLength={6}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold text-lg py-3 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500"
          >
            Deshabilitar
          </button>
        </form>
        {mensaje && <Mensaje msg={mensaje} />}
      </div>
    </div>
  );
};

export default DobleFactorDeshabilitar;
