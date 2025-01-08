import PropTypes from "prop-types";

const ListaColumnasOrdenar = ({ 
  columnas,
  handleOrdenarPor,
  classNameElemento="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer", 
  classNameDiv=`grid grid-cols-${columnas.length} lg:gap-20 px-4 py-2`,
}) => {
  return (
    <div className={classNameDiv}>
      {columnas.map((columna, index) => (
        <p 
          key={index}
          className={classNameElemento}
          onClick={() => handleOrdenarPor(columna.ordenar)}
        >
          {columna.titulo}
        </p>
      ))}
    </div>
  );
};
ListaColumnasOrdenar.propTypes = {
    columnas: PropTypes.arrayOf(
      PropTypes.shape({
        ordenar: PropTypes.string.isRequired,
        titulo: PropTypes.string.isRequired
      })
    ).isRequired,
    handleOrdenarPor: PropTypes.func.isRequired,
    classNameElemento: PropTypes.string,
    classNameDiv: PropTypes.string
  };
  

export default ListaColumnasOrdenar;
