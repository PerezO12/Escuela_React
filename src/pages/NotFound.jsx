import { FaExclamationTriangle } from 'react-icons/fa';
import notFoundGif from "../asset/notFoundGif.webp";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800">
      
      <FaExclamationTriangle className="text-7xl text-red-600 mb-6 drop-shadow-lg" />

      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-xl font-medium mb-6 text-center px-4">
        ¡Oops! La página que buscas no existe o ha sido eliminada.
      </p>

      <img
        src={notFoundGif}
        alt="No encontrado"
        className="w-[300px] h-[300px] mb-6 rounded-lg shadow-lg"
      />

      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white text-base font-bold rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
      >
        Volver al inicio
      </a>
    </div>
  );
};

export default NotFound;
