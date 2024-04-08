
import { useAuth } from "../hooks/useAuth";
import { useFiso } from "../hooks/useFiso";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {

    /*const {
        users,
        userSelected,
        initialFormUser,
        visibleFor,
        errors,
        handlerRemoveUser,
        handlerEditUser,
        handlerAddUser,
        handlerClosForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();*/

    const users = [];
    
    const { login, handlerLogin, handlerLogout, registerUser, userLoged, ugtLoged } = useAuth();
    const { solicitud, generateFormularioId } = useFiso();

    return (
        <UserContext.Provider value={
            {
                users,
                handlerLogin,
                login,
                solicitud,
                userLoged,
                ugtLoged,
                handlerLogout,
                registerUser,
                generateFormularioId,
            }
        }>
            {children}
        </UserContext.Provider>
    );

}