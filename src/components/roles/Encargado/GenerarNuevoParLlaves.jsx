import { useEffect, useState } from 'react';
import { errorMapper } from '../../../utils/errorMapper';
import Mensaje from '../../common/Mensaje';
import AlertaWithIcon from '../../common/AlertaWithIcon';
import PasswordInput from '../../FormInput/PasswordInput';
import BotonCerrarVentanas from '../../common/BotonCerrarVentanas';
import { generarLlaves } from '../../../api/encargado';
import PropTypes from 'prop-types';

const GenerarNuevoParLlaves = ({ closeModal }) => {
  const [ password, setPassword ] = useState('')
  const [mensaje, setMensaje] = useState('');


  const handleGenerarLlaves = async (e) => {
    e.preventDefault();
    try {
      const data = await generarLlaves(password);

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
      setTimeout(() =>closeModal(), 600);
    }catch(error) {
      setMensaje(errorMapper(error)?.values);
    }
  };
   /*borrar el mensahe automaticamente  */
   useEffect(() => {
    if (mensaje) {
        const timer = setTimeout(() => setMensaje(""), 8000);
        return () => clearTimeout(timer);
    }
  }, [mensaje, setMensaje]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-11/12 sm:w-9/12 lg:w-7/12 max-h-[90vh] overflow-y-auto relative">
        <BotonCerrarVentanas onClick={closeModal}/>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
            Generar Llaves
          </h1>
          <form onSubmit={handleGenerarLlaves} className="space-y-5">
            <PasswordInput
              id={"paswordLlaves"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mostrarLabel={false}
              mostrarFiLock={true}
              classNameInput=" pl-10 p-4 w-full text-black rounded-lg border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-300 bg-gray-50 transition duration-300"
            />
    
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 sm:py-4 rounded-full shadow-md hover:opacity-90 transition duration-300"
            >
              Generar Llaves
            </button>

            {mensaje && <Mensaje msg={mensaje}/>}
          </form> 
          <AlertaWithIcon mensaje='Al generar un nuevo par de llaves criptográficas, se sobrescribirá la llave 
                  pública almacenada en el sistema. Esto significa que no podrá utilizar las llaves 
                  anteriores para firmar o validar documentos ya existentes. Asegúrese de realizar este 
                  proceso solo si comprende los riesgos asociados y tiene acceso a todos los recursos necesarios 
                  para gestionar sus nuevas llaves de manera segura'/>
      </div>
    </div>
  );
}

GenerarNuevoParLlaves.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default GenerarNuevoParLlaves;
