import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';

const FormularioFirmar = ({ handleCloseModal, id }) => {
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
    const respuesta = confirm('¿Firmar el documento?');
    if (!respuesta) {
      return;
    }

    if (!llavePrivada) {
      setMensaje('No se cargó la llave privada.');
      return;
    }
    try{
      const { data } = await clienteAxios.patch(`Formulario/firmar/${id}`, {llavePrivada})
      console.log(data);
      setMensaje("Formulario firmado exitosamente");
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full lg:w-2/4 md:w-3/5 relative">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-300 text-2xl"
        >
          &times;
        </button>
        <h2 className="md:text-3xl lg:text-3xl text-xl font-bold mb-6 text-center text-blue-600">Detalles del Formulario</h2>

        {/* Detalles del formulario */}
        <div className="lg:space-y-3">
          <div>
            <p className="font-serif text-gray-900">Nombre Completo:</p>
            <p className="text-gray-700 capitalize">{formulario.nombreCompletoEstudiante}</p>
          </div>

          <div>
            <p className="font-serif text-gray-900">Correo Electrónico:</p>
            <p className="text-gray-700">{formulario.email}</p>
          </div>

          <div>
            <p className="ffont-serif text-gray-900">Carnet de Identidad:</p>
            <p className="text-gray-700">{formulario.carnetIdentidad}</p>
          </div>

          <div>
            <p className="font-serif text-gray-900">Carrera:</p>
            <p className="text-gray-700">{formulario.nombreCarrera}</p>
          </div>

          <div>
            <p className="font-serif text-gray-900">Motivo:</p>
            <div className="text-gray-700 rounded-lg max-h-40 overflow-y-auto break-words">
              {formulario.motivo}
            </div>
          </div>

          <div>
            <p className="font-serif text-gray-900">Fecha de Creación:</p>
            <p className="text-gray-700">{new Date(formulario.fechacreacion).toLocaleString()}</p>
          </div>
        </div>

        {/* Cargar llave privada o firmar */}
        {llavePrivada ? (
          <button
            onClick={handleFirmar}
            className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Firmar
          </button>
        ) : (
          <label htmlFor="file" className="flex flex-col  py-3 items-center bg-blue-500 text-white hover:cursor-pointe rounded-lg hover:bg-blue-600 transition duration-300">
            <span className="text-sm">Cargar Llave Privada</span>
            <input
              id="file"
              type="file"
              accept=".pem,.crt,.key,.txt"
              onChange={handleCargarLlavePrivada}
              className="hidden"
            />
          </label>
        )}

        {/* Mensajes de estado */}
        {mensaje && (
          <p className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormularioFirmar;
