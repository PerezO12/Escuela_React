import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import { IoAddOutline } from 'react-icons/io5';
import BarraCambiarPagina from './BarraCambiarPagina';

const ListaGenerica = ({
    elementos,
    renderItem,
    onDelete,
    setMostrarFormulario,
    handleCambiarPagina
}) => {
  return (
    <div>

      {/* Lista de elementos */}
      <div className={`lg:h-[450px] h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto`}>
        {elementos.map((elemento, index) => (
          <div 
            key={elemento.id || index} 
            className={`flex justify-between items-center border bg-white shadow-lg rounded-lg`}
          >
            <div className='flex-grow'>
              {renderItem(elemento)}
            </div>
            <MdDelete
              className='text-3xl cursor-pointer text-zinc-600 hover:text-red-700 hover:scale-110'
              onClick={() => onDelete(elemento.id)}
            />
          </div>
        ))}
      </div>
      {/* Botón para mostrar formulario */}
      <div className="flex justify-end mb-2 lg:mr-10">
        <div
          className="bg-blue-600 transition duration-200 text-white rounded-full p-3 shadow-2xl border hover:bg-blue-700 hover:scale-105"
          onClick={() => setMostrarFormulario(true)}
        >
          <IoAddOutline className="text-3xl" />
        </div>
      </div>

      {/* Barra para cambiar de página */}
      <BarraCambiarPagina
        retornarPagina={handleCambiarPagina}
        cantidadDatos={elementos.length}
      />
    </div>
  );
};

// Agregando PropTypes
ListaGenerica.propTypes = {
  elementos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  setMostrarFormulario: PropTypes.func.isRequired,
  handleCambiarPagina: PropTypes.func.isRequired
};

export default ListaGenerica;
