
import {createContext, useState } from "react";

const BusquedaContext = createContext();

const BusquedaProvider = ({ children }) => {
    /* const [busqueda, setBusqueda] = useState('');
    const [buscarPor, setBuscarPor] = useState(''); */
    const [buscar, setBuscar] = useState({
        busqueda: '',
        buscarPor: ''
    });
    const [opciones, setOpciones] = useState([]);
    return (
        <BusquedaContext.Provider 
        value={{ 
/*             busqueda, 
            setBusqueda,
            buscarPor,
            setBuscarPor, */
            buscar,
            setBuscar,
            opciones,
            setOpciones
         }}
        >
            {children}
        </BusquedaContext.Provider>
    );
}

export {
    BusquedaProvider
};

export default BusquedaContext;