import { useState, useEffect } from 'react';
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import clienteAxios from '../config/clienteAxios';
import useQuery from '../hooks/useQuery';
import BarraCambiarPagina from '../components/BarraCambiarPagina';
import CrearEditarCarrera from '../components/Admin/CrearEditarCarrera';
import Carrera from '../components/Admin/Carrera';

const AdministrarCarreras = () => {
  const [pagina, setPagina] = useState(1);
  const [carreras, setCarreras] = useState([]);
  const [flechaActiva, setFlechaActiva] = useState(true);
  const [ordenar, setOrdenar] = useState("Fecha");
  const [descender, setDescender] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const { query } = useQuery();
  const queryCompleto = `?${query}OrdenarPor=${ordenar}&NumeroPagina=${pagina}&Descender=${descender}&`;

  const cargarDatos = async (queryCompleto='') => {
    try {
      const { data } = await clienteAxios.get(`/Carrera${queryCompleto}`);
      setFlechaActiva(data.$values.length >= 10);
      setCarreras(data.$values);
    } catch (error) {
      console.log(error);
    }
  };

  const borrarCarrera = async (id) => {
    const respuesta = confirm("¿Desea eliminar la carrera?");
    if (!respuesta) return;
    try {
      await clienteAxios.delete(`/Carrera/${id}`);
      setCarreras(carreras.filter(carrera => carrera.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editarCarrera = async (nombre, id, facultadId) => {
    try {
      const { data } = await clienteAxios.put(`/Carrera/${id}`, { nombre, facultadId });
      setCarreras(carreras.map(carrera => carrera.id === data.id ? { ...carrera, nombre: data.nombre, facultad : data.facultad} : carrera));
    } catch (error) {
      console.log(error);
      setMensaje(error.response.data.errors.Nombre);
    }
  };

  const crearCarrera = async (nombre, facultadId) => {
    try {
      const { data } = await clienteAxios.post(`/Carrera`, { nombre, facultadId });
      setCarreras([...carreras, data]);
      setMostrarFormulario(false);
      setMensaje('');
    } catch (error) {
      setMensaje(error.response.data.errors.Nombre);
    }
  };

  useEffect(() => {
    cargarDatos(queryCompleto);
  }, [pagina, ordenar, descender]);

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      <div className="grid grid-cols-3 lg:gap-20 px-4 py-2">
        <p className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer" onClick={() => setOrdenar("Nombre")}>Carreras</p>
        <p className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer" onClick={() => setOrdenar("Facultad")}>Facultad</p>
        <p className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer" onClick={() => setOrdenar("Fecha")}>Fecha de creación</p>
      </div>
      <hr />

      {/* Mostrar Carreras */}
      <div className="lg:h-[450px] h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto">
        {carreras.map(carrera => (
          <div key={carrera.id} className="flex justify-between bg-white items-center border shadow-lg rounded-lg">
            <div className='flex-grow'>
              <Carrera
                carrera={carrera}
                editarCarrera={editarCarrera}
                mensaje={mensaje}
              />
            </div>
{/*             <MdDelete className='text-3xl cursor-pointer text-zinc-600 hover:text-red-700 hover:scale-110' 
              onClick={() => borrarCarrera(carrera.id)} 
            /> */}
          </div>
        ))}
      </div>

      {/* Botón para abrir el formulario */}
      <div className="flex justify-end mb-2 lg:mr-10">
        <div 
          className="bg-blue-600 transition duration-200 text-white rounded-full p-3 shadow-2xl border hover:bg-blue-700 hover:scale-105"
          onClick={() => setMostrarFormulario(true)}
        >
          <IoAddOutline className="text-3xl" />
        </div>
      </div>

      {/* Barra para cambiar de página */}
      <BarraCambiarPagina handleCambiarPagina={(a) => setPagina(prev => Math.max(prev + a, 1))} flechaActiva={flechaActiva} pagina={pagina} />

      {/* Formulario para crear/editar */}
      {mostrarFormulario && (
        <CrearEditarCarrera
          crearEditarCarrera={crearCarrera}
          handleCloseModal={() => setMostrarFormulario(false)}
          editar={false}
          mensaje={mensaje}
        />
      )}
    </div>
  );
};

export default AdministrarCarreras;
