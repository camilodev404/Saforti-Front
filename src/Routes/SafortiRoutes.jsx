import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { RegistroUsuario } from "../Pages/RegistroUsuario";
import { MenuUsuario } from "../Pages/MenuUsuario";
import { Solicitud } from "../Pages/Solicitud";
import { MenuAbodago } from "../Pages/MenuAbogado";

export const SafortiRoutes = () => {
    return (
        <>
            <Routes>
                <Route
                    path="login"
                    element={<Login/>}
                >
                </Route>
                <Route
                    path="user/register"
                    element={<RegistroUsuario/>}
                >
                </Route>
                <Route
                    path="user/menu"
                    element={<MenuUsuario/>}
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
                <Route path="/" element={<Navigate to={'/login'} />}/>
            </Routes>
        </>
    );
}