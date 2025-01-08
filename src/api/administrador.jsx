import clienteAxios from "../config/clienteAxios";

//carreras
export const cargarCarreras = async (queryCompleto='') => {
    try {
      const { data } = await clienteAxios.get(`/carrera${queryCompleto}`);
      return(data.data.$values);
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al cargar las carreras. Por favor, inténtalo nuevamente.";
    }
};

export const crearCarrera = async (facultad) => {
    try {
        const { data } = await clienteAxios.post(`/carrera`, facultad);
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al crear la carrera. Por favor, inténtalo nuevamente.";
    }
};

export const editarCarrera = async (id, carrera) => {
    try {
        const { data } = await clienteAxios.put(`/carrera/${id}`, carrera);
        return data.data
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar la carrera. Por favor, inténtalo nuevamente.";
    }
};

export const borrarCarrera = async (id, password) => {
    try {
        const { data }= await clienteAxios.delete(`/carrera/${id}`, {
            data: { password } 
        });
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al borrar la carrera. Por favor, inténtalo nuevamente.";
    }
};


//facultades
export const cargarFacultades = async (query="") => {
    try {
      const { data } = await clienteAxios.get(`/facultad${query}`);
      return data.data.$values;
    } catch (error) {
      throw error.response?.data?.errors || "Ocurrió un error al cargar las facultades.";
    }
}

export const crearFacultad = async (nombre) => {
    try {
        const { data } = await clienteAxios.post(`/facultad`, { nombre });
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al crear la facultad.";
    }
};

export const editarFacultad = async ( id, nombre ) =>{
    try{
        const { data } = await clienteAxios.put(`/facultad/${id}`, {nombre});
        return data.data;
    } catch(error){
        throw error.response?.data?.errors || "Ocurrió un error al editar la facultad.";
    }
}

export const borrarFacultad = async ( id, password ) => {
    try{
        const { data } = await clienteAxios.delete(`/facultad/${id}`,{
            data: {password }
          });
        return data.data;
    }catch(error)
    {
        throw error.response?.data?.errors || "Ocurrio un error al borrar la facultad."
    }

}

//departamentos
export const cargarDepartamentos = async (queryCompleto='') => {
    try {
        const { data } = await clienteAxios.get(`/departamento${queryCompleto}`);
        return data.data.$values;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al obtener los departamentos.";
    }
  };


export const borrarDepartamento = async (password, idDepartamento) => {
    try {
        const { data } = await clienteAxios.delete(`/departamento/${idDepartamento}`, {
            data: { password } 
        });
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al borrar el departamento.";
    }
};

export const editarDepartamento = async (id, departamento) => {
    try {
        const { data } = await clienteAxios.put(`/departamento/${id}`, departamento);
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el departamento.";
    }
};

export const crearDepartamento = async (departamento) => {
    try {
        const { data } = await clienteAxios.post(`/departamento`, departamento); 
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al crear el departamento.";
    }
};

//Usuarios
export const cargarUsuarios = async (queryCompleto) => {
    try {
        const { data } = await clienteAxios.get(`/usuario${queryCompleto}`);
        return data.data.$values
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al cargar los usuarios.";
    }
}
export const borrarUsuarios = async (usuarioId, password) => {
    try {
        const { data } = await clienteAxios.delete(`/usuario/${usuarioId}`, {
            data: { password } 
        })
        return data.data
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al borrar el usuario.";
    }
}
export const editarUsuario = async (usuarioId, usuario) => {
    try {
        const { data } = await clienteAxios.patch(`/usuario/${usuarioId}`,usuario);
        return data.data
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}
//todo: arreglar esto
export const crearUsuario = async (usuario) => {
    try {
        let url;
        if(usuario.roles.includes("Encargado"))
            url = "/encargado/registrar-encargado";
        else if(usuario.roles.includes("Estudiante"))
            url = "/estudiante/registrar-estudiante";
        else if(usuario.roles.includes("Admin"))
            url = "/usuario/registrar-admin";

        const { data } = await clienteAxios.post(url, usuario);

        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}

export const cargarDatosUsuario = async (roles, usuarioId) => {
    try {
        let url = "/usuario";
        if(roles.includes("Encargado"))
            url = "/encargado/usuario";
        else if(roles.includes("Estudiante"))
            url = "/estudiante/usuario";
        else if(roles.includes("Admin"))
            url = "/usuario";

        const { data } = await clienteAxios.get(`${url}/${usuarioId}`)
        return data.data
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}
export const cargarRoles = async () => {
    try {
        const { data } = await clienteAxios.get("/rol");
        return data.data.$values;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}