import clienteAxios from "../config/clienteAxios";

//formularios
export const cargarFormularios = async (query) => {
    try{
        const { data } = await clienteAxios.get(`/Formulario/estudiantes?${query}`);
        return data.data;
    
    } catch(error) {
        throw error.response?.data?.errors || "Ocurrió un error al cargar los formularios. Por favor, inténtalo nuevamente.";
    }
}