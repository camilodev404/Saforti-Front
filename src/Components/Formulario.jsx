import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Identificacion } from "./Formulario/Identificacion";
import { generateFormId } from "../services/formularioService";

export const Formulario = () => {

    const { solicitud } = useContext(UserContext);
    const [ id, setId] = useState('');

    useEffect(()=>{
        setId(generateFormId());
    })

    return (
        <>
            <div className="div-formulario">
                <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Número de Formulario {id}</p>
                <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Persona Natural</p>
                <p style={{ marginTop: '0.1vw', fontSize: '1vw', color: '#4f4f4d' }}>Este documento esta dispuesto por la agencia nacional de tierras de manera GRATUITA es decir NO tiene ningun costo</p>
                <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                    <Identificacion/>
                </div>
            </div>
        </>
    );
}