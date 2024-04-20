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

export const saveFormulario = async(soli) => {
    try {
        return await axios.post('http://localhost:8085/solicitud/save/solicitud', soli);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const solicitudesUser = async(ced) => {
    try {
        return await axios.get(`http://localhost:8085/solicitud/cedula/${ced}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const solicitudByFun = async(idfun) => {
    try {
        return await axios.get(`http://localhost:8085/solicitud/func/${idfun}`);
    } catch (error) {
        console.error(error);
    }
    return null;
}