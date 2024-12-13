import { useState, useEffect } from 'react';
import clienteAxios from '../../config/clienteAxios';

const CrearEditarCarrera = ({ handleCloseModal, crearEditarCarrera, editar = false, setMostrarEditar, id, nombre, facultadNombre, mensaje = "" }) => {
    const [facultades, setFacultades] = useState([]);

    const ObtenerFacultades = async () => {
        try {
          const { data } = await clienteAxios.get("/Facultad/");
          if(editar) {
            const facultadEncontrada = data.$values.find(fac => fac.nombre === facultadNombre);
            if (facultadEncontrada) {
              const facultadesActualizadas = [
                facultadEncontrada, 
                ...data.$values.filter(f => f.nombre !== facultadNombre)
              ];
              setFacultades(facultadesActualizadas);
            }
            else{
              setFacultades(data.$values);
            }
          } else {
            setFacultades(data.$values);
          }
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        ObtenerFacultades();
    }, []);

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
          onSubmit={(e) => {
            e.preventDefault();
            editar
              ? (crearEditarCarrera(e.target.nombre.value, id, e.target.facultad.value), setMostrarEditar(false))
              : crearEditarCarrera(e.target.nombre.value, e.target.facultad.value);
          }}
        >
          <div>
            <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">Nombre:</label>
            <input
              id="nombre"
              type="text"
              placeholder="Ingrese el nombre de la carrera"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              defaultValue={editar ? nombre : ""}
              required
            />
          </div>

          <div>
            <label htmlFor="facultad" className="block text-lg font-medium text-gray-700 mb-2">Facultad:</label>
            <select
              id="facultad"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              defaultValue={editar ? facultades[0]?.id : ""}
              required
            >
              <option value="" disabled>Seleccione una facultad</option>
              {facultades.map((fac) => (
                <option key={fac.id} value={fac.id}>{fac.nombre}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
            {editar ? "Editar" : "Crear"} Carrera
          </button>
        </form>

        <p className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
          {mensaje}
        </p>
      </div>
    </div>
  );
};

export default CrearEditarCarrera;
