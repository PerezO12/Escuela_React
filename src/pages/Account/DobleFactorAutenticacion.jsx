import { useState, useEffect, useCallback } from 'react';
import { confirmarCodigo, generarCodigo2FA } from '../../api/auth';
import { errorMapper } from '../../utils/errorMapper';
import Mensaje from '../../components/common/Mensaje';
import QRError from '../../components/common/QRError';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const DobleFactorAutenticacion = () => {
    const [mensaje, setMensaje] = useState('');
    const [qrData, setQrData] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const { auth , setAuth} = useAuth();
    const navigate = useNavigate();

    

    const cargarQr2FA = useCallback(async () => {
        try {
            const data = await generarCodigo2FA();
            setQrData(data.url); // La URL que el backend devuelve
        } catch (error) {
            setQrData('');
            setMensaje(errorMapper(error)?.values);
        }
    }, []);
    const enviarCodigo = async (codigo) => {
        try {
            await confirmarCodigo(codigo);
            setMensaje('Código verificado correctamente');
            setAuth({ ...auth, twoFactorEnabled: true });
            setTimeout(() => {
                navigate("/");
            }, 600);
        } catch (error) {
            setMensaje(errorMapper(error)?.values);
        }
    };

    useEffect(() => {
        cargarQr2FA();
    }, [cargarQr2FA]);

    useEffect(() => {
        if(auth.twoFactorEnabled) navigate("deshabilitar");
    }, [navigate, auth.twoFactorEnabled]);

    const handleVerificarCodigo = () => {
        enviarCodigo(verificationCode);
    };
     /*borrar el mensahe automaticamente  */
    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => setMensaje(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [mensaje, setMensaje]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
                    Configuración de 2FA
                </h1>
                <p className="text-gray-600 text-center mb-6">
                    La autenticación de dos factores (2FA) añade una capa adicional de
                    seguridad requiriendo un segundo método de verificación. Escanea el
                    código QR y verifica tu código.
                </p>

                <div className="text-center">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">
                        Escanea el siguiente código QR
                    </h3>
                    <div className="flex justify-center mb-6">
                        {qrData === "" ? (
                            <QRError />
                        ) : (
                            <img src={qrData} alt="Código QR 2FA" className="w-48 h-48" />
                        )}
                    </div>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="Introduce tu código"
                        className="w-full py-2 px-4 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={6}
                        minLength={6}
                        required
                    />
                    <button
                        onClick={handleVerificarCodigo}
                        className={`w-full py-2 ${
                            verificationCode.length === 6
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-gray-300 cursor-not-allowed"
                        } text-white font-semibold rounded-md transition-all`}
                        disabled={verificationCode.length !== 6}
                    >
                        Verificar
                    </button>
                </div>
                {mensaje && <Mensaje msg={mensaje} />}
            </div>
        </div>
    );
};

export default DobleFactorAutenticacion;
