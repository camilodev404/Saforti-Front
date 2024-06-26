import { useContext, useEffect, useState } from "react";
import { solicitudByFun, solicitudesUser } from "../services/formularioService";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const Solicitudes = () => {

    const { userLoged } = useContext(UserContext);
    const [ fisos, setFisos ] = useState([]);
    const navigate = useNavigate();

    const traerSolicitudesUsuario = async(ced) => {
        const result = await solicitudesUser(ced);
        setFisos(result.data);
    }

    const traerSolicitudesFuncionario = async(iden) => {
        const result = await solicitudByFun(iden);
        setFisos(result.data);
    }

    useEffect(()=>{
        if(userLoged.cargo){
            traerSolicitudesFuncionario(userLoged.idFuncionario);
        }else{
            traerSolicitudesUsuario(userLoged.cedula);
        }
    },[])

    const formatDate = (dateString) => {
        return dateString.slice(0, 10);
    }

    const detailForm = (fiso) => {
        navigate("/solicitud/detail", { state: { fiso } });
    }

    return (
        <> 
            <div className="div-menu-solicitud" >
                <table className="table table-hover table-striped" style={{ borderColor: 'black', border: '2px solid #ccc'}}>
                    <thead>
                        <tr>
                            <th>#Formulario</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Ver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fisos.map((fiso, index) =>(
                            <tr key={index}>
                                <td>{fiso.nroFormulario}</td>
                                <td>{formatDate(fiso.fecha)}</td>
                                <td>{fiso.estado}</td>
                                <td><button onClick={() => detailForm(fiso)} className="btn btn-primary">Ver</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}