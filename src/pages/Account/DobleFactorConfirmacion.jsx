import { useState } from "react";
import Mensaje from "../../components/common/Mensaje";
import { validarCodigo } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { errorMapper } from "../../utils/errorMapper";

const DobleFactorConfirmacion = () => {
    const [codigo, setCodigo] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
        const data = await validarCodigo(codigo);
        localStorage.setItem("token", data.token);
        setMensaje("Código validado correctamente.");
        setTimeout(() => {
            navigate("/");
        },600)
        } catch (error) {
            setMensaje(errorMapper(error)?.values);
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Verificación en 2 Pasos
        </h1>
        <p className="text-base text-gray-400 text-center mb-6">
          Por favor, ingresa el código que enviamos a tu dispositivo para
          continuar.
        </p>
        <form onSubmit={manejarEnvio}>
          <div className="mb-6">
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-xl p-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Código de 6 dígitos"
              maxLength={6}
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
          >
            Confirmar
          </button>
        </form>
        {mensaje && <Mensaje msg={mensaje}/>}
      </div>
    </div>
  );
};

export default DobleFactorConfirmacion;
