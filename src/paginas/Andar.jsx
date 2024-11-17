import{ useState, useEffect } from 'react'

import clienteAxios from '../config/clienteAxios'
import Formulario from '../components/Formulario'
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

const Andar = () => {
  const { cargando } = useAuth();
  if(cargando)  return;
  
  const [ formularioId, setFormularioId ] = useState('');
  const [ formularios, setFormularios ] = useState([]);
  const [ alerta, setAlerta ] = useState({});
  

  useEffect( () =>{
    const cargarDatos = async () =>{
      try{
        const { data } = await clienteAxios.get('/Formulario/estudiantes');
        setFormularios(data.$values);
      } catch(error) {
        console.log(error.response);
        setAlerta({
          msg: "En este momento no se pueden cargar los formularios",
          error: true
        })
      }
    };
    cargarDatos();
  }, [])

  if (cargando) {
    return <div>Cargando...</div>;
  }
  const { msg } = alerta
  return (
    <>
      <h1 className='text-6xl text-center font-extrabold text-gray-800 shadow-md p-6 rounded-lg bg-zinc-50'>
        Actualmente no tienes formularios creados
      </h1>

      { msg && <Alerta alerta={alerta} />}

      <div className='lg:grid grid-cols-1 sm:grid-cols-2 lg:gap-4'>
        {formularios.map( ( formulario ) => {
          return (
            <Formulario 
              key = {formulario.id}
              formulario={ formulario } />
            
            )
        })}
        
      </div>
    </>
  )
}

export default Andar
