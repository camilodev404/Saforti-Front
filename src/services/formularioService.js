import axios from "axios"

export const generateFormId = () => {
    const timestamp = new Date().getTime();
    const id = "FISO-PN-" + timestamp;
    return id;
}

export const findAllDeptosForm = async() => {
    try {
        const response = await axios.get('http://localhost:8085/solicitud/departamentos');
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const findMunByDeptoForm = async(iddepto) => {
    try {
        return await axios.get(`http://localhost:8085/municipio/depto/${iddepto}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}