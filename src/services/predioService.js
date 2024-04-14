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