const convertirFechas = (date) => {
    const fecha = new Date(date);

    if (isNaN(fecha)) {
        return "Fecha inválida";
    }

    const formattedDate = fecha.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    // Retornar la fecha y hora formateadas
    return ` ${formattedDate} `;
}

export default convertirFechas