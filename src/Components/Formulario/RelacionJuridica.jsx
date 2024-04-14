import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const RelacionJuridica = () => {

    const { predioUsuario, handlerRelacionJuridica } = useContext(UserContext);
    const [ valuesPredioUsuario, setValuesPredioUsuario ] = useState(predioUsuario);
    const [ otrasExpl, setOtrasExpl ] = useState("");
    const [ otroDerecho, setOtroDerecho ] = useState("");

    const handlerChangeBool = ({target}) => {
        setValuesPredioUsuario({
            ...valuesPredioUsuario,
            [target.name]: JSON.parse(target.value),
        });
    }

    const handlerChange = ({target}) => {
        setValuesPredioUsuario({
            ...valuesPredioUsuario,
            [target.name]: target.value,
        });
    }

    const handleClaseExplotacion = ({target}) => {
        setValuesPredioUsuario({
            ...valuesPredioUsuario,
            explotaciones: valuesPredioUsuario.explotaciones === "" ? valuesPredioUsuario.explotaciones + target.value : valuesPredioUsuario.explotaciones +" - "+ target.value
        });
    }

    const handleClaseDerecho = ({target}) => {
        setValuesPredioUsuario({
            ...valuesPredioUsuario,
            derechoExplotacion: valuesPredioUsuario.derechoExplotacion === "" ? valuesPredioUsuario.derechoExplotacion + target.value : valuesPredioUsuario.derechoExplotacion +" - "+ target.value
        });
    }

    const handleOtrasExplotaciones = ({target}) => {
        setOtrasExpl(target.value);
    }

    const handleOtrosDerechos = ({target}) => {
        setOtroDerecho(target.value);
    }

    const cargarOtrasExplotaciones = () => {
        setValuesPredioUsuario({
            ...valuesPredioUsuario,
            explotaciones: valuesPredioUsuario.explotaciones + " - " + otrasExpl
        });
    }

    const cargarOtrosDerechos = () => {
        setValuesPredioUsuario({
            ...valuesPredioUsuario,
            derechoExplotacion: valuesPredioUsuario.derechoExplotacion + " - " + otroDerecho
        });
    }

    const onClickButon = () => {
        console.log(valuesPredioUsuario);
        handlerRelacionJuridica(valuesPredioUsuario);
    }

    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '38vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>5. RELACIÓN JURIDICA O DE HECHO DEL SOLICITANTE CON EL PREDIO</h5>
            </div>
            <div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>29. ¿Su solicitud esta dirigida a legalizar la situación juridica que tiene con un predio?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="legalizarJuridica" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="legalizarJuridica" value={false}  />
                </div>
                {
                    valuesPredioUsuario.legalizarJuridica && (
                        <div>
                            <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                <label style={{ marginRight: '3vw' }}>30. Indiqie si ya inició el tramite de lagalizar la situación del predio</label>
                                <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                                <input onChange={handlerChangeBool} type="radio" id="si" name="inicioTramite" value={true} style={{ marginRight: '1vw' }}/>
                                <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                                <input onChange={handlerChangeBool} type="radio" id="no" name="inicioTramite" value={false}  />
                            </div>
                            {
                                valuesPredioUsuario.inicioTramite && (
                                    <div>
                                        <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                            <label style={{ marginRight: '3vw' }}>31. ¿Ante qué entidad?</label>
                                            <input onChange={handlerChange} id="entidad" name="entidad" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                        </div>
                                        <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                            <label style={{ marginRight: '3vw' }}>32. Fecha de la Solicitud (yyyy-mm-dd)</label>
                                            <input onChange={handlerChange} id="fechaSolicitud" name="fechaSolicitud" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                            <label style={{ marginRight: '3vw' }}>33. Número de solicitud o radicado</label>
                                            <input onChange={handlerChange} id="numSolicitud" name="numSolicitud" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                <label style={{ marginRight: '3vw' }}>34. ¿Habita y/o explota el predio?</label>
                                <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                                <input onChange={handlerChangeBool} type="radio" id="si" name="habitaExplota" value={true} style={{ marginRight: '1vw' }}/>
                                <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                                <input onChange={handlerChangeBool} type="radio" id="no" name="habitaExplota" value={false}  />
                            </div>
                            {
                                valuesPredioUsuario.habitaExplota && (
                                    <div>
                                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                                            <label style={{ marginRight: '3vw', marginLeft: '0.5vw' }}>En caso afirmativo ¿desde qué fecha? (yyyy-mm-dd)</label>
                                            <input onChange={handlerChange} id="fechaHabitaExplota" name="fechaHabitaExplota" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                        </div>
                                        <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                                            <label style={{ marginBottom: '1vw' }}>35. Clase de explotación (Opción multiple): </label>
                                            <div className="checkbox-group">
                                                <div className="checkbox-column">
                                                    <label htmlFor="ver" style={{ marginRight: '1vw' }}>Habitacional:</label>
                                                    <input onChange={handleClaseExplotacion} type="checkbox" id="Habitacional" name="Habitacional" value="Habitacional" style={{ marginRight: '1vw' }} />
                                                    <br />
                                                    <label htmlFor="oir" style={{ marginRight: '1vw' }}>Ganadero:</label>
                                                    <input onChange={handleClaseExplotacion} type="checkbox" id="Ganadero" name="Ganadero" value="Ganadero" style={{ marginRight: '1vw' }} />
                                                    <br />
                                                    <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Forestal:</label>
                                                    <input onChange={handleClaseExplotacion} type="checkbox" id="Forestal" name="Forestal" value="Forestal" style={{ marginRight: '1vw' }} />
                                                    <br />
                                                </div>
                                                <div className="checkbox-column">
                                                    <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Conservación:</label>
                                                    <input onChange={handleClaseExplotacion} type="checkbox" id="Conservación" name="Conservación" value="Conservación" style={{ marginRight: '1vw' }} />
                                                    <br />
                                                    <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                                                    <input onChange={handleOtrasExplotaciones} type="text" name="otroDerecho" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                                                    <button onClick={cargarOtrasExplotaciones} style={{ borderRadius: '10px', width: '5vw', marginLeft: '1vw' }}>Cargar</button>
                                                    <br />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                <label style={{ marginRight: '3vw' }}>36. ¿Usted, su cónyuge o compañero(a) permanente, explotan otro(s) predio(s) rural(es)?</label>
                                <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                                <input onChange={handlerChangeBool} type="radio" id="si" name="explotanOtros" value={true} style={{ marginRight: '1vw' }}/>
                                <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                                <input onChange={handlerChangeBool} type="radio" id="no" name="explotanOtros" value={false}  />
                            </div>
                            {
                                valuesPredioUsuario.explotanOtros && (
                                    <div>
                                        <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                                            <label style={{ marginBottom: '1vw' }}>En caso afirmativo ¿Cuál es el tipo de derecho que tiene sobre el(los) predio(s)? </label>
                                        </div>
                                        <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Es trabajador(a) del predio:</label>
                                            <input onChange={handleClaseDerecho} type="checkbox" id="Trabajador" name="Trabajador" value="Trabajador" style={{ marginRight: '1vw' }} />
                                            <br />
                                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Paga por el uso del predio:</label>
                                            <input onChange={handleClaseDerecho} type="checkbox" id="Paga por el uso" name="Paga por el uso" value="Paga por el uso" style={{ marginRight: '1vw' }} />
                                            <br />
                                            <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                                            <input onChange={handleOtrosDerechos} type="text" name="otra-text" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                                            <button onClick={cargarOtrosDerechos} style={{ borderRadius: '10px', width: '5vw', marginLeft: '1vw' }}>Cargar</button>
                                            <br />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );
}