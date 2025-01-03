import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Context
import { AuthProvider } from './context/AuthProvider';

// Layouts
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const RutaProtegida = lazy(() => import('./layouts/RutaProtegida'));

// Páginas
const Login = lazy(() => import('./paginas/Login'));
const AndarEstudiantes = lazy(() => import('./paginas/AndarEstudiantes'));
const CrearFormulario = lazy(() => import('./paginas/CrearFormulario'));
const AndarEncargados = lazy(() => import('./paginas/AndarEncargados'));
const AdministrarCarreras = lazy(() => import('./paginas/AdministrarCarreras'));
const AdministrarDepartamentos = lazy(() => import('./paginas/AdministrarDepartamentos'));
const AdministrarFacultades = lazy(() => import('./paginas/AdministrarFacultades'));
const AdministrarFormularios = lazy(() => import('./paginas/AdministrarFormularios'));
const AdministrarUsuarios = lazy(() => import('./paginas/AdministrarUsuarios'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Suspense envuelve las rutas para mostrar un fallback mientras se cargan */}
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            {/* Rutas públicas */}
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
            </Route>

            {/* Rutas para estudiantes */}
            <Route path='/estudiante' element={<RutaProtegida />}>
              <Route index element={<AndarEstudiantes />} />
              <Route path='crear-formulario' element={<CrearFormulario />} />
            </Route>

            {/* Rutas para encargados */}
            <Route path='/encargado' element={<RutaProtegida />}>
              <Route index element={<AndarEncargados firmados={false} />} />
            </Route>

            {/* Rutas para administrador */}
            <Route path='/admin' element={<RutaProtegida />}>
              <Route index element={<AdministrarUsuarios />} />
              <Route path='departamentos' element={<AdministrarDepartamentos />} />
              <Route path='facultades' element={<AdministrarFacultades />} />
              <Route path='formularios' element={<AdministrarFormularios />} />
              <Route path='carreras' element={<AdministrarCarreras />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
