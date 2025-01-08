import { Outlet, useNavigate } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';
import { useEffect, useState } from 'react';

import Sidebar from '../components/layout/Sidebar';
//import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminLayout = () => {
  const [mostrarSidebar, setMostrarSidebar] = useState(true);
  const {cargando, auth } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!cargando && auth && auth.rol !== 'Admin') {
      navigate('/acceso-denegado');
    }
  }, [cargando, auth, navigate]);

  if (cargando) {
    return <LoadingSpinner />;
  }
  return (
    <div className="bg-gray-100">
      <Header />

      <div className="md:flex relative">
        <CiMenuBurger
          className="absolute top-4 left-2 z-20 lg:text-3xl text-2xl text-zinc-800 hover:text-zinc-900 cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => setMostrarSidebar(!mostrarSidebar)}
        />
        {mostrarSidebar && (
          <div className="md:flex relative z-10">
            <Sidebar
              arregloLinks= {[
                {nombre: 'Carreras', path: 'carreras'},
                {nombre: 'Departamentos', path: 'departamentos'},
                {nombre: 'Facultades', path: 'facultades'},
                {nombre: 'Usuarios', path: 'usuarios'},
              ]}
            />
          </div>
        )}
        <main className="lg:p-7 md:p-3 flex-1 lg:overflow-auto lg:h-[calc(100vh-80px)] h-[calc(100vh-60px)]">
          <Outlet />
        </main>
      </div>
      
    </div>
  );
};

export default AdminLayout;
