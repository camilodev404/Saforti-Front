
import { useAuth } from "../hooks/useAuth";
import { useFamiliar } from "../hooks/useFamiliar";
import { useFiso } from "../hooks/useFiso";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {

    const users = [];
    
    const { login, handlerLogin, handlerLogout, registerUser, userLoged, ugtLoged } = useAuth();
    const { solicitud, handlerInitialFiso, handlerId, handlerResetValuesForm, handlerAuths } = useFiso();
    const { familiares, handlerFamiliares, handlerRemove } = useFamiliar();

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
                handlerLogout,
                registerUser,
                handlerInitialFiso,
                handlerId,
                handlerResetValuesForm,
                handlerAuths,
                handlerFamiliares,
                handlerRemove,
            }
        }>
            {children}
        </UserContext.Provider>
    );

}