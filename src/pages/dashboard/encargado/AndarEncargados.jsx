import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import clienteAxios from "../../../config/clienteAxios";
import useAuth from "../../../hooks/useAuth";
import useQuery from "../../../hooks/useQuery";
import FormularioEncargado from "../components/Encargado/FormularioEncargado";
import BarraCambiarPagina from "../components/BarraCambiarPagina";


const AndarEncargados = ({firmados=false}) => {
    const [ lazyLoading, setLazyLoading ] = useState(false);
    const [ formularios, setFormularios ] = useState([]);
    const [ pagina, setPagina ] = useState(1);
    const [ ordenar, setOrdenar ] = useState("Fecha")
    const [ descender, setDescender ] = useState(false);
    const [ flechaActiva, setFlechaActiva ] = useState(true);
    const { auth } = useAuth();
    const { query } = useQuery();
    const navigate = useNavigate();


    //if(cargando)  return;
    const queryCompleto = `?${query}OrdenarPor=${ordenar}&NumeroPagina=${pagina}&Descender=${descender}&Firmados=${firmados}`;
    const cargarDatos = async (queryCompleto="") => {
        try{
            const { data } = await clienteAxios.get(`/Formulario/encargados${queryCompleto}`);
            if(data.$values.length == 0) {
                handleCambiarPagina(-1);
                setFlechaActiva(false);
            }else {
                setFlechaActiva(false);
            }
            setFormularios(data.$values);
        } catch(error) {
            console.log(error);
        }
    }

    const eliminarFormulario = (id) => {
        setFormularios(formularios.filter(f => f.id != id));
    }
    

    useEffect(() => {
        if(auth?.rol != "encargado") {
            navigate("/");
            return;
        }  
        setLazyLoading(true) 
    }, [auth])

    useEffect( () =>{
        if(lazyLoading)
        {
            cargarDatos(queryCompleto);
        }
        }, [queryCompleto, lazyLoading])


    const handleOrdenarPor = (ordenarPor) => {
        if(ordenar == ordenarPor){
            setDescender(!descender);
        }
        setOrdenar(ordenarPor);
    }
    const handleCambiarPagina = ( a ) => {
        if(pagina + a <= 0) {
            return;
        }
        setPagina(pagina + a);
    }

    return (
        <div className="md:px-10 lg:px-0 px-4  ">
            <div className="grid grid-cols-4 gap-0 px-4 py-2 ">
                <p 
                    className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm  hover:cursor-pointer"
                    onClick={e => handleOrdenarPor("Nombre")}
                >Nombre y Apellidos</p>
                <p 
                    className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
                    onClick={e => handleOrdenarPor("Carrera")}
                    >Carrera</p>
                <p 
                    className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
                    onClick={e => handleOrdenarPor("Fecha")}
                    >Fecha del Formulario</p>
                <p 
                    className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
                    >Motivo</p>
            </div>
            <hr />
            <div className=" flex flex-col lg:h-[450px]  h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto">
                {formularios.map(formulario => (
                    <FormularioEncargado
                        key={formulario.id}
                        formulario={ formulario }
                        eliminarFormularioFirmado = {eliminarFormulario}
                    />    
                ))}

            </div>

            <BarraCambiarPagina handleCambiarPagina={handleCambiarPagina} flechaActiva={flechaActiva} pagina={pagina} />
        </div>
    )
}

export default AndarEncargados