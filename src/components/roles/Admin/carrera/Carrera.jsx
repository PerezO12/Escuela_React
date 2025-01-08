import PropTypes from 'prop-types';
import { useState} from 'react'
import convertirFechas from '../../../../utils/convertirFechas';
import CrearEditarCarrera from './CrearEditarCarrera'
import ListaColumnasElementos from '../../../common/ListaColumnasElementos';

const Carrera = ( { carrera, editarCarrera }) => {
    const { nombre, fechaCreacion, facultad } = carrera;
    const [ mostrarEditar, setMostrarEditar ] = useState(false);
    const handleCloseModal = () => {
        setMostrarEditar(false);
    };
    return (
        <div>
            {mostrarEditar && (
                <CrearEditarCarrera 
                    handleCloseModal={handleCloseModal} 
                    crearEditarCarrera={editarCarrera} 
                    carrera={carrera}
                />
            )}
            <ListaColumnasElementos 
                handleFuncionEjecutar={()=> setMostrarEditar(true)} 
                elementos={[nombre, facultad, convertirFechas(fechaCreacion)]}
            />
        </div>
    )
}

Carrera.propTypes = {
    carrera: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
      fechaCreacion: PropTypes.string.isRequired,
      facultad: PropTypes.string.isRequired
    }).isRequired,
    editarCarrera: PropTypes.func.isRequired,
};

export default Carrera