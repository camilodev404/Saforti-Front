import { EmpleadoForm } from "../Components/EmpleadoForm";

export const RegistroEmpleado = () => {
    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>REGISTRAR NUEVO FUNCIONARIO</h2>
            <div style={{ marginTop: '50px', textAlign: 'center', alignItems: 'center' }}>
                <EmpleadoForm/>
            </div>
        </>
    );
}