
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BarraCambiarPagina = ({handleCambiarPagina, flechaActiva, pagina}) => {

  return (
    <>
        <div className="flex items-center px-6 py-1 bg-gray-50 shadow-lg rounded-3xl border">
            <div className="flex-grow flex justify-start">
                <FaArrowLeft 
                    className="lg:text-4xl text-gray-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-125" 
                    onClick={() => handleCambiarPagina(-1)}
                />
            </div>
            <p className="lg:text-3xl text-xl">{pagina}</p>
            <div className="flex-grow flex justify-end">
                {flechaActiva && (
                    <FaArrowRight 
                        className="lg:text-4xl text-gray-700 hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-125" 
                        onClick={() => handleCambiarPagina(1)}
                    />
                )}
            </div>
        </div>
    </>
  )
}

export default BarraCambiarPagina