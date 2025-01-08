import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { useState } from "react";
import PropTypes from "prop-types";

const PasswordInput = ({ 
    value, 
    onChange,
    required = true,
    placeholder="Ingrese su contraseña",
    classNameLabel="block text-sm md:text-lg font-medium text-gray-800",
    classNameInput="mt-2 p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-100 focus:bg-white shadow-inner focus:shadow-lg transition duration-300",

}) => {
    const [mostrarPassword, setMostrarPassword] = useState(false);

    return (
        <div className="relative mb-6">
            <label
                className={classNameLabel}
                htmlFor="password"
            >
                Contraseña
            </label>
            <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                placeholder={placeholder}
                className={classNameInput}
                value={value}
                onChange={onChange}
                required={required}
            />
            <button
                type="button"
                className="absolute mt-5 text-2xl top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-700 transition duration-300"
                onClick={() => setMostrarPassword(!mostrarPassword)}
            >
                {mostrarPassword ? <LiaEyeSolid /> : <LiaEyeSlashSolid />}
            </button>
        </div>
    );
};
PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,  
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    classNameInput: PropTypes.string,
    classNameLabel: PropTypes.string,
};

export default PasswordInput;
