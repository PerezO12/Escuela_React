import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { useState } from "react";
import PropTypes from "prop-types";
import { FiLock } from "react-icons/fi";

const PasswordInput = ({
    id="password", 
    value, 
    onChange,
    error = false,
    required = true,
    placeholder = "Ingrese su contraseña",
    classNameLabel = "block text-sm md:text-lg font-medium text-gray-800",
    classNameInput = "p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-100 focus:bg-white shadow-inner focus:shadow-lg transition duration-300",
    mostrarLabel = true,
    mostrarFiLock = false,
}) => {
    const [mostrarPassword, setMostrarPassword] = useState(false);

    return (
        <div className="relative mb-6">
            {mostrarLabel && (
                <label className={classNameLabel} htmlFor={id}>
                    Contraseña
                </label>
            )}
            <div className="flex items-center relative">
                {mostrarFiLock && (
                    <FiLock className="text-gray-400 absolute left-3 text-lg" />
                )}
                <input
                    id={id}
                    type={mostrarPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className={`pl-10 ${classNameInput} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl text-gray-500 cursor-pointer hover:text-indigo-700 transition duration-300"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                >
                    {mostrarPassword ? (
                        <LiaEyeSolid className="text-gray-600" />
                    ) : (
                        <LiaEyeSlashSolid className="text-gray-600" />
                    )}
                </button>
            </div>
        </div>
    );
};

PasswordInput.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.bool,
    required: PropTypes.bool,
    mostrarLabel: PropTypes.bool,
    mostrarFiLock: PropTypes.bool,
    placeholder: PropTypes.string,
    classNameInput: PropTypes.string,
    classNameLabel: PropTypes.string,
};

export default PasswordInput;
