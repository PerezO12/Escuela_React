import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { TfiReload } from "react-icons/tfi";

import generarPassword from "../../../../utils/generarPassword";
//import validarCampos from "../../../../utils/validarCampos";
import Mensaje from "../../../common/Mensaje";
import NombreEditeInput from "../../../FormInput/NombreEditeInput";
import NombreUsuarioInput from "../../../FormInput/NombreUsuarioInput";
import EmailInput from "../../../FormInput/EmailInput";
import CarnetIdentidadInput from "../../../FormInput/CarnetIdentidadInput";
import PasswordInput from "../../../FormInput/PasswordInput";
import SelectorRolInput from "../../../FormInput/SelectorRolInput";
import FacultadesSelector from "../../../FormInput/FacultadesSelector";
import CarreraSelector from "../../../FormInput/CarreraSelector";
import DepartamentoSelector from "../../../FormInput/DepartamentoSelector";
import { errorMapper } from "../../../../utils/errorMapper";
import { cargarCarreras, cargarDatosUsuario, cargarDepartamentos, cargarFacultades, cargarRoles, crearUsuario, editarUsuario} from "../../../../api/administrador"
import useBusquedaYEstado from "../../../../hooks/useBusquedaYestado";

//TODO: importante hacer maravillas para mejorar esta basura
//todo: se queda para mañana*******************************************+++
const CrearEditarUsuario = ({ 
  handleCloseModal, 
  crearEditarUsuario, 
  usuario = {}
  }) => {
    const { setMostrarConfirmar, mensaje, setMensaje } = useBusquedaYEstado();

    const [ roles, setRoles] = useState([]);
    const [ carreras, setCarreras ] = useState([]);
    const [ departamentos, setDepartamentos ] = useState([]);
    const [ facultades, setFacultades ] = useState([]);
    
    const [usuarioNuevo, setUsuarioNuevo] = useState({
      nombreCompleto: "",
      userName: "",
      email: "",
      password: generarPassword(15),
      carreraId: 0,
      facultadId: 0,
      departamentoId:0,
      roles: [],
      carnetIdentidad:"",
    });
    const editar = usuario && usuario.id;
    
    
    const handleChangeUserNuevo = (clave, value) => {
      setUsuarioNuevo((prev) => ({ ...prev, [clave]: value }));
    };
    
    const cargarDetallesUsuario = useCallback(async () => {
      try {
        const data = await cargarDatosUsuario(usuario.roles.$values,usuario.id);
        setUsuarioNuevo({
          nombreCompleto: data.nombreCompleto,
          userName: data.userName,
          email: data.email,
          carnetIdentidad: data.carnetIdentidad,
          facultadId: data.facultad?.id || 0,
          carreraId: data.carrera?.id || 0,
          departamentoId: data.departamento?.id || 0,
          roles: data.roles?.$values || "",
          password: "",
        });
      } catch (error) {
        setMensaje(errorMapper(error)?.values);
      }
    }, [usuario.id, usuario.roles, setMensaje]);

  const obtenerRoles = useCallback (async () => {
    try {
      const data = await cargarRoles();
      const rolesFiltrados = data?.filter(r => r.name !== "Profesor");//voy a filtar el de profesor xq aun no lo tengo configurado
      setRoles(rolesFiltrados)
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
    }
  }, [setMensaje])

  const obtenerFacultades = useCallback (async () => {
    try {
      const data = await cargarFacultades();
      setFacultades(data);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
    }
  }, [setMensaje])

  const obtenerCarrearas = useCallback (async (facultadId) => {
      try {
        const data = await cargarCarreras(`?FacultadId=${facultadId}`);
        setCarreras(data);
      } catch (error) {
        setMensaje(errorMapper(error)?.values);
      } 
  }, [setMensaje]);


  const obtenerDepartamentos = useCallback (async (facultadId) => {
    try {
      const data = await cargarDepartamentos(`?FacultadId=${facultadId}`);
      setDepartamentos(data);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
    } 
  }, [setMensaje])

  /* Funcion para crear el usuario */
  const handleCrearUsuario = async () => {
    try{
      const data = await crearUsuario(usuarioNuevo);

      crearEditarUsuario(data);
      setMostrarConfirmar(false);
      setMensaje("Usuario creado exitosamente.");
      setTimeout(() => handleCloseModal(),600)
    } 
    catch (error) {

      setMensaje(errorMapper(error)?.values);
    }
  }
  /* Funcion para editar el usuario */
  const handleEditarUsuario = async () => {
    try {
      const data = await editarUsuario(usuario.id, usuarioNuevo);
      crearEditarUsuario(data);
      setMensaje("El usuario se actualizó exitosamente.")
      setTimeout(()=> handleCloseModal(), 600);
    }
    catch(error){
      setMensaje(errorMapper(error)?.values);
    }
  } 
  /* funcion par validar campos antes de llamarlo */
  const handleEnviarFormulario = async (e) => {
    e.preventDefault();
    //todo:Falta crear funcion para validar campos
    editar
      ? handleEditarUsuario()
      : handleCrearUsuario();
  };

  //obtiene roles facultades, y carga los datos del usuario si se esta editando
  useEffect(()=>{
    obtenerRoles();
    obtenerFacultades();
    if (editar) cargarDetallesUsuario();
  }, [editar, obtenerRoles, obtenerFacultades, cargarDetallesUsuario])

  /* la idea es q una ves q se identifique el rol determine los datos q tiene  q cargar */
  useEffect(() => {
    if (usuarioNuevo.facultadId && usuarioNuevo.roles == "Estudiante") obtenerCarrearas(usuarioNuevo.facultadId);
    if (usuarioNuevo.facultadId && usuarioNuevo.roles == "Encargado" ) obtenerDepartamentos(usuarioNuevo.facultadId);
  }, [usuarioNuevo.facultadId,usuarioNuevo.roles, obtenerCarrearas, obtenerDepartamentos, ]);

  /*borrar el mensahe automaticamente  */
  useEffect(() => {
    if (mensaje) {
        const timer = setTimeout(() => setMensaje(""), 5000);
        return () => clearTimeout(timer);
    }
  }, [mensaje, setMensaje]);
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        {/* Botón de cierre */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition duration-300 text-3xl"
        >
          &times;
        </button>
  
        {/* Título */}
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          {editar ? "Editar" : "Crear"} Usuario
        </h2>
        <Mensaje msg = {mensaje}/>
  
        {/* Formulario */}
        <form
          className="space-y-6 mb-2"
          onSubmit={(e) => handleEnviarFormulario(e)}
        >
          {/* Nombre y Apellidos */}
          <NombreEditeInput
            value={usuarioNuevo.nombreCompleto}
            onChange={(e) => handleChangeUserNuevo("nombreCompleto", e.target.value)}
          />
          {/* Nombre de usuario */}
          <NombreUsuarioInput
            value={usuarioNuevo.userName}
            onChange={(e) => handleChangeUserNuevo("userName", e.target.value)}
          />
          {/* Email */}
          <EmailInput
            value={usuarioNuevo.email}
            onChange={(e) => handleChangeUserNuevo("email", e.target.value)}
            placeholder="Email"
          />
          {/* Carnet identidad */}
          <CarnetIdentidadInput
            value={usuarioNuevo.carnetIdentidad}
            onChange={(e) => handleChangeUserNuevo("carnetIdentidad", e.target.value)}
          />
          {/* Password y generarlo automatico*/}
          <div>
            <PasswordInput
              value={usuarioNuevo.password}
              required = {!editar}
              onChange={(e) => handleChangeUserNuevo("password", e.target.value)}
              placeholder="Contraseña del usuario"
            />
            <TfiReload 
              className="ml-3 mt-1 text-xl text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
              onClick={() => handleChangeUserNuevo("password", generarPassword(15))}
            >Generar Contraseña</TfiReload >
          </div>
  
          {/* Roles */}
          <SelectorRolInput
            roles={roles}
            value={usuarioNuevo.roles}
            onChange={(e) => handleChangeUserNuevo("roles", [e.target.value])}
          />
  
          {(usuarioNuevo.roles.includes("Estudiante") || usuarioNuevo.roles.includes("Encargado")) && (
            <>
              {/* Facultades */}
              <FacultadesSelector
                facultades={facultades}
                value={usuarioNuevo.facultadId}
                onChange={(e) => handleChangeUserNuevo("facultadId", e.target.value)}
              />
              {/* Carreras */}
              {usuarioNuevo.roles.includes("Estudiante") && (
                <CarreraSelector
                  carreras={carreras}
                  value={usuarioNuevo.carreraId}
                  onChange={(e) => handleChangeUserNuevo("carreraId", e.target.value)}
                  disabled={usuarioNuevo.facultadId === 0}
                />
              )}
              {/*Departamentos */}
              {usuarioNuevo.roles.includes("Encargado") && (
                <DepartamentoSelector
                  departamentos={departamentos}
                  value={usuarioNuevo.departamentoId}
                  onChange={(e) => handleChangeUserNuevo("departamentoId", e.target.value)}
                  disabled={usuarioNuevo.facultadId === 0}
                />
              )}
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {editar ? "Editar" : "Crear"} Usuario
          </button>
        </form>
        <Mensaje msg={mensaje}/>
      </div>
    </div>
  );
}  

CrearEditarUsuario.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  crearEditarUsuario: PropTypes.func.isRequired,
  usuario: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombreCompleto: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    roles: PropTypes.object,
  })
};

export default CrearEditarUsuario;
