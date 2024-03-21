import { useNavigate } from "react-router-dom";
import { Documentos } from "../Components/Documentos";
import { Formulario } from "../Components/Formulario";

export const Solicitud = () => {

    const navigate = useNavigate();
    
    const onSendForm = () => {
        console.log("Envio de formulario")
        navigate('/user/menu');
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>
                FORMULARIO DE INSCRIPCIÓN<br/> DE SUJETOS DE ORDENAMIENTO
            </h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw' }}>FORMULARIO</h3>
            <Formulario/>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw' }}>DOCUMENTOS</h3>
            <Documentos/>
            <button onClick={onSendForm} className="button-enviar">ENVIAR</button>
        </>
    );
}