import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import clienteAxios from "../../../config/clienteAxios";

import useQuery from "../../../hooks/useQuery";

import BarraCambiarPagina from "../components/BarraCambiarPagina";
import FormularioAdministrador from "../components/Admin/FormularioAdministrador";


const AdministrarFormularios = () => {
  const [ formularios, setFormularios ] = useState([]);
  const [ pagina, setPagina ] = useState(1);
  const [ ordenar, setOrdenar ] = useState("Fecha")
  const [ descender, setDescender ] = useState(false);
  const [ flechaActiva, setFlechaActiva ] = useState(true);
  const [ firmado, setFirmado ] = useState(false);
  //const { cargando } = useAuth();
  const { query } = useQuery();
  //if(cargando)  return;
  const queryCompleto = `?${query}OrdenarPor=${ordenar}&NumeroPagina=${pagina}&Descender=${descender}&Firmado=${firmado}`;
  const cargarDatos = async (queryCompleto="") => {
      try{
          const { data } = await clienteAxios.get(`/Formulario${queryCompleto}`);
          if(data.$values.length <= 10) {
              setFlechaActiva(false);
          }else {
              setFlechaActiva(true);
          }
          setFormularios(data.$values);
      } catch(error) {
          console.log(error);
      }
  }
  const borrarFormulario = async(id) => {
    const respuesta = confirm("¿Desea eliminar el formulario?");
    if(!respuesta) return;
    try{
      const { data } = await clienteAxios.delete(`/Formulario/admin/${id}`);
      setFormularios(formularios.filter(f => f.id != id));
    } catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
      cargarDatos(queryCompleto);
  }, [queryCompleto])


  const handleOrdenarPor = (ordenarPor) => {
      if(ordenar == ordenarPor){
          setDescender(!descender);
      }
      setOrdenar(ordenarPor);
  }

  const handleCambiarPagina = ( a ) => {
      if(pagina + a <= 0) {
          return;
      }
      if(a > 0 && formularios.length < 10) {
        setFlechaActiva(false)
        return
      }
      setPagina(pagina + a);
  }

  return (
      <div className="md:px-10 lg:px-0 px-4  ">
          <div className="grid grid-cols-6 lg:gap-4 px-4 py-2 ">
              <p 
                  className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm  hover:cursor-pointer"
                  onClick={e => handleOrdenarPor("Nombre")}
              >Estudiantes</p>
              <p 
                  className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
                  onClick={e => handleOrdenarPor("Carrera")}
                  >Carrera</p>
              <p 
                  className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm  hover:cursor-pointer"
                  onClick={e => handleOrdenarPor("Departamento")}
              >Departamento</p>
              <p 
                  className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm  hover:cursor-pointer"
                  onClick={e => handleOrdenarPor("Encargado")}
              >Encargado</p>
              <p 
                  className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
                  onClick={e => handleOrdenarPor("Fecha")}
              >Fecha</p>
              <p 
                  className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
                  onClick={e => setFirmado(!firmado)}
              >Firmados</p>
          </div>
          <hr />
          <div className=" flex flex-col lg:h-[450px]  h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto">
              {formularios.map(formulario => (
                <div key={formulario.id}className="flex items-center bg-white border shadow-lg rounded-lg">
                  <FormularioAdministrador forrmulario={ formulario } />
                  <MdDelete 
                    className='text-4xl cursor-pointer text-zinc-600 hover:text-red-700 hover:scale-110' 
                    onClick={e => borrarFormulario(formulario.id)}
                  />    
                </div>
              ))}

          </div>

            <div className="flex justify-end lg:mb-1 lg:mr-8 ">
                <div className="bg-blue-500 text-white rounded-full p-3">
                <IoAddOutline className="text-3xl" /> 
                </div>
            </div>

            <div className='flex justify-center'>
                <div className='lg:w-11/12 md:w-10/12 w-2/3'>
                <BarraCambiarPagina   
                    handleCambiarPagina={handleCambiarPagina} 
                    flechaActiva={flechaActiva} 
                    pagina={pagina} 
                />
            </div>

            </div>
      </div>
  )
}

export default AdministrarFormularios
