import { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';


const AuthContext = createContext(); 

const AuthProvider = ({children}) => {

    const [ auth, setAuth ] = useState(null);
    const [ cargando, setCargando ] = useState(true);

    const navigate = useNavigate();

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
            //TODO: Faltan arreglar estas cosas y comprobar...Aqui puedo hacer las redirecciones
            try {
                 
                const { data } = await clienteAxios.get('/account/obtener-perfil', config);
                data.rol = data.rol.toLowerCase();
                setAuth(data);
                //Redirecciones
                navigate(data.rol);

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