import{ useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios'
import FormularioEstudiante from '../components/Estudiante/FormularioEstudiante';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import useQuery from '../hooks/useQuery';

const AndarEstudiantes = () => {
  const [ loading, setLoading ] = useState(false);
  const [ formularios, setFormularios ] = useState([]);
  const [ alerta, setAlerta ] = useState({});
  const { auth } = useAuth();
  const { query } = useQuery(); 

  const navigate = useNavigate();
  
  const cargarDatos = async (query = '') =>{
    try{
      const data = await cargarDatos(query);
      setFormularios(data.$values);

    } catch(error) {
      setAlerta({
        msg: "En este momento no se pueden cargar los formularios",
        error: true
      })
    }
  };

  //todo: rol arreglar
  useEffect(() => {
    if(auth?.rol != "estudiante") {
        navigate("/");
        return;
    }   
    setLoading(true)
  }, [auth])

  useEffect( () =>{
    loading && cargarDatos(query);
  }, [query, loading])


  const { msg } = alerta

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
