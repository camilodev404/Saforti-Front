import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { RegistroUsuario } from "../Pages/RegistroUsuario";
import { MenuUsuario } from "../Pages/MenuUsuario";
import { Solicitud } from "../Pages/Solicitud";
import { MenuAbodago } from "../Pages/MenuAbogado";
import { MenuAdmin } from "../Pages/MenuAdmin";
import { RegistroEmpleado } from "../Pages/RegistroEmpleado";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const SafortiRoutes = () => {

    const { login } = useContext(UserContext);

    return (
        <>
            <Routes>
                {
                    !login.isAuth 
                    ?
                    <>
                        <Route
                        path="login"
                        element={<Login/>}
                        >
                        </Route>
                        <Route path="/" element={<Navigate to={'/login'} />}/>
                    </>
                    :
                    <>
                        <Route
                            path="user/register"
                            element={<RegistroUsuario/>}
                        >
                        </Route>
                        <Route
                            path="user/menu"
                            element={<MenuUsuario/> }
                        >
                        </Route>
                        <Route
                            path="solicitud"
                            element={<Solicitud/>}
                        >
                        </Route>
                        <Route
                            path="funcionario/menu"
                            element={<MenuAbodago/>}
                        >
                        </Route>
                        <Route
                            path="administrador/menu"
                            element={<MenuAdmin/>}
                        >
                        </Route>
                        <Route
                            path="funcionario/register"
                            element={<RegistroEmpleado/>}
                        >
                        </Route>
                    </>
                }
            </Routes>
        </>
    );
}