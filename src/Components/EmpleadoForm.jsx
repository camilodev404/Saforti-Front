import { useNavigate } from "react-router-dom";

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
    idUgt: ''
}

export const EmpleadoForm = () => {
    const navigate = useNavigate();

    const onSubmitRegisterForm = (event) => {
        event.preventDefault();
        console.log("Estoy en el form de registro");
        navigate('/administrador/menu');
    }

    return (
        <form onSubmit={onSubmitRegisterForm}>
            <div className="login-fields-register-fun">
                <div className="row" style={{padding: '2vw'}}>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Nombres</label>
                    <input className="label-register-user" type="text" id="usuario" name="usuario" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Apellidos</label>
                    <input className="label-register-user" type="text" id="apellido1" name="apellido1" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Email</label>
                    <input className="label-register-user" type="text" id="email" name="email" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Contraseña</label>
                    <input className="label-register-user" type="password" id="password" name="password" />
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Tipo de Documento</label>
                    <select className="label-register-user" id="tipodoc" name="tipodoc">
                        <option value="dni">Tarjeta de Identidad</option>
                        <option value="pasaporte">Cédula de Extranjeria</option>
                        <option value="cedula">Cédula de Ciudadania</option>
                    </select>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Número de Documento</label>
                    <input className="label-register-user" type="text" id="documento" name="documento"/>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Cargo</label>
                    <input className="label-register-user" type="text" id="cargo" name="cargo"/>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>Rol</label>
                    <input className="label-register-user" type="text" id="rol" name="rol"/>
                    <label style={{ marginBottom: '0.4vw', color: '#FFF', fontSize: '1vw', fontWeight: 'bold', textAlign: 'left' }}>UGT</label>
                    <select className="label-register-user" id="ugt" name="ugt">
                        <option value="antioquia">Antioquia, Eje Cafetero y Choco</option>
                        <option value="caribe">Caribe</option>
                        <option value="centro-oriente">Centro Oriente</option>
                        <option value="occidente">Occidente</option>
                        <option value="oriente">Oriente</option>
                        <option value="sur-amazonia">Sur Amazonia</option>
                        <option value="noroccidente">Noroccidente</option>
                        <option value="suroccidente">Suroccidente</option>
                        <option value="operador">Operador</option>
                    </select>
                </div>
            </div>
            <div className="login-botom-register">
                <button type="submit">CREAR</button>
            </div>
        </form>
    );
}