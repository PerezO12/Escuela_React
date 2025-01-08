import { useState } from "react";
import PropTypes from "prop-types";

import { crearFacultad, editarFacultad } from "../../../../api/administrador";
import { errorMapper } from "../../../../utils/errorMapper";
import Mensaje from "../../../common/Mensaje";

const CrearEditarFacultad = ({
  handleCloseModal, 
  crearEditarFacultad, 
  facultad = {}
}) => {
  const [mensaje, setMensaje] = useState("");
  const editar = facultad && facultad.id;
  
  const handleEditarFacultad = async ( id,  nombre ) =>{
    try{
      const data = await editarFacultad(id, nombre);
      crearEditarFacultad(data);

      setMensaje('Facultad editada exitosamente.');
      setTimeout(() => {
        handleCloseModal();
        setMensaje("");
      }, 600);
    } catch(error){
      setMensaje( errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 5000);
    }
  }
  
  const handleCrearFacultad = async (nombre) => {
    try {
      const data = await crearFacultad(nombre);
      crearEditarFacultad(data);
      setMensaje('Facultad creada exitosamente.');

      setTimeout(() => {
        handleCloseModal();
        setMensaje("");
      }, 600);

    } catch (error) {
      setMensaje( errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 5000);
    }
  };
  const handleCrearEditar = (e) => {
    e.preventDefault();

    editar 
      ? handleEditarFacultad(facultad.id, e.target.nombre.value)
      : handleCrearFacultad(e.target.nombre.value);
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative">
            {/* Botón de cierre */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition duration-300 text-3xl"
            >
              &times;
            </button>

            {/* Título */}
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
              {editar ? "Editar" : "Crear"} Facultad
            </h2>

            {/* Formulario */}
            <form 
              className="space-y-6" 
              onSubmit={handleCrearEditar}
              >
              <div>
                <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">
                  Nombre:
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ingrese el nombre de la facultad"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                  defaultValue={editar? facultad.nombre : ""}
                  required
                />
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                {editar ? "Editar" : "Crear"} Facultad
              </button>
            </form>
            <Mensaje msg={mensaje}/>
          </div>
        </div>
  )
}

CrearEditarFacultad.propTypes = {
  handleCloseModal: PropTypes.func.isRequired, 
  crearEditarFacultad: PropTypes.func.isRequired, 
  facultad: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
  })
};

export default CrearEditarFacultad