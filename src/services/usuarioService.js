import axios from "axios"

export const findAll = async() => {
    try {
        const response = await axios.get('http://localhost:8081/usuario/all');
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const findAllFunc = async() => {
    try {
        const response = await axios.get('http://localhost:8082/funcionario/all');
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const saveFunc = async({idFuncionario, nombres, apellidos, correo, password, cargo, rol, idugt, tipodoc, documento}) => {
    try {
        const response = await axios.post('http://localhost:8082/funcionario/save', {
            idFuncionario,
            nombres,
            apellidos,
            correo,
            password,
            cargo,
            rol,
            idugt,
            tipodoc,
            documento
        });
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const generateFuncId = () => {
    const timestamp = new Date().getTime();
    const id = "FUN" + timestamp;
    return id;
}

export const saveUser = async({cedula, tipoDocumento, correo, password, primerNombre, segundoNombre, primerApellido, segundoApellido}) => {
    try {
        return await axios.post('http://localhost:8081/usuario/save', {
            cedula,
            tipoDocumento,
            correo,
            password,
            primerNombre,
            segundoNombre,
            primerApellido,
            segundoApellido
        });
    } catch (error) {
        console.error(error);
    }
    return null;
}