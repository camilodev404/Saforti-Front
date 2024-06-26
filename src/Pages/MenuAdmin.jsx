import { useNavigate } from "react-router-dom";
import { Informacion } from "../Components/Informacion";
import { Solicitudes } from "../Components/Solicitudes";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const MenuAdmin = () => {

    const { userLoged, ugtLoged } = useContext(UserContext);
    const navigate = useNavigate()

    const onNuevoFuncionario = () => {
        navigate("/funcionario/register");
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>SEGUIMIENTO Y GESTION DE SOLICITUDES<br/> FISO Y FUNCIONARIOS</h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>INFORMACIÓN DEL FUNCIONARIO ADMINISTRADOR</h3>
            <Informacion/>
            <div className="row" style={{ marginTop: '5vw' }}>
                <button 
                    className="button-nuevo-registro"
                    onClick={onNuevoFuncionario}
                >
                NUEVO FUNCIONARIO
                </button>
            </div>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>BUSQUEDA DE SOLICITUDES</h3>
            <Solicitudes/>
        </>
    );
}