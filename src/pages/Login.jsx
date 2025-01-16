//importaciones de 3eros
import { useState, useCallback, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//Mis importacioens
import fondoLogin from '../asset/foto.jpg';

import useAuth from "../hooks/useAuth";
import { login } from "../api/auth";
import PasswordInput from "../components/FormInput/PasswordInput";
import NombreUsuarioInput from "../components/FormInput/NombreUsuarioInput";
import { errorMapper } from "../utils/errorMapper"; 

const Login = () => {
    //const [mostrarPassword, setMostrarPassword] = useState(false);
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState("");
    const [twoFactor, setTwoFactor] = useState(false);

    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        try {
            const data = await login({ userName, password });
            //todo: mejorar esto
            localStorage.setItem('token', data.token);
            data.roles = data.roles.$values;
            data.rol = data.roles[0]
            setAuth(data);
            setTwoFactor(data.twoFactorEnabled)
        } catch (error) {
            setMensaje( errorMapper(error)?.values);
        }
    }, [userName, setAuth, password]);

    useEffect(() => {
        if (auth?.rol && !twoFactor) {
            navigate(auth.rol.toLowerCase());
        }
        if(twoFactor) {
            navigate("app/2fa")
        }
    }, [auth, navigate, twoFactor]);
    
    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => setMensaje(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [mensaje]);
    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center" 
            style={{ backgroundImage: `url(${fondoLogin})` }}
        >
            <div className="rounded-3xl p-6 md:p-10 w-11/12 max-w-2xl bg-white bg-opacity-70 shadow-lg">    
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 text-gray-800">
                    Bienvenido a{" "}
                    <span className="text-indigo-700">AndarUCI</span>
                </h1>
        
        
                <form
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-md bg-opacity-90" 
                    onSubmit={handleSubmit}
                >
                    <NombreUsuarioInput
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                    />
                
                    <PasswordInput 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700
                        text-white font-semibold py-2 md:py-3 px-4 md:px-5 rounded-full shadow-lg transition duration-300 
                        transform hover:scale-105"
                    >
                        Iniciar Sesión
                    </button>
                    {mensaje && (
                        <div className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
                            {mensaje}
                        </div>
                    )}
                </form>
                <Link
                    className="block text-center text-slate-500 uppercase text-sm mt-5"
                    to="/contacto"
                >
                    ¿Necesita ayuda? Contáctenos
                </Link>
            </div>
        </div>
    );
};

export default Login;