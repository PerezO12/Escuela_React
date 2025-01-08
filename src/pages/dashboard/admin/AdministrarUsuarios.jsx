import { useState, useEffect, useCallback } from 'react';

import Usuarios from '../../../components/roles/Admin/usuario/Usuarios';
import CrearEditarUsuario from '../../../components/roles/Admin/usuario/CrearEditarUsuario';
import useBusquedaYEstado from '../../../hooks/useBusquedaYestado';
import { borrarUsuarios, cargarUsuarios } from '../../../api/administrador';
import { errorMapper } from '../../../utils/errorMapper';
import ListaColumnasOrdenar from '../../../components/common/ListaColumnasOrdenar';
import Alerta from '../../../components/common/Alerta';
import ListaGenerica from '../../../components/common/ListaGenerica';
import ConfirmarAccionPassword from '../../../components/common/ConfirmarAccionPassword';
import useBusqueda from '../../../hooks/useBusqueda';


const AdministrarUsuarios = () => {
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

  const [usuarioId, setUsuarioId] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [queryCompleto, setQueryCompleto] = useState(generarQueryCompleto(""));

  const cargarDatos = useCallback (async () => {
    try {
      const data = await cargarUsuarios(queryCompleto);
      setUsuarios(data); 
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
  //todo: cambiar opciones
  useEffect(() => {
    setOpciones(["Nombre", "Usuario", "Email", "CarnetIdentidad"]);
  }, [setOpciones]);


  const handleBorrarUsuario = async (password) => {
    try {
      await borrarUsuarios(usuarioId, password);
      setUsuarios(usuarios.filter(usu => usu.id !== usuarioId));
      setMensaje("El usuario fue borrado exitosamente");
      setTimeout(() => {
        setMensaje("");
        setMostrarConfirmar(false);
      }, 600);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
    }
  };

  const handleEditarUsuario = async (usuario) => {
    setUsuarios(usuarios.map( u => (u.id === usuario.id ? usuario : u)))
  };

  const handleCrearUsuario = async (data) => {
      setUsuarios([...usuarios, data]);
  };
  const handleDelete = (id) => {
    setUsuarioId(id);
    setMostrarConfirmar(true);
  };

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      {/* Lista Columnas Ordenar */}
      <ListaColumnasOrdenar 
        handleOrdenarPor={handleOrdenarPor} 
        columnas={[
          { ordenar: "Nombre", titulo: "Nombre y Apellidos" },
          { ordenar: "Usuario", titulo: "Usuario" },
          { ordenar: "Email", titulo: "Email" },
          { ordenar: "", titulo: "Rol" },
        ]} 
      />
      <hr />
      {/* Errores */}
      {alerta && <Alerta msg={alerta}/>}

      {/* Mostrar Usuarios */}
      <ListaGenerica
        elementos={usuarios}
        renderItem={(usuario) => (
          <Usuarios
            usuario={usuario}
            editarUsuario={handleEditarUsuario}
          />
        )}
        onDelete={handleDelete}
        handleCambiarPagina={handleActualizarPagina}
        setMostrarFormulario={setMostrarFormulario}
      />

      {/* Mostrar formulario para crear Usuario */}
      {mostrarFormulario && (
        <CrearEditarUsuario
          crearEditarUsuario={handleCrearUsuario}
          handleCloseModal={() => setMostrarFormulario(false)}
        />
      )}
      {/*Mostrar la confirmacion del eliminar */}
      {mostrarConfirmar &&(
        <ConfirmarAccionPassword
          handleCloseModal={handleCloseConfirmar}
          funcionEjecutar={handleBorrarUsuario}
          mensaje = {"¿Seguro que desea eliminar el usuario?"}
          mensajeError = {mensaje}
          alerta="Tenga en cuenta que si elimina el usuario no se podrá restaurar." 
        />
      )}
    </div>
  );
};

export default AdministrarUsuarios
