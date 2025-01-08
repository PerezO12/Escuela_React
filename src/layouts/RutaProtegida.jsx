import { Outlet, Navigate } from "react-router-dom";

// Context
import useAuth from "../hooks/useAuth";

// Components
import LoadingSpinner from "../components/common/LoadingSpinner";

// Utils
import { ROLES } from "../utils/roles"; 
import PropTypes from "prop-types";

const RutaProtegida = ({ roles }) => {
  const { auth, cargando } = useAuth();

  // Si está cargando, mostrar el spinner
  if (cargando) return <LoadingSpinner />;

  if (!auth?.id) return <Navigate to="/" />;

  if (!roles?.split(",").includes(auth?.rol)) return <Navigate to="/acceso-denegado" />;

  return <Outlet />;
}

RutaProtegida.propTypes = {
  roles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.oneOf(Object.values(ROLES))), 
  ]),
};

export default RutaProtegida;
