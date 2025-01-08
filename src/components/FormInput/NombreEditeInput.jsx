import PropTypes from "prop-types"

const NombreEditeInput = ({
  value, 
  onChange,
  error = false, 
  placeholder = "Nombre y apellido",
  classNameLabel="block text-lg font-medium text-gray-700 mb-2",
  classNameInput="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
}) => {
  return (
    <div>
        <label 
            htmlFor="nombreYapellido" 
            className={classNameLabel}
        >
            Nombre:
        </label>
        <input
          id="nombreYapellido"
          type="text"
          placeholder={placeholder}
          className={`${classNameInput} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
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
  error: PropTypes.bool,
  placeholder: PropTypes.string,
  classNameLabel: PropTypes.string,
  classNameInput: PropTypes.string,
  
}

export default NombreEditeInput