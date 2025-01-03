import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import { cargarDatosUsuario } from "../api/auth";


const AuthContext = createContext(); 

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState(null);
    const [ cargando, setCargando ] = useState(true);

    useEffect( () => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');
            if(!token) {
                setCargando(false);
                return
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const data = await cargarDatosUsuario(config);
                data.roles = data.roles.$values.map(r => r.toLowerCase());
                data.rol = data.roles[0];//todo: esto es temporal hasta ver como manear si un solo rol o varios
                setAuth(data);
            } catch(error) {
                setAuth({});
                console.log(error);
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, []);

  return (
    <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                setCargando
            }}
        >
            {children}
        </AuthContext.Provider>
    ) 
}

export {
    AuthProvider
};

export default AuthContext;