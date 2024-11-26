import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import useQuery from "../hooks/useQuery";
import FormularioEncargado from "../components/FormularioEncargado";


const AndarEncargados = ({firmados=false}) => {
    const [ formularios, setFormularios ] = useState([]);
    const [ pagina, setPagina ] = useState(1);
    const [ ordenar, setOrdenar ] = useState("Fecha")
    const [ descender, setDescender ] = useState(false);
    const [ flechaActiva, setFlechaActiva ] = useState(true);
    //const { cargando } = useAuth();
    const { query } = useQuery();
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

    useEffect(() => {
        cargarDatos(queryCompleto);
    }, [queryCompleto])

    const handleCambiarPagina = ( a ) => {
        if(pagina + a <= 0) {
            return;
        }
        setPagina(pagina + a);
    }
    const handleOrdenarPor = (ordenarPor) => {
        if(ordenar == ordenarPor){
            setDescender(!descender);
        }
        setOrdenar(ordenarPor);
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
                    />    
                ))}

            </div>

            <div className="flex items-center px-6 lg:py-2 py-1 bg-gray-50 shadow-lg rounded-3xl border">
                <div className="flex-grow flex justify-start">
                    <FaArrowLeft 
                        className="lg:text-4xl text-gray-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-125" 
                        onClick={() => handleCambiarPagina(-1)}
                    />
                </div>
                <p className="lg:text-3xl text-xl">{pagina}</p>
                <div className="flex-grow flex justify-end">
                    {flechaActiva && (
                        <FaArrowRight 
                            className="lg:text-4xl text-gray-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-125" 
                            onClick={() => handleCambiarPagina(1)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AndarEncargados