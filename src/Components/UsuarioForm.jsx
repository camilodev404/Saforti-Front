import { useNavigate } from "react-router-dom";

export const UsuarioForm = () => {

    const navigate = useNavigate();

    const onSubmitRegisterForm = (event) => {
        event.preventDefault();
        console.log("Estoy en el form de registro");
        navigate('/user/menu');
    }

    return (
        <form onSubmit={onSubmitRegisterForm}>
            <div className="login-fields-register">
                <div className="row" style={{padding: '40px'}}>
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Primer Nombre</label>
                    <input className="label-register-user" type="text" id="usuario" name="usuario" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Segundo Nombre</label>
                    <input className="label-register-user" type="text" id="usuario2" name="usuario2" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Primer Apellido</label>
                    <input className="label-register-user" type="text" id="apellido1" name="apellido1" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Segundo Apellido</label>
                    <input className="label-register-user" type="text" id="apellido2" name="apellido2" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Email</label>
                    <input className="label-register-user" type="text" id="email" name="email" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Contraseña</label>
                    <input className="label-register-user" type="password" id="password" name="password" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Tipo de Documento</label>
                    <select className="label-register-user" id="tipodoc" name="tipodoc">
                        <option value="dni">Tarjeta de Identidad</option>
                        <option value="pasaporte">Cédula de Extranjeria</option>
                        <option value="cedula">Cédula de Ciudadania</option>
                    </select>
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Número de Documento</label>
                    <input className="label-register-user" type="text" id="documento" name="documento"/>
                </div>
            </div>
            <div className="login-botom-register">
                <button type="submit">REGISTRARSE</button>
            </div>
        </form>
    );
}