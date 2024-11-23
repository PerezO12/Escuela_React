import { useState, useEffect } from 'react';

import clienteAxios from '../config/clienteAxios';
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';

const CrearFormulario = () => {
    // Datos del usuario
    const [carnetIdentidad, setCarnetIdentidad] = useState('');
    const [departamentoId, setDepartamentoId] = useState('');
    const [motivo, setMotivo] = useState('');
    
    const [departamentos, setDepartamentos] = useState([]);
    
    const [alerta, setAlerta] = useState({});

    const { auth } = useAuth();
    // Cargar datos desde la API
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const depRes = await clienteAxios.get('/Departamento/correspondientes');

                setDepartamentos(depRes.data.$values);
            } catch (error) {
                setAlerta({
                    msg: 'Lo sentimos, los datos no están disponibles en este momento. Por favor, intente más tarde.',
                    error: true,
                });
            }
        };
        cargarDatos();
    }, []);
    
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones del formulario
        if ( !departamentoId) {
            setAlerta({
                msg: 'Por favor seleccione un departamento',
                error: true,
            });
            return;
        }

        if (motivo.length < 5) {
            setAlerta({
                msg: 'El motivo proporcionado es demasiado breve. Por favor, amplíe la descripción.',
                error: true,
            });
            return;
        }
        if (motivo.length > 1000) {
            setAlerta({
                msg: 'El motivo proporcionado excede la longitud permitida (máximo 1000 caracteres).',
                error: true,
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/Formulario', { departamentoId, motivo });

            setAlerta({
                msg: 'El formulario se ha enviado exitosamente.',
                error: false
            });

            // Limpiar los campos del formulario
            setCarnetIdentidad('');
            setDepartamentoId('');
            setMotivo('');
        } catch (error) {
            console.error(error.response);
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;

    return (
        <div className="container mx-auto px-4 md:px-0 flex flex-col items-center">
            {/* Título principal */}
            <h1 className="text-sky-800 text-center text-4xl font-extrabold mb-5">
                Rellene los datos del formulario
            </h1>

            {/* Mensaje de alerta */}
            {msg && <Alerta alerta={alerta} />}

            {/* Formulario */}
            <form
                className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-xl rounded-lg p-8 md:p-10 w-full max-w-4xl border border-gray-200"
                onSubmit={handleSubmit}
            >
                {/* Campo: Nombre completo */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2 capitalize" htmlFor="nombreCompleto">
                        Nombre y Apellidos:
                    </label>
                    <input
                        id="nombreCompleto"
                        value={auth.nombreCompleto}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg bg-gray-200 p-3 text-gray-600 cursor-not-allowed capitalize"
                         disabled
                    />
                </div>


                {/* Campo: Selección de Departamento */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="departamento">
                        Seleccione un Departamento:
                    </label>
                    <select
                        id="departamento"
                        value={departamentoId}
                        onChange={(e) => setDepartamentoId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
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
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="motivo">
                        Motivo:
                    </label>
                    <textarea
                        id="motivo"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                        rows="5"
                        placeholder="Describa el motivo del formulario"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors duration-300"
                >
                    Enviar Formulario
                </button>
                
            </form>
            
        </div>
    );
};

export default CrearFormulario;
