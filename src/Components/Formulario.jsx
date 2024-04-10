import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Identificacion } from "./Formulario/Identificacion";
import { Autorizaciones } from "./Formulario/Autorizaciones";

export const Formulario = () => {

    const { solicitud } = useContext(UserContext);
    const [paginaActual, setPaginaActual] = useState(1);
    const totalPaginas = 8;

    const handleSiguiente = () => {
        if (paginaActual < totalPaginas) {
          setPaginaActual(paginaActual + 1);
        }
    };
    
    const handleAnterior = () => {
        if (paginaActual > 1) {
          setPaginaActual(paginaActual - 1);
        }
    };

    const renderizarComponenteActual = () => {
        switch (paginaActual) {
          case 1:
            return <Identificacion />;
          case 2:
            return <Autorizaciones />;
          // Agrega casos para los otros componentes aquí
          default:
            return null;
        }
    };

    return (
        <>
            <div className="div-formulario">
                <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Número de Formulario {solicitud.nroformulario}</p>
                <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Persona Natural</p>
                <p style={{ marginTop: '0.1vw', fontSize: '1vw', color: '#4f4f4d' }}>Este documento esta dispuesto por la agencia nacional de tierras de manera GRATUITA es decir NO tiene ningun costo</p>
                <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                    {renderizarComponenteActual()}
                </div>
                <div style={{ marginBottom: '1vw' }}>
                    <button style={{ marginRight: '1vw', backgroundColor: '#037250', color: 'white', borderRadius: '10px' }} onClick={handleAnterior} disabled={paginaActual === 1}>Anterior</button>
                    <button style={{ backgroundColor: '#037250', color: 'white', borderRadius: '10px' }} onClick={handleSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
                </div>
            </div>
        </>
    );
}