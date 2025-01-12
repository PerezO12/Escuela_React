import clienteAxios from "../config/clienteAxios";

//formularios
export const cargarFormularios = async (queryCompleto="") => {
    try{
        const { data } = await clienteAxios.get(`/formulario/encargados${queryCompleto}`);
        return data.data.$values;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}

export const cargarFormularioById = async (id) => {
    try {
        const { data } = await clienteAxios.get(`/formulario/encargados/${id}`);
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
};

export const firmarFormulario = async (id, llavePrivada) => {
    try {
        const { data } = await clienteAxios.patch(`formulario/firmar/${id}`, {llavePrivada});
        return data.data;
    } catch (error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
};

export const borrarFormulario = async (formularioId) => {
    try{
        //const { data } = await clienteAxios.get(`/formulario/encargados${queryCompleto}`);
        //return data.data.$values;
        console.log("borrando, id: ", formularioId);
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}

//Llaves publica y privada

export const generarLlaves = async (password) => {
    try{
        const { data } = await clienteAxios.post("/Encargado/generar-llaves", {password})
        return data.data;
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}
export const cambiarLlavePublica = async (objeto) => {
    try{
        const { data } = await clienteAxios.post('/Encargado/cambiar-llave', objeto);
        return data.data;
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al editar el usuario.";
    }
}
