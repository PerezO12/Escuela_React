import PropTypes from 'prop-types';

const SelectorRolInput = ({
    roles,
    value,
    onChange,
    classNameSelect="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm",
    classNameLabel="block text-lg font-medium text-gray-700 mb-2",

}) => {
  return (
    <div>
        <label htmlFor="rol" className={classNameLabel}>
          Rol:
        </label>
        <select
          id="rol"
          className={classNameSelect}
          value={value[0]}
          onChange={onChange}
          required
        >
          <option value="" >Seleccione un Rol</option>
          {roles?.length > 0 ? (
            roles.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))
          ) : (
            <option disabled>Cargando roles...</option>
          )}
        </select>
    </div>
  )
}
SelectorRolInput.propTypes = {
    roles: PropTypes.array.isRequired,
    value: PropTypes.array.isRequired,  
    onChange: PropTypes.func.isRequired,
    classNameLabel: PropTypes.string,
    classNameSelect: PropTypes.string,
};

export default SelectorRolInput