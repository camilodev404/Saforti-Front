
import { useAuth } from "../hooks/useAuth";
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
    
    const { login, handlerLogin, handlerLogout, registerUser, userLoged } = useAuth();

    return (
        <UserContext.Provider value={
            {
                users,
                handlerLogin,
                login,
                userLoged,
                handlerLogout,
                registerUser,
            }
        }>
            {children}
        </UserContext.Provider>
    );

}