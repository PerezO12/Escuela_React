import PropTypes from 'prop-types';

const Mensaje = ({ msg }) => {
  // Si `msg` es un array, lo unimos en una lista de mensajes, cada uno en su propio párrafo
  const renderMessages = () => {
    if (Array.isArray(msg)) {
      return msg.map((message, index) => (
        <p key={index} className="mt-4 text-center text-sm text-red-500">
          {message}
        </p>
      ));
    } else {
      return (
        <p className={`mt-4 text-center text-sm ${msg.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
          {msg}
        </p>
      );
    }
  };

  return renderMessages();
};

// Definir los PropTypes
Mensaje.propTypes = {
  msg: PropTypes.oneOfType([  // msg puede ser un string o un array de strings
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired
};

export default Mensaje;
