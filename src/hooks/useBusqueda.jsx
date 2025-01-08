import { useContext } from "react";
import BusquedaContext from "../context/BusquedaProvider";;

const useBusqueda = () => {
    return useContext(BusquedaContext);
}

export default useBusqueda;