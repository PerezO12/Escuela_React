import { useState,useRef, useEffect } from "react";

import convertirFechas from "../../../utils/convertirFechas";
import { actualizarFormulario, borrarFormulario } from "../../../api/estudiante";
import { errorMapper } from "../../../utils/errorMapper";
import ConfirmarAccionPassword from "../../common/ConfirmarAccionPassword";
import PropTypes from "prop-types";

//todo:arreglar este componente luego
const FormularioEstudiante = ( { 
    formulario, 
    editarArregloFormulario,
    borrarFormularioDelArreglo 
}) => {
const { id, nombreEncargado, nombreDepartamento, firmado, motivo, fechafirmado, fechacreacion } = formulario;

    const [ isEditing, setIsEditing ] = useState(false);
    const [ motivoEditado, setMotivoEditado ] = useState(motivo);
    const [ mensaje, setMensaje ] = useState(""); 
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

    const textareaRef = useRef(null);

    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleEliminar = async () => {
        setMostrarConfirmar(false);
        try {
            await borrarFormulario(id);
            borrarFormularioDelArreglo(id);
        }
        catch(error) {
            setMensaje(errorMapper(error)?.values);
            setTimeout(() => setMensaje(""), 6000);
        }
    } 

    useEffect(() => {
        if (isEditing) {
            textareaRef.current.focus();
        }
    }, [isEditing]);

    const handleEditarFormulario = async () => {
        //todo:cambiar este alert
        if(motivoEditado.length < 5 || motivoEditado.length > 1000) {
            alert("El motivo no es válido (5 y 1000)");
        }
        try{
            const data = await actualizarFormulario(id, motivoEditado);
            setIsEditing(false);
            editarArregloFormulario(data);
        }catch(error) {
            setMensaje(errorMapper(error)?.values);
            setTimeout(() => setMensaje(""), 6000);
        }
    }

    return(
        <div className="lg:mx-auto mx-12 lg:my-2 px-5 py-5 md:my-2 my-10 bg-white shadow-md rounded-xl lg:w-3/4  md:w-auto">

                <p className="font-bold mb-3 text-gray-700 uppercase">Nombre del Encargado: {""}
                    <span className="font-normal normal-case">{ nombreEncargado }</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Departamento: {""}
                    <span className="font-normal normal-case">{ nombreDepartamento }</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Firmado: {""}
                    <span className="font-normal normal-case">{ firmado ? 'Si' : 'No' }</span>
                </p>
                {fechafirmado && (
                <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Firmado: {""}
                    <span className="font-normal normal-case">{ convertirFechas(fechafirmado) }</span>
                </p>
                )}
                
                <p className="font-bold mb-3 text-gray-700 uppercase">Creado: {""}
                    <span className="font-normal normal-case">{ convertirFechas(fechacreacion) }</span>
                </p>
                {isEditing
                ?    (<>
                        <p className="font-bold mb-3 text-gray-700 uppercase">Motivo: {""}</p>
                        <textarea 
                            ref={textareaRef}
                            value={motivoEditado}
                            onChange={(e) => setMotivoEditado(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                            rows="5"
                            placeholder="Describa el motivo del formulario"
                        /> 
                    </>)
                :    (<p className="font-bold mb-3 text-gray-700 uppercase">Motivo: {""}
                        <span className="font-normal normal-case">{ motivo }</span>
                    </p>)
                }
                
                <div className="flex justify-between mt-10">

                {isEditing 
                ?   (<button
                        type="button"
                        className='py-2 px-10 bg-red-600 hover:bg-red-700
                             text-white font-bold uppercase rounded-lg'
                        onClick={() => {
                            setIsEditing(false);
                            setMotivoEditado(motivo);
                        }}
                    >
                        Cancelar
                    </button>)    
                :    (<button
                        type="button"
                        className={`py-2 px-10 ${firmado 
                            ?  'bg-zinc-400'
                            :'bg-indigo-600 hover:bg-indigo-700'
                        } text-white font-bold uppercase rounded-lg`}
                        disabled={firmado}
                        onClick={handleEdit}
                    >Editar
                    </button>)
                }

                {isEditing 
                ?   (<button
                        type="button"
                        className={`py-2 px-10 ${
                            motivo == motivoEditado 
                                ? 'bg-zinc-400'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                        } text-white font-bold uppercase rounded-lg`}
                        disabled= {motivo == motivoEditado}
                        onClick={handleEditarFormulario}
                    >
                        Guardar
                    </button>)
                :   (<button
                        type="button"
                        className={`py-2 px-10 ${
                            firmado 
                                ? 'bg-zinc-400'
                                : 'bg-red-600 hover:bg-red-700'
                        } text-white font-bold uppercase rounded-lg`}
                        disabled= {firmado}
                        onClick={() => setMostrarConfirmar(true)}
                    >
                        Eliminar
                    </button>)}
                </div> 
                {mostrarConfirmar &&(
                    <ConfirmarAccionPassword
                        funcionEjecutar={handleEliminar} 
                        handleCloseModal={() => setMostrarConfirmar(false)} 
                        mensaje={"¿Está seguro que desea borrar el formulario?"}
                        mensajeError= {mensaje}
                        alerta={"Si borra el formulario no se podrá restaurar"}
                        requiredPassword={false} 
                    />
                )}
            </div>
    )
}
FormularioEstudiante.propTypes = {
    formulario: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nombreEncargado: PropTypes.string.isRequired,
        nombreDepartamento: PropTypes.string.isRequired,
        firmado: PropTypes.bool.isRequired,
        motivo: PropTypes.string.isRequired,
        fechafirmado: PropTypes.string,
        fechacreacion: PropTypes.string.isRequired
    }).isRequired,
    editarArregloFormulario: PropTypes.func.isRequired,
    borrarFormularioDelArreglo: PropTypes.func.isRequired
}

export default FormularioEstudiante




