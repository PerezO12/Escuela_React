import React, { useState, useRef, useEffect } from 'react';

import BarraBusqueda from './BarraBusqueda';
import Menu from './Menu';
import useAuth from '../hooks/useAuth';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);  // Referencia para el contenedor del menú

  const { auth } = useAuth();
  const toggleMenu = () => setMenuVisible(!menuVisible);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false); 
      }
    };

    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);  // Se ejecuta cuando `menuVisible` cambia
  
  return (
    <header className="px-6 py-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 text-white shadow-lg relative">
      <div className="flex flex-col sm:flex-row lg:justify-between lg:items-center">
        
        <h2 className="text-4xl font-extrabold tracking-wide text-blue-700 md:text-center lg:text-left">
          Andar<span className='text-black'>UCI</span>
        </h2>

    
        <BarraBusqueda />
        <div className="relative" ref={menuRef}>
          <button 
            onClick={toggleMenu}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-700 text-white font-bold text-2xl
            transition-all duration-300 shadow-md 
            hover:bg-zinc-600 hover:shadow-[0_0_25px_10px_rgba(255,255,255,0.3)]"
          >
            {auth.nombreCompleto[0]}
          </button>

          {menuVisible && (
            <Menu />
          )}
        </div>



      </div>
    </header>
  );
};

export default Header;
