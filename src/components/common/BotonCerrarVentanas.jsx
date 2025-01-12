import PropTypes from 'prop-types'


const BotonCerrarVentanas = ({
  onClick,
  className="absolute top-2 right-4 text-gray-500 hover:text-red-500 transition duration-300 text-4xl"
}) => {
  return (
    <button
          onClick={onClick}
          className={className}
          aria-label="Cerrar modal"
        >
          &times;
    </button>
  )
}

BotonCerrarVentanas.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default BotonCerrarVentanas


