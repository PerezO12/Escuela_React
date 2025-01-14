import PropTypes from "prop-types";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

const QrCodeGenerator = ({
    otpAuthUrl 
}) => {

    //generar el qr
    const canvasRef = useRef(null);
    //todo:cambiar funcion error
    useEffect(() => {
       QRCode.toCanvas(canvasRef.current, otpAuthUrl, { width: 300 }, (error) => {
        if (error) console.error(error);
        else console.log("QR Code generado!");
      }); 
    },[otpAuthUrl])
    return (
        <div>
            <h2>Escanea el código QR para configurar 2FA</h2>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

QrCodeGenerator.propTypes = {
    otpAuthUrl: PropTypes.string.isRequired,
};

export default QrCodeGenerator