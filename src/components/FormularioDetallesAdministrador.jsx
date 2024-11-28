import { useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';
import formatearFecha from '../helpers/convertirFechas';

const FormularioDetallesAdministrador = ({handleCloseModal, id}) => {
    const [formulario, setFormulario] = useState({});
  
    // Cargar los detalles del formulario
    const cargarFormulario = async () => {
      try {
        const { data } = await clienteAxios.get(`/Formulario/${id}`);
        setFormulario(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      cargarFormulario();
    }, []);
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
        <div className="bg-white shadow-2xl rounded-3xl p-7 w-full lg:w-2/4 md:w-3/5 h-screen max-h-screen overflow-y-auto relative">
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
              <p className="text-gray-700 capitalize">{formulario.nombreEstudiante}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Usuario:</p>
              <p className="text-gray-700 capitalize">{formulario.nombreUsuarioEstudiante}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Carnet Identidad:</p>
              <p className="text-gray-700 capitalize">{formulario.carnetIdentidadEstudiante}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Email:</p>
              <p className="text-gray-700 capitalize">{formulario.emailEstudiante}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Carrera:</p>
              <p className="text-gray-700 capitalize">{formulario.nombreCarrera}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Facultad:</p>
              <p className="text-gray-700 capitalize">{formulario.nombreFacultad}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Departamento:</p>
              <p className="text-gray-700 capitalize">{formulario.nombreDepartamento}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Encargado:</p>
              <p className="text-gray-700 capitalize">{formulario.nombreEncargado}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Firmado:</p>
              <p className="text-gray-700 capitalize">{formulario.firmado}</p>
            </div>
            <div>
              <p className="font-serif text-gray-900">Creado:</p>
              <p className="text-gray-700 capitalize">{formatearFecha(formulario.fechacreacion)}</p>
            </div>
  
            <div>
              <p className="font-serif text-gray-900">Correo Electrónico:</p>
              <p className="text-gray-700">{formulario.emailEstudiante}</p>
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

        </div>
      </div>
    );
}

export default FormularioDetallesAdministrador