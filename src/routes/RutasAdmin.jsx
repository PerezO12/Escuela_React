import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//import AdministrarFormularios from '../paginas/AdministrarFormularios';
import AdminLayout from '../layouts/AdminLayout';
import NotFound from '../pages/NotFound';
const AdministrarUsuarios = lazy(() => import('../pages/dashboard/admin/AdministrarUsuarios'));
const AdministrarDepartamentos = lazy(() => import('../pages/dashboard/admin/AdministrarDepartamentos'));
const AdministrarFacultades = lazy(() => import('../pages/dashboard/admin/AdministrarFacultades'));
const AdministrarCarreras = lazy(() => import('../pages/dashboard/admin/AdministrarCarreras'));

const RutasAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="usuarios" replace />} />
        <Route path="usuarios" element={<AdministrarUsuarios />} />
        <Route path="departamentos" element={<AdministrarDepartamentos />} />
        <Route path="facultades" element={<AdministrarFacultades />} />
        <Route path="carreras" element={<AdministrarCarreras />} />
        {/* <Route path="formularios" element={<AdministrarFormularios />} /> */}

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RutasAdmin;
