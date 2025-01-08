import { useState, useEffect, useCallback } from 'react';

import Facultades from '../../../components/roles/Admin/facultad/Facultades';
import CrearEditarFacultad from '../../../components/roles/Admin/facultad/CrearEditarFacultad';
import { borrarFacultad, cargarFacultades } from '../../../api/administrador';
import { errorMapper } from '../../../utils/errorMapper';
import Alerta from '../../../components/common/Alerta';
import ConfirmarAccionPassword from '../../../components/common/ConfirmarAccionPassword';
import useBusquedaYEstado from '../../../hooks/useBusquedaYestado';
import ListaColumnasOrdenar from '../../../components/common/ListaColumnasOrdenar';
import ListaGenerica from '../../../components/common/ListaGenerica';
import useBusqueda from '../../../hooks/useBusqueda';

const AdministrarFacultades = () => {
  const {
    mostrarConfirmar,
    setMostrarConfirmar,
    mostrarFormulario,
    setMostrarFormulario,
    mensaje,
    setMensaje,
    alerta,
    setAlerta,
    handleOrdenarPor,
    handleActualizarPagina,
    handleCloseConfirmar,
    generarQueryCompleto,
  } = useBusquedaYEstado();
  const { buscar, setOpciones } = useBusqueda();

  const [facultades, setFacultades] = useState([]);
  const [ facultadId, setFacultadId ] = useState([]);
  const [queryCompleto, setQueryCompleto] = useState(generarQueryCompleto(""));


  const cargarDatos = useCallback(async () => {
    try {
      const data = await cargarFacultades(queryCompleto);
      setFacultades(data); 
      setAlerta("");
    } catch (error) {
      setAlerta(errorMapper(error)?.values);
    }
  }, [queryCompleto, setAlerta]);

  useEffect(() => {
    cargarDatos();
    setQueryCompleto(generarQueryCompleto(`${buscar.buscarPor}=${buscar.busqueda}`));
  }, [cargarDatos, buscar.busqueda, buscar.buscarPor, generarQueryCompleto]);

  // Actualizar opciones de busqueda al montar el componente 
  useEffect(() => {
    setOpciones(["Nombre"]);
  }, [setOpciones]);

  const handleBorrarFacultad = async (password) => {
    try {
      await borrarFacultad(facultadId, password);
      setFacultades(facultades.filter(fac => fac.id !== facultadId)); 
      setMensaje('Facultad borrada exitosamente.');
      setTimeout(() => {
        setMostrarConfirmar(false);
        setMensaje("");
      }, 600);
    } catch (error) {
      setMensaje( errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 5000);
    }
  };
  
  const handleEditarFacultad = async (data) =>{
      setFacultades(facultades.map( fac => fac.id === data.id ? { ...fac, nombre: data.nombre } : fac))
  }

  const handleCrearFacultad = async (data) => {
    setFacultades([...facultades, data]); 
  };

  const handleDelete = (id) => {
    setFacultadId(id);
    setMostrarConfirmar(true);
  };
  

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      <ListaColumnasOrdenar 
        handleOrdenarPor={handleOrdenarPor} 
        columnas={[
          { ordenar: "Nombre", titulo: "Facultades" },
          { ordenar: "Fecha", titulo: "Fecha de creación" },
        ]} 
      />
      <hr />
      {/* Errores */}
      {alerta && <Alerta msg={alerta} />}

      {/*Mostrar Facultades */}
      <ListaGenerica
        elementos={facultades}
        renderItem={(fac) => (
          <Facultades
            facultad={fac}
            editarFacultad={handleEditarFacultad}
          />
        )}
        onDelete={handleDelete}
        handleCambiarPagina={handleActualizarPagina}
        setMostrarFormulario={setMostrarFormulario}
      />
      
      {/* Mostrar fromulario para crear facultad */}
      {mostrarFormulario && (
        <CrearEditarFacultad
          crearEditarFacultad={handleCrearFacultad}
          handleCloseModal={() => setMostrarFormulario(false)}
        />
      )}

      {/*Mostrar la confirmacion del eliminar */}
      {mostrarConfirmar &&(
        <ConfirmarAccionPassword
          handleCloseModal={handleCloseConfirmar}
          funcionEjecutar={handleBorrarFacultad}
          mensaje = {"¿Seguro que desea eliminar la facultad?"}
          mensajeError = {mensaje} 
          alerta = {"Tenga en cuenta que si elimina la facultad también se eliminaran los departamentos y encargados."}
        />
      )}
    </div>
  );
};

export default AdministrarFacultades;
