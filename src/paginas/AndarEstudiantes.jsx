import{ useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios'
import FormularioEstudiante from '../components/Estudiante/FormularioEstudiante';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import useQuery from '../hooks/useQuery';

const AndarEstudiantes = () => {
  const [ lazyLoading, setLazyLoading ] = useState(false);
  const [ formularioId, setFormularioId ] = useState('');
  const [ formularios, setFormularios ] = useState([]);
  const [ alerta, setAlerta ] = useState({});
  const { auth } = useAuth();
  const { query } = useQuery(); 
//  if(cargando)  return(<div>Cargando...</div>);
  const navigate = useNavigate();
  
  const cargarDatos = async (query = '') =>{
    try{
      const { data } = await clienteAxios.get(`/Formulario/estudiantes?${query}`);
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
  useEffect(() => {
    if(auth?.rol != "estudiante") {
        navigate("/");
        return;
    }   
    setLazyLoading(true)
  }, [auth])

  useEffect( () =>{
    if(lazyLoading)
    {
      cargarDatos(query);
    }
  }, [query, lazyLoading])


  const { msg } = alerta
  //todo esto no es eficient aqui, lo ideal seria una ruta rpotegida

  return (
    <>
      {(formularios.length == 0 && !msg) && (
        <h1 className='lg:text-6xl text-3xl text-center font-extrabold text-gray-800 shadow-md p-6 rounded-lg bg-zinc-50'>
          No se han encontrado formularios.
        </h1>
      )}

      { msg && <Alerta alerta={alerta} />}
      
      <div className='lg:grid grid-cols-2 sm:grid-cols-2 lg:gap-4
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
