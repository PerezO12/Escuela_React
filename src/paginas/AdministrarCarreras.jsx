import {useState, useEffect} from 'react'
import BarraCambiarPagina from './BarraCambiarPagina'

const AdministrarCarreras = () => {
  const [ pagina, setPagina ] = useState(1);
  const [ carreras, setCarreras ] = useState([]);
  const [ flechaActiva, setFlechaActiva ] = useState(true);

  const handleCambiarPagina = ( a ) => {
    if(pagina + a <= 0) {
        return;
    }
    setPagina(pagina + a);
  }
  return (
    <div className='md:px-10 lg:px-0 px-4'>
      <div className="grid grid-cols-3 lg:gap-20 px-4 py-2 ">
        <p 
            className="text-blue-800 font-serif hover:text-blue-600 lg:text-lg text-sm  hover:cursor-pointer"
            onClick={e => handleOrdenarPor("Nombre")}
          >Carreras</p>
        <p 
            className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
            onClick={e => handleOrdenarPor("Carrera")}
            >Facultad</p>
        <p 
            className="text-blue-800 font-serif hover:text-blue-600  lg:text-lg text-sm hover:cursor-pointer"
            onClick={e => handleOrdenarPor("Fecha")}
            >Fecha de creacion</p>

      </div>
      <hr />
      <div className=" flex flex-col lg:h-[450px]  h-[400px] px-2 py-2 bg-gray-100 overflow-y-auto">
        {carreras.map(carrera => (
            <p>AD</p>
          ))}

      </div>

      <BarraCambiarPagina handleCambiarPagina={handleCambiarPagina} flechaActiva={flechaActiva} pagina={pagina} />
    </div>
  )
}

export default AdministrarCarreras