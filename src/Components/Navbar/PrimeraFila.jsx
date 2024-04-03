import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const PrimeraFila = () => {

    const { login, handlerLogout } = useContext(UserContext);

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
                login.isAuth ? <div>
                                    <button className="boton-salir" onClick={salir}>Salir</button>
                            </div> : null
            }
        </div>
    );
}