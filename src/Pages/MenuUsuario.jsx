import { useNavigate } from "react-router-dom";
import { Informacion } from "../Components/Informacion";
import { Solicitudes } from "../Components/Solicitudes";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const MenuUsuario = () => {

    const { userLoged } = useContext(UserContext);
    const navigate = useNavigate();

    const onNuevaSolicitud = () => {
        console.log(userLoged);
        navigate("/solicitud");
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>SEGUIMIENTO Y GESTION DE SOLICITUDES FISO</h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>INFORMACIÓN DEL USUARIO</h3>
            <Informacion/>
            <button 
                className="button-nuevo-registro"
                onClick={onNuevaSolicitud}
                style={{ marginTop: '4vw' }}
            >
            NUEVO REGISTRO
            </button>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>SOLICITUDES</h3>
            <Solicitudes/>
        </>
    );
}