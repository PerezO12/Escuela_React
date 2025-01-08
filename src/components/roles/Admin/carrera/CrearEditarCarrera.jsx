import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import { cargarFacultades, crearCarrera, editarCarrera } from '../../../../api/administrador';
import Mensaje from '../../../common/Mensaje';
import FacultadesSelector from '../../../FormInput/FacultadesSelector';
import NombreEditeInput from '../../../FormInput/NombreEditeInput';
import { errorMapper } from '../../../../utils/errorMapper';

const CrearEditarCarrera = ({ 
  handleCloseModal,
  crearEditarCarrera,
  carrera = {}
}) => {
    const [facultades, setFacultades] = useState([]);
    const [facultadId, setFacultadId] = useState(0);
    const [nombreCarrera, setNombreCarrera ] = useState(carrera.nombre || "");
    const [mensaje, setMensaje] = useState("");
    const editar = carrera && carrera.id;

    const ObtenerFacultades = useCallback(async () => {
      try {
        const data = await cargarFacultades();
        if(editar) {
          const facultadEncontrada = data.find(fac => fac.nombre === carrera.facultad);
          setFacultadId(facultadEncontrada?.id || 0);
        } 
        setFacultades(data);
        setMensaje("");
      } catch (error) {
        setMensaje(errorMapper(error)?.values)
      }
    }, [editar, carrera?.facultad]);

    useEffect(() => {
      ObtenerFacultades();
    }, [ObtenerFacultades]);

    const handleEditarCarrera = async (id, nombre, facultadId) => {
        try {
          const data = await editarCarrera(id, {nombre, facultadId})
          crearEditarCarrera(data);
          handleCloseModal();
        } catch (error) {
          setMensaje(errorMapper(error)?.values)
          setTimeout(() => setMensaje(""), 5000);
        }
      };
    
      const handleCrearCarrera = async (nombre, facultadId) => {
        try {
          const data = await crearCarrera({nombre, facultadId})
          crearEditarCarrera(data);
          handleCloseModal();
        } catch (error) {
          setMensaje(errorMapper(error)?.values)
          setTimeout(() => setMensaje(""), 5000);
        }
      };


  const handleCrearEditar = async (e) => {
    e.preventDefault();
    editar
      ? handleEditarCarrera(carrera.id, nombreCarrera, facultadId)
      : handleCrearCarrera(nombreCarrera, facultadId)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative">
        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition duration-300 text-3xl">
          &times;
        </button>
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          {editar ? "Editar" : "Crear"} Carrera
        </h2>
        <form
          className="space-y-6"
          onSubmit={handleCrearEditar}
        >
          <NombreEditeInput
            value={nombreCarrera}
            onChange={e => setNombreCarrera(e.target.value)}
            placeholder={"Ingrese el nombre de la carrera"}
          />
          <FacultadesSelector
            facultades={facultades}
            editar={editar}
            value ={facultadId}
            onChange = {e => setFacultadId(e.target.value)}
          />
  
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
            {editar ? "Editar" : "Crear"} Carrera
          </button>
        </form>

        <Mensaje  msg = {mensaje}/>
      </div>
    </div>
  );
};

CrearEditarCarrera.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  crearEditarCarrera: PropTypes.func.isRequired,
  carrera: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    facultad: PropTypes.string.isRequired
  })
};


export default CrearEditarCarrera;
