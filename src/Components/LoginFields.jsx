
export const LoginFields = () => {
    return (
        <form className="login">
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
                <button type="button">REGISTRARSE</button>
            </div>
        </form>
    );
}