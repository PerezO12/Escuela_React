import { Routes, Route, Navigate } from 'react-router-dom';
import AdministrarUsuarios from '../pages/dashboard/admin/AdministrarUsuarios';
import AdministrarDepartamentos from '../pages/dashboard/admin/AdministrarDepartamentos';
import AdministrarFacultades from '../pages/dashboard/admin/AdministrarFacultades';
//import AdministrarFormularios from '../paginas/AdministrarFormularios';
import AdministrarCarreras from '../pages/dashboard/admin/AdministrarCarreras';
import AdminLayout from '../layouts/AdminLayout';

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
    </Routes>
  );
};

export default RutasAdmin;
