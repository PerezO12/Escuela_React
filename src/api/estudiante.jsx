import clienteAxios from "../config/clienteAxios";

//formularios
export const cargarFormularios = async (query) => {
    try{
        const { data } = await clienteAxios.get(`/formulario/estudiantes?${query}`);
        return data.data.$values;
    
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al cargar los formularios. Por favor, inténtalo nuevamente.";
    }
}

export const actualizarFormulario = async (id, motivo) => {
    try{
        const { data } = await clienteAxios.patch(`/formulario/${id}`, {motivo});
        return data.data;
    }catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al actualizar el formulario. Por favor, inténtalo nuevamente.";
    }
}
export const borrarFormulario = async (id) => {
    try{
        const { data } = await clienteAxios.delete(`formulario/${id}`);;
        return data.data;
    }catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al borrar el formulario. Por favor, inténtalo nuevamente.";
    }
}

export const cargarDepartamentosCorrespondientes = async () => {
    try {
        const { data } = await clienteAxios.get('/departamento/correspondientes');
        return data.data.$values;
    } catch (error) {
        throw error.response?.data?.errors;
    }
};

export const crearFormulario = async (formulario) => {
    try {
        const { data } = await clienteAxios.post('/Formulario', formulario);
        return data.data.$values;
    } catch (error) {
        console.log(error);
        console.log(error.response?.data?.errors);
        throw error.response?.data?.errors;
    }
};