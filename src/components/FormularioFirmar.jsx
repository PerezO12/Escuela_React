import { useParams } from 'react-router-dom';

import clienteAxios from '../config/clienteAxios';
import { useEffect, useState } from 'react';
const FormularioFirmar = () => {
    const { id } = useParams();

    const [ formulario, setFormulario ] = useState({});

    const cargarFormulario = async() => {
        try{
            const { data } = await clienteAxios.get(`/Formulario/encargados/${id}`)
            setFormulario(data);
            console.log(data);
        } catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        cargarFormulario();
    }, [])

    const handleFirmar = () => {
        const respuesta = confirm('¿Firmar el documento?');
        if(respuesta) {
            console.log("borrado")
        }
      };
    
      if (!formulario) {
        return <div className="text-center text-gray-500">Cargando...</div>;
      }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="md:text-3xl lg:text-3xl text-xl font-bold mb-6 text-center text-blue-600">Detalles del Formulario</h2>
      
      {/* Detalles del formulario */}
      <div className="space-y-5">
        <div className=''>
          <p className="font-serif text-gray-900">Nombre Completo: </p>
          <p className="text-gray-700 capitalize">{formulario.nombreCompletoEstudiante}</p>
        </div>

        <div>
          <p className="font-serif text-gray-900">Correo Electrónico:</p>
          <p className="text-gray-700">{formulario.email}</p>
        </div>

        <div>
          <p className="ffont-serif text-gray-900">Carnet de Identidad:</p>
          <p className="text-gray-700">{formulario.carnetIdentidad}</p>
        </div>

        <div>
          <p className="font-serif text-gray-900">Carrera:</p>
          <p className="text-gray-700">{formulario.nombreCarrera}</p>
        </div>

        {/* Campo Motivo con altura limitada */}
        <div>
          <p className="font-serif text-gray-900">Motivo:</p>
          <div className="text-gray-700 bg-gray-100 p-4 rounded-lg max-h-40 overflow-y-auto break-words">
            {formulario.motivo}
          </div>
        </div>

        <div>
          <p className="font-serif text-gray-900">Fecha de Creación:</p>
          <p className="text-gray-700">{new Date(formulario.fechacreacion).toLocaleString()}</p>
        </div>
      </div>

      {/* Botón de Firmar */}
      <button 
        onClick={handleFirmar} 
        className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Firmar
      </button>
    </div>
  )
}

export default FormularioFirmar