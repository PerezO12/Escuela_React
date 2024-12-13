import { useState, useEffect } from "react";

const EditarUsuario = ({ handleCloseModal, crearEditarUsuario, idUsuario, rolActual }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState(rolActual);
  
    useEffect(() => {
      // Simula una llamada a la API para obtener los datos del usuario por ID
      const fetchUsuario = async () => {
        const usuario = await obtenerUsuarioPorId(idUsuario); // Implementa esta función según tu API
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setRol(usuario.rol);
      };
  
      fetchUsuario();
    }, [idUsuario]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      crearEditarUsuario({ idUsuario, nombre, email, rol });
      handleCloseModal();
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-sm font-medium">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rol" className="block text-sm font-medium">
              Rol
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Administrador">Administrador</option>
              <option value="Encargado">Encargado</option>
              <option value="Estudiante">Estudiante</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="mr-4 px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default EditarUsuario;
  