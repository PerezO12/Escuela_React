import { Outlet, Navigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";

import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import clienteAxios from "../config/clienteAxios";
import { QueryProvider } from "../context/QueryProvider";
import SidebarAdmin from "../components/SidebarAdmin";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();
    const [ mostrarSidebar, setMostrarSidebar ] = useState(false);

    if(cargando) return 'Cargando';
    //para q se actualice el token al iniciar seccion luego d haberlo destruido
    const token = localStorage.getItem('token');
    clienteAxios.defaults.headers['Authorization'] = `Bearer ${token}`

  return (
    <>
        {auth.id ? 
        (
          <QueryProvider>
            <div className="bg-gray-100 ">
                <Header/>

                <div className="md:flex relative">
                  <CiMenuBurger 
                    className=" absolute top-4 left-2 z-10 lg:text-3xl text-2xl text-zinc-800 hover:text-zinc-900 cursor-pointer transition-transform transform hover:scale-110"
                    onClick={e => setMostrarSidebar(!mostrarSidebar)}
                  />
                  {mostrarSidebar && 
                  (<div className="md:flex relative z-0">
                    {auth.rol != 'admin'?
                      (<Sidebar />)
                    : (<SidebarAdmin />) //todo:mejorar esto
                    }
                  </div>)}

                  <main className="lg:p-10  flex-1 lg:overflow-auto lg:h-[calc(100vh-80px)] md:h-[calc(100vh-60px)]">
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