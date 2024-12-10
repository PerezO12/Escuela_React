import { useState, useEffect } from "react";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import clienteAxios from "../../config/clienteAxios";
import generarPassword from "../../helpers/generarPassword";
import ConfirmarAccionPassword from "./ConfirmarAccionPassword";

const CrearEditarUsuario = ({ handleCloseModal, crearEditarUsuario, editar = false, idUsuario, rolActual="" }) => {
  
  const [ mostrarPassword, setMostrarPassword ] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ mensaje, setMensaje ] = useState("");
  const [ mostrarConfirmar, setMostrarConfirmar ] = useState(false);

  const [ roles, setRoles] = useState([]);
  const [ carreras, setCarreras] = useState([]);
  const [ departamentos, setDepartamentos ] = useState([]);
  const [ facultades, setFacultades] = useState([]);

  
  const [ rol, setRol ]= useState(rolActual[0] || "");
  const [ carreraId, setCarreraId ] = useState(0);
  const [ departamentoId, setDepartamentoId ] = useState(0);
  const [ facultadId, setFacultadId ] = useState(0);

  const [ carreraNombre, setCarreraNombre] = useState("");
  const [ departamentoNombre, setDepartamentoNombre ] = useState("")
  const [ carnetIdentidad, setCarnetIdentidad ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ facultadNombre, setFacultadNombre ] = useState("");
  const [ password, setPassword ] = useState(generarPassword(15));//genera password de 15 caracteres
  const [ nombreCompleto, setNombreCompleto ] = useState("");
  const [ userName, setUserName ] = useState("");


  const cargarDatosUsuario = async () => {
    try{
      const url = (rolActual == "Admin" || rolActual == "Profesor")? "" : `${rolActual}/`
      const { data } = await clienteAxios.get(`/${url}usuario/${idUsuario}`)
      //Mapeo de los valores del usuario
      setNombreCompleto(data.nombreCompleto);
      setCarnetIdentidad(data.carnetIdentidad);
      setEmail(data.email);
      setUserName(data.nombreUsuario);
      setFacultadNombre(data?.facultadNombre || data?.nombreFacultad ||"");
      setCarreraNombre(data?.nombreCarrera || "");
      setDepartamentoId(data?.departamentoId);
      setDepartamentoNombre(data?.departamentoNombre || "");
      setPassword("");
      setMensaje("");
      setIsLoading(false);
    } catch(error){
      console.error("Error al cargar datos del usuario: ", error)
      setMensaje("Error");
    }
  }

  const obtenerRoles = async () => {
    try {
      const { data } = await clienteAxios.get("/Rol");
      //voy a filtar el de profesor xq aun no lo tengo cfondigurado
      const rolesFiltrados = data?.$values.filter(r => r.name !== "Profesor");
      if(editar) {
        const rolEncontrado = data.$values.find(r => r.name == rolActual);
        setRol(rolEncontrado?.name);
      } 
      setRoles(rolesFiltrados)
      setMensaje("");
    } catch (error) {
      console.log(error);
      setMensaje("No se han podido obtener los roles. Intentelo más tarde");
    }
  }

  const obtenerFacultades = async () => {
    try {
      const { data } = await clienteAxios.get("/Facultad/");

      if(editar) {
        const facultadEncontrada = data.$values.find(fac => fac.nombre === facultadNombre);
        setFacultadId(facultadEncontrada?.id || "");
      } 
      setFacultades(data.$values);
    } catch (error) {
      console.log(error);
    }
  }

  const obtenerCarrearas = async (facultadId) => {
      try {
        const { data } = await clienteAxios.get(`/Carrera?FacultadId=${facultadId}`);
        if(editar) {
          const carreraEncontrada = data.$values.find(carrera => carrera.nombre === carreraNombre);
          setCarreraId(carreraEncontrada?.id || data?.$values[0]?.id);
        }
        setCarreras(data.$values);
        setMensaje("");
      } catch (error) {
        console.log(error);
        setMensaje("Error al obtener las carreras. Intentelo más tarde.")
      } 
    }
  const obtenerDepartamentos = async (facultadId) => {
    try {
      const { data } = await clienteAxios.get(`/Departamento?FacultadId=${facultadId}`);
      if(editar) {
        const departamentoEncontrado = data.$values.find(departa => departa.nombre === departamentoNombre);
        setDepartamentoId(departamentoEncontrado?.id || data?.$values[0]?.id);
      }
      setDepartamentos(data.$values);
      setMensaje("");
    } catch (error) {
      console.log(error);
      setMensaje("Error al obtener los departamentos. Intentelo más tarde.")
    } 
  }

  const handleEnviarFormulario = async (passwordAdmin) => {
    console.log(passwordAdmin);
    const usuario = {
      nombreUsuario: userName,
      email,
      password,
      nombreCompleto,
      carnetIdentidad,
      carreraId,
      facultadId,
      roles: [rol],
      departamentoId,
      passwordAdmin
    }
    if(editar) {
      //crearEditarUsuario(usuario)
      await editarUsuario(usuario);
    } else { //para crear
        await crearUsuario(usuario);
    }
  }
  const handleCloseConfirmar = () => {
    setMostrarConfirmar(false);
  }

  const crearUsuario = async (usuario) => {
    try{
      const { data } = await clienteAxios.post(`/account/registrar/${rol}`, usuario);
      crearEditarUsuario(data);
      setMostrarConfirmar(false);
      setMensaje("Usuario creado exitosamente");

      setTimeout(() => {
        setMensaje("");
        handleCloseModal();
      }, 2000)
    } 
    catch (error) {
      //todo: mejorar esto
      //POSIBLES VALIDACIONES
      const errores = error.response?.data?.errors || error.response?.data?.msg;
      console.log(error);
      console.log("se rompio")
      if(error.status == 401 && errores?.includes("Contraseña"))
      {
        setMensaje("Contraseña incorrecta");
        setTimeout(() => {
          setMensaje("");
        }, 3000);
      } 
      else{
        setMostrarConfirmar(false);
        console.log(mostrarConfirmar)
      }
      if(errores?.CarnetIdentidad) {
        setMensaje("El carnet de identidad no es válido");
      }
      else if(errores?.NombreCompleto) {
        setMensaje("El nombre no es válido")
      }
      else if(errores?.description?.includes("Username")) {
        setMensaje("El nombre de usuario no es válido")
      }
      else if(errores?.description?.includes("Password")) {
        setMensaje("La contraseña no es válida")
      }
      else{
        setMensaje(errores?.$values[0]?.description || "Ocurrio un error");
        console.log(error.response.data);
      }
      setTimeout(() => {
        setMensaje("")
      }, 4000);
      
    }
  }
  const editarUsuario = async (usuario) => {
    try {
      const { data } = await clienteAxios.patch(`/Usuario/${idUsuario}`,usuario);
      usuario.id = idUsuario
      //TODO ARREGLAR LUEGO PUEDE LLEVAR  AlgUN ERROR
      delete usuario.password
      usuario.roles.$values = usuario.roles
      crearEditarUsuario(usuario);
      setMensaje("El usuario se actualizo exitosamente")
      setTimeout(()=> {
        setMensaje("")
        handleCloseModal();
      }, 2000);
    }
    catch(error){
      //todo:Arreglar luego
      console.log(error.response.data);
      setMensaje("Ocurrio un error, revisa la consola")
    }
  }  

  //obtiene roles y carga los datos del usuario si se esta editando
  useEffect(()=>{
    obtenerRoles();
    if(editar){
       cargarDatosUsuario();
    } else {
      setIsLoading(false);
    }
  }, [])

  //obtiene las facultades si el usuario es un estudiante
  useEffect(() => {
    if(!isLoading && rol != "Admin") obtenerFacultades();
    //todo:trabajador
  }, [isLoading, rol]);

  useEffect(() => {
    if (facultadId && rol == "Estudiante") obtenerCarrearas(facultadId);
    if (facultadId && rol == "Encargado" ) obtenerDepartamentos(facultadId);
  }, [facultadId]);

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
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          {editar ? "Editar" : "Crear"} Usuario
        </h2>
  
        {/* Formulario */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setMostrarConfirmar(true);
          }}
        >
          <div>
            <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">
              Nombre y Apellidos:
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre y apellido"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label htmlFor="user" className="block text-lg font-medium text-gray-700 mb-2">
              Nombre Usuario:
            </label>
            <input
              id="user"
              type="text"
              placeholder="Usuario"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
  
          <div>
            <label htmlFor="ci" className="block text-lg font-medium text-gray-700 mb-2">
              CI:
            </label>
            <input
              id="ci"
              type="text"
              placeholder="Carnet de Identidad"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              value={carnetIdentidad}
              onChange={(e) => setCarnetIdentidad(e.target.value)}
              required
            />
          </div>
  
          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              Contraseña:
            </label>
            <div className="relative">
              <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                placeholder="Contraseña del usuario"
                className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!editar}
              />
              {mostrarPassword ? (
                <LiaEyeSolid
                  className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                  onClick={(e) => setMostrarPassword(false)}
                />
              ) : (
                <LiaEyeSlashSolid
                  className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                  onClick={(e) => setMostrarPassword(true)}
                />
              )}
            </div>
            // TODO: cambiaricono
            <LiaEyeSolid
              className="ml-3 mt-1 text-xl text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
              onClick={e => setPassword(generarPassword(15))}
            >Generar Contraseña</LiaEyeSolid>
          </div>
  
          {/* Roles */}
          <div>
            <label htmlFor="rol" className="block text-lg font-medium text-gray-700 mb-2">
              Rol:
            </label>
            <select
              id="rol"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="" disabled>Seleccione un Rol</option>
              {roles?.length > 0 ? (
                roles.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))
              ) : (
                <option disabled>Cargando roles...</option>
              )}
            </select>
          </div>
  
          {(rol == "Estudiante" || rol == "Encargado") && (
            <>
              {/* Facultades */}
              <div>
                <label htmlFor="facultad" className="block text-lg font-medium text-gray-700 mb-2">Facultad:</label>
                <select
                  id="facultad"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                  value={!facultadId || facultadId === 0 ? "" : facultadId}
                  onChange={(e) => {
                    setFacultadId(e.target.value);
                    setCarreraId(0);
                  }}
                  required
                >
                  <option value="" disabled>Seleccione una facultad</option>
                  {facultades.map((fac) => (
                    <option key={fac.id} value={fac.id}>
                      {fac.nombre}
                    </option>
                  ))}
                </select>
              </div>
  
              {rol === "Estudiante" && (
                <div>
                  <label htmlFor="carrera" className="block text-lg font-medium text-gray-700 mb-2">Carreras:</label>
                  <select
                    id="carrera"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                    value={!carreraId || carreraId === 0 ? "" : carreraId}
                    onChange={(e) => setCarreraId(e.target.value)}
                    disabled={!facultadId || facultadId === 0}
                    required
                  >
                    <option value="" disabled>Seleccione una carrera</option>
                    {carreras.map((carr) => (
                      <option key={carr.id} value={carr.id}>
                        {carr.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/*Departamento */}
              {rol === "Encargado" && (
                <div>
                  <label htmlFor="departamento" className="block text-lg font-medium text-gray-700 mb-2">Departamentos:</label>
                  <select
                    id="departamento"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                    value={!departamentoId || departamentoId === 0 ? "" : departamentoId}
                    onChange={(e) => setDepartamentoId(e.target.value)}
                    disabled={!facultadId || facultadId === 0}
                    required
                  >
                    <option value="" disabled>Seleccione un departamento</option>
                    {departamentos.map((dep) => (
                      <option key={dep.id} value={dep.id}>
                        {dep.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}
  
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {editar ? "Editar" : "Crear"} Usuario
          </button>
        </form>
  
        <p className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
          {mensaje}
        </p>
      </div>
      {mostrarConfirmar && (
        <ConfirmarAccionPassword
          handleCloseModal={handleCloseConfirmar}
          funcionEjecutar={handleEnviarFormulario}
          mensaje = {"Necesitamos su contraseña"}
          mensajeError = {mensaje}
          accion = {"Confirmar"}
        />
      )}
    </div>
  );
}  
export default CrearEditarUsuario