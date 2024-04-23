import { useContext, useEffect, useState } from "react";
import { findAllDeptosForm, findMunByDeptoForm } from "../../services/formularioService";
import { UserContext } from "../../context/UserContext";

export const CaracterizacionSolicitante = () => {

    const { solicitud, handlerFinalValues, predio } = useContext(UserContext);
    const [ finalValues, setFinalValues ] = useState(solicitud);
    const [ deptos, setDeptos ] = useState([]);
    const [ municipios, setMunicipios ] = useState([]);
    const [ idDepto, setIdDepto ] = useState('');

    const getAll = async() => {
        const depas = await findAllDeptosForm();
        setDeptos(depas.data);
    }

    const getMunicipios = async(iddepto) => {
        const munis = await findMunByDeptoForm(iddepto);
        setMunicipios(munis.data);
    }

    useEffect(()=>{
        getAll();
    },[])

    useEffect(()=>{
        if(idDepto !== ''){
            getMunicipios(idDepto);
        }
    }, [idDepto])

    const handleChangePatrimonio = ({target}) => {
        setFinalValues({
            ...finalValues,
            [target.name]: parseInt(target.value),
        });
    }

    const handlerChangeBool = ({target}) => {
        setFinalValues({
            ...finalValues,
            [target.name]: JSON.parse(target.value)
        });
    }

    const handleChange = ({target}) => {
        setFinalValues({
            ...finalValues,
            [target.name]: target.value
        });
    }

    const onClickButon = () => {
        console.log("asd",predio)
        handlerFinalValues(finalValues);
    }

    const onHandlerChange = ({target}) => {
        const { value } = target;
        setIdDepto(value);
        setFinalValues({
            ...finalValues,
            deptoAcceso: target.value
        });
    }

    const onChengeMun = ({target}) => {
        setFinalValues({
            ...finalValues,
            municipioAcceso: target.value,
            estado: "Pendiente"
        });
    }

    const handlerChangeDestination = ({target}) => {
        setFinalValues({
            ...finalValues,
            [target.name]: target.value
        });
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
                {
                    finalValues.esPropietario && (
                        <div>
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}>45. Área de este predio (m2)</label>
                                <input onChange={handleChangePatrimonio} id="areaPredioPropiedad" name="areaPredioPropiedad" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                            <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                                <label style={{ marginRight: '1vw' }}>46. Tipo de destinación del predio:</label> <br/>
                                <label htmlFor="si" style={{ marginRight: '1vw' }}>Exclusivamente para vivienda:</label>
                                <input onChange={handlerChangeDestination} type="radio" id="vivienda" name="tipoDestinacion" value="Exclusiva Vivienda" style={{ marginRight: '1vw' }}/>
                                <label htmlFor="no" style={{ marginRight: '1vw' }}>Implementación de un Proyecto productivo:</label>
                                <input onChange={handlerChangeDestination} type="radio" id="proyecto" name="tipoDestinacion" value="Proyecto productivo"  />
                                <label style={{ marginRight: '1vw', marginLeft: '1vw' }}>Otro ¿Cuál?:</label>
                                <input onChange={handlerChangeDestination} id="otro" name="tipoDestinacion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                        </div>
                    )
                }
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>47. ¿Hace parte de alguna asociación campesina, de economía solidaria o cualquier otro instrumento
                    de asociación cuyo objeto esté dirigido a la producción agropecuaria, forestal, acuícola o de servicios ambientales con fines 
                    productivos o de la economia campesina?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="asociacionCampesina" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="asociacionCampesina" value={false}  />
                </div>
                {
                    finalValues.asociacionCampesina && (
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
                    )
                }
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
                {
                    finalValues.tieneExperiencia && (
                        <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                            <h6 style={{ textAlign: 'left', marginTop: '0.5vw' }}>¿Por cuanto tiempo ha realizado eesta actividad? Indicar 
                                el valor en meses. (Agropecuarias, Pecuarias, Acuicolas, Forestales, Servicios ecosistemicos que permiten la preservación 
                                y/o restauración de áreas y ecosistemas estratégicos, Economia del cuidado, Exclusivamente para vivienda, Otro)</h6>
                            <textarea onChange={handleChange} id="cualesCuanto" name="cualesCuanto" rows="10" cols="80"></textarea>
                        </div>
                    )
                }
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
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginBottom: '1vw' }}>55. ¿Cuál es el nivel más alto en ciencias agropecuarias, ambientales o afines a las mismas alcanzado?</label>
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label htmlFor="ver" style={{ marginRight: '1vw' }}>Técnica</label>
                            <input onChange={handleChange} type="radio" id="Tecnica" name="nivelMasAlto" value="Tecnica" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="oir" style={{ marginRight: '1vw' }}>Tecnólogo</label>
                            <input onChange={handleChange} type="radio" id="Tecnologo" name="nivelMasAlto" value="Tecnologo" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Universitario</label>
                            <input onChange={handleChange} type="radio" id="Universitario" name="nivelMasAlto" value="Universitario" style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                        <div className="checkbox-column">
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Posgrado</label>
                            <input onChange={handleChange} type="radio" id="Posgrado" name="nivelMasAlto" value="Posgrado" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Ninguno</label>
                            <input onChange={handleChange} type="radio" id="Ninguno" name="nivelMasAlto" value="Ninguno" style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                    </div>
                </div>
                {
                    finalValues.nivelMasAlto !== "Ninguno" && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                            <label style={{ marginRight: '1vw' }}>56. Número de periodos aprobados</label>
                            <input onChange={handleChange} id="numPeriodosAprobados" name="numPeriodosAprobados" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        </div>
                    )
                }
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>57. ¿Hace parte de programas de reubicación y reasentamiento con el fin de proteger el medio
                    ambiente y fortalecer la producción alimentaría a través de la erradicación de cultívos ilícitos?</label><br />
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="programaReubicacion" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="programaReubicacion" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>58. ¿Ha sido declarado o está en curso en algún procedimiento de la declaratoria
                    de ocupación indebida de tierras baldias o fiscales patrimoniales?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="ocupacionIndebida" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="ocupacionIndebida" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw', marginBottom: '1vw' }}>59. Indique el municipio donde pretende acceder a tierra</label><br />
                    <label style={{ marginRight: '1vw' }}>Departamento:</label>
                    <select onChange={(event)=>{
                            onHandlerChange(event);
                        }} className="label-register-user" id="departamentosForm" name="deptoAcceso" style={{ marginRight: '1vw', width: '20vw' }}>
                        <option>Seleccione Departamento</option>
                        {deptos.map((depto, index) => (
                            <option key={index} value={depto.idDepto}>{depto.nombre}</option>
                        ))}
                    </select>
                    <label style={{ marginRight: '1vw' }}>Municipio:</label>
                    <select onChange={onChengeMun} className="label-register-user" id="idMunicipio" name="municipioAcceso" style={{ marginRight: '1vw', width: '20vw' }}>
                        <option>Seleccione Municipio</option>
                        {municipios.map((mun, index) => (
                            <option key={index} value={mun.idMunicipio}>{mun.nombre}</option>
                        ))}
                    </select>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                        <label style={{ marginRight: '1vw' }}>Si reside o residió en el municipio o región, indique cuál es el tiempo de residencia (meses)</label>
                        <input onChange={handleChange} id="tiempoResidencia" name="tiempoResidencia" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>60. ¿Ha sido beneficiario del proceso de restitución de tierras?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="beneficiarioRestitucion" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="beneficiarioRestitucion" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>61. ¿Ha sido reconocido como segundo ocupante dentro del proceso de restitución de tierras?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="segundoOcupante" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="segundoOcupante" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>62. ¿Ha sido usted beneficiario de la entrega, adjudicación o reconocimiento de derechos de la propiedad?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="beneficiarioDerechosPro" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="beneficiarioDerechosPro" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>63. En caso de encontrarse explotando u ocupando un baldio inadjudicable desea ser incluido en los programas de acceso a tierras de la ANT</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="deseaSerIncluidoProgramas" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="deseaSerIncluidoProgramas" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>64. ¿Ha sido favorecido con sentencias judiciales que ordenen a la ANT la adjudicación o la reubicación?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="beneficiarioSentencias" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="beneficiarioSentencias" value={false}  />
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginBottom: '0.5vw' }}>65. Tipo de Solicitud</label>
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label htmlFor="ver" style={{ marginRight: '1vw' }}>Acceso a tierra</label>
                            <input onChange={handleChange} type="radio" id="acceso" name="tipoSolicitud" value="Acceso a tierra" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="oir" style={{ marginRight: '1vw' }}>Formalización de la propiedad</label>
                            <input onChange={handleChange} type="radio" id="formalizacion" name="tipoSolicitud" value="Formalización de la propiedad" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Proceso o prestaciones agrarias</label>
                            <input onChange={handleChange} type="radio" id="procesos" name="tipoSolicitud" value="Proceso o prestaciones agrarias" style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                        <div className="checkbox-column">
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Administración</label>
                            <input onChange={handleChange} type="radio" id="administracion" name="tipoSolicitud" value="Administració" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Otro</label>
                            <input onChange={handleChange} type="radio" id="otro" name="tipoSolicitud" value="Otro" style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                    </div>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <h6 style={{ textAlign: 'left', marginTop: '0.5vw' }}><b>Observaciones:</b></h6>
                    <textarea onChange={handleChange} id="observaciones" name="observaciones" rows="10" cols="80"></textarea>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>Firma:</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="firmas" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="firmas" value={false}  />
                </div>
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );
}