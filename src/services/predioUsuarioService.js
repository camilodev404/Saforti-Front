import axios from "axios"

export const savePredioUsuario = async(predio) => {
    try {
        return await axios.post('http://localhost:8084/prediousuario/save', predio);
    } catch (error) {
        console.error(error);
    }
    return null;
}