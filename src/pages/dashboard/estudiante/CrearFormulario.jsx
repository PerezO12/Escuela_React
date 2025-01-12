import { useState, useEffect, useCallback } from 'react';

import useAuth from '../../../hooks/useAuth';
import { cargarDepartamentosCorrespondientes, crearFormulario } from '../../../api/estudiante';
import { errorMapper } from '../../../utils/errorMapper';
import DepartamentoSelector from '../../../components/FormInput/DepartamentoSelector';
import Mensaje from '../../../components/common/Mensaje';
import MotivoInput from '../../../components/FormInput/MotivoInput';
const CrearFormulario = () => {
    // Datos del usuario
    const { auth } = useAuth();
    
    const [departamentoId, setDepartamentoId] = useState(0);
    const [motivo, setMotivo] = useState("");
    const [departamentos, setDepartamentos] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [errores, setErrores] = useState([]);
    

    // Cargar datos desde la API
  const cargarDatos = useCallback(async () => {
    try {
      const data = await cargarDepartamentosCorrespondientes();
      setDepartamentos(data);
    } catch (error) {
      setMensaje(errorMapper(error)?.values);
      setTimeout(() => setMensaje(""), 600);}
  }, []);
    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones del formulario
        if (motivo.length < 5) {
          setMensaje('El motivo proporcionado es demasiado breve. Por favor, amplíe la descripción.')
          setErrores(["Motivo"]);
          return;
        }
        if (motivo.length > 1000) {
          setMensaje('El motivo proporcionado excede la longitud permitida (máximo 1000 caracteres).')
          setErrores(["Motivo"]);
          return;
        }
        if (departamentoId === 0) {
          setMensaje('Por favor, seleccione un departamento.')
          setErrores(["DepartamentoId"]);
          return;
        }
        try {
          await crearFormulario({departamentoId, motivo});
          setMensaje('El formulario se ha enviado exitosamente.')
          setDepartamentoId(0);
          setMotivo("");
          setErrores([]);
        } catch (error) {
          const {values, keys} = errorMapper(error);
          setMensaje(values);
          setErrores(keys);
          setTimeout(() => setMensaje(""), 6000);
        }
    };

    return (
      <div className="container mx-auto px-4 md:px-0 flex flex-col items-center">
        {/* Título principal */}
        <form
          className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-2xl rounded-lg px-6 md:px-10 py-5 w-full max-w-3xl border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-sky-800 text-center text-4xl font-semibold mb-5">
            Rellene los datos del formulario
          </h1>
          
          {/* Campo: Nombre completo */}
          <div className="mb-6">
            <label
              className="block text-lg font-semibold text-gray-700 mb-2 capitalize"
              htmlFor="nombreCompleto"
            >
              Nombre y Apellidos:
            </label>
            <input
              id="nombreCompleto"
              value={auth.nombreCompleto}
              type="text"
              className="w-full border border-gray-300 rounded-lg bg-gray-200 p-4 text-gray-600 cursor-not-allowed capitalize focus:ring-2 focus:ring-sky-500"
              disabled
            />
          </div>
  
          {/* Campo: Selección de Departamento */}
          <DepartamentoSelector
            value={departamentoId}
            onChange={(e) => setDepartamentoId(e.target.value)}
            error={errores.includes("DepartamentoId")}
            departamentos={departamentos}
            className={"w-full border border-gray-300 rounded-lg bg-gray-50 p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"}
          />
  
          {/* Campo: Motivo */}
          <MotivoInput
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            error={errores.includes("Motivo")}
          />
  
          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-full mt-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Enviar Formulario
          </button>
          
          {/* Mensaje de éxito o error */}
          <Mensaje msg={mensaje}/>
        </form>
      </div>
    );
  };    

export default CrearFormulario;
