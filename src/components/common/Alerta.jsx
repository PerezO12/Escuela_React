import PropTypes from "prop-types";

const Alerta = ({ msg }) => {
  return (
    <div
      className={`
        bg-gradient-to-br from-gray-300 via-gray-400 to-gray-300 
        text-center p-4 rounded-xl uppercase text-gray-900 font-serif font-semibold text-xl shadow-md transition-all duration-300 transform hover:scale-105 my-6
        border-l-4 max-w-6xl mx-auto 
      `}
    >
      {msg}
    </div>
  );
};

Alerta.propTypes = {
  msg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string), 
  ]),
};

export default Alerta;
