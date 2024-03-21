import { useNavigate } from "react-router-dom";

export const LoginFields = () => {

    const navigate = useNavigate();

    const onRegistroUsuario = () => {
        navigate('/user/register')
    }

    const onSubmitLoginForm = (event) => {
        event.preventDefault();
        console.log("Estoy aca");
    }

    return (
        <form onSubmit={onSubmitLoginForm}>
            <div className="login-fields">
                <div className="row" style={{padding: '70px'}}>
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>USUARIO</label>
                    <input type="text" id="usuario" name="usuario" style={{ marginBottom: '20px', marginLeft: '10px', width: '400px', height: '40px', borderRadius: '10px' }}/>
                    <label style={{ marginBottom: '20px', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>CONTRASEÑA</label>
                    <input type="password" id="contrasena" name="contrasena" style={{ marginBottom: '20px', marginLeft: '10px', width: '400px', height: '40px', borderRadius: '10px' }} />
                </div>
            </div>
            <div className="login-botoms">
                <button type="submit">INGRESAR</button>
                <button type="button" onClick={onRegistroUsuario}>REGISTRARSE</button>
            </div>
        </form>
    );
}