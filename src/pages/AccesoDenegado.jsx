import { useNavigate } from "react-router-dom";
import gifAccesoDenegado from "../asset/Acceso-denegado-gif.webp";

const AccesoDenegado = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center bg-gray-200 px-4">
      <div className="max-w-lg w-full text-center">
        <img 
          src={gifAccesoDenegado} 
          alt="Acceso Denegado" 
          className="w-full max-h-72 object-contain mb-6"
        />
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Acceso Denegado
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Lo sentimos, no tienes permiso para acceder a esta página. Por favor, verifica tus credenciales o contacta al administrador.
        </p>
        
        {/* Botón para redirigir */}
        <button 
          onClick={() => navigate("/")} 
          className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default AccesoDenegado;
