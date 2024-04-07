import { useReducer, useState } from "react";
import { loginReducer } from "../reducers/loginReducer";
import { findAll, findAllFunc, saveUser } from "../services/usuarioService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findUgtById } from "../services/ugtService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined,
}

export const useAuth = () => {

    const [ login, dispatch ] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();
    const [ userLoged, setUserLoged ] = useState(null);
    const [ ugtLoged, setUgtLoged ] = useState(null);
    let isFunc = false;
    let isAdmin = false;

    const registerUser = async(user) => {
        const response = await saveUser(user);
        dispatch({
            type: 'login',
            payload: user,
        });
        sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user: user.correo,
        }));
        setUserLoged(response.data);
        navigate('/user/menu');
    }

    const loginUser = async({email, password}) => {
        const response = await findAll();
        const funcionarios = await findAllFunc();

        const { data: res } = response;
        const { data: funcs } = funcionarios;

        const userWithEmail = res.find(user => user.correo === email);
        const funcWithEmail = funcs.find(user => user.correo === email);

        if (userWithEmail) {
            if(userWithEmail.password === password){
                setUserLoged(userWithEmail);
                return true;
            }
            
        }else{
            if(funcWithEmail){
                if(funcWithEmail.password === password){
                    isFunc = true;
                    setUserLoged(funcWithEmail);
                    const ugt = await findUgtById(funcWithEmail.idugt);
                    setUgtLoged(ugt.data);
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
        userLoged,
        ugtLoged,
        handlerLogin,
        handlerLogout,
        registerUser,
    };

}