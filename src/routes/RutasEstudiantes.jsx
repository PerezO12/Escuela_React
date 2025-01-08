import { Routes, Route } from 'react-router-dom';
import AndarEstudiantes from '../paginas/AndarEstudiantes';
import CrearFormulario from '../paginas/CrearFormulario';

const RutasEstudiantes = () => {
  return (
    <Routes>
      <Route index element={<AndarEstudiantes />} />
      <Route path="crear-formulario" element={<CrearFormulario />} />
    </Routes>
  );
};

export default RutasEstudiantes;
