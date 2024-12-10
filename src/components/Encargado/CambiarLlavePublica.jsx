import { useState } from 'react';
import { FiUpload, FiKey, FiLock, FiAlertTriangle } from 'react-icons/fi';
import clienteAxios from '../../config/clienteAxios';
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

const CambiarLlavePublica = ({ closeModal }) => {
  const [ mostrarPassword, setMostrarPassword ] = useState(false);
  const [ mostrarAdvertencia, setMostrarAdvertencia ] = useState(true);
  const [password, setPassword] = useState('');
  const [llavePublica, setLlavePublica] = useState('');
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [inputType, setInputType] = useState('text'); // Estado para controlar la opción seleccionada

  const handleCambiarLlavePublica = async (e) => {
    e.preventDefault();

    if (inputType === 'text' && llavePublica.trim() === '') {
      setMensaje('Por favor, introduce la llave pública.');
      return;
    }
    
    if (inputType === 'file' && !file) {
      setMensaje('Por favor, selecciona un archivo.');
      return;
    }

    // Intentar enviar al backend
    try {
      const { data } = await clienteAxios.post('/Encargado/cambiar-llave', { password, llavePublica });
      setMensaje('Llave pública cambiada exitosamente.');
    } catch (error) {
      console.log(error.response.data)
      console.log(error.response.data)
      setMensaje(error.response.data?.msg || "error");
    }
  };

  // Función para manejar la carga de archivos y convertir a texto
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    
    reader.onload = () => {
      const fileContent = reader.result;
      
      const publicKey = fileContent
        .replace(/-----(BEGIN|END) PUBLIC KEY-----/g, '')
        .replace(/\s+/g, '');
      setLlavePublica(publicKey);
      setMensaje('Archivo cargado exitosamente.');
    };
    
    reader.onerror = () => {
      setMensaje('Error al leer el archivo.');
    };

    if (selectedFile) {
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 text-2xl"
        >
          &times;
        </button>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
          Cambiar Llave Pública
        </h1>
  
        <form onSubmit={handleCambiarLlavePublica} className="space-y-6">
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              id="password"
              name="password"
              type={`${mostrarPassword ? "text" : "password"}`}
              placeholder="Contraseña"
              className="pl-10 p-4 w-full text-black rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 bg-gray-50 transition duration-300"
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
  
          {inputType === 'text' && (
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <textarea
                id="publicKey"
                rows="3"
                placeholder="Introduce la llave pública como texto"
                value={llavePublica}
                onChange={(e) => setLlavePublica(e.target.value)}
                className="pl-10 p-4 w-full rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 text-black bg-gray-50 transition duration-300"
              />
            </div>
          )}
  
          {inputType === 'file' && (
            <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-sky-500 transition duration-300">
              <label htmlFor="file" className="flex flex-col items-center text-gray-600 cursor-pointer">
                <FiUpload size={32} className="mb-2 text-sky-500" />
                <span className="text-sm">Subir archivo de llave pública</span>
                <input
                  id="file"
                  type="file"
                  accept=".pem,.crt,.key,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
  
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
            <label className="flex items-center space-x-2 text-black">
              <input
                type="radio"
                value="text"
                checked={inputType === 'text'}
                onChange={() => {
                  setInputType('text');
                  setLlavePublica('');
                  setMensaje('');
                }}
              />
              <span>Introducir como texto</span>
            </label>
  
            <label className="flex items-center space-x-2 text-black">
              <input
                type="radio"
                value="file"
                checked={inputType === 'file'}
                onChange={() => setInputType('file')}
              />
              <span>Subir archivo</span>
            </label>
          </div>
  
          <p className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
            {mensaje}
          </p>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-4 rounded-full shadow-md hover:opacity-90 transition duration-300"
          >
            Cambiar Llave Pública
          </button>
        </form>
  
        <div className="mt-5">
          <FiAlertTriangle
            className="text-red-500 text-4xl mr-3 hover:cursor-pointer hover:scale-110 transition duration-300"
            onClick={() => setMostrarAdvertencia(!mostrarAdvertencia)}
          />
          {mostrarAdvertencia && (
            <div className="bg-red-100 p-4 rounded-lg border border-red-300">
              <p className="text-black text-sm">
                <strong>Advertencia Técnica:</strong> Tenga en cuenta que sobrescribirá la llave
                pública almacenada en el sistema. Esto significa que no podrá utilizar las llaves
                anteriores para firmar o validar documentos ya existentes. Asegúrese de realizar este
                proceso solo si comprende los riesgos asociados y tiene acceso a todos los recursos
                necesarios para gestionar sus nuevas llaves de manera segura.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}  
export default CambiarLlavePublica;
