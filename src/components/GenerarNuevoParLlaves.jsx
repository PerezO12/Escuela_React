import { useState } from 'react';
import { FiUpload, FiKey, FiLock } from 'react-icons/fi';
import clienteAxios from '../config/clienteAxios';

const GenerarNuevoParLlaves = ({ closeModal }) => {  // Recibe la función closeModal como prop
  const [ password, setPassword ] = useState('')
  const [mensaje, setMensaje] = useState('');


  const handleGenerarLlaves = async (e) => {
    e.preventDefault();
    const respuesta = confirm("¿Está seguro que desea generar un nuevo par de llaves? Tenga en cuenta que perdera sus llaves anteriores")
    if(!respuesta) return;
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
      console.log(data)
    }catch(error) {
      console.log(error)
      setMensaje("Contraseña incorrecta")
    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 text-2xl"
        >
          &times;
        </button>
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Generar Par de Llaves
        </h1>
        <form 
        onSubmit={handleGenerarLlaves} 
        className="space-y-9"
        >
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              className="pl-10 p-4 w-full rounded-lg border text-black border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 bg-gray-50 transition duration-300"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-4 rounded-full shadow-md hover:opacity-90 transition duration-300"
          >
            Generar Llaves
          </button>
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

export default GenerarNuevoParLlaves;
