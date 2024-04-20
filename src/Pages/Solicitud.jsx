import { useNavigate } from "react-router-dom";
import { Formulario } from "../Components/Formulario";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { saveFormulario } from "../services/formularioService";
import { saveAllFamiliares } from "../services/predioUsuarioService";

export const Solicitud = () => {

    const { userLoged, solicitud, handlerResetValuesForm, predioUsuario, 
        familiares, handlerReset, predio, handleResetPredio, handleResetPredioUsuario } = useContext(UserContext);
    const fams = familiares && familiares.length > 0 ? familiares[0] : null;

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

    const guardarFamilia = async(familias) => {
        for(const familier of familias) {
            await saveAllFamiliares(familier);
        }
    }

    const guardarForm = async(formsvalues) => {
        const res = await saveFormulario(formsvalues);
    }
    
    const onSendForm = () => {
        if(fams !== null){
            guardarFamilia(fams);
        }
        guardarForm(solicitud);
        naigateBack();
        handlerResetValuesForm();
        handlerReset();
        handleResetPredio();
        handleResetPredioUsuario();
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