// Validación de campos con diferentes criterios
const validarCampos = ({
    nombreCompleto,
    userName,
    carnetIdentidad,
    password = null,
    email
}) => {
    const validaciones = [
        {
            campo: "carnetIdentidad",
            valor: carnetIdentidad,
            validar: validarCarnetIdentidad,
            mensaje: "El carné de identidad no es válido. Debe tener exactamente 11 caracteres."
        },
        {
            campo: "email",
            valor: email,
            validar: validarEmail,
            mensaje: "El correo electrónico no es válido."
        },
        {
            campo: "userName",
            valor: userName,
            validar: validarNombreUsuario,
            mensaje: "El nombre de usuario debe tener al menos 4 caracteres."
        },
        {
            campo: "nombreCompleto",
            valor: nombreCompleto,
            validar: validarNombreCompleto,
            mensaje: "El nombre completo debe tener al menos 10 caracteres."
        },
        {
            campo: "password",
            valor: password ? password : (() => true),
            validar: password ? validarPassword : (() => true),
            mensaje: "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial."
        }
    ];

    const keys = {};
    const values = [];

    // Aplicar validaciones dinámicamente
    validaciones.forEach(({ campo, valor, validar, mensaje }) => {
        if (!valor || !validar(valor)) {
            keys[campo] = mensaje;
            values.push(mensaje);
        }
    });

    return { keys, values };
};

// Validaciones específicas
const validarCarnetIdentidad = (carnet) => carnet?.length === 11;

const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarNombreUsuario = (userName) => userName?.length >= 4;

const validarNombreCompleto = (nombreCompleto) => nombreCompleto?.length >= 10;

const validarPassword = (password) => {
    
    const tieneLongitudMinima = password?.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
        tieneLongitudMinima &&
        tieneMayuscula &&
        tieneMinuscula &&
        tieneNumero &&
        tieneCaracterEspecial
    );
};

// Exportación de la función principal
export default validarCampos;
