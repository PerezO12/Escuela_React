import { useState, useEffect } from 'react';

import clienteAxios from '../../../config/clienteAxios';
import useAuth from '../../../hooks/useAuth';
import Alerta from '../components/Alerta';

const CrearFormulario = () => {
    // Datos del usuario
    const [carnetIdentidad, setCarnetIdentidad] = useState('');
    const [departamentoId, setDepartamentoId] = useState('');
    const [motivo, setMotivo] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    const [departamentos, setDepartamentos] = useState([]);

    const { auth } = useAuth();
    // Cargar datos desde la API
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const depRes = await clienteAxios.get('/Departamento/correspondientes');

                setDepartamentos(depRes.data.$values);
            } catch (error) {
                setMensaje('Lo sentimos, los datos no están disponibles en este momento. Por favor, intente más tarde.')
            }
        };
        cargarDatos();
    }, []);
    
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones del formulario
        if (motivo.length < 5) {
            setMensaje('El motivo proporcionado es demasiado breve. Por favor, amplíe la descripción.')
            return;
        }
        if (motivo.length > 1000) {
            setMensaje('El motivo proporcionado excede la longitud permitida (máximo 1000 caracteres).')
            return;
        }

        try {
            const { data } = await clienteAxios.post('/Formulario', { departamentoId, motivo });
            setMensaje('El formulario se ha enviado exitosamente.')

            // Limpiar los campos del formulario
            setCarnetIdentidad('');
            setDepartamentoId('');
            setMotivo('');
        } catch (error) {
            console.error(error.response);

            setMensaje(error.response.data?.msg || "Algo salió mal.")
        }
    };

    return (
        <div className="container mx-auto px-4 md:px-0 flex flex-col items-center">
          {/* Título principal */}
      
          {/* Formulario */}
          <form
            className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-2xl rounded-lg px-6 md:px-10 py-5 w-full max-w-3xl border border-gray-200"
            onSubmit={handleSubmit}
          >
          <h1 className="text-sky-800 text-center text-4xl font-extrabold mb-5">
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
            <div className="mb-6">
              <label
                className="block text-lg font-semibold text-gray-700 mb-2"
                htmlFor="departamento"
              >
                Seleccione un Departamento:
              </label>
              <select
                id="departamento"
                value={departamentoId}
                onChange={(e) => setDepartamentoId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg bg-gray-50 p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                required
              >
                <option value="">Seleccione una opción</option>
                {departamentos.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.nombre}
                  </option>
                ))}
              </select>
            </div>
      
            {/* Campo: Motivo */}
            <div className="mb-2">
              <label
                className="block text-lg font-semibold text-gray-700 mb-2"
                htmlFor="motivo"
              >
                Motivo:
              </label>
              <textarea
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg bg-gray-50 px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                rows="5"
                placeholder="Describa el motivo del formulario"
                required
              />
            </div>
      
            {/* Botón de enviar */}
            <button
              type="submit"
              className="w-full mt-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg shadow-md transition-colors duration-300"
            >
              Enviar Formulario
            </button>
            {/* Mensaje de éxito o error */}
            <p
              className={`mt-3 text-center text-sm ${mensaje.includes("exitosamente") ? "text-green-500" : "text-red-500"}`}
            >
              {mensaje}
            </p>
      
          </form>
        </div>
      );
}      

export default CrearFormulario;
