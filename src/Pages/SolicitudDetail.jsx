import { useLocation } from "react-router-dom";
import { SolicitudValues } from "../Components/SolicitudValues";

export const SolicitudDetail = () => {
    const location = useLocation();
    const { state: { fiso } } = location;
    return (
        <div>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>
                FORMULARIO DE INSCRIPCIÓN<br/> DE SUJETOS DE ORDENAMIENTO
            </h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>FORMULARIO FISO</h3>
            <SolicitudValues fiso={fiso}/>
        </div>
    );
}