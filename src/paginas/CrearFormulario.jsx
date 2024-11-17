import { useState, useEffect } from 'react';
import clienteAxios from '../config/clienteAxios';

import Alerta from '../components/Alerta';

const CrearFormulario = () => {
    // Datos del usuario
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [carnetIdentidad, setCarnetIdentidad] = useState('');
    const [departamentoId, setDepartamentoId] = useState('');
    const [carreraId, setCarreraId] = useState('');
    const [facultadId, setFacultadId] = useState('');
    const [motivo, setMotivo] = useState('');
    
    const [carreras, setCarreras] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [facultades, setFacultades] = useState([]);
    
    const [alerta, setAlerta] = useState({});

    // Cargar datos desde la API
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [depRes, carRes, facRes] = await Promise.all([
                    clienteAxios.get('/Departamento'),
                    clienteAxios.get('/Carrera'),
                    clienteAxios.get('/Facultad'),
                ]);

                setDepartamentos(depRes.data.$values);
                setCarreras(carRes.data.$values);
                setFacultades(facRes.data.$values);
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
        if (!nombreCompleto || !carnetIdentidad || !departamentoId || !carreraId || !facultadId || !motivo) {
            setAlerta({
                msg: 'Todos los campos son obligatorios. Por favor, complete la información requerida.',
                error: true,
            });
            return;
        }
        if (nombreCompleto.length < 7 || nombreCompleto.length > 30) {
            setAlerta({
                msg: 'El nombre proporcionado no cumple con los requisitos de longitud (entre 7 y 30 caracteres).',
                error: true,
            });
            return;
        }
        if (carnetIdentidad.length !== 11) {
            setAlerta({
                msg: 'El Carnet de Identidad debe contener exactamente 11 dígitos.',
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
        if (motivo.length > 600) {
            setAlerta({
                msg: 'El motivo proporcionado excede la longitud permitida (máximo 600 caracteres).',
                error: true,
            });
            return;
        }

        try {
            const { data } = await clienteAxios.post('/Formulario', { departamentoId, motivo });

            setAlerta({
                msg: 'El formulario se ha enviado exitosamente.',
                error: false,
            });

            // Limpiar los campos del formulario
            setNombreCompleto('');
            setCarnetIdentidad('');
            setDepartamentoId('');
            setCarreraId('');
            setFacultadId('');
            setMotivo('');
        } catch (error) {
            console.error(error.response);
            setAlerta({
                msg: 'No ha sido posible enviar el formulario en este momento. Por favor, intente más tarde.',
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
                    <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="nombreCompleto">
                        Nombre Completo:
                    </label>
                    <input
                        id="nombreCompleto"
                        value={nombreCompleto}
                        onChange={(e) => setNombreCompleto(e.target.value)}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Ingrese su nombre completo"
                    />
                </div>

                {/* Campo: Carnet de identidad */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="carnetIdentidad">
                        Carnet de Identidad:
                    </label>
                    <input
                        id="carnetIdentidad"
                        value={carnetIdentidad}
                        onChange={(e) => setCarnetIdentidad(e.target.value)}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        placeholder="Ingrese su carnet de identidad"
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

                {/* Campo: Selección de Carrera */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="carrera">
                        Seleccione una Carrera:
                    </label>
                    <select
                        id="carrera"
                        value={carreraId}
                        onChange={(e) => setCarreraId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                        <option value="">Seleccione una opción</option>
                        {carreras.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campo: Selección de Facultad */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2" htmlFor="facultad">
                        Seleccione una Facultad:
                    </label>
                    <select
                        id="facultad"
                        value={facultadId}
                        onChange={(e) => setFacultadId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg bg-gray-50 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    >
                        <option value="">Seleccione una opción</option>
                        {facultades.map((fac) => (
                            <option key={fac.id} value={fac.id}>
                                {fac.nombre}
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
