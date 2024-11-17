import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from "react";

import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './layouts/RutaProtegida';
import Andar from './paginas/Andar';
import CrearFormulario from './paginas/CrearFormulario';


function App() {
  // Inicializa el estado con el valor almacenado en localStorage
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pondre de momento las urtas no protegidas */}
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login />} />

          </Route>
        
          <Route path='/andar' element={ <RutaProtegida />}>
            <Route index element={<Andar />}/>
            <Route path='crear-formulario' element={<CrearFormulario />} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
