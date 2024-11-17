import { Outlet, Navigate } from "react-router-dom"

import useAuth from "../hooks/useAuth"
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import clienteAxios from "../config/clienteAxios";

const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if(cargando) return 'Cargando';
    //para q se actualice el token al iniciar seccion luego d haberlo destruido
    const token = localStorage.getItem('token');
    clienteAxios.defaults.headers['Authorization'] = `Bearer ${token}`

    //TODO:esot es temporal solo prueba
    //const rol = auth.rol.$values; //extramos el rol
    //console.log(rol);
  return (
    <>
        {auth.id ? 
        (
          <div className="bg-gray-100 ">
              <Header />

              <div className="md:flex ">
                
                <Sidebar />

                <main className="p-10 flex-1 lg:overflow-auto lg:h-[calc(100vh-80px)]">
                  <Outlet />
                </main>
              </div>
          </div>  


        ) : <Navigate to='/'/>}
    </>
  )
}

export default RutaProtegida