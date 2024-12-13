import React, { useState } from 'react';
import CambiarLlavePublica from './CambiarLlavePublica';
import GenerarNuevoParLlaves from './GenerarNuevoParLlaves';

const GestionarLlaves = () => {
  const [ cambiarLlaves, setCambiarLlaves ] = useState(false);
  const [ generarLlaves, setGenerarLlaves ] = useState(false);

  const handleCambiarLlaves = () => {
    setCambiarLlaves(true); // Abre el modal
  };

  const handleGenerarLlaves = () => {
    setGenerarLlaves(true);
  };

  const closeModal = () => {
    setCambiarLlaves(false);
    setGenerarLlaves(false);
  };

  return (
    <div className="relative">
      {/* Botones del menú */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
        <button
          onClick={handleCambiarLlaves}
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Cambiar Llave
        </button>
        <button
          onClick={handleGenerarLlaves}
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Generar Llaves
        </button>
      </div>

      {/* Cambiar clave pública */}
      {cambiarLlaves && (
        <CambiarLlavePublica closeModal={closeModal} />
      )}
      {/* Generar nuvea llave */}
      {generarLlaves && (
        <GenerarNuevoParLlaves closeModal={closeModal} />
      )}
    </div>
  );
};

export default GestionarLlaves;
