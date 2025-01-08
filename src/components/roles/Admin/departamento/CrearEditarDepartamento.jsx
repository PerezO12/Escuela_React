import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import { cargarFacultades, crearDepartamento, editarDepartamento } from '../../../../api/administrador';
import FacultadesSelector from '../../../FormInput/FacultadesSelector';
import Mensaje from '../../../common/Mensaje';
import NombreEditeInput from '../../../FormInput/NombreEditeInput';
import { errorMapper } from '../../../../utils/errorMapper';

const CrearEditarDepartamento = ({ 
  handleCloseModal, 
  crearEditarDepartamento, 
  departamento = {}
}) => {
  const [facultades, setFacultades] = useState([]);
  const [facultadId, setFacultadId] = useState(0);
  const [nombreDepartamento, setNombreDepartamento ] = useState(departamento?.nombre || "");
  const [mensaje, setMensaje] = useState("");

  const editar = departamento && departamento.id;

  const obtenerFacultades = useCallback (async () => {
    try {
      const data = await cargarFacultades();
      if(editar) {
        const facultadEncontrada = data.find(fac => fac.nombre === departamento.facultadNombre);
        setFacultadId(facultadEncontrada?.id || 0);
      } 
      setFacultades(data);
      setMensaje("")
    } catch (error) {
      setMensaje( errorMapper(error)?.values);
    }
  }, [editar, departamento.facultadNombre])
  
  useEffect(()=>{
    obtenerFacultades();
  }, [obtenerFacultades])

  const handleEditarDepartamento = async (id, nombre, facultadId) => {
      try {
        const data = await editarDepartamento(id, { nombre, facultadId });
        crearEditarDepartamento(data);
        setMensaje('Departamento editado exitosamente.');
        setTimeout(() => {
          handleCloseModal();
          setMensaje("");
        }, 600);
      } catch (error) {
        setMensaje( errorMapper(error)?.values);
        setTimeout(() => setMensaje(""), 5000);
      }
  };

  const handleCrearDepartamento = async (nombre, facultadId) => {
    try {
      const data = await crearDepartamento({nombre, facultadId});
      crearEditarDepartamento(data);
      setMensaje('Departamento creado exitosamente.');
      
      setTimeout(() => {
        handleCloseModal()
        setMensaje("");
      }, 600);
      
    } catch (error) {
      setMensaje( errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 5000);
    }
  };

  const handleCrearEditar = async (e) => {
    e.preventDefault();
    editar 
      ? handleEditarDepartamento(departamento.id, nombreDepartamento, facultadId)
      : handleCrearDepartamento(nombreDepartamento, facultadId);
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
            {editar ? "Editar" : "Crear"} Departamento
          </h2>
  
          {/* Formulario */}
          <form
            className="space-y-6"
            onSubmit={handleCrearEditar}
          >
            <NombreEditeInput
              value={nombreDepartamento}
              onChange={e => setNombreDepartamento(e.target.value)}
              placeholder={"Ingrese el nombre del departamento"}
            />
            
            <FacultadesSelector
              facultades={facultades}
              editar={editar}
              value ={facultadId}
              onChange = {e => setFacultadId(e.target.value)}
            />
  
            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
            >
              {editar ? "Editar" : "Crear"} Departamento
            </button>
          </form>
  
          <Mensaje msg={mensaje}/>
        </div>
      </div>
    );
  };
  
  CrearEditarDepartamento.propTypes = {
    handleCloseModal: PropTypes.func.isRequired, 
    crearEditarDepartamento: PropTypes.func.isRequired, 
    departamento: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
      facultad: PropTypes.string.isRequired,
    })
  };
  
  export default CrearEditarDepartamento;
  