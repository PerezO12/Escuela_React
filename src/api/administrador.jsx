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