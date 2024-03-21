import { useNavigate } from "react-router-dom";
import { Informacion } from "../Components/Informacion";
import { Solicitudes } from "../Components/Solicitudes";

export const MenuUsuario = () => {

    const navigate = useNavigate()

    const onNuevaSolicitud = () => {
        navigate("/solicitud");
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>SEGUIMIENTO Y GESTION DE SOLICITUDES FISO</h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw' }}>INFORMACIÓN</h3>
            <Informacion/>
            <button 
                className="button-nuevo-registro"
                onClick={onNuevaSolicitud}
            >
            NUEVO REGISTRO
            </button>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw' }}>SOLICITUDES</h3>
            <Solicitudes/>
        </>
    );
}