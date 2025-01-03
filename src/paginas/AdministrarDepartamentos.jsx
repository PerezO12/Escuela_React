import { useState, useEffect, useCallback } from 'react';

import CrearEditarDepartamento from '../components/Admin/CrearEditarDepartamento';
import Departamento from '../components/Admin/Departamento';
import ConfirmarAccionPassword from '../components/ConfirmarAccionPassword';
import { errorMapper } from '../helpers/errorMapper';
import { borrarDepartamento, cargarDepartamentos } from '../api/administrador';
import Alerta from '../components/Alerta';
import ListaColumnasOrdenar from '../components/ListaColumnasOrdenar';
import ListaGenerica from '../components/ListaGenerica';
import useBusquedaYEstado from '../hooks/useBusquedaYestado';

const AdministrarDepartamentos = () => {

  const [departamentos, setDepartamentos] = useState([]);
  const [ departamentoId, setDepartamentoId ] = useState(0);
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

  const cargarDatos = useCallback (async () => {
    try {
      const data = await cargarDepartamentos(queryCompleto);
      setDepartamentos(data);
      setError(""); 
    } catch (error) {
      setError(errorMapper(error)?.values || "Error desconocido");
    }
  }, [queryCompleto, setError]);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const handleBorrarDepartamento = async (password) => {
    try {
      await borrarDepartamento(password, departamentoId);
      setDepartamentos(departamentos.filter(dep => dep.id !== departamentoId)); 
      setMensaje('Departamento borrado exitosamente.');
      setTimeout(() => {
        setMostrarConfirmar(false);
        setMensaje("");
      }, 800);
    } catch (error) {
      setMensaje( errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 5000);
    }
  };

  const handleEditarDepartamento = (data) => {
      setDepartamentos(departamentos.map(dep => dep.id === data.id ? { ...dep, nombre: data.nombre, facultad: data.facultad } : dep));
  };

  const handleCrearDepartamento = (data) => {
    setDepartamentos([...departamentos, data]);
  };

  const handleCloseModal = () => {
    setMostrarFormulario(false);
  };

  const handleDelete = (id) => {
    setDepartamentoId(id);
    setMostrarConfirmar(true)
  };


  return (
    <div className='md:px-10 lg:px-0 px-4'>
      {/* Lista Columnas Ordenar */}
      <ListaColumnasOrdenar
        handleOrdenarPor={handleOrdenarPor}
        columnas={[
          { ordenar: "Nombre", titulo: "Departamentos" },
          { ordenar: "Encargado", titulo: "Encargados" },
          { ordenar: "Facultad", titulo: "Facultades" },
          { ordenar: "Fecha", titulo: "Fecha de creación" }
        ]}
      />
      <hr />

      {/* Errores */}
      {error && <Alerta msg={error} />}

      {/* Mostrar Departamentos */}
      <ListaGenerica
        elementos={departamentos}
        renderItem={(departamento) => (
          <Departamento
            departamento={departamento}
            editarDepartamento={handleEditarDepartamento}
          />
        )}
        onDelete={handleDelete}
        handleCambiarPagina={handleActualizarPagina}
        setMostrarFormulario={setMostrarFormulario}
      />

      {/* Mostrar formulario para crear departamento */}
      {mostrarFormulario && (
        <CrearEditarDepartamento
          crearEditarDepartamento={handleCrearDepartamento}
          handleCloseModal={handleCloseModal}
          editar={false}
        />
      )}

      {/*Mostrar la confirmacion del eliminar */}
      {mostrarConfirmar &&(
        <ConfirmarAccionPassword
          handleCloseModal={handleCloseConfirmar}
          funcionEjecutar={handleBorrarDepartamento}
          mensaje = {"¿Seguro que desea eliminar el departamento?"}
          mensajeError = {mensaje} 
          alerta = {"Tenga en cuenta que si elimina el departamento tambien se eliminara el encargado."}
        />
      )}
    </div>
  );
};

export default AdministrarDepartamentos;
