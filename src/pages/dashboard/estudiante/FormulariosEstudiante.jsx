import{ useState, useEffect, useCallback } from 'react'
import FormularioEstudiante from '../../../components/roles/Estudiante/FormularioEstudiante';
import Alerta from '../../../components/common/Alerta';
import useBusquedaYEstado from '../../../hooks/useBusquedaYestado';
import useBusqueda from '../../../hooks/useBusqueda';
import { errorMapper } from '../../../utils/errorMapper';
import { cargarFormularios } from '../../../api/estudiante';

//todo:arreglar este componente luego
const FormulariosEstudiante = () => {
  const {
    alerta,
    setAlerta,
    generarQueryCompleto,
  } = useBusquedaYEstado();
  const { buscar, setOpciones } = useBusqueda();

  const [formularios, setFormularios] = useState([]);
  const [queryCompleto, setQueryCompleto] = useState(generarQueryCompleto(""));


  
  const cargarDatos = useCallback(async () =>{
    try{
      const data = await cargarFormularios(queryCompleto);
      setFormularios(data);
      setAlerta("");
    } catch(error) {
      console.log(error)
      setAlerta(errorMapper(error)?.values);
    }
  }, [queryCompleto, setAlerta]);

  useEffect(() => {
    cargarDatos();
    setQueryCompleto(generarQueryCompleto(`${buscar.buscarPor}=${buscar.busqueda}`));
  }, [cargarDatos, buscar.busqueda, buscar.buscarPor, generarQueryCompleto]);

  // Actualizar opciones de busqueda al montar el componente
  useEffect(() => {
    setOpciones(["Nombre", "Departamento"]);
  }, [setOpciones]);

  const handleEditarFormulario = (data) => {
    setFormularios(formularios.map( form => form.id === data.id ? data : form));
  }
  const handleBorrarFormulario = (id) => {
    setFormularios(formularios.filter( form => form.id !== id));
  }


  return (
    <>

      {alerta && <Alerta msg={alerta}/>}
      
      <div 
        className='lg:grid grid-cols-2 sm:grid-cols-2 lg:gap-4'
      >
        {formularios.map( ( formulario ) => (
            <FormularioEstudiante 
              key = {formulario.id}
              formulario={ formulario }
              editarArregloFormulario={handleEditarFormulario}
              borrarFormularioDelArreglo={handleBorrarFormulario} 
            />
          ))}
      </div>
    </>
  )
}

export default FormulariosEstudiante
