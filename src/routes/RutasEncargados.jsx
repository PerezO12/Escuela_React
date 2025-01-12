import { Routes, Route, Navigate } from 'react-router-dom';
import AdministrarFormularios from '../pages/dashboard/encargado/AdministrarFormularios';
import EncargadoLayout from '../layouts/EncargadoLayout';
import NotFound from '../pages/NotFound';

const RutasEncargados = () => {
  return (
    <Routes>

      <Route path='/' element={<EncargadoLayout />}>
        <Route index element={<Navigate to={"formularios"} replace />} />
        <Route path='formularios' element={<AdministrarFormularios />} />
      </Route>

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default RutasEncargados;
