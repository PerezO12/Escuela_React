import PropTypes from 'prop-types';
const FacultadesSelector = ({
  value, 
  onChange,
  facultades, 
  //editar = false,
  classNameSelect="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm",
  classNameLabel="block text-lg font-medium text-gray-700 mb-2"
}) => {
  return (
    <div>
        <label htmlFor="facultad" className={classNameLabel}>Facultad:</label>
        <select
            id="facultad"
            className={classNameSelect}
            value={value}
            onChange={onChange}
            required
        >
        <option value={0}>Seleccione una facultad</option>
        {facultades.map((fac) => (
          <option key={fac.id} value={fac.id}>{fac.nombre}</option>
        ))}
        </select>
    </div>
  )
}
FacultadesSelector.propTypes = {
  facultades: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,  
  onChange: PropTypes.func.isRequired,
  //editar: PropTypes.bool,
  classNameLabel: PropTypes.string,
  classNameSelect: PropTypes.string,
};
export default FacultadesSelector