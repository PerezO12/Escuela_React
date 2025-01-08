export const errorMapper = (obj) => {
    let keys = [];
    let values = [];
    if (typeof obj !== "object" || obj === null) {
        values.push("Ocurrió un error, inténtalo nuevamente más tarde.");
        return { keys, values };
    }
    for (const [key, value] of Object.entries(obj)) {
        if(key == "$id") continue;
        keys.push(key);
        values.push(value[0]);
    };
    console.log("keys", keys);
    console.log("values", values);
    return { keys, values };
};