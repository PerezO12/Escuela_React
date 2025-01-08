import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const Sidebar = ({
  arregloLinks = [],
  clasNameLink="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 transform hover:scale-105 mb-4",
  classNameAside="lg:w-64 md:w-64 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 shadow-xl p-8 lg:py-10 rounded-2xl flex flex-col items-center",
  classNameDiv = "w-full flex flex-col items-center mb-10",
  classNameP = "text-2xl font-semibold text-gray-800 text-center capitalize",
}) => {
  const { auth } = useAuth();

  return (
    <aside className={classNameAside}>
      <div className={classNameDiv}>
        <p className={classNameP}>
          Hola, {auth.nombreCompleto}
        </p>
        <p className="text-sm text-gray-600 italic text-center mt-1">
          Bienvenido de nuevo
        </p>
      </div>

      {/* Mapeando los links */}
      <div className="w-full flex flex-col items-start">
        {arregloLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={clasNameLink}
          >
            {link.nombre}
          </Link>
        ))}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  arregloLinks: PropTypes.arrayOf(
    PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  clasNameLink: PropTypes.string,
  classNameAside: PropTypes.string,
  classNameP: PropTypes.string,
  classNameDiv: PropTypes.string,
};

export default Sidebar;


{/* <Link
to=""
className={clasNameLink}
>
Ver Formularios
</Link>


{ rol == "estudiante"
&&
(<Link
  to="crear-formulario"
  className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
          text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
          transform hover:scale-105 mb-4 "
>
  Nuevo Formulario
</Link>
)}
{      { rol == "encargado"
&&
(<Link
  to="historial"
  className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
          text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
          transform hover:scale-105 mb-4 "
>
  Historial
</Link>
)}} */}