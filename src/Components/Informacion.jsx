import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export const Informacion = () => {

    const { userLoged, ugtLoged } = useContext(UserContext);



    return (
        <>
            <div className="div-menu-informacion">
                <div className="row flex-wrap">
                    {
                        !userLoged.rol ? 
                        <>
                            <div className="col">
                                <label className="label-info">Primer Nombre:</label><br/>
                                <input className="input-info" type="text" value={userLoged.primerNombre} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Segundo Nombre:</label><br/>
                                <input className="input-info" type="text" value={userLoged.segundoNombre ? userLoged.segundoNombre : ''} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Primer Apellido:</label><br/>
                                <input className="input-info" type="text" value={userLoged.primerApellido} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Segundo Apellido:</label><br/>
                                <input className="input-info" type="text" value={userLoged.segundoApellido ? userLoged.segundoApellido : '' } readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Email:</label><br/>
                                <input className="input-info" type="text" value={userLoged.correo} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Tipo Documento:</label><br/>
                                <input className="input-info" type="text" value={userLoged.tipoDocumento} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Documento:</label><br/>
                                <input className="input-info" type="text" value={userLoged.cedula} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Fecha Nacimiento:</label><br/>
                                <input className="input-info" type="text" value={userLoged.fechaNacimiento ? userLoged.fechaNacimiento.split("T")[0] : ''} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Sexo:</label><br/>
                                <input className="input-info" type="text" value={userLoged.sexo ? userLoged.sexo : '' } readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Dirección:</label><br/>
                                <input className="input-info" type="text" value={userLoged.direccion ? userLoged.direccion : '' } readOnly /><br/>
                            </div>
                        </>
                        : 
                        <>
                            <div className="col">
                                <label className="label-info">Nombres:</label><br/>
                                <input className="input-info" type="text" value={userLoged.nombres} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Apellidos:</label><br/>
                                <input className="input-info" type="text" value={userLoged.apellidos} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Correo:</label><br/>
                                <input className="input-info" type="text" value={userLoged.correo} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Cargo:</label><br/>
                                <input className="input-info" type="text" value={userLoged.cargo} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Rol:</label><br/>
                                <input className="input-info" type="text" value={userLoged.rol ? userLoged.rol : ''} readOnly /><br/>
                            </div>
                            <div className="col">
                                <label className="label-info">Ugt:</label><br/>
                                <input className="input-info" type="text" value={ugtLoged.nombre} readOnly /><br/>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    );
}