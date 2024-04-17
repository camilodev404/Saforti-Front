import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const VerificacionAntecedentes = () => {

    const { solicitud, handlerVerificacion } = useContext(UserContext);
    const [ verifValues, setVerifValues ] = useState(solicitud);

    const handlerChange = ({target}) => {
        setVerifValues({
            ...verifValues,
            [target.name]: target.value,
        });
    }

    const handlerChangeBool = ({target}) => {
        setVerifValues({
            ...verifValues,
            [target.name]: JSON.parse(target.value),
        });
    }

    const onClickButon = () => {
        handlerVerificacion(verifValues);
    }

    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '45vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>4. VERIFICACIÓN DE ANTECEDENTES DE BENEFICIOS EN EL PROGRAMA DE TIERRAS</h5>
            </div>
            <div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>26. ¿Ha sido beneficiario(a) de tierras por parte del INCORA, INCODER, ANT?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="haSidoBeneficiario" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="haSidoBeneficiario" value={false}  />
                </div>
                {
                    verifValues.haSidoBeneficiario === true && (
                        <>
                            <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                <label style={{ marginRight: '3vw' }}>27. ¿Cuenta con algún documento que acredita el beneficio?</label>
                                <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                                <input onChange={handlerChangeBool} type="radio" id="si" name="acreditaBeneficio" value={true} style={{ marginRight: '1vw' }}/>
                                <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                                <input onChange={handlerChangeBool} type="radio" id="no" name="acreditaBeneficio" value={false}  />
                            </div>
                            {
                                verifValues.acreditaBeneficio === true && (
                                    <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                        <label style={{ marginRight: '2vw' }}>28. Identificación del documento que acredita el beneficio: </label>
                                        <input onChange={handlerChange} id="idAcreditacion" name="idAcreditacion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                        <label style={{ marginRight: '2vw' }}>Número de Resolución:</label>
                                        <input onChange={handlerChange} id="numResolucion" name="numResolucion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                        <label style={{ marginRight: '2vw', marginTop: '0.5vw' }}>Fecha Acreditación (yyyy-mm-dd):</label>
                                        <input onChange={handlerChange} id="fechaAcreditacion" name="fechaAcreditacion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw', marginTop: '1vw' }} type="text"/>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );
}