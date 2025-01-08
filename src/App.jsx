import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Context
import { AuthProvider } from './context/AuthProvider';
import AccesoDenegado from './pages/AccesoDenegado';
import LoadingSpinner from './components/common/LoadingSpinner';
import { BusquedaProvider } from './context/BusquedaProvider';

// Layouts
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const RutaProtegida = lazy(() => import('./layouts/RutaProtegida'));

// Páginas
const Login = lazy(() => import('./pages/Login'));

// Rutas específicas
const RutasEstudiantes = lazy(() => import('./routes/RutasEstudiantes'));
const RutasEncargados = lazy(() => import('./routes/RutasEncargados'));
const RutasAdmin = lazy(() => import('./routes/RutasAdmin'));
const NotFound  = lazy(() => import ('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <BusquedaProvider>
            <Routes>
              {/* Rutas públicas */}
              <Route path='acceso-denegado' element={<AccesoDenegado />}/>

              <Route path='/' element={<AuthLayout />}>
                <Route index element={<Login />} />
              </Route>

              {/* Rutas para estudiantes */}
              <Route path='/estudiante' element={<RutaProtegida roles="Estudiante"/>}>
                <Route path="*" element={<RutasEstudiantes />} />
              </Route>

              {/* Rutas para encargados */}
              <Route path='/encargado' element={<RutaProtegida roles="Encargado"/>}>
              <Route path="*" element={<RutasEncargados />} />
              </Route>

              {/* Rutas para administrador */}
              <Route path='/admin' element={<RutaProtegida roles="Admin"/>}>
              <Route path="*" element={<RutasAdmin />} />
              <Route index element={<Navigate to="usuarios" replace />} />

              </Route>

              <Route path="*" element={<NotFound />} />{/* Paginas no encontradas */}

            </Routes>
          </BusquedaProvider>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
