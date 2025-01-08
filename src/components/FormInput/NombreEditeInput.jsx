import PropTypes from "prop-types"

const NombreEditeInput = ({
  value, 
  onChange, 
  placeholder = "Nombre y apellido"
}) => {
  return (
    <div>
        <label 
            htmlFor="nombreYapellido" 
            className="block text-lg font-medium text-gray-700 mb-2"
        >
            Nombre:
        </label>
        <input
          id="nombreYapellido"
          type="text"
          placeholder={placeholder}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
          value={value}
          onChange={onChange}
          required
        />
    </div>
  )
}
NombreEditeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default NombreEditeInput