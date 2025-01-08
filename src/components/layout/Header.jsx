import { useState } from 'react';

import BarraBusqueda from '../common/BarraBusqueda';
import Menu from './Menu';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const { auth } = useAuth();

  const handleMenuClick = () => {
    setMenuVisible(!menuVisible);
  }
  
  return (
    <header className="px-6 py-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-white shadow-lg relative">
      <div className="lg:flex sm:flex-row lg:justify-between lg:items-center justify-center ">
        
        <h2 className="text-3xl text-center mb-2  font-extrabold tracking-wide text-blue-700 md:text-center lg:text-left">
          Andar<span className='text-black'>UCI</span>
        </h2>
        <div className='text-center w-4/5 justify-center mx-auto'>
          <BarraBusqueda />

        </div>
        <div className="lg:relative">
          <button 
            onClick={handleMenuClick}
            className="mt-2 lg:mt-0 flex items-center justify-center w-11 h-11 rounded-full bg-zinc-700 text-white font-bold text-2xl
            transition-all duration-300 shadow-md  absolute top-0 right-0 lg:relative
            hover:bg-zinc-600 hover:shadow-[0_0_25px_10px_rgba(255,255,255,0.3)] capitalize"
          >
            {auth.nombreCompleto[0]}
          </button>

          {menuVisible && (
            <Menu
              rol={auth.rol}
              mostrarOcultarMenu={setMenuVisible}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
