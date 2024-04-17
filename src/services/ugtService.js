import axios from "axios"

export const findUgtById = async(idugt) => {
    try {
        return await axios.get(`http://localhost:8082/ugt/${idugt}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const allUgts = async() => {
    try {
        return await axios.get('http://localhost:8082/ugt/all');
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const funcionarioByUgt = async(idugt) => {
    try {
        return await axios.get(`http://localhost:8082/funcionario/ugt/${idugt}`)
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const asignacionFun = (n) => {
    return Math.floor(Math.random() * n);
}