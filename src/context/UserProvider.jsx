
import { useAuth } from "../hooks/useAuth";
import { useFamiliar } from "../hooks/useFamiliar";
import { useFiso } from "../hooks/useFiso";
import { usePredioUsuario } from "../hooks/usePredioUsuario";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {

    const users = [];
    
    const { login, handlerLogin, handlerLogout, registerUser, userLoged, ugtLoged } = useAuth();
    const { solicitud, handlerInitialFiso, handlerId, handlerResetValuesForm, handlerAuths, handlerVerificacion } = useFiso();
    const { familiares, handlerFamiliares, handlerRemove } = useFamiliar();
    const { handlerRelacionJuridica, predioUsuario } = usePredioUsuario();

    return (
        <UserContext.Provider value={
            {
                users,
                handlerLogin,
                login,
                solicitud,
                userLoged,
                ugtLoged,
                familiares,
                predioUsuario,
                handlerLogout,
                registerUser,
                handlerInitialFiso,
                handlerId,
                handlerResetValuesForm,
                handlerAuths,
                handlerFamiliares,
                handlerRemove,
                handlerVerificacion,
                handlerRelacionJuridica,
            }
        }>
            {children}
        </UserContext.Provider>
    );

}