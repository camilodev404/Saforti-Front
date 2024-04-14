import { useNavigate } from "react-router-dom";
import { Formulario } from "../Components/Formulario";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const Solicitud = () => {

    const { userLoged, solicitud, handlerResetValuesForm } = useContext(UserContext);

    const navigate = useNavigate();

    const naigateBack = () => {
        if(userLoged && userLoged.rol == "Administrativo"){
            navigate('/administrador/menu');
        } else if (userLoged && userLoged.rol == "Empleado"){
            navigate('/funcionario/menu');
        } else {
            navigate('/user/menu');
        }
    }
    
    const onSendForm = () => {
        console.log(solicitud);
        naigateBack();
        handlerResetValuesForm();
    }

    return (
        <>
            <h2 style={{ textAlign: 'center', color: '#4f4f4d', fontWeight: '800' }}>
                FORMULARIO DE INSCRIPCIÓN<br/> DE SUJETOS DE ORDENAMIENTO
            </h2>
            <h3 style={{ color: '#4f4f4d', fontWeight: '700', marginLeft: '10vw', marginTop: '4vw' }}>FORMULARIO FISO</h3>
            <Formulario/>
            <button onClick={onSendForm} className="button-enviar">ENVIAR</button>
        </>
    );
}