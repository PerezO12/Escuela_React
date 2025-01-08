//todo: esto es tempora, arreglar y mejorar

const procesarErrores = (errorResponse, setMensaje, setMostrarConfirmar) => {
    // Diccionario de mensajes personalizados para los campos
    console.log(errorResponse)
    const errorMessages = {
      CarnetIdentidad: "El carné de identidad no es válido.",
      NombreCompleto: "El nombre no es válido.",
      Email: "No es un correo válido.",
      Password: "La contraseña es muy corta.",
      userName: "El usuario ya existe."
    };
  
    const erroresModelo = errorResponse?.errors;
    const mensajeGeneral = errorResponse?.msg;
    
    if (erroresModelo) {
      for (const campo in erroresModelo) {
        if (erroresModelo[campo]) {
          console.log("entre");
          setMensaje(errorMessages[campo]);
          setMostrarConfirmar(false);
          return; 
        }
      }
    }

    if (mensajeGeneral) {
      if (mensajeGeneral.includes("userName")) {
        setMensaje("El usuario ya existe.");
        setMostrarConfirmar(false);
      } else if (mensajeGeneral?.includes("Contraseña incorrecta")) {
        setMensaje("Contraseña incorrecta");
      } else if (mensajeGeneral.includes("Passwords must have at least ")) {
        setMensaje(
          "La contraseña debe tener al menos un carácter no alfanumérico (por ejemplo, @, #, $, etc.), al menos un dígito (0-9) y al menos una letra mayúscula (A-Z)"
        );
        setMostrarConfirmar(false);
      } else {
        if(typeof mensajeGeneral === "string" || typeof mensajeGeneral === "string")
        {
          setMensaje(mensajeGeneral)
        } else if(mensajeGeneral[0]?.length > 5) {
          console.log(mensajeGeneral[0])
          setMensaje(mensajeGeneral[0]);
        }
        else{
          setMensaje("Ha ocurrido un error inesperado.");
        }
        setMostrarConfirmar(false);
      }
      return;
    }
  
    // Mensaje genérico en caso de que no haya errores específicos
    setMensaje("Ha ocurrido un error inesperado.");
    setMostrarConfirmar(false);

};
  
export default procesarErrores;