import React from 'react'

const CrearEditarFacultad = ( {handleCloseModal, crearEditarFacultad, editar=false, setMostrarEditar,id, nombre , mensaje=""} ) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg relative">
            {/* Botón de cierre */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition duration-300 text-3xl"
            >
              &times;
            </button>

            {/* Título */}
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
              {editar ? "Editar" : "Crear"} Facultad
            </h2>

            {/* Formulario */}
            <form 
              className="space-y-6" 
              onSubmit={(e) => { e.preventDefault(); (editar ? (crearEditarFacultad(e.target.nombre.value, id), setMostrarEditar(false)) : crearEditarFacultad(e.target.nombre.value)); }}
              >
              <div>
                <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">
                  Nombre:
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Introduzca el nombre de la facultad"
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
                  defaultValue={editar? nombre : ""}
                  required
                />
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
              >
                {editar ? "Editar" : "Crear"} Facultad
              </button>
            </form>
            <p className={`mt-4 text-center text-sm ${mensaje.includes('exitosamente') ? 'text-green-500' : 'text-red-500'}`}>
              {mensaje}
            </p>
          </div>
        </div>
  )
}

export default CrearEditarFacultad