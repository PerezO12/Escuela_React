/**
 * Carga una llave (privada o pública) desde un archivo y la procesa.
 *
 * @param {File} file - El archivo seleccionado que contiene la llave.
 * @param {'privada' | 'publica'} tipo - El tipo de llave a procesar ('privada' o 'publica').
 * @returns {Promise<string>} - Una promesa que se resuelve con la llave procesada o se rechaza en caso de error.
 */
export const cargarLlave = (file, tipo) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const fileContent = reader.result;

        // Definir expresiones regulares para cada tipo de llave
        const regex =
          tipo === 'privada'
            ? /-----(BEGIN|END) PRIVATE KEY-----/g
            : /-----(BEGIN|END) PUBLIC KEY-----/g;

        // Limpiar el contenido de la llave
        const llave = fileContent.replace(regex, '').replace(/\s+/g, '');

        resolve(llave);
      } catch (error) {
        console.error("Error procesando la llave:", error);
        reject(`Error al procesar la llave ${tipo}.`);
      }
    };

    reader.onerror = () => {
      reject(`Error al leer el archivo de la llave ${tipo}.`);
    };

    if (file) {
      reader.readAsText(file);
    } else {
      reject('No se proporcionó un archivo válido.');
    }
  });
};




/* export const cargarLlavePrivada = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        try {
          const fileContent = reader.result;
  
          // Limpiar el contenido de la clave privada
          const privateKey = fileContent
            .replace(/-----(BEGIN|END) PRIVATE KEY-----/g, '')
            .replace(/\s+/g, '');
  
          resolve(privateKey);
        } catch (error) {
            console.log("error", error);
          reject('Error al procesar la llave privada.');
        }
      };
  
      reader.onerror = () => {
        reject('Error al leer el archivo.');
      };
  
      if (file) {
        reader.readAsText(file);
      } else {
        reject('No se proporcionó un archivo válido.');
      }
    });
  }; */
  