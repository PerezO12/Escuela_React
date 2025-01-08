import { Routes, Route } from 'react-router-dom';
import AndarEncargados from '../paginas/AndarEncargados';

const RutasEncargados = () => {
  return (
    <Routes>
      <Route index element={<AndarEncargados firmados={false} />} />
    </Routes>
  );
};

export default RutasEncargados;
