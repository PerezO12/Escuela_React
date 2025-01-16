import { Outlet, Navigate, useLocation } from "react-router-dom";

// Context
import useAuth from "../hooks/useAuth";

// Components
import LoadingSpinner from "../components/common/LoadingSpinner";

// Utils
import PropTypes from "prop-types";

const RutaProtegida = ({ roles }) => {
  const { auth, cargando } = useAuth();
  const location = useLocation();

  // Si está cargando, mostrar el spinner
  if (cargando) return <LoadingSpinner />;

  if (!auth?.id) return <Navigate to="/" />;
  
  if (!roles?.split(",").includes(auth?.rol)) return <Navigate to="/acceso-denegado" />;
  if(auth.mustChangePassword && location.pathname != "/ajustes/password") return <Navigate to="/ajustes/password"/>

  return <Outlet />;
}

RutaProtegida.propTypes = {
  roles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string), 
  ]),
};

export default RutaProtegida;
