import axios from "axios"

export const savePredioUsuario = async(predio) => {
    try {
        return await axios.post('http://localhost:8084/prediousuario/save', predio);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const saveAllFamiliares = async(familia) => {
    try {
        return await axios.post('http://localhost:8084/familia/save', familia);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const predioUsuarioFinder = async(idpredio, cedula) => {
    try {
        return await axios.get(`http://localhost:8084/prediousuario/${idpredio}/${cedula}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}