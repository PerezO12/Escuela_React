import PropTypes from "prop-types";

const DepartamentoSelector = ({
    value, 
    onChange,
    departamentos,
    disabled = false, 
    classNameSelect="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm",
    classNameLabel="block text-lg font-medium text-gray-700 mb-2"
}) => {
  return (
    <div>
        <label htmlFor="departamento" className={classNameLabel}>Departamentos:</label>
        <select
          id="departamento"
          className={classNameSelect}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required
        >
        <option value={0}>Seleccione un departamento</option>
        {departamentos.map((dep) => (
          <option key={dep.id} value={dep.id}>{dep.nombre}</option>
        ))}
        </select>
    </div>
  )
}
DepartamentoSelector.propTypes = {
    departamentos: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    classNameLabel: PropTypes.string,
    classNameSelect: PropTypes.string,
};
export default DepartamentoSelector