import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { findAll, findAllFunc } from "../services/usuarioService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}



export const useAuth = () => {

    const [ login, dispatch ] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();
    let isFunc = false;
    let isAdmin = false;

    const loginUser = async({email, password}) => {
        const response = await findAll();
        const funcionarios = await findAllFunc();

        const { data: res } = response;
        const { data: funcs } = funcionarios;

        const userWithEmail = res.find(user => user.correo === email);
        const funcWithEmail = funcs.find(user => user.correo === email);

        if (userWithEmail) {
            if(userWithEmail.password === password){
                return true;
            }
            
        }else{
            if(funcWithEmail){
                if(funcWithEmail.password === password){
                    isFunc = true;
                    if(funcWithEmail.rol === "Administrativo"){
                        isAdmin = true;
                    }
                    return true;
                }
            }
            return false;
        }
    }

    const handlerLogin = async({email, password}) => {
        const isLogin = await loginUser({ email, password });
        if(isLogin){
            const user = {email: email}
            if(!isFunc){
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
                if(isAdmin){
                    dispatch({
                        type: 'login',
                        payload: user,
                    });
                    sessionStorage.setItem('login', JSON.stringify({
                        isAuth: true,
                        user: user,
                    }));
                    navigate('/administrador/menu');
                } else{
                    dispatch({
                        type: 'login',
                        payload: user,
                    });
                    sessionStorage.setItem('login', JSON.stringify({
                        isAuth: true,
                        user: user,
                    }));
                    navigate('/funcionario/menu');
                }
            }
            
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
        navigate('/login', { replace: true });
    }

    return {
        login, 
        handlerLogin,
        handlerLogout,
    };

}