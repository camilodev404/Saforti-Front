import { useContext, useEffect, useState } from "react";
import { findAllDeptosForm, findMunByDeptoForm } from "../../services/formularioService";
import { UserContext } from "../../context/UserContext";

export const InformacionAspirante = () => {

    const { ugtLoged, solicitud, handlerInitialFiso } = useContext(UserContext);
    const [ deptos, setDeptos ] = useState([]);
    const [ municipios, setMunicipios ] = useState([]);
    const [ formValues, setFormValues ] = useState(solicitud);


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

    const onHandlerChange = ({target}) => {
        const { value } = target;
        setIdDepto(value);
    }

    const onChangeValuesForm = ({target}) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const onClickButon = () => {
        console.log(formValues);
        handlerInitialFiso(formValues);
    }

    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '29vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>2. INFORMACIÓN GENERAL DE LA PERSONA ASPIRANTE</h5>
            </div>
            <div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '0.5vw' }}><b>Datos de identificación</b></h6>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '3vw' }}>1. Tipo de Documento: </label>
                    <input id="tipodocumento" name="tipodocumento" style={{ borderRadius: '10px', width: '2.5vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value="as" readOnly/>
                    <label style={{ marginRight: '3vw' }}>Número de Documento: </label>
                    <input id="cedula" name="cedula" style={{ borderRadius: '10px', width: '7vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value="as" readOnly/>
                    <label style={{ marginRight: '3vw' }}>Fecha Expedición: </label>
                    <input id="fechaexpe" name="fechaexpe" style={{ borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="date"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>2. Primer Nombre: </label>
                    <input id="primernombre" name="primernombre" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value="as" readOnly/>
                    <label style={{ marginRight: '3vw' }}>Segundo Nombre: </label>
                    <input id="segundonombre" name="segundonombre" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value="as" readOnly/>
                    <label style={{ marginRight: '3vw' }}>Primer Apellido: </label>
                    <input id="primerapellido" name="primerapellido" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value="as" readOnly/>
                    <label style={{ marginRight: '3vw' }}>Segundo Apellido: </label>
                    <input id="segundoapellido" name="segundoapellido" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value="as" readOnly/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>Fecha Nacimiento: </label>
                    <input id="tipodocumento" name="tipodocumento" style={{ borderRadius: '10px', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="date"/>
                    <label style={{ marginRight: '3vw' }}>Edad: </label>
                    <input id="cedula" name="cedula" style={{ borderRadius: '10px', width: '7vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value="as" readOnly/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>3. Departamento:</label>
                    <select onChange={(event)=>{
                            onHandlerChange(event);
                            onChangeValuesForm(event);
                        }} className="label-register-user" id="departamentosForm" name="departamentosForm" style={{ marginRight: '1vw', width: '20vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Departamento</option>
                        {deptos.map((depto, index) => (
                            <option key={index} value={depto.idDepto}>{depto.nombre}</option>
                        ))}
                    </select>
                    <label style={{ marginRight: '1vw' }}>Municipio:</label>
                    <select onChange={onChangeValuesForm} className="label-register-user" id="municipiosForm" name="municipiosForm" style={{ marginRight: '1vw', width: '20vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Municipio</option>
                        {municipios.map((mun, index) => (
                            <option key={index} value={mun.idMunicipio}>{mun.nombre}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>4. Sexo: </label>
                        <label htmlFor="mujer" style={{ marginRight: '1vw' }}>Mujer</label>
                        <input onChange={onChangeValuesForm} type="radio" id="mujer" name="sexo" value={true} style={{ marginRight: '1vw' }}/>
                        <label htmlFor="hombre" style={{ marginRight: '1vw' }}>Hombre</label>
                        <input onChange={onChangeValuesForm} type="radio" id="hombre" name="sexo" value={false} />
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>¿Se considera una mujer campesina jefe de hogar?: </label>
                        <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                        <input onChange={onChangeValuesForm} type="radio" id="si" name="mujercampesina" value={true} style={{ marginRight: '1vw' }}/>
                        <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                        <input onChange={onChangeValuesForm} type="radio" id="no" name="mujercampesina" value={false} />
                    </div>
                </div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}><b>Condición del Aspirante</b></h6>
                <p style={{ textAlign: 'justify', marginLeft: '0.5vw' }}>
                    La siguiente pregunta tiene relación con el componente de orientación sexual y tiene un fin exclusivamente estadistico e 
                    informativo. Tenga en cuenta que usted no esta obligado a responderlo y que su respuesta, cualquiera que sea no tendrá incidencia
                    en la puntuación que se le asigne al momento de determinar el orden de prelación para el acceso a la tierra.
                </p>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>5. Orientación Sexual:</label>
                    <select className="label-register-user" id="orientacion" name="orientacion" style={{ marginRight: '1vw', width: '15vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Orientación Sexual</option>
                        <option>Heterosexual</option>
                        <option>Lesbiana</option>
                        <option>Gay</option>
                        <option>Transgenero</option>
                        <option>Bisexual</option>
                        <option>Intersexual</option>
                        <option>No sabe no response</option>
                    </select>
                    <label style={{ marginRight: '1vw' }}>6. De acuerdo con su cultura, pueblo y rasgos fisicos, es o se reconoce como:</label>
                    <select className="label-register-user" id="orientacion" name="orientacion" style={{ marginRight: '1vw', width: '15vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Reconocimiento</option>
                        <option>Indigena</option>
                        <option>Gitano</option>
                        <option>Raizal del archipiélago</option>
                        <option>Palenquero</option>
                        <option>Negro</option>
                        <option>Ninguna de las anteriores</option>
                    </select>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '3vw' }}>7. A que pueblo Indigena pertenece: </label>
                    <input id="puebloindigena" name="puebloindigena" style={{ borderRadius: '10px', width: '15vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value="as"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '3vw' }}>8. A cuál Vitsa pertenece: </label>
                    <input id="puebloindigena" name="puebloindigena" style={{ borderRadius: '10px', width: '15vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value="as"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '2vw' }}>9. ¿Por enfermedad, accidente o de nacimiento tiene limitantes permanentes?: </label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={onChangeValuesForm} type="radio" id="si" name="limitantes" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={onChangeValuesForm} type="radio" id="no" name="limitantes" value={false} />
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginBottom: '1vw' }}>¿Cuales? (Opción multiple): </label>
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label htmlFor="ver" style={{ marginRight: '1vw' }}>Ver:</label>
                            <input type="checkbox" id="ver" name="ver" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="oir" style={{ marginRight: '1vw' }}>Oir:</label>
                            <input type="checkbox" id="oir" name="oir" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Hablar:</label>
                            <input type="checkbox" id="hablar" name="hablar" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="moverse" style={{ marginRight: '1vw' }}>Moverse o caminar por sí mismo:</label>
                            <input type="checkbox" id="moverse" name="moverse" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                        <div className="checkbox-column">
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Bañarse, vestirse o alimentarse por sí mismo:</label>
                            <input type="checkbox" id="bañarse" name="bañarse" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="salir" style={{ marginRight: '1vw' }}>Dificultad para salir a la calle sin ayuda o compañía:</label>
                            <input type="checkbox" id="salir" name="salir" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="entender" style={{ marginRight: '1vw' }}>Entender o Aprender:</label>
                            <input type="checkbox" id="entender" name="entender" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                            <input type="checkbox" id="otra" name="otra" value={true} style={{ marginRight: '1vw' }} />
                            <input type="text" name="otra-text" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                            <br />
                        </div>
                    </div>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginBottom: '1vw' }}>10. ¿Cual es su Ocupación? (Opción multiple): </label>
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label htmlFor="ver" style={{ marginRight: '1vw' }}>Empleado:</label>
                            <input type="checkbox" id="ver" name="ver" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="oir" style={{ marginRight: '1vw' }}>Independiente:</label>
                            <input type="checkbox" id="oir" name="oir" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Servicios del Hogar:</label>
                            <input type="checkbox" id="hablar" name="hablar" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                        <div className="checkbox-column">
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Campesino:</label>
                            <input type="checkbox" id="bañarse" name="bañarse" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="salir" style={{ marginRight: '1vw' }}>Trabajador agrario:</label>
                            <input type="checkbox" id="salir" name="salir" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="entender" style={{ marginRight: '1vw' }}>Incapacitado permanente para trabajar:</label>
                            <input type="checkbox" id="entender" name="entender" value={true} style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                            <input type="checkbox" id="otra" name="otra" value={true} style={{ marginRight: '1vw' }} />
                            <input type="text" name="otra-text" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                            <br />
                        </div>
                    </div>
                </div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}><b>Datos de contacto</b></h6>
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );

}