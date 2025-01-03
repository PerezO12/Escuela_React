import PropTypes from "prop-types";

const ListaColumnasOrdenar = ({ columnas, handleOrdenarPor }) => {
  return (
    <div className={`grid grid-cols-${columnas.length} lg:gap-20 px-4 py-2`}>
      {columnas.map((columna, index) => (
        <p 
          key={index}
          className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm hover:cursor-pointer" 
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
    handleOrdenarPor: PropTypes.func.isRequired
  };
  

export default ListaColumnasOrdenar;
