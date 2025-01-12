import PropTypes from 'prop-types';
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi'

const AlertaWithIcon = ({
    mensaje
}) => {
    const [ mostrarAdvertencia, setMostrarAdvertencia ] = useState(true);
  return (
    <div>
        <FiAlertTriangle
            className="text-red-500 text-4xl mr-3 hover:cursor-pointer hover:scale-110 transition duration-300"
            onClick={() => setMostrarAdvertencia(!mostrarAdvertencia)}
          />
          {mostrarAdvertencia && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center bg-red-100 p-4 rounded-lg border border-red-300">
              <p className="text-black lg:text-sm md:text-sm text-xs">
                <strong>Advertencia Técnica:</strong> {mensaje}.
              </p>
            </div>
          )}
          </div>
  )
}
AlertaWithIcon.propTypes = {
    mensaje: PropTypes.string.isRequired,
}

export default AlertaWithIcon