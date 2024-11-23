import { Outlet, Navigate } from "react-router-dom"
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";


import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import clienteAxios from "../config/clienteAxios";
import { QueryProvider } from "../context/QueryProvider";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return 'Cargando';
    //para q se actualice el token al iniciar seccion luego d haberlo destruido
    const token = localStorage.getItem('token');
    clienteAxios.defaults.headers['Authorization'] = `Bearer ${token}`

    //TODO:esot es temporal solo prueba
    //const rol = auth.rol.$values; //extramos el rol
    //console.log(rol);
    const [ mostrarSidebar, setMostrarSidebar ] = useState(false);
  return (
    <>
        {auth.id ? 
        (
          <QueryProvider>
            <div className="bg-gray-100 ">
                <Header/>

                <div className="md:flex relative">
                  <CiMenuBurger 
                    className="absolute top-4 left-2 z-10 text-4xl text-zinc-800 hover:text-zinc-900 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={e => setMostrarSidebar(!mostrarSidebar)}
                  />
                  {mostrarSidebar && 
                  (<div className="md:flex relative z-0">
                    <Sidebar />
                  </div>)}

                  <main className="p-10 flex-1 lg:overflow-auto lg:h-[calc(100vh-80px)]">
                    <Outlet/>
                  </main>
                </div>
            </div>  
          </QueryProvider>

        ) : <Navigate to='/'/>}
    </>
  )
}

export default RutaProtegida