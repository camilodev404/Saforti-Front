import { useEffect, useState } from "react";

export const SolicitudValues = ({fiso}) => {

    const [ solicitudPendiente, setSolicitudPendiente ] = useState(fiso);
    const [ respuestSolicitud, setRespuestSolicitu ] = useState(false);

    useEffect(()=>{
        
    },[])

    const handlerAcept = () => {
        setRespuestSolicitu(true);
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