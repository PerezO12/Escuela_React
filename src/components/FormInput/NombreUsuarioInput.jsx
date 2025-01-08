import PropTypes from "prop-types"

const NombreUsuarioInput = ({
  value, 
  onChange,
  placeholder="Ingrese su nombre de usuario"
}) => {
  return (
    <div className="mb-6">
        <label
            className="block text-sm md:text-lg font-medium text-gray-800"
            htmlFor="userName"
        >
            Nombre de Usuario
        </label>
        <input
            id="userName"
            type="text"
            placeholder={placeholder}
            className="mt-2 p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-100 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
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
};


export default NombreUsuarioInput