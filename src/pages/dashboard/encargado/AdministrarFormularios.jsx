import { useState, useEffect, useCallback } from "react";
import FormularioEncargado from "../../../components/roles/Encargado/FormularioEncargado";
import useBusquedaYEstado from "../../../hooks/useBusquedaYestado";
import useBusqueda from "../../../hooks/useBusqueda";
import { borrarFormulario, cargarFormularios } from "../../../api/encargado";
import { errorMapper } from "../../../utils/errorMapper";
import ListaColumnasOrdenar from "../../../components/common/ListaColumnasOrdenar";
import Alerta from "../../../components/common/Alerta";
import ListaGenerica from "../../../components/common/ListaGenerica";
//import ConfirmarAccionPassword from "../../../components/common/ConfirmarAccionPassword";


const AdministrarFormularios = () => {
    const {
        //mostrarConfirmar,
        setMostrarConfirmar,
        //mostrarFormulario,
        setMostrarFormulario,
        //mensaje,
        setMensaje,
        alerta,
        setAlerta,
        handleOrdenarPor,
        handleActualizarPagina,
        //handleCloseConfirmar,
        generarQueryCompleto,
      } = useBusquedaYEstado();
      const { buscar, setOpciones } = useBusqueda();

    const [ formularios, setFormularios ] = useState([]);
    const [queryCompleto, setQueryCompleto] = useState(generarQueryCompleto(""));

    const cargarDatos = useCallback (async () => {
        try{
            const data = await cargarFormularios(queryCompleto);
            setFormularios(data);
            setAlerta("");
        } catch(error) {
            setAlerta(errorMapper(error)?.values);
        }
    }, [setAlerta, queryCompleto]);

    useEffect(() => {
        cargarDatos();
        setQueryCompleto(generarQueryCompleto(`${buscar.buscarPor}=${buscar.busqueda}`));
    }, [cargarDatos, buscar.busqueda, buscar.buscarPor, generarQueryCompleto]);
    
    //opciones de busqueda
    //todo:cambiar opciones
    useEffect(() => {
        setOpciones(["Nombre", "Usuario", "Email", "CarnetIdentidad"]);
    }, [setOpciones]);

    const filtrarFormulario = (id) => {
        setFormularios(formularios.filter(f => f.id != id));
    }
    const handleEliminarFormulario = async (id) => {
        try {
          await borrarFormulario(id);
          filtrarFormulario(id);
          setMensaje("El formulario fue borrado exitosamente");
          setTimeout(() => {
            setMensaje("");
            setMostrarConfirmar(false);
          }, 600);
        } catch (error) {
          setMensaje(errorMapper(error)?.values);
        }
      };
    
    const handleDelete = (id) => {
        handleEliminarFormulario(id)
        setMostrarConfirmar(true);
    };

    return (
        <div className="md:px-10 lg:px-0 px-4  ">
            {/* Lista Columnas Ordenar */}
            <ListaColumnasOrdenar
                handleOrdenarPor={handleOrdenarPor} 
                columnas={[
                { ordenar: "Nombre", titulo: "Nombre y Apellidos" },
                { ordenar: "Carrera", titulo: "Carrera" },
                { ordenar: "Fecha", titulo: "Fecha del Formulario" },
                { ordenar: "", titulo: "Motivo" },
                ]} 
                classNameDiv={`grid grid-cols-4 lg:gap-20 px-4 py-2`}
            />
            <hr />
            {/* Errores */}
            {alerta && <Alerta msg={alerta}/>}

            {/* Mostrar Formularios */}
            <ListaGenerica
                elementos={formularios}
                renderItem={(formulario) => (
                <FormularioEncargado
                    formulario={ formulario }
                    filtrarFormulario={filtrarFormulario}
                />
                )}
                onDelete={handleDelete}
                handleCambiarPagina={handleActualizarPagina}
                setMostrarFormulario={setMostrarFormulario}
                mostrarDivCrear={false}
            />

            {/* {mostrarConfirmar &&(
                <ConfirmarAccionPassword
                handleCloseModal={handleCloseConfirmar}
                funcionEjecutar={handleBorrarUsuario}
                mensaje = {"¿Seguro que desea eliminar el usuario?"}
                mensajeError = {mensaje}
                alerta="Tenga en cuenta que si elimina el usuario no se podrá restaurar." 
                />
            )} */}
        </div>
    )
}

export default AdministrarFormularios