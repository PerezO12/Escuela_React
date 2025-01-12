import { useState } from 'react';
import { FiUpload, FiKey} from 'react-icons/fi';

import PropTypes from 'prop-types';
import { cambiarLlavePublica } from '../../../api/encargado';
import { errorMapper } from '../../../utils/errorMapper';
import BotonCerrarVentanas from '../../common/BotonCerrarVentanas';
import PasswordInput from '../../FormInput/PasswordInput';
import Mensaje from '../../common/Mensaje';
import AlertaWithIcon from '../../common/AlertaWithIcon';
import { cargarLlave } from '../../../utils/llavesDigitales';

const CambiarLlavePublica = ({ closeModal }) => {
  const [password, setPassword] = useState('');
  const [llavePublica, setLlavePublica] = useState('');
  const [file, setFile] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [inputType, setInputType] = useState('text'); // Estado para controlar la opción seleccionada

  const handleCambiarLlavePublica = async (e) => {
    e.preventDefault();
    if (inputType === 'text' && llavePublica.trim() === '') {
      setMensaje('Por favor, introduce la clave pública.');
      return;
    }
    if (inputType === 'file' && !file) {
      setMensaje('Por favor, selecciona un archivo.');
      return;
    }
    try {
      await cambiarLlavePublica({ password, llavePublica });
      setMensaje('Clave pública cambiada exitosamente.');
      setTimeout(() =>closeModal(), 600);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
      setTimeout(() =>setMensaje(""), 6000);
    }
  };

  // Función para manejar la carga de archivos y convertir a texto
  const handleFileChange = async (e) => {
    const fileCargar = e.target.files[0];
    setFile(fileCargar);
    try{
      const publicKey = await cargarLlave(fileCargar, 'publica');
      setMensaje("Llave cargada exitosamente.")
      setLlavePublica(publicKey)
    } catch(error) {
      setMensaje(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-lg relative">
        <BotonCerrarVentanas onClick={closeModal}/>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6 mt-2 sm:mb-8">
          Cambiar clave pública
        </h1>
  
        <form onSubmit={handleCambiarLlavePublica} className="space-y-6">
            <PasswordInput
              id={"paswordCambiarLlaves"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mostrarLabel={false}
              mostrarFiLock={true}
              classNameInput="pl-10 p-4 w-full text-black rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 bg-gray-50 transition duration-300"
            />
          {/* Introducir llave texto */}
          {inputType === 'text' && (
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <textarea
                id="publicKey"
                rows="3"
                placeholder="Introduce la clave pública como texto"
                value={llavePublica}
                onChange={(e) => setLlavePublica(e.target.value)}
                className="pl-10 p-4 w-full rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 text-black bg-gray-50 transition duration-300"
              />
            </div>
          )}
          {/* introducir llave archivo */}
          {inputType === 'file' && (
            <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-sky-500 transition duration-300">
              <label htmlFor="file" className="flex flex-col items-center text-gray-600 cursor-pointer">
                <FiUpload size={32} className="mb-2 text-sky-500" />
                <span className="text-sm">Subir archivo de clave pública</span>
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
          {/* Seleccion de archivo o texto */}
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
  
          {mensaje && <Mensaje msg={mensaje}/>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-4 rounded-full shadow-md hover:opacity-90 transition duration-300"
          >
            Cambiar clave pública
          </button>
        </form>
  

        <AlertaWithIcon mensaje='Tenga en cuenta que sobrescribirá la llave
                pública almacenada en el sistema. Esto significa que no podrá utilizar las llaves
                anteriores para firmar o validar documentos ya existentes. Asegúrese de realizar este
                proceso solo si comprende los riesgos asociados y tiene acceso a todos los recursos
                necesarios para gestionar sus nuevas llaves de manera segura.'/>

      </div>
    </div>
  );
}  
CambiarLlavePublica.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CambiarLlavePublica;