import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { RegistroUsuario } from "../Pages/RegistroUsuario";

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
                <Route path="/" element={<Navigate to={'/login'} />}/>
            </Routes>
        </>
    );
}