import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth();
    const navigate = useNavigate(); // TODO: solución temporal

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([nombre, password].includes('')) {
            setAlerta({
                msg: "Por favor, complete todos los campos obligatorios.",
                error: true
            });
            return;
        }

        try {
            const url = '/account/login';
            const { data } = await clienteAxios.post(url, { nombre, password });
            setAlerta({});
            localStorage.setItem('token', data.token);
            setAuth(data);
            navigate(data.rol.toLowerCase());
        } catch (error) {
            setAlerta({
                msg: error.response?.data || "Ocurrió un error al iniciar sesión. Por favor, inténtelo nuevamente.",
                error: true
            });
        }
    };

    const { msg } = alerta;

    return (
        <>
            <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 text-gray-800">
                Bienvenido a{" "}
                <span className="text-indigo-700">AndarUCI</span>
            </h1>
    
            {msg && <Alerta alerta={alerta} />}
    
            <form
                className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-200"
                onSubmit={handleSubmit}
            >
                <div className="mb-8">
                    <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="nombre"
                    >
                        Nombre de Usuario
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Ingrese su nombre de usuario"
                        className="mt-3 p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-50 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
    
                <div className="mb-8">
                    <label
                        className="block text-lg font-medium text-gray-700"
                        htmlFor="password"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        className="mt-3 p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-50 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
    
                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                    text-white font-semibold py-3 px-5 rounded-full shadow-lg transition duration-300 
                    transform hover:scale-105"
                >
                    Iniciar Sesión
                </button>
            </form>

            <Link
                className="block text-center text-slate-500 uppercase text-sm mt-5"
                to="/contacto"
            >
                ¿Necesita ayuda? Contáctenos
            </Link>
        </>
    );
};

export default Login;
