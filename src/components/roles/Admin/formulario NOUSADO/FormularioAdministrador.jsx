import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import convertirFechas from '../../helpers/convertirFechas';
import FormularioDetallesAdministrador from './FormularioDetallesAdministrador';

const FormularioAdministrador = ({formulario}) => {
    const {
        id,
        nombreEstudiante,
        nombreEncargado,
        nombreDepartamento,
        nombreCarrera,
        fechacreacion,
        firmado
    }   = formulario;
    const [ mostrarDetallesFormulario, setMostrarDetallesFormulario ] = useState(false);
    const navigate = useNavigate();

    const CargarDatos = () => {
        setMostrarDetallesFormulario(true);
    }
    const handleCloseModal = () => {
      setMostrarDetallesFormulario(false);
    }
  return (
    <>
      <div 
        className="relative justify-between items-center px-3 py-2   bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer5"
        onClick={CargarDatos}
      >
          <div 
            className="lg:grid lg:grid-cols-6 lg:gap-12  hover:cursor-pointer"  
          >
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreEstudiante}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreCarrera}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreEncargado}</p>
              <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombreDepartamento}</p>
              <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{convertirFechas(fechacreacion)}</p>
              <div className='flex items-center relative'>
                <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">
                    {firmado ? 'Si' : 'No'}
                </p>
                
            </div>
          </div>
      </div>
      <div>
        {mostrarDetallesFormulario &&
            (<FormularioDetallesAdministrador handleCloseModal={handleCloseModal} id={id} />)}

      </div>
    </>
  )
}

export default FormularioAdministrador