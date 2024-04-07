import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateFuncId, saveFunc } from "../services/usuarioService";

const nuevoEmpleadoFields = {
    idFuncionario: '',
    nombres: '',
    apellidos: '',
    correo: '',
    password: '',
    tipodoc: '',
    documento: '',
    cargo: '',
    rol: '',
    idugt: ''
}

export const EmpleadoForm = () => {

    const [ registerFuncForm, setRegisterFuncForm ] = useState(nuevoEmpleadoFields);
    const navigate = useNavigate();

    const onInputChange = ({target}) => {
        const { name, value } = target;
        const id = generateFuncId();
        setRegisterFuncForm({
            ...registerFuncForm,
            idFuncionario: id,
            [ name ]: value,
        });
    } 

    const onSubmitRegisterForm = async(event) => {
        event.preventDefault();
        const respuesta = await saveFunc(registerFuncForm);
        navigate('/administrador/menu');
    }

    return (
        <form onSubmit={onSubmitRegisterForm}>
            <div className="login-fields-register-fun">
                <div className="row" style={{padding: '2vw'}}>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Nombres</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="nombres" name="nombres" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Apellidos</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="apellidos" name="apellidos" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Email</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="correo" name="correo" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Contraseña</label>
                    <input onChange={onInputChange} className="label-register-user" type="password" id="password" name="password" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Tipo de Documento</label>
                    <select onChange={onInputChange} className="label-register-user" id="tipodoc" name="tipodoc">
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjeria</option>
                        <option value="CC">Cédula de Ciudadania</option>
                    </select>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Número de Documento</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="documento" name="documento"/>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Cargo</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="cargo" name="cargo"/>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Rol</label>
                    <select onChange={onInputChange} className="label-register-user" id="rol" name="rol">
                        <option value="Administrativo">Administrativo</option>
                        <option value="Empleado">Empleado</option>
                    </select>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>UGT</label>
                    <select onChange={onInputChange} className="label-register-user" id="idugt" name="idugt">
                        <option value="UGT3">Antioquia, Eje Cafetero y Choco</option>
                        <option value="UGT4">Caribe</option>
                        <option value="UGT5">Centro Oriente</option>
                        <option value="UGT1">Occidente</option>
                        <option value="UGT2">Oriente</option>
                        <option value="UGT6">Sur Amazonia</option>
                        <option value="UGT7">Noroccidente</option>
                        <option value="UGT8">Suroccidente</option>
                        <option value="UGT9">Otras</option>
                    </select>
                </div>
            </div>
            <div className="login-botom-register">
                <button type="submit">CREAR</button>
            </div>
        </form>
    );
}