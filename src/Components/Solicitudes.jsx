import { useContext, useEffect, useState } from "react";
import { solicitudesUser } from "../services/formularioService";
import { UserContext } from "../context/UserContext";

export const Solicitudes = () => {

    const { userLoged } = useContext(UserContext);
    const [ fisos, setFisos ] = useState([]);

    const traerSolicitudesUsuario = async(ced) => {
        const result = await solicitudesUser(ced);
        setFisos(result.data);
    }

    useEffect(()=>{
        traerSolicitudesUsuario(userLoged.cedula);
    },[])

    const formatDate = (dateString) => {
        return dateString.slice(0, 10);
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
                                <td><button className="btn btn-primary">Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}