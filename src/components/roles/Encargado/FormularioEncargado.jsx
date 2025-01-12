
import { useState } from "react";
import FormularioFirmar from "./FormularioFirmar";
import ListaColumnasElementos from "../../common/ListaColumnasElementos";
import PropTypes from "prop-types";

const FormularioEncargado = ( {formulario, filtrarFormulario} ) => {
    const {
        id,
        nombreCompletoEstudiante,
        nombreCarrera,
        motivo,
        fechacreacion
    } = formulario;
    const [ mostrarFirmarFormulario, setMostrarFirmarForulario ] = useState(false);

  return (
    <>

      {mostrarFirmarFormulario && 
        <FormularioFirmar 
          handleCloseModal={() => setMostrarFirmarForulario(false)} 
          id={id}
          filtrarFormulario={filtrarFormulario}
        />}

        <ListaColumnasElementos 
          handleFuncionEjecutar={ () => setMostrarFirmarForulario(true)} 
          elementos={[nombreCompletoEstudiante, nombreCarrera, fechacreacion, motivo]}
        />
    </>
  )
}
FormularioEncargado.propTypes = {
  formulario: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombreCompletoEstudiante: PropTypes.string.isRequired,
    nombreCarrera: PropTypes.string.isRequired,
    motivo: PropTypes.string.isRequired,
    fechacreacion: PropTypes.string.isRequired,
  }).isRequired,
  filtrarFormulario: PropTypes.func.isRequired,
};

export default FormularioEncargado




