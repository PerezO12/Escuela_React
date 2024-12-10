import { useState } from 'react';
import { FiUpload, FiKey, FiLock } from 'react-icons/fi';
import clienteAxios from '../../config/clienteAxios';
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { FiAlertTriangle } from "react-icons/fi";

const GenerarNuevoParLlaves = ({ closeModal }) => {
  const [ mostrarAdvertencia, setMostrarAdvertencia ] = useState(true);
  const [ mostrarPassword, setMostrarPassword ] = useState(false);
  const [ password, setPassword ] = useState('')
  const [mensaje, setMensaje] = useState('');


  const handleGenerarLlaves = async (e) => {
    e.preventDefault();
    try {
      const { data } = await clienteAxios.post
      ("/Encargado/generar-llaves",{password})

      const privateBlob = new Blob([data.llavePrivada], { type: 'application/x-pem-file' });
      const publicBlob = new Blob([data.llavePublica], { type: 'application/x-pem-file' });

      const privateLink = document.createElement('a');
      privateLink.href = URL.createObjectURL(privateBlob);
      privateLink.download = 'private_key.pem';
      privateLink.click();

      const publicLink = document.createElement('a');
      publicLink.href = URL.createObjectURL(publicBlob);
      publicLink.download = 'public_key.pem';
      publicLink.click();
      
      setMensaje('Las llaves se generaron y descargaron exitosamente.');
      setTimeout(() => {
        setMensaje("");
        closeModal();
      }, 1500);
    }catch(error) {
      console.log(error)
      setMensaje("Contraseña incorrecta")
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-11/12 sm:w-9/12 lg:w-7/12 max-h-[90vh] overflow-y-auto relative">
      <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 lg:text-5xl text-2xl"
        >
          &times;
        </button>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
          Generar Llaves
        </h1>
        <form onSubmit={handleGenerarLlaves} className="space-y-5">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              name="password"
              type={`${mostrarPassword ? "text" : "password"}`}
              placeholder="Contraseña"
              className=" pl-10 p-4 w-full text-black rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 bg-gray-50 transition duration-300"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {mostrarPassword ? (
              <LiaEyeSolid
                className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                onClick={() => setMostrarPassword(false)}
              />
            ) : (
              <LiaEyeSlashSolid
                className="absolute top-1/2 text-xl right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                onClick={() => setMostrarPassword(true)}
              />
            )}
          </div>
  
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 sm:py-4 rounded-full shadow-md hover:opacity-90 transition duration-300"
          >
            Generar Llaves
          </button>

          {mensaje && (
            <p
              className={`mt-4 text-center text-sm ${
                mensaje.includes("exitosamente") ? "text-green-500" : "text-red-500"
              }`}
            >
              {mensaje}
            </p>
          )}
        </form> 
        <div>
        <FiAlertTriangle
            className="text-red-500 text-4xl mr-3 hover:cursor-pointer hover:scale-110 transition duration-300"
            onClick={() => setMostrarAdvertencia(!mostrarAdvertencia)}
          />
          {mostrarAdvertencia && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center bg-red-100 p-4 rounded-lg border border-red-300">
              <p className="text-black lg:text-sm md:text-sm text-xs">
                <strong>Advertencia Técnica:</strong> Al generar un nuevo par de llaves criptográficas, se sobrescribirá la llave 
                pública almacenada en el sistema. Esto significa que no podrá utilizar las llaves 
                anteriores para firmar o validar documentos ya existentes. Asegúrese de realizar este 
                proceso solo si comprende los riesgos asociados y tiene acceso a todos los recursos necesarios 
                para gestionar sus nuevas llaves de manera segura.
              </p>
            </div>
          )}
          </div>
      </div>
    </div>
  );
}

export default GenerarNuevoParLlaves;
