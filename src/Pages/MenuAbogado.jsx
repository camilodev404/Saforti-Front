import { useNavigate } from "react-router-dom";
import { Informacion } from "../Components/Informacion";
import { Solicitudes } from "../Components/Solicitudes";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const MenuAbodago = () => {

    const { userLoged } = useContext(UserContext);

    const navigate = useNavigate()

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>SEGUIMIENTO Y GESTION DE SOLICITUDES FISO</h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>INFORMACIÓN DEL FUNCIONARIO</h3>
            <Informacion/>

            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>SOLICITUDES ASIGNADAS</h3>
            <Solicitudes/>
        </>
    );
}