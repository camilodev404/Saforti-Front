import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Formulario = () => {

    const { solicitud } = useContext(UserContext);

    return (
        <>
            <div className="div-formulario">
                <p style={{ fontWeight: 'bold', marginTop: '1vw', fontSize: '2vw', color: '#4f4f4d' }}>Número de Formulario {solicitud.nroformulario}</p>
            </div>
        </>
    );
}