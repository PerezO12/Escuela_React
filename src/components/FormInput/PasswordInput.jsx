import React from "react";
import { LiaEyeSolid, LiaEyeSlashSolid } from "react-icons/lia";
import { useState } from "react";

const PasswordInput = ({ value, onChange }) => {
    const [mostrarPassword, setMostrarPassword] = useState(false);

    return (
        <div className="relative mb-6">
            <label
                className="block text-sm md:text-lg font-medium text-gray-800"
                htmlFor="password"
            >
                Contraseña
            </label>
            <input
                id="password"
                type={mostrarPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                className="mt-2 p-2 md:p-3 w-full rounded-lg border border-gray-300 focus:border-indigo-500 bg-gray-100 focus:bg-white shadow-inner focus:shadow-lg transition duration-300"
                value={value}
                onChange={onChange}
                required
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

export default PasswordInput;
