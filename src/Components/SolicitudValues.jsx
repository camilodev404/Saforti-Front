import { useEffect, useState } from "react";
import { findUserById } from "../services/usuarioService";

export const SolicitudValues = ({fiso}) => {

    const [ solicitudPendiente, setSolicitudPendiente ] = useState(fiso);
    const [ respuestSolicitud, setRespuestSolicitu ] = useState(false);
    const [ usuario, setUsuario ] = useState({});

    const buscarUsuario = async(iduser) => {
        const res = await findUserById(iduser);
        setUsuario(res.data);
    }

    useEffect(()=>{
        buscarUsuario(solicitudPendiente.foranea.cedula);
    },[])

    const formatDate = (dateString) => {
        return dateString.slice(0, 10);
    }

    const handlerAcept = () => {
        setRespuestSolicitu(true);
        console.log("USUARIO:", usuario);
    }
    const handlerReject = () => {
        setRespuestSolicitu(true);
    }

    return(
        <div className="div-formulario">
            <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Número de Formulario {fiso.nroFormulario}</p>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>SOLICITANTE</h5>
                </div>
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>Primer Nombre</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.primerNombre} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Segundo Nombre</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.segundoNombre} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Primer Apellido</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.primerApellido} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Segundo Apellido</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.segundoApellido} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>Tipo Documento</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.tipoDocumento} readOnly style={{ borderRadius: '10px', width: '4vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Documento</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.cedula} readOnly style={{ borderRadius: '10px', width: '9vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Fecha Expedición</label>
                        <input id="patrimonio" name="patrimonio" value={formatDate(usuario.fechaExpe)} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Fecha Nacimiento</label>
                        <input id="patrimonio" name="patrimonio" value={formatDate(usuario.fechaNacimiento)} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>Departamento Nacimiento</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.deptoNacimi} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}>Municipio Nacimiento</label>
                        <input id="patrimonio" name="patrimonio" value={usuario.municipioNacimi} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                </div>
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '26vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>FAMILIA DEL SOLICITANTE</h5>
                </div>
                
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>PREDIO</h5>
                </div>
                
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '36vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>RELACION PREDIO CON SOLICITANTE</h5>
                </div>
                
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>SOLICITUD</h5>
                </div>
                
            </div>
            <div>
                <div style={{ marginBottom: '2vw', marginTop: '2vw' }}>
                    <button onClick={handlerAcept} className="btn btn-primary" style={{ backgroundColor: '#037250', marginRight: '3vw' }} disabled={respuestSolicitud}>Aprobar</button>
                    <button onClick={handlerReject} className="btn btn-danger" disabled={respuestSolicitud}>Rechazar</button>
                </div>
            </div>
        </div>
    );
}