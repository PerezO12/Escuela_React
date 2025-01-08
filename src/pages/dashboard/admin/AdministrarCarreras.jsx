import { useState, useCallback, useEffect } from 'react';

import CrearEditarCarrera from '../../../components/roles/Admin/carrera/CrearEditarCarrera';
import Carrera from '../../../components/roles/Admin/carrera/Carrera';
import { borrarCarrera, cargarCarreras } from '../../../api/administrador';
import { errorMapper } from '../../../utils/errorMapper';
import Alerta from '../../../components/common/Alerta';
import ConfirmarAccionPassword from '../../../components/common/ConfirmarAccionPassword';
import ListaGenerica from '../../../components/common/ListaGenerica';
import useBusquedaYEstado from '../../../hooks/useBusquedaYestado';
import ListaColumnasOrdenar from '../../../components/common/ListaColumnasOrdenar';
import useBusqueda from '../../../hooks/useBusqueda';

const AdministrarCarreras = () => {
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

  const [carreras, setCarreras] = useState([]);
  const [carreraId, setCarreraId] = useState(0);
  const [queryCompleto, setQueryCompleto] = useState(generarQueryCompleto(""));

  const cargarDatos = useCallback(async () => {
    try {
      const data = await cargarCarreras(queryCompleto);
      setCarreras(data);
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
    setOpciones(["Nombre", "Facultad"]);
  }, [setOpciones]);


  const handleBorrarCarrera = async (password) => {
    try {
      await borrarCarrera(carreraId, password);
      setCarreras(carreras.filter(carrera => carrera.id !== carreraId));
      setMensaje('Carrera borrada exitosamente.');
      setTimeout(() => setMostrarConfirmar(false), 600);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
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

  /*borrar el mensahe automaticamente  */
  useEffect(() => {
    if (mensaje) {
        const timer = setTimeout(() => setMensaje(""), 5000);
        return () => clearTimeout(timer);
    }
  }, [mensaje, setMensaje]);
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
        classNameDiv={`grid grid-cols-3 lg:gap-20 px-4 py-2`}
      />
      <hr />

      {/* Errores */}
      {alerta && <Alerta msg={alerta}/>}

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
