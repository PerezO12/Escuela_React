import { useState, useEffect } from 'react';
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import clienteAxios from '../config/clienteAxios';
import useQuery from '../hooks/useQuery'
import BarraCambiarPagina from '../components/BarraCambiarPagina';
import CrearEditarDepartamento from '../components/Admin/CrearEditarDepartamento';
import Departamento from '../components/Admin/Departamento';

const AdministrarDepartamentos = () => {
  const [pagina, setPagina] = useState(1);
  const [departamentos, setDepartamentos] = useState([]);

  const [flechaActiva, setFlechaActiva] = useState(true);
  const [ordenar, setOrdenar] = useState("Fecha");
  const [descender, setDescender] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const { query } = useQuery();
  const queryCompleto = `?${query}OrdenarPor=${ordenar}&NumeroPagina=${pagina}&Descender=${descender}&`;

  const cargarDatos = async (queryCompleto='') => {
    try {
      const { data } = await clienteAxios.get(`/Departamento${queryCompleto}`);
      setFlechaActiva(data.$values.length >= 10);
      setDepartamentos(data.$values); 
    } catch (error) {
      console.log(error);
    }
  };

  const borrarDepartamento = async (id) => {
    const respuesta = confirm("¿Desea eliminar el departamento?");
    if (!respuesta) return;
    try {
      const { data } = await clienteAxios.delete(`/Departamento/${id}`);
      setDepartamentos(departamentos.filter(dep => dep.id !== id));
    } catch (error) {
      console.log(error);
    }
  };


  const EditarDepartamento = async (nombre, id, facultadId) => {
    try {
      const { data } = await clienteAxios.put(`/Departamento/${id}`, { nombre, facultadId });

      setDepartamentos(departamentos.map(dep => dep.id === data.id ? { ...dep, nombre: data.nombre, facultad: data.facultad } : dep));
    } catch (error) {
      console.log(error);
      setMensaje(error.response.data.errors.Nombre);
    }
  };

  const crearDepartamento = async (nombre, facultadId) => {
    try {
      const { data } = await clienteAxios.post(`/Departamento`, { nombre, facultadId });
      setDepartamentos([...departamentos, data]);
      setMostrarFormulario(false);
      setMensaje('');
    } catch (error) {
      setMensaje(error.response.data.errors.Nombre);
    }
  };

  const handleCloseModal = () => {
    setMostrarFormulario(false);
  };
  const handleOrdenarPor = (ordenarPor) => {
      if(ordenar == ordenarPor){
          setDescender(!descender);
      }
      setOrdenar(ordenarPor);
  }

  const handleCambiarPagina = (a) => {
    if (pagina + a <= 0) {
      return;
    }
    setPagina(pagina + a);
  };

  useEffect(() => {
    cargarDatos(queryCompleto);
  }, [pagina, ordenar, descender]);

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      <div className="grid grid-cols-3 lg:gap-20 px-4 py-2 ">
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Nombre")}
        >
          Departamentos
        </p>
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Facultad")}
        >
          Facultad
        </p>
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Fecha")}
        >
          Fecha de creación
        </p>
      </div>
      <hr />
      
      {/* Mostrar Departamentos */}
      <div className="lg:h-[450px] h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto">
        {departamentos.map(departamento => (
          <div key={departamento.id} className="flex justify-between bg-white items-center border shadow-lg rounded-lg">
            <div className="flex-grow">
              <Departamento
                departamento={departamento}
                EditarDepartamento={EditarDepartamento}
                mensaje={mensaje}
              />
            </div>
            <MdDelete 
              className='text-3xl cursor-pointer text-zinc-600 hover:text-red-700 hover:scale-110' 
              onClick={() => borrarDepartamento(departamento.id)}
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

      {/* Barra Cambiar Pagina */}
      <BarraCambiarPagina   
        handleCambiarPagina={handleCambiarPagina} 
        flechaActiva={flechaActiva} 
        pagina={pagina} 
      />

      {/* Mostrar formulario para crear departamento */}
      {mostrarFormulario && (
        <CrearEditarDepartamento
          crearEditarDepartamento={crearDepartamento}
          handleCloseModal={handleCloseModal}
          editar={false}
          mensaje={mensaje}
        />
      )}
    </div>
  );
};

export default AdministrarDepartamentos;
