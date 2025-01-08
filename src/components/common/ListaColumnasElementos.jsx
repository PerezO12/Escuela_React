import PropTypes from 'prop-types';

const ListaColumnasElementos = ({ 
    elementos,
    handleFuncionEjecutar,
    className= "hover:text-blue-700 lg:text-base text-sm transition-colors capitalize truncate",
}) => {
    return (
      <div 
        className="relative px-3 py-2 bg-white space-x-4 rounded-lg transition-transform transform hover:bg-blue-50 hover:shadow-2xl cursor-pointer"
        onClick={handleFuncionEjecutar}
      >
        <div className={`grid grid-cols-${elementos.length} lg:gap-24 gap-5`}>
          {elementos.map((elemento, index) => (
            <p 
              key={index} 
              className={className}
            >
              {elemento}
            </p>
          ))}
        </div>
      </div>
    );
  };
  
ListaColumnasElementos.propTypes = {
    elementos: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ])).isRequired,
    handleFuncionEjecutar: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ListaColumnasElementos