import { useState, useEffect, useCallback } from 'react';
import { errorMapper } from '../../../utils/errorMapper';
import BotonCerrarVentanas from '../../common/BotonCerrarVentanas';
import Mensaje from '../../common/Mensaje';
import { cargarLlave } from '../../../utils/llavesDigitales';
import FormularioRead from '../../FormInput/FormularioRead';
import { cargarFormularioById, firmarFormulario } from '../../../api/encargado';
import PropTypes from 'prop-types';

const FormularioFirmar = ({ handleCloseModal, id, filtrarFormulario }) => {
  const [formulario, setFormulario] = useState({});
  const [llavePrivada, setLlavePrivada] = useState('');
  const [mensaje, setMensaje] = useState('');
  //const [file, setFile] = useState(null);

  // Cargar los detalles del formulario
  const cargarDatosFormulario = useCallback(async (id) => {
    try {
      const data = await cargarFormularioById(id);
      setFormulario(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    cargarDatosFormulario(id);
  }, [cargarDatosFormulario, id]);

  // Manejar la carga de la llave privada
  //todo:falta probar
  const handleCargarLlavePrivada = async (e) => {
    const selectedFile = e.target.files[0];
    //setFile(selectedFile);
    try {
      const privateKey = await cargarLlave(selectedFile, "privada");
      setLlavePrivada(privateKey);
      setMensaje('Archivo cargado exitosamente.');
    } catch (error) {
      setMensaje(error);
    }
  };

  // Manejar la firma del formulario
  const handleFirmar = async () => {

    if (!llavePrivada) {
      setMensaje('No se cargó la llave privada.');
      return;
    }
    try{
      await firmarFormulario(id, llavePrivada)
      setMensaje("Formulario firmado exitosamente");
      filtrarFormulario(id);
      setTimeout(() => handleCloseModal(), 600);
    } catch(error) {
      setLlavePrivada("");
      setMensaje(errorMapper(error)?.values);
    }
    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div
        className="bg-white shadow-2xl rounded-xl px-10 py-10 w-full lg:w-2/4 md:w-3/5 relative max-h-[97vh] overflow-y-auto transition-all duration-300 transform scale-100"
      >
        {/* Botón de cierre */}
        <BotonCerrarVentanas onClick={handleCloseModal}/>
  
        {/* Título */}
        <h2 className="lg:text-3xl text-2xl font-extrabold mb-4 text-center">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Detalles del Formulario
          </span>
        </h2>
  
        {/* Contenido */}
        <FormularioRead
          elementos={[
            {
              titulo: "Nombre Completo",
              valor: formulario.nombreCompletoEstudiante || ""
            },
            {
              titulo: "Correo Electrónico",
              valor: formulario.email || ""
            },
            {
              titulo: "Carnet de Identidad",
              valor: formulario.carnetIdentidad || ""
            },
            {
              titulo: "Carrera",
              valor: formulario.nombreCarrera || ""
            },
            {
              titulo: "Motivo",
              valor: formulario.motivo || ""
            },
            {
              titulo: "Fecha de Creación",
              valor: formulario.fechacreacion
                ? new Date(formulario.fechacreacion).toLocaleString()
                : "No disponible"
            },
          ]}
        />
  
        {/* Cargar llave privada o firmar */}
        <div className="mt-8">
          {llavePrivada ? (
            <button
              onClick={handleFirmar}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Firmar Formulario
            </button>
          ) : (
            <label
              htmlFor="file"
              className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <span className="text-sm font-medium">Cargar Llave Privada</span>
              <input
                id="file"
                type="file"
                accept=".pem,.crt,.key,.txt"
                onChange={handleCargarLlavePrivada}
                className="hidden"
              />
            </label>
          )}
        </div>
  
        {/* Mensajes de estado */}
        {mensaje && <Mensaje msg={mensaje}/>}

      </div>
    </div>
  );
  
}

FormularioFirmar.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  filtrarFormulario: PropTypes.func.isRequired,
};

export default FormularioFirmar;
