import PropTypes from 'prop-types';

const CarnetIdentidadInput = ({
    onChange,
    value,
    error=false,
    placeholder="Carnet de Identidad",
    classNameInput="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm",
    classNameLabel="block text-lg font-medium text-gray-700 mb-2"
}) => {
  return (
    <div>
        <label htmlFor="ci" className={classNameLabel}>
          CI:
        </label>
        <input
          id="ci"
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
CarnetIdentidadInput.propTypes = {
    value: PropTypes.string.isRequired,  
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    placeholder: PropTypes.string,
    classNameInput: PropTypes.string,
    classNameLabel: PropTypes.string,
};

export default CarnetIdentidadInput