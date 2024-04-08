import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const initialLoginForm = {
    email: '',
    password: '',
}

export const LoginFields = () => {

    const { handlerLogin } = useContext(UserContext);

    const [ loginForm, setLoginForm ] = useState(initialLoginForm);
    const { email, password } = loginForm;

    const onInputChange = ({target}) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        });
    }

    const navigate = useNavigate();

    const onRegistroUsuario = () => {
        navigate('/user/register')
    }

    const onSubmitLoginForm = async(event) => {
        event.preventDefault();
        handlerLogin({email, password});
        setLoginForm(initialLoginForm);
    }

    return (
        <form onSubmit={onSubmitLoginForm}>
            <div className="login-fields">
                <div className="row" style={{padding: '3vw'}}>
                    <label style={{ marginBottom: '1vw', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>USUARIO</label>
                    <input onChange={onInputChange} type="text" id="email" name="email" style={{ marginBottom: '1vw', marginLeft: '10px', width: '20vw', height: '2vw', borderRadius: '10px' }}/>
                    <label style={{ marginBottom: '1vw', color: '#FFF', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>CONTRASEÑA</label>
                    <input onChange={onInputChange} type="password" id="password" name="password" style={{ marginBottom: '1vw', marginLeft: '10px', width: '20vw', height: '2vw', borderRadius: '10px' }} />
                </div>
            </div>
            <div className="login-botoms">
                <button type="submit">INGRESAR</button>
                <button type="button" onClick={onRegistroUsuario}>REGISTRARSE</button>
            </div>
        </form>
    );
}