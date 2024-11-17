const Formulario = ( { formulario }) => {
    const { 
        nombreCompleto,
        carnetIdentidad, 
        nombreCarrera, 
        nombreFacultad,
        departamento, 
        firmado,
        fechacreacion 
    } = formulario;

/*     const handleEliminar = () => {
        const respuesta = confirm("Desea eliminar este paciente?"); 
        if(respuesta) {
            eliminarPacienteID(id);
        }
    } */
    return(
        <div className="mx-2 my-10 bg-white shadow-md px-5 py-5 rounded-xl w-full">
                <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {""}
                    <span className="font-normal normal-case">{ nombreCompleto }</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Carnet Identidad: {""}
                    <span className="font-normal normal-case">{ carnetIdentidad }</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Carrera: {""}
                    <span className="font-normal normal-case">{ nombreCarrera }</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Facultad: {""}
                    <span className="font-normal normal-case">{ nombreFacultad }</span>
                </p>

                <p className="font-bold mb-3 text-gray-700 uppercase">Departamento: {""}
                    <span className="font-normal normal-case">{ departamento }</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Firmado: {""}
                    <span className="font-normal normal-case">{ firmado ? 'Si' : 'No' }</span>
                </p>
                <p className="font-bold mb-3 text-gray-700 uppercase">Fecha Creado: {""}
                    <span className="font-normal normal-case">{ fechacreacion }</span>
                </p>

                <div className="flex justify-between mt-10">
                    <button
                        type="button"
                        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white
                        font-bold uppercase rounded-lg"
                        //onClick={ () => setFormulario(formulario)}
                    >Editar
                    </button>

                    <button
                        type="button"
                        className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white
                        font-bold uppercase rounded-lg"
                        //onClick={ handleEliminar}
                    >Eliminar
                    </button>
                </div>

            </div>
    )
}

export default Formulario