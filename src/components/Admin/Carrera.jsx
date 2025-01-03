import { useState} from 'react'
import formatearFecha from '../../helpers/convertirFechas'
import CrearEditarCarrera from './CrearEditarCarrera'
import PropTypes from 'prop-types';

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
            <div 
                className="relative px-3 py-2 bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer"
                onClick={() => setMostrarEditar(true)}
            >
                <div className="grid grid-cols-3 lg:gap-28 md:gap-8 hover:cursor-pointer">
                <p className="hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate">{nombre}</p>
                <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{facultad}</p>
                <p className="text-blue-900 hover:text-blue-800 lg:text-base text-sm transition-colors truncate">{formatearFecha(fechaCreacion)}</p>
                </div>
            </div>
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