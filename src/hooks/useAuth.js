import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { findAll } from "../services/usuarioService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const useAuth = () => {

    const [ login, dispatch ] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const loginUser = async({email, password}) => {
        const response = await findAll();
        const res = response.data;
        const userWithEmail = res.find(user => user.correo === email);
        if (userWithEmail) {
            if(userWithEmail.password === password){
                return true;
            }
            return false;
        }else{
            return false;
        }
    }

    const handlerLogin = async({email, password}) => {
        const isLogin = await loginUser({ email, password });
        if(isLogin){
            const user = {email: email}
            dispatch({
                type: 'login',
                payload: user,
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user: user,
            }));
            navigate('/user/menu');
            
        } else {
            Swal.fire('Error Login', 'Username o Password inválidos', 'error').then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout',
        });
        sessionStorage.removeItem('login');
        navigate('/login');
    }

    return {
        login, 
        handlerLogin,
        handlerLogout,
    };

}