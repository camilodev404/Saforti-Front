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
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Nombre (s)</label>
                    <input className="label-register-user" type="text" id="usuario" name="usuario" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Apellido (s)</label>
                    <input className="label-register-user" type="text" id="contrasena" name="contrasena" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Email</label>
                    <input className="label-register-user" type="text" id="email" name="email" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Contraseña</label>
                    <input className="label-register-user" type="password" id="password" name="password" />
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Tipo de Documento</label>
                    <input className="label-register-user" type="text" id="tipodoc" name="tipodoc" />
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