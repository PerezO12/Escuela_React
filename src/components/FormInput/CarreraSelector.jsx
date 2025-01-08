import PropTypes from 'prop-types';

const CarreraSelector = ({
    value, 
    onChange,
    carreras,
    disabled = false, 
    classNameSelect="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm",
    classNameLabel="block text-lg font-medium text-gray-700 mb-2"
}) => {
  return (
    <div>
        <label htmlFor="carrera" className={classNameLabel}>Carreras:</label>
        <select
            id="carrera"
            className={classNameSelect}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required
        >
        <option value="" disabled>Seleccione una carrera</option>
        {carreras.map((carr) => (
            <option key={carr.id} value={carr.id}> {carr.nombre}</option>
        ))}
        </select>
    </div>
  )
}
CarreraSelector.propTypes = {
    carreras: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    classNameLabel: PropTypes.string,
    classNameSelect: PropTypes.string,
};

export default CarreraSelector