
import { useAuth } from "../hooks/useAuth";
import { useFamiliar } from "../hooks/useFamiliar";
import { useFiso } from "../hooks/useFiso";
import { usePredio } from "../hooks/usePredio";
import { usePredioUsuario } from "../hooks/usePredioUsuario";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {

    const users = [];
    
    const { login, handlerLogin, handlerLogout, registerUser, userLoged, ugtLoged } = useAuth();
    const { solicitud, handlerInitialFiso, handlerId, handlerResetValuesForm, handlerAuths, handlerVerificacion } = useFiso();
    const { familiares, handlerFamiliares, handlerRemove, handlerReplace } = useFamiliar();
    const { handlerRelacionJuridica, predioUsuario, handlerSecondUpdate } = usePredioUsuario();
    const { predio, handlerPredio } = usePredio();

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
                predio,
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
                handlerPredio,
                handlerSecondUpdate,
                handlerReplace,
            }
        }>
            {children}
        </UserContext.Provider>
    );

}