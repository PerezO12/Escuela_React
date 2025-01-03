import React from 'react'

const FacultadesSelector = ({facultades, editar = false, value, onChange}) => {
  return (
    <div>
        <label htmlFor="facultad" className="block text-lg font-medium text-gray-700 mb-2">Facultad:</label>
        <select
            id="facultad"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300 shadow-sm"
            value={value}
            onChange={onChange}
            required
        >
        <option value="">Seleccione una facultad</option>
           {facultades.map((fac) => (
        <option key={fac.id} value={fac.id}>{fac.nombre}</option>
        ))}
        </select>
    </div>
  )
}

export default FacultadesSelector