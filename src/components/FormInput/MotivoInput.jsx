import PropTypes from "prop-types";

const MotivoInput = ({
    value, 
    onChange,
    error = false,
    rows="5",
    disabled = false,
    placeholder="Describa el motivo del formulario",
    classNameInput="w-full border border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none",
    classNameLabel="block text-lg font-semibold text-gray-700 mb-2"
}) => {
  return (
    <div className="mb-2">
        <label
            className={classNameLabel}
            htmlFor="motivo"
        >
        Motivo:
        </label>
        <textarea
        name="motivo"
        value={value}
        onChange={onChange}
        className={`${classNameInput} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
        rows={rows}
        placeholder={placeholder}
        required
        disabled={disabled}
        />
  </div>
  )
}

MotivoInput.propTypes = {
    value: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool, 
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), 
    disabled: PropTypes.bool, 
    placeholder: PropTypes.string, 
    classNameInput: PropTypes.string,
    classNameLabel: PropTypes.string,
};

export default MotivoInput