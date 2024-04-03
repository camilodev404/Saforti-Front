import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

export const PrimeraFila = () => {

    const { login, handlerLogout } = useContext(UserContext);
    const location = useLocation();
    let currentPath = location.pathname;

    if(currentPath.includes("/login")){
        currentPath = false;
        sessionStorage.removeItem('login');
    } else {
        currentPath = true;
    }

    const salir = () => {
        handlerLogout();
    }

    return (
        <div className="primera-fila"> 
            <div>
                <a className="ant" href="https://www.ant.gov.co/">
                    <i className="material-icons">arrow_back</i>
                </a>
                <h5>Regresar Agencia Nacional de Tierras</h5>
            </div>
            {
                login.isAuth && currentPath ? <div>
                                    <button className="boton-salir" onClick={salir}>Salir</button>
                            </div> : null
            }
        </div>
    );
}