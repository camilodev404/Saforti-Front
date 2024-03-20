import { LoginFields } from "../Components/LoginFields";

export const Login = () => {
    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>INGRESAR AL SISTEMA</h2>
            <div style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center' }}>
                <LoginFields />
            </div>
        </>
    );
} 