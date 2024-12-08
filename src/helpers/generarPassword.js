function generarPassword(longitud) {
    // Define los caracteres disponibles en cada grupo
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const caracteresEspeciales = '!@#$%^&*()_+[]{}|;:,.<>?';
  
    // Combina todos los caracteres en una sola cadena
    const todosLosCaracteres = mayusculas + minusculas + numeros + caracteresEspeciales;
  
    // Asegura que la contraseña contenga al menos uno de cada grupo
    let password = '';
    password += mayusculas[Math.floor(Math.random() * mayusculas.length)];
    password += minusculas[Math.floor(Math.random() * minusculas.length)];
    password += numeros[Math.floor(Math.random() * numeros.length)];
    password += caracteresEspeciales[Math.floor(Math.random() * caracteresEspeciales.length)];
  
    // Completa la contraseña hasta la longitud deseada
    for (let i = password.length; i < longitud; i++) {
      password += todosLosCaracteres[Math.floor(Math.random() * todosLosCaracteres.length)];
    }
  
    // Mezcla los caracteres para evitar patrones predecibles
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  }

export default generarPassword;