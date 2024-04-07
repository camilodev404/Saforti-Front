
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const initialUser = {
    cedula: '',
    tipoDocumento: '',
    correo: '',
    password: '',
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: ''
}

export const UsuarioForm = () => {

    const { registerUser } = useContext(UserContext);
    const [ registerForm, setRegisterForm ] = useState(initialUser);
    const { cedula } = registerForm;

    const onInputChange = ({target}) => {
        const { name, value } = target;
        setRegisterForm({
            ...registerForm,
            [ name ]: value,
        });
        console.log(registerForm);
    } 

    const onSubmitRegisterForm = async(event) => {
        event.preventDefault();
        if (cedula.length<=1){
            return null;
        }
        await registerUser(registerForm);
    }

    return (
        <form onSubmit={onSubmitRegisterForm}>
            <div className="login-fields-register">
                <div className="row" style={{padding: '40px'}}>
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Primer Nombre</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="primerNombre" name="primerNombre" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Segundo Nombre</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="segundoNombre" name="segundoNombre" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Primer Apellido</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="primerApellido" name="primerApellido" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Segundo Apellido</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="segundoApellido" name="segundoApellido" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Email</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="correo" name="correo" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Contraseña</label>
                    <input onChange={onInputChange} className="label-register-user" type="password" id="password" name="password" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Tipo de Documento</label>
                    <select onChange={onInputChange} className="label-register-user" id="tipoDocumento" name="tipoDocumento">
                        <option value="TI">Tarjeta de Identidad</option>
                        <option value="CE">Cédula de Extranjeria</option>
                        <option value="CC">Cédula de Ciudadania</option>
                    </select>
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Número de Documento</label>
                    <input onChange={onInputChange} className="label-register-user" type="text" id="cedula" name="cedula"/>
                </div>
            </div>
            <div className="login-botom-register">
                <button type="submit">REGISTRARSE</button>
            </div>
        </form>
    );
}