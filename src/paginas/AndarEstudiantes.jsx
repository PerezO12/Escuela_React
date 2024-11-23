import{ useState, useEffect } from 'react'

import clienteAxios from '../config/clienteAxios'
import FormularioEstudiante from '../components/FormularioEstudiante'
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import useQuery from '../hooks/useQuery';

const AndarEstudiantes = () => {
  const { cargando } = useAuth();
  if(cargando)  return;
  
  const [ formularioId, setFormularioId ] = useState('');
  const [ formularios, setFormularios ] = useState([]);
  const [ alerta, setAlerta ] = useState({});
  const { query } = useQuery(); 


  const cargarDatos = async (query = '') =>{
    try{
      const { data } = await clienteAxios.get(`/Formulario/estudiantes${query}`);
      setFormularios(data.$values);
      setAlerta({})
    } catch(error) {
      console.log(error);
      setAlerta({
        msg: "En este momento no se pueden cargar los formularios",
        error: true
      })
    }
  };

  useEffect( () =>{
    cargarDatos(query);
  }, [query])

  if (cargando) {
    return <div>Cargando...</div>;
  }
  const { msg } = alerta
  return (
    <>
      {(formularios.length == 0 && !msg) && (
        <h1 className='lg:text-6xl text-3xl text-center font-extrabold text-gray-800 shadow-md p-6 rounded-lg bg-zinc-50'>
          No se han encontrado formularios.
        </h1>
      )}

      { msg && <Alerta alerta={alerta} />}
      
      <div className='lg:grid grid-cols-1 sm:grid-cols-2 lg:gap-4
      '>
        {formularios.map( ( formulario ) => (
            <FormularioEstudiante 
              key = {formulario.id}
              formulario={ formulario }
              cargarDatos={cargarDatos} 
            />
          ))}
      </div>
    </>
  )
}

export default AndarEstudiantes
