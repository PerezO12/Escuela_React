
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import formatearFecha from "../helpers/convertirFechas";
import FormularioFirmar from "./FormularioFirmar";
const FormularioEncargado = ( {formulario} ) => {
    const {
        id,
        nombreCompletoEstudiante,
        nombreCarrera,
        motivo,
        fechacreacion
    }   = formulario;
    const [ mostrarFirmarFormulario, setMostrarFirmarForulario ] = useState(false);
    const navigate = useNavigate();

    const handleMostrarFirmarFormulario = () => {
      setMostrarFirmarForulario(true);
    }
    const handleCloseModal = () => {
      setMostrarFirmarForulario(false);
    }
  return (
    <>
      <div 
        className="relative justify-between items-center px-3 py-2 border shadow-lg bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer5"
        onClick={handleMostrarFirmarFormulario}
      >
          <div 
          className="grid grid-cols-4 gap-0 hover:cursor-pointer"
          
          >
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreCompletoEstudiante}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreCarrera}</p>
              <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{formatearFecha(fechacreacion)}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors truncate">{motivo}</p>
          </div>
      </div>
      <div>
        {mostrarFirmarFormulario && <FormularioFirmar handleCloseModal={handleCloseModal} id={id}/>}
      </div>
    </>
  )
}

export default FormularioEncargado




