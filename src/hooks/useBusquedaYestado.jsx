import { useState, useCallback } from "react";

const useBusquedaYEstado = (configInicial = { ordenar: "Fecha", pagina: 1, descender: false }) => {
  
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [alerta, setAlerta] = useState("");
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

    const generarQueryCompleto = useCallback((query = "") => {
        return `?OrdenarPor=${busqueda.ordenar}&NumeroPagina=${busqueda.pagina}&Descender=${busqueda.descender}&${query}`;
        },
        [busqueda]
    );

  return {
    mostrarConfirmar,
    setMostrarConfirmar,
    mostrarFormulario,
    setMostrarFormulario,
    mensaje,
    setMensaje,
    alerta,
    setAlerta,
    busqueda,
    handleOrdenarPor,
    handleActualizarPagina,
    handleCloseConfirmar,
    generarQueryCompleto,
  };
};

export default useBusquedaYEstado;
