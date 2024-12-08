import { useState, useEffect } from 'react';
import { IoAddOutline } from "react-icons/io5";

import { MdDelete } from "react-icons/md";
import clienteAxios from '../config/clienteAxios';
import BarraCambiarPagina from '../components/BarraCambiarPagina';
import useQuery from "../hooks/useQuery";
import Facultades from "../components/Facultades"
import CrearEditarFacultad from '../components/Admin/CrearEditarFacultad';

const AdministrarFacultades = () => {
  const [pagina, setPagina] = useState(1);
  const [facultades, setFacultades] = useState([]);
  const [flechaActiva, setFlechaActiva] = useState(true);
  const [ordenar, setOrdenar] = useState("Fecha");
  const [descender, setDescender] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const { query } = useQuery();
  const queryCompleto = `?${query}OrdenarPor=${ordenar}&NumeroPagina=${pagina}&Descender=${descender}&`;

  const cargarDatos = async (queryCompleto = "") => {
    try {
      const { data } = await clienteAxios.get(`/Facultad${queryCompleto}`);
      if (data.$values.length <= 10) {
        setFlechaActiva(false);
      } else {
        setFlechaActiva(true);
      }
      setFacultades(data.$values); 
    } catch (error) {
      console.log(error);
    }
  };
  const borrarFacultad = async (id) => {
    const respuesta = confirm("¿Desea eliminar la facultad?");
    if(!respuesta) return;
    try{
      const { data } = await clienteAxios.delete(`/Facultad/${id}`);
      setFacultades(facultades.filter(f => f.id != id));
    } catch(error) {
        console.log(error);
    }

  }
  const EditarFacultad = async ( nombre, id ) =>{
    try{
      const { data } = await clienteAxios.put(`/Facultad/${id}`, {nombre});
      setFacultades(facultades.map( facultad => facultad.id === data.id ? { ...facultad, nombre: data.nombre } : facultad))
    } catch(error){
      console.log(error);
      setMensaje(error.response.data.errors.Nombre);
    }
  }
  
  useEffect(()=>{
    cargarDatos()
  }, []);

  const crearFacultad = async (nombre) => {
    try {
      const { data } = await clienteAxios.post(`/Facultad`, { nombre });
      setFacultades([...facultades, data]); 
      setMostrarFormulario(false);
      setMensaje('');
    } catch (error) {
      setMensaje(error.response.data.errors.Nombre);
    }
  };

  const handleCloseModal = () => {
    setMostrarFormulario(false);
  };

  const handleCambiarPagina = (a) => {
    if (pagina + a <= 0) {
      return;
    }
    setPagina(pagina + a);
  };

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      <div className="grid grid-cols-2 lg:gap-80 px-4 py-2">
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Nombre")}
        >
          Facultades
        </p>
        <div className='flex justify-between'>
          <p 
            className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
            onClick={() => handleOrdenarPor("Fecha")}
          >
            Fecha de creación
          </p>
        </div>
      </div>
      <hr />

      {/*Mostrar Facultades */}
      <div className=" lg:h-[450px]  h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto">
        {facultades.map(facultad => (
          <div key={facultad.id}className="flex justify-between bg-white items-center border shadow-lg rounded-lg">
            <div className="flex-grow   ">
              <Facultades 
                facultad={facultad}
                EditarFacultad={EditarFacultad}
                mensaje={mensaje}
                />
            </div>
            <MdDelete 
              className='text-3xl cursor-pointer text-zinc-600 hover:text-red-700 hover:scale-110' 
              onClick={e => borrarFacultad(facultad.id)}
              />  
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-2 lg:mr-10">
        <div 
          className="bg-blue-600 transition duration-200 text-white rounded-full p-3 shadow-2xl border hover:bg-blue-700 hover:scale-105"
          onClick={() => setMostrarFormulario(true)}
          >
          <IoAddOutline className="text-3xl"/> 
        </div>
      </div>
        {/* Barra Cambiar Pagina*/}
          <BarraCambiarPagina   
            handleCambiarPagina={handleCambiarPagina} 
            flechaActiva={flechaActiva} 
            pagina={pagina} 
          />


      {/* Mostrar fromulario para crear facultad */}
      {mostrarFormulario && (
        <CrearEditarFacultad
          crearEditarFacultad={crearFacultad}
          handleCloseModal={handleCloseModal}
          editar={false}
          mensaje={mensaje}
        />
      )}
    </div>
  );
};

export default AdministrarFacultades;
