import { AiOutlineWarning } from "react-icons/ai";

const QRError = () => (
  <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-md">
    <AiOutlineWarning className="text-red-600 text-6xl mb-4" size={120} />
    <p className="text-gray-700 font-medium text-center">
      No se pudo cargar el código QR. Por favor, inténtalo nuevamente más tarde.
    </p>
  </div>
);

export default QRError;
