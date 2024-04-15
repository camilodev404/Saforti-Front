import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Identificacion } from "./Formulario/Identificacion";
import { Autorizaciones } from "./Formulario/Autorizaciones";
import { InformacionAspirante } from "./Formulario/InformacionAspirante";
import { GrupoFamiliar } from "./Formulario/GrupoFamiliar";
import { VerificacionAntecedentes } from "./Formulario/VerificacionAntecedentes";
import { RelacionJuridica } from "./Formulario/RelacionJuridica";
import { IdentificacionPredio } from "./Formulario/IdentificacionPredio";
import { TradicionPredio } from "./Formulario/TradicionPredio";
import { CaracterizacionSolicitante } from "./Formulario/CaracterizacionSolicitante";
import { savePredio } from "../services/predioService";
import { savePredioUsuario } from "../services/predioUsuarioService";

export const Formulario = () => {

    const { solicitud, predioUsuario, predio, familiares, userLoged, handlerReplace } = useContext(UserContext);
    const { cedula } = userLoged;
    const { idPredio } = predio;
    const [paginaActual, setPaginaActual] = useState(1);
    const totalPaginas = 9;

    const completarFamiliares = () => {
      const nuevosFamiliares = familiares.map( (fam) => ({
        ...fam,
        foranea: {
          idpredio: idPredio,
          cedula: cedula,
        }
      }));
      console.log("Hola",nuevosFamiliares);
      return nuevosFamiliares;
    }

    const guardarPredio = async(pr) => {
      const response = await savePredio(pr);
      console.log(response);
    }

    const guardarPredioUsuario = async(pu) => {
      const response = await savePredioUsuario(pu);
      console.log(response);
    }

    const handleSiguiente = () => {
        if (paginaActual < totalPaginas) {
          if(predioUsuario.legalizarJuridica !== false){
            setPaginaActual(paginaActual + 1);
          } else {
            setPaginaActual(paginaActual + 3);
          }
          if(paginaActual === 7){
            guardarPredio(predio);
          }
          if(paginaActual === 8){
            guardarPredioUsuario(predioUsuario);
            if (familiares !== null){
              handlerReplace(completarFamiliares());
            }
          }
          
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
          case 3:
            return <InformacionAspirante />
          case 4:
            return <GrupoFamiliar/>
          case 5:
            return <VerificacionAntecedentes/>
          case 6:
            return <RelacionJuridica/>
          case 7:
            return <IdentificacionPredio/>
          case 8:
            return <TradicionPredio/>
          case 9:
            return <CaracterizacionSolicitante/>
          default:
            return null;
        }
    };

    return (
        <>
            <div className="div-formulario">
                <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Número de Formulario {solicitud.nroFormulario}</p>
                <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Persona Natural</p>
                <p style={{ marginTop: '0.1vw', fontSize: '1vw', color: '#4f4f4d' }}>Este documento esta dispuesto por la agencia nacional de tierras de manera GRATUITA es decir NO tiene ningun costo</p>
                <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                    {renderizarComponenteActual()}
                </div>
                <div style={{ marginBottom: '1vw' }}>
                    {
                      paginaActual !== 1 && (
                        <button style={{ marginRight: '1vw', backgroundColor: '#037250', color: 'white', borderRadius: '10px' }} onClick={handleAnterior} disabled={paginaActual === 1}>Anterior</button>
                      )
                    }
                    {
                      paginaActual !== 9 && (
                        <button style={{ backgroundColor: '#037250', color: 'white', borderRadius: '10px' }} onClick={handleSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
                      )
                    }
                </div>
            </div>
        </>
    );
}