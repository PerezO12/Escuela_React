import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';

const FormularioFirmar = ({ handleCloseModal, id, eliminarFormularioFirmado }) => {
  const [formulario, setFormulario] = useState({});
  const [llavePrivada, setLlavePrivada] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [file, setFile] = useState(null);

  // Cargar los detalles del formulario
  const cargarFormulario = async () => {
    try {
      const { data } = await clienteAxios.get(`/Formulario/encargados/${id}`);
      setFormulario(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarFormulario();
  }, []);

  // Manejar la carga de la llave privada
  const handleCargarLlavePrivada = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;

      // Limpiar el contenido de la clave privada
      const privateKey = fileContent
        .replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '')
        .replace(/\s+/g, '');
      setLlavePrivada(privateKey);
      setMensaje('Archivo cargado exitosamente.');
    };
    reader.onerror = () => {
      setMensaje('Error al leer el archivo.');
    };

    if (selectedFile) {
      reader.readAsText(selectedFile);
    }
  };

  // Manejar la firma del formulario
  const handleFirmar = async () => {

    if (!llavePrivada) {
      setMensaje('No se cargó la llave privada.');
      return;
    }
    try{
      const { data } = await clienteAxios.patch(`Formulario/firmar/${id}`, {llavePrivada})
      setMensaje("Formulario firmado exitosamente");
      console.log("id: ", id);
      eliminarFormularioFirmado(id);
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    } catch(error) {
      console.log(error.response.data);
      setMensaje(error.response.data.msg);
      setLlavePrivada('');
    }
    
  };

  if (!formulario) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div
        className="bg-white shadow-2xl rounded-xl px-10 py-10 w-full lg:w-2/4 md:w-3/5 relative max-h-[97vh] overflow-y-auto transition-all duration-300 transform scale-100"
      >
        {/* Botón de cierre */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition duration-300 lg:text-2xl"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
  
        {/* Título */}
        <h2 className="lg:text-3xl text-2xl font-extrabold mb-4 text-center">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Detalles del Formulario
          </span>
        </h2>
  
        {/* Contenido */}
        <div className="space-y-6">
          <div>
            <p className="text-lg font-medium text-black">Nombre Completo:</p>
            <p className="text-gray-700 capitalize">{formulario.nombreCompletoEstudiante}</p>
          </div>
  
          <div>
            <p className="text-lg font-medium text-gray-800">Correo Electrónico:</p>
            <p className="text-gray-700">{formulario.email}</p>
          </div>
  
          <div>
            <p className="text-lg font-medium text-gray-800">Carnet de Identidad:</p>
            <p className="text-gray-700">{formulario.carnetIdentidad}</p>
          </div>
  
          <div>
            <p className="text-lg font-medium text-gray-800">Carrera:</p>
            <p className="text-gray-700">{formulario.nombreCarrera}</p>
          </div>
  
          <div>
            <p className="text-lg font-medium text-gray-800">Motivo:</p>
            <div className="bg-gray-100 text-gray-700 rounded-lg p-3 shadow-inner max-h-40 overflow-y-auto break-words">
              {formulario.motivo}
            </div>
          </div>
  
          <div>
            <p className="text-lg font-medium text-gray-800">Fecha de Creación:</p>
            <p className="text-gray-700">{new Date(formulario.fechacreacion).toLocaleString()}</p>
          </div>
        </div>
  
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
        {mensaje && (
          <p
            className={`mt-4 text-center text-sm ${
              mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
  
}

export default FormularioFirmar;
