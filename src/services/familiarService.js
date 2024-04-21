import axios from "axios"

export const idFamiliarGenerate = () => {
    const timestamp = new Date().getTime();
    const idFamiliar = timestamp;
    return idFamiliar;
}

export const familiarByCedula = async(cedula, idpredio) => {
    try {
        return await axios.get(`http://localhost:8084/familia/cedula/${cedula}/${idpredio}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}