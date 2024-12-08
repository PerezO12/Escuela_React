
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BarraCambiarPagina = ({handleCambiarPagina, flechaActiva, pagina}) => {

  return (
    <>
        <div className='flex justify-center'>
            <div className='lg:w-10/12 md:w-9/12 w-2/3'>
                <div className="flex items-center px-6 py-1 bg-gray-50 shadow-lg rounded-3xl border">
                    <div className="flex-grow flex justify-start">
                        <FaArrowLeft 
                            className={`lg:text-4xl ${(pagina > 1) ? "text-gray-700": "text-gray-300"} hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-125` }
                            onClick={() => handleCambiarPagina(-1)}
                            style={{pointerEvents: (pagina > 1) ? "auto" : "none"}}
                        />
                    </div>
                    <p className="lg:text-3xl text-xl">{pagina}</p>
                    <div className="flex-grow flex justify-end">

                        <FaArrowRight 
                            className={`lg:text-4xl ${flechaActiva ? "text-gray-700": "text-gray-300"} hover:text-blue-600 cursor-pointer transition-transform transform hover:scale-125"`}
                                 
                            onClick={() => handleCambiarPagina(1)}
                            style={{pointerEvents: flechaActiva ? "auto" : "none"}}
                        />

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default BarraCambiarPagina