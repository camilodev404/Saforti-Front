import axios from "axios"

export const generatePredioId = () => {
    const timestamp = new Date().getTime();
    const id = "PRED-" + timestamp;
    return id;
}

export const savePredio = async(predio) => {
    try {
        return await axios.post('http://localhost:8083/predio/save', predio);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const getPredioById = async(id) => {
    try {
        return await axios.get(`http://localhost:8083/predio/${id}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}