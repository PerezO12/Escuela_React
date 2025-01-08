import PropTypes from "prop-types"

const NombreUsuarioInput = ({
  value, 
  onChange,
  error=false,
  placeholder="Ingrese su nombre de usuario",
  classNameLabel="block text-lg font-medium text-gray-700 mb-2",
  classNameInput="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
  //classNameInput="mt-2 p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-100 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
}) => {
  return (
    <div className="mb-6">
        <label
            className={classNameLabel}
            htmlFor="userName"
        >
            Nombre de Usuario
        </label>
        <input
            id="userName"
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

NombreUsuarioInput.propTypes = {
  value: PropTypes.string.isRequired,  
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  classNameLabel: PropTypes.string,
  classNameInput: PropTypes.string,
};


export default NombreUsuarioInput