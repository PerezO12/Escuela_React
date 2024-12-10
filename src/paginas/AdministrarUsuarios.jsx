import { useState, useEffect } from 'react';
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import clienteAxios from '../config/clienteAxios';
import useQuery from '../hooks/useQuery'
import BarraCambiarPagina from '../components/BarraCambiarPagina';
import Usuarios from '../components/Admin/Usuarios';
import CrearEditarUsuario from '../components/Admin/CrearEditarUsuario';
import ConfirmarAccionPassword from '../components/Admin/ConfirmarAccionPassword';


const AdministrarUsuarios = () => {
  const [idUserBorrar, setIdUserBorrar] = useState("");
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [pagina, setPagina] = useState(1);
  const [usuarios, setUsuarios] = useState([]);
  const [flechaActiva, setFlechaActiva] = useState(true);
  const [ordenar, setOrdenar] = useState("Fecha");
  const [descender, setDescender] = useState(false);
  const [mostrarCrearUsuario, setMostrarCrearUsuario] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const { query } = useQuery();
  const queryCompleto = `?${query}OrdenarPor=${ordenar}&NumeroPagina=${pagina}&Descender=${descender}&`;

  

  const cargarDatos = async (queryCompleto='') => {
    try {
      const { data } = await clienteAxios.get(`/Usuario${queryCompleto}`);
      setFlechaActiva(data.$values.length >= 10);
      setUsuarios(data.$values); 
    } catch (error) {
      //todo: mensaje de error
      console.log(error);
    }
  };

  const borrarUsuario = async (password) => {
    try {
      const { data } = await clienteAxios.delete(`/Usuario/${idUserBorrar}`, {
        data: { password } 
      })
      setUsuarios(usuarios.filter(usu => usu.id !== idUserBorrar));
      setMensaje("El usuario fue borrado exitosamente");
      setTimeout(() => {
        setMensaje("");
        setMostrarConfirmar(false);
      }, 1500);
    } catch (error) {
      setMensaje(error.response.data.msg || "Ocurrio un error");
    }
  };


  const editarUsuario = async (usuario) => {
    setUsuarios(usuarios.map( u => (u.id === usuario.id ? usuario : u)))
  };

  const handleCrearUsuario = async (data) => {
      setUsuarios([...usuarios, data]);
      //setMostrarFormulario(false);
  };

  const handleCloseEditar = () => {
    setMensaje("");
    setMostrarCrearUsuario(false);
  };


  const handleCloseConfirmar = () => {
    setMensaje("");
    setMostrarConfirmar(false);
  }

  /* Funciones de busqueda */
  const handleOrdenarPor = (ordenarPor) => {
      if(ordenar == ordenarPor){
          setDescender(!descender);
      }
      setOrdenar(ordenarPor);
  }

  const handleCambiarPagina = (a) => {
    if (pagina + a <= 0) {
      return;
    }
    setPagina(pagina + a);
  };

  useEffect(() => {
    cargarDatos(queryCompleto);
  }, [pagina, ordenar, descender]);

  return (
    <div className='md:px-10 lg:px-0 px-4'>
      <div className="grid grid-cols-4 lg:gap-20 px-4 py-2 ">
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Nombre")}
        >
          Nombre y Apellidos
        </p>
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Usuario")}
        >
          Usuario
        </p>
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
          onClick={() => handleOrdenarPor("Email")}
        >
          Email
        </p>
        <p 
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer"
        >
          Rol
        </p>
      </div>
      <hr />
      
      {/* Mostrar Usuarios */}
      <div className="lg:h-[calc(72vh-80px)] h-[calc(75vh-80px)] px-2 py-2 bg-gray-100 overflow-y-auto">
        {usuarios.map(usuario => (
          <div key={usuario.id} className="flex justify-between bg-white items-center border shadow-lg rounded-lg">
            <div className="flex-grow">
              <Usuarios
                usuario={usuario}
                editarUsuario={editarUsuario}
                mensaje={mensaje}
              />
            </div>
            <MdDelete 
              className='text-3xl cursor-pointer text-zinc-600 hover:text-red-700 hover:scale-110' 
              onClick={() => (setIdUserBorrar(usuario.id), setMostrarConfirmar(true))}
            />
          </div>
        ))}
      </div>
      {/* Falta manejo de errores */}
      <div className="flex justify-end mb-2 lg:mr-10">
        <div className="bg-blue-600 transition duration-200 text-white rounded-full p-3 shadow-2xl border hover:bg-blue-700 hover:scale-105"
          onClick={() => setMostrarCrearUsuario(true)}
        >
          <IoAddOutline className="text-3xl"/>
        </div>
      </div>

      {/* Barra Cambiar Pagina */}
      <BarraCambiarPagina   
        handleCambiarPagina={handleCambiarPagina} 
        flechaActiva={flechaActiva} 
        pagina={pagina} 
      />

      {/* Mostrar formulario para crear Usuario */}
      {mostrarCrearUsuario && (
        <CrearEditarUsuario
          crearEditarUsuario={handleCrearUsuario}
          handleCloseModal={handleCloseEditar}
          editar={false}
        />
      )}
      {/*Mostrar la confirmacion del eliminar */}
      {mostrarConfirmar &&(
        <ConfirmarAccionPassword
          handleCloseModal={handleCloseConfirmar}
          funcionEjecutar={borrarUsuario}
          mensaje = {"¿Seguro que desea eliminar el usuario?"}
          mensajeError = {mensaje} 
        />
      )}
    </div>
  );
};

export default AdministrarUsuarios