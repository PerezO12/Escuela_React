import { BrowserRouter, Routes, Route } from 'react-router-dom'


import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './layouts/RutaProtegida';
import AndarEstudiantes from './paginas/AndarEstudiantes';
import CrearFormulario from './paginas/CrearFormulario';
import AndarEncargados from './paginas/AndarEncargados';



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
        
          <Route path='/estudiante' element={ <RutaProtegida />}>
            <Route index element={<AndarEstudiantes />}/>
            <Route path='crear-formulario' element={<CrearFormulario />} />
          </Route>
          {"Rutas para encargados"}
          <Route path='/encargado' element={ <RutaProtegida />}>
            <Route index element={<AndarEncargados firmados={false}/>}/>
            <Route path='historial' element={<AndarEncargados firmados={true}/>} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
