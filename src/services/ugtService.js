import axios from "axios"

export const findUgtById = async(idugt) => {
    try {
        return await axios.get(`http://localhost:8082/ugt/${idugt}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}