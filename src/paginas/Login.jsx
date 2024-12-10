import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";

import fondoLogin from '../recursos/foto.jpg';
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();

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
            data.rol = data.rol.toLowerCase();
            setAuth(data);
            navigate(data.rol.toLowerCase());
        } catch (error) {
            setAlerta({
                msg: error.response?.data.msg || "Ocurrió un error al iniciar sesión. Por favor, inténtelo nuevamente.",
                error: true
            });
        }
    };

    const { msg } = alerta;

    useEffect(() => {
        if (auth?.rol != null) {
            navigate(auth?.rol);
            return;
        }
    }, [auth]);

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center" 
            style={{ backgroundImage: `url(${fondoLogin})` }}
        >
            <div className="rounded-3xl p-6 md:p-10 w-11/12 max-w-2xl bg-white bg-opacity-50 shadow-lg">    
                <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 text-gray-800">
                    Bienvenido a{" "}
                    <span className="text-indigo-700">AndarUCI</span>
                </h1>
        
                {msg && <Alerta alerta={alerta} />}
        
                <form
                    className="bg-white rounded-3xl p-6 md:p-8 shadow-md bg-opacity-97" 
                    onSubmit={handleSubmit}
                >
                    <div className="mb-6">
                        <label
                            className="block text-sm md:text-lg font-medium text-gray-700"
                            htmlFor="nombre"
                        >
                            Nombre de Usuario
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Ingrese su nombre de usuario"
                            className="mt-2 p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-50 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
        
                    <div className="mb-6">
                        <label
                            className="block text-sm md:text-lg font-medium text-gray-700"
                            htmlFor="password"
                        >
                            Contraseña
                        </label>
                        <div className='relative'>
                            <input
                                id="password"
                                type={`${mostrarPassword ?"text" : "password"}`}
                                placeholder="Ingrese su contraseña"
                                className="mt-2 p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-50 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {mostrarPassword 
                                ? (<LiaEyeSolid
                                className="absolute mt-1 text-2xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                                    onClick={e => setMostrarPassword(false)}
                                />) 
                                : (<LiaEyeSlashSolid
                                    className="absolute mt-1 top-1/2 text-2xl right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-cyan-900 transition duration-300"
                                    onClick={e => setMostrarPassword(true)}
                                />)}
                        </div>
                    </div>
        
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700
                        text-white font-semibold py-2 md:py-3 px-4 md:px-5 rounded-full shadow-lg transition duration-300 
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
            </div>
        </div>
    );
};

export default Login;
