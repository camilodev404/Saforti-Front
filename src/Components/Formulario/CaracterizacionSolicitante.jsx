export const CaracterizacionSolicitante = () => {

    const handleChangePatrimonio = ({target}) => {

    }

    const handlerChangeBool = ({target}) => {

    }

    const handleChange = ({target}) => {

    }

    const onClickButon = () => {
        console.log("");
    }

    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '23vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>8. CARACTERIZACIÓN SOLICITANTE</h5>
            </div>
            <div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>43. Indique cuál es su patrimonio neto en pesos</label>
                    <input onChange={handleChangePatrimonio} id="patrimonio" name="patrimonio" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>44. ¿Es usted propietario(a) de algún predio rural y/o urbano?:</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="esPropietario" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="esPropietario" value={false}  />
                </div>
                //FIXME: PONER EL CONDICIONAL DE LA 45 - 46
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>45. Área de este predio (m2)</label>
                        <input onChange={handleChangePatrimonio} id="areaPredioPropiedad" name="areaPredioPropiedad" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                        <label style={{ marginRight: '1vw' }}>46. Tipo de destinación del predio:</label> <br/>
                        <label htmlFor="si" style={{ marginRight: '1vw' }}>Exclusivamente para vivienda:</label>
                        <input onChange={handlerChangeBool} type="radio" id="vivienda" name="tipoDestinacion" value="Exclusiva Vivienda" style={{ marginRight: '1vw' }}/>
                        <label htmlFor="no" style={{ marginRight: '1vw' }}>Implementación de un Proyecto productivo:</label>
                        <input onChange={handlerChangeBool} type="radio" id="proyecto" name="tipoDestinacion" value="Proyecto productivo"  />
                        <label style={{ marginRight: '1vw', marginLeft: '1vw' }}>Otro ¿Cuál?:</label>
                        <input onChange={handleChangePatrimonio} id="otro" name="tipoDestinacion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>47. ¿Hace parte de alguna asociación campesina, de economía solidaria o cualquier otro instrumento
                    de asociación cuyo objeto esté dirigido a la producción agropecuaria, forestal, acuícola o de servicios ambientales con fines 
                    productivos o de la economia campesina?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="asociacionCampesina" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="asociacionCampesina" value={false}  />
                </div>
                //FIXME: PONER EL CONDICIONAL DE LA 48 - 50
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>48. Nombre o razón social de la asociación - NIT</label>
                        <input onChange={handleChange} id="nombre" name="nombre" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                        <label style={{ marginRight: '1vw' }}>49. ¿La organización esta compuesta sólo por mujeres?:</label>
                        <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                        <input onChange={handlerChangeBool} type="radio" id="si" name="compuestaMujeres" value={true} style={{ marginRight: '1vw' }}/>
                        <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                        <input onChange={handlerChangeBool} type="radio" id="no" name="compuestaMujeres" value={false}  />
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                        <label style={{ marginRight: '1vw' }}>50. ¿La solicitante pertenece a la parte directiva de la asociación?:</label>
                        <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                        <input onChange={handlerChangeBool} type="radio" id="si" name="parteDirectiva" value={true} style={{ marginRight: '1vw' }}/>
                        <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                        <input onChange={handlerChangeBool} type="radio" id="no" name="parteDirectiva" value={false}  />
                    </div>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>51. El predio que actualmente ocupa se encuentra en una reserva o resguardos
                    indigenas en el que se este adelantando procesos de resolución amistosa de conflictos:</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="encuentraReserva" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="encuentraReserva" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>52. ¿Tiene usted experiencia en una o algunas de las siguientes actividades?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="tieneExperiencia" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="tieneExperiencia" value={false}  />
                </div>
                //FIXME CONDICIONARLA
                <div>

                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>53. ¿Voluntareamente ha entregado un predio a la ANT o ha suscrito acuerdos de aprovechamiento //o reconversión del suelo con la ANT o CAR?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="haEntregadoPredios" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="haEntregadoPredios" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>54. ¿Ha tomado y terminado algún curso(s), seminario(s) y/o diplomado(s) en ciencias agropecuarias, 
                    forestales, ambientales o afines a las mismas?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="haTomadoCursos" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="haTomadoCursos" value={false}  />
                </div>
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );
}