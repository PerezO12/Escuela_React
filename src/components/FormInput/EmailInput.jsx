import PropTypes from 'prop-types';

const EmailInput = ({
    value,
    onChange,
    placeholder="Email",
    classNameInput=`w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm `,
    classNameLabel="block text-lg font-medium text-gray-700 mb-2",
}) => {
  return (
    <div>
        <label htmlFor="email" className={classNameLabel}>
          Email:
        </label>
        <input
          id="email"
          type="email"
          placeholder={placeholder}
          className={classNameInput}
          value={value}
          onChange={onChange}
          required
        />
    </div>
  )
}
EmailInput.propTypes = {
    value: PropTypes.string.isRequired,  
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    classNameInput: PropTypes.string,
    classNameLabel: PropTypes.string,
};

export default EmailInput