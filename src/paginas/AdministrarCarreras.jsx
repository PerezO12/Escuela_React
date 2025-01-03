import { useState, useCallback, useEffect } from 'react';
import CrearEditarCarrera from '../components/Admin/CrearEditarCarrera';
import Carrera from '../components/Admin/Carrera';
import { borrarCarrera, cargarCarreras } from '../api/administrador';
import { errorMapper } from '../helpers/errorMapper';
import Alerta from '../components/Alerta';
import ConfirmarAccionPassword from '../components/ConfirmarAccionPassword';
import ListaGenerica from '../components/ListaGenerica';
import useBusquedaYEstado from '../hooks/useBusquedaYestado';
import ListaColumnasOrdenar from '../components/ListaColumnasOrdenar';

const AdministrarCarreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [carreraId, setCarreraId] = useState(0);

  const {
    mostrarConfirmar,
    setMostrarConfirmar,
    mostrarFormulario,
    setMostrarFormulario,
    mensaje,
    setMensaje,
    error,
    setError,
    handleOrdenarPor,
    handleActualizarPagina,
    handleCloseConfirmar,
    generarQueryCompleto,
  } = useBusquedaYEstado();

  const queryCompleto = generarQueryCompleto();

  const cargarDatos = useCallback(async () => {
    try {
      const data = await cargarCarreras(queryCompleto);
      setCarreras(data);
      setError("");
    } catch (error) {
      setError(errorMapper(error)?.values);
    }
  }, [queryCompleto, setError]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleBorrarCarrera = async (password) => {
    try {
      await borrarCarrera(carreraId, password);
      setCarreras(carreras.filter(carrera => carrera.id !== carreraId));
      setMensaje('Carrera borrada exitosamente.');
      setTimeout(() => {
        setMostrarConfirmar(false);
        setMensaje("");
      }, 600);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 5000);
    }
  };


  const handleEditarCarrera = (data) => {
    setCarreras(carreras.map(carrera => carrera.id === data.id ? { ...carrera, nombre: data.nombre, facultad: data.facultad } : carrera));
  };

  const handleCrearCarrera = (data) => {
    setCarreras([...carreras, data]);
  };

  const handleDelete = (id) => {
    setCarreraId(id);
    setMostrarConfirmar(true);
  };

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      {/* Lista Columnas Ordenar */}
      <ListaColumnasOrdenar 
        handleOrdenarPor={handleOrdenarPor} 
        columnas={[
          { ordenar: "Nombre", titulo: "Carreras" },
          { ordenar: "Facultad", titulo: "Facultad" },
          { ordenar: "Fecha", titulo: "Fecha de creación" },
        ]} 
      />
      <hr />

      {/* Errores */}
      {error && <Alerta msg={error}/>}

      {/* Mostrar Carreras */}
      <ListaGenerica
        elementos={carreras}
        renderItem={(carrera) => (
          <Carrera
            carrera={carrera}
            editarCarrera={handleEditarCarrera}
          />
        )}
        onDelete={handleDelete}
        handleCambiarPagina={handleActualizarPagina}
        setMostrarFormulario={setMostrarFormulario}
      />

      {/* Formulario para crear/editar */}
      {mostrarFormulario && (
        <CrearEditarCarrera
          crearEditarCarrera={handleCrearCarrera}
          handleCloseModal={() => setMostrarFormulario(false)}
        />
      )}

      {/* Mostrar la confirmación para eliminar */}
      {mostrarConfirmar && (
        <ConfirmarAccionPassword
          handleCloseModal={handleCloseConfirmar}
          funcionEjecutar={handleBorrarCarrera}
          mensaje="¿Seguro que desea eliminar la carrera?"
          mensajeError={mensaje}
          alerta="Tenga en cuenta que si elimina la carrera también se eliminarán los estudiantes de la misma."
        />
      )}
    </div>
  );
};

export default AdministrarCarreras;
