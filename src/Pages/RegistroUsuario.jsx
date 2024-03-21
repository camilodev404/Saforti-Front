import { UsuarioForm } from "../Components/UsuarioForm";

export const RegistroUsuario = () => {
    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>REGISTRARSE</h2>
            <div style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center' }}>
                <UsuarioForm/>
            </div>
        </>
    );
}