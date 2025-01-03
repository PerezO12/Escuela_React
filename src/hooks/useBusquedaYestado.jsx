import { useState, useCallback } from "react";
import useQuery from "./useQuery";

const useBusquedaYEstado = (configInicial = { ordenar: "Fecha", pagina: 1, descender: false }) => {
    const { query } = useQuery();
  
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState(configInicial);

    const actualizarBusqueda = useCallback((nuevosValores) => {
        setBusqueda((prevBusqueda) => ({
        ...prevBusqueda,
        ...nuevosValores,
        }));
    }, []);

    const handleOrdenarPor = useCallback(
        (ordenarPor) => {
        actualizarBusqueda({
            ordenar: ordenarPor,
            descender: busqueda.ordenar === ordenarPor ? !busqueda.descender : false,
        });
        },
        [busqueda.ordenar, busqueda.descender, actualizarBusqueda]
    );

    const handleActualizarPagina = useCallback(
        (pagina) => {
        actualizarBusqueda({ pagina });
        },
        [actualizarBusqueda]
    );
    const handleCloseConfirmar = useCallback(() => {
        setMostrarConfirmar(false);
        setMensaje("");
      }, [setMostrarConfirmar, setMensaje]);

    const generarQueryCompleto = useCallback(() => {
        return `?${query}OrdenarPor=${busqueda.ordenar}&NumeroPagina=${busqueda.pagina}&Descender=${busqueda.descender}&`;
        },
        [busqueda, query]
    );

  return {
    mostrarConfirmar,
    setMostrarConfirmar,
    mostrarFormulario,
    setMostrarFormulario,
    mensaje,
    setMensaje,
    error,
    setError,
    busqueda,
    handleOrdenarPor,
    handleActualizarPagina,
    handleCloseConfirmar,
    generarQueryCompleto,
  };
};

export default useBusquedaYEstado;
