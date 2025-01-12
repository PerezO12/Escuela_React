import { Routes, Route, Navigate } from 'react-router-dom';
import FormulariosEstudiante from '../pages/dashboard/estudiante/FormulariosEstudiante';
import CrearFormulario from '../pages/dashboard/estudiante/CrearFormulario';
import NotFound from '../pages/NotFound';
import EstudianteLayout from '../layouts/EstudianteLayout';

const RutasEstudiantes = () => {
  return (
    <Routes>
      <Route path='/' element={<EstudianteLayout />}>
        <Route index element={<Navigate to={"formularios"} replace />} />
        <Route path='formularios' element={<FormulariosEstudiante />} />
        <Route path="crear-formulario" element={<CrearFormulario />} />

      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RutasEstudiantes;
