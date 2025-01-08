import { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';

const PasswordChange = ({
  value,
  onChange,
  placeholder = 'Contraseña',
  Componente,
  iconClass = 'absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400',
  className = 'w-full px-9 py-2 border rounded-lg bg-gray-50 text-gray-800 caret-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500',
}) => {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  return (
    <div className="mb-3 relative">
      {Componente && (
        <div className={iconClass}>
          <Componente size={20} />
        </div>
      )}
      <input
        type={mostrarPassword ? 'text' : 'password'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
        required
      />
      {mostrarPassword ? (
        <LiaEyeSolid
          className="absolute text-xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
          onClick={() => setMostrarPassword(false)}
        />
      ) : (
        <LiaEyeSlashSolid
          className="absolute top-1/2 text-xl right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
          onClick={() => setMostrarPassword(true)}
        />
      )}
    </div>
  );
};

// Añade las validaciones de las props con PropTypes
PasswordChange.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, 
  Componente: PropTypes.elementType, 
  iconClass: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default PasswordChange;
