import { useContext, useEffect, useState } from "react";
import { findAllDeptosForm, findMunByDeptoForm } from "../../services/formularioService";
import { UserContext } from "../../context/UserContext";
import { updateUser } from "../../services/usuarioService";

export const InformacionAspirante = () => {

    const { ugtLoged, solicitud, handlerInitialFiso, userLoged } = useContext(UserContext);
    const [ userUpdate, setUserUpdate ] = useState({
        cedula: userLoged.cedula,
        tipoDocumento: userLoged.tipoDocumento,
        correo: userLoged.correo,
        password: userLoged.password,
        fechaExpe: userLoged.fechaExpe ? userLoged.fechaExpe?.split("T")[0] : "",
        primerNombre: userLoged.primerNombre,
        segundoNombre: userLoged.segundoNombre ?? "",
        primerApellido: userLoged.primerApellido,
        segundoApellido: userLoged.segundoApellido ?? "",
        fechaNacimiento: userLoged.fechaNacimiento ? userLoged.fechaNacimiento?.split("T")[0] : "",
        deptoNacimi: userLoged.deptoNacimi ?? "",
        municipioNacimi: userLoged.municipioNacimi ?? "",
        sexo: userLoged.sexo ?? "",
        mujerCampesina: userLoged.mujerCampesina ?? null,
        orientacionSex: userLoged.orientacionSex ?? "",
        reconocimiento: userLoged.reconocimiento ?? "",
        puebloIndigena: userLoged.puebloIndigena ?? "",
        puebloRrom: userLoged.puebloRrom ?? "",
        tieneLimitaciones: userLoged.tieneLimitaciones ?? null,
        direccion: userLoged.direccion ?? "",
        idMunicipio: userLoged.idMunicipio ?? "",
        vereda: userLoged.vereda ?? "",
        corregimiento: userLoged.corregimiento ?? "",
        telefono: userLoged.telefono ?? "",
        estadoCivil: userLoged.estadoCivil ?? "",
        cabezaHogar: userLoged.cabezaHogar ?? null,
        viveEsposa: userLoged.viveEsposa ?? null,
        viveConEsposa: userLoged.viveConEsposa ?? null,
        seSeparo: userLoged.seSeparo ?? null,
        cuentaConSociedad: userLoged.cuentaConSociedad ?? null,
        conflictos: userLoged.conflictos ?? "",
        limitaciones: userLoged.limitaciones ?? "",
        ocupaciones: userLoged.ocupaciones ?? "",
    });
    const [ deptos, setDeptos ] = useState([]);
    const [ deptos1, setDeptos1 ] = useState([]);
    const [ municipios, setMunicipios ] = useState([]);
    const [ municipios1, setMunicipios1 ] = useState([]);
    const [ edad, setEdad ] = useState(0);
    const [ otrasLim, setOtrasLim ] = useState("");
    const [ otrasOcup, setOtrasOcu ] = useState("")

    const [ idDepto, setIdDepto ] = useState('');
    const [ idDepto2, setIdDepto2 ] = useState('');

    const getAll = async() => {
        const depas = await findAllDeptosForm();
        setDeptos(depas.data);
        setDeptos1(depas.data);
    }

    const getAll1 = async() => {
        const depas = await findAllDeptosForm();
        setDeptos1(depas.data);
    }

    const getMunicipios = async(iddepto) => {
        const munis = await findMunByDeptoForm(iddepto);
        setMunicipios(munis.data);
    }

    const getMunicipios1 = async(iddepto) => {
        const munis = await findMunByDeptoForm(iddepto);
        setMunicipios1(munis.data);
    }

    useEffect(()=>{
        console.log(userLoged);
        getAll();
        getAll1();
        firstAge();
    },[])

    useEffect(()=>{
        if(idDepto !== ''){
            getMunicipios(idDepto);
        }
    }, [idDepto])

    useEffect(()=>{
        if(idDepto2 !== ''){
            getMunicipios1(idDepto2);
        }
    }, [idDepto2])

    const onHandlerChange = ({target}) => {
        const { value } = target;
        setIdDepto(value);
    }

    const onHandlerChange1 = ({target}) => {
        const { value } = target;
        setIdDepto2(value);
    }

    const updateUsers = async(usuario) => {
        const response = await updateUser(usuario);
    }

    const onClickButon = () => {
        console.log(userUpdate);
        console.log(userLoged);
        updateUsers(userUpdate);
    }

    const onChangeBorn = ({target}) => {
        const age = target.value;
        const edad = calcularEdad(age);
        setEdad(edad);
        setUserUpdate({
            ...userUpdate,
            fechaNacimiento: target.value
        });
    }

    const firstAge = () => {
        if(userLoged.fechaNacimiento){
            setEdad(calcularEdad(userLoged.fechaNacimiento.split("T")[0]));
        }
    }

    const calcularEdad = (fechaString) => {
        const fechaNacimiento = new Date(fechaString);
        const fechaActual = new Date();
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        if (
            fechaActual.getMonth() < fechaNacimiento.getMonth() ||
            (fechaActual.getMonth() === fechaNacimiento.getMonth() && fechaActual.getDate() < fechaNacimiento.getDate())
        ) {
            edad--;
        }
        return edad;
    }

    const onChangeMunNac = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            municipioNacimi: target.value,
        });
    }

    const onChangeDeptoNaci = ({target}) => {
        const nombreDepto = deptos.find(depto => depto.idDepto === target.value );
        const nom = nombreDepto.nombre;
        setUserUpdate({
            ...userUpdate,
            deptoNacimi: nom,
        });
    }

    const onChangeFechaExpedicion = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            fechaExpe: target.value
        });
    }

    const handleSeleccionSexo = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            sexo: target.value
        });
    }

    const handleMujerCampesina = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            [target.name]: JSON.parse(target.value)
        });
    }

    const handleOrientacion = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            orientacionSex: target.value
        });
    }

    const handleCultura = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            reconocimiento: target.value
        });
    }

    const hanldePuebloIndigena = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            puebloIndigena: target.value
        });
    }

    const handleLimitaciones = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            tieneLimitaciones: JSON.parse(target.value)
        });
    }

    const handleLimitacionesVarias = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            limitaciones: userUpdate.limitaciones === "" ? userUpdate.limitaciones + target.value : userUpdate.limitaciones +" - "+ target.value
        });
    }

    const handleOtrasLim = ({target}) => {
        setOtrasLim(target.value);
    }

    const cargarOtras = () => {
        setUserUpdate({
            ...userUpdate,
            limitaciones: userUpdate.limitaciones + " - " + otrasLim
        });
    }

    const handleOcupacion = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            ocupaciones: userUpdate.ocupaciones === "" ? userUpdate.ocupaciones + target.value : userUpdate.ocupaciones +" - "+ target.value
        });
    }

    const handleOtrasOcupaciones = ({target}) => {
        setOtrasOcu(target.value);
    }

    const cargarOtrasOcupaciones = () => {
        setUserUpdate({
            ...userUpdate,
            ocupaciones: userUpdate.ocupaciones + " - " + otrasOcup
        });
    }

    const handleDireccion = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            direccion: target.value
        });
    }

    const handleMunicipioId = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            idMunicipio: target.value
        });
    }

    const handlevarios = ({target}) => {
        setUserUpdate({
            ...userUpdate,
            [target.name]: target.value
        });
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
                    <input id="tipodocumento" name="tipodocumento" style={{ borderRadius: '10px', width: '2.5vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value={userUpdate.tipoDocumento} readOnly/>
                    <label style={{ marginRight: '3vw' }}>Número de Documento: </label>
                    <input id="cedula" name="cedula" style={{ borderRadius: '10px', width: '7vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value={userUpdate.cedula} readOnly/>
                    <label style={{ marginRight: '3vw' }}>Fecha Expedición: </label>
                    <input onChange={onChangeFechaExpedicion} id="fechaexpe" name="fechaexpe" style={{ borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" defaultValue={userLoged.fechaExpe?.split("T")[0]}/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>2. Primer Nombre: </label>
                    <input id="primernombre" name="primernombre" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value={userUpdate.primerNombre} readOnly/>
                    <label style={{ marginRight: '3vw' }}>Segundo Nombre: </label>
                    <input id="segundonombre" name="segundonombre" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value={userUpdate.segundoNombre} readOnly/>
                    <label style={{ marginRight: '3vw' }}>Primer Apellido: </label>
                    <input id="primerapellido" name="primerapellido" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value={userUpdate.primerApellido} readOnly/>
                    <label style={{ marginRight: '3vw' }}>Segundo Apellido: </label>
                    <input id="segundoapellido" name="segundoapellido" style={{ borderRadius: '10px', width: '7vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value={userUpdate.segundoApellido} readOnly/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>Fecha Nacimiento: </label>
                    <input onChange={onChangeBorn} id="fechanacimiento" name="fechanacimiento" style={{ borderRadius: '10px', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" defaultValue={userLoged.fechaNacimiento?.split("T")[0]}/>
                    <label style={{ marginRight: '3vw' }}>Edad: </label>
                    <input id="edad" name="edad" style={{ borderRadius: '10px', width: '7vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'  }} type="text" value={edad} readOnly/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>3. Departamento:</label>
                    <select onChange={(event)=>{
                            onHandlerChange(event);
                            onChangeDeptoNaci(event);
                        }} className="label-register-user" id="deptoNacimi" name="deptoNacimi" style={{ marginRight: '1vw', width: '20vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Departamento</option>
                        {deptos.map((depto, index) => (
                            <option key={index} value={depto.idDepto}>{depto.nombre}</option>
                        ))}
                    </select>
                    <label style={{ marginRight: '1vw' }}>Municipio:</label>
                    <select onChange={onChangeMunNac} className="label-register-user" id="municipioNacimi" name="municipioNacimi" style={{ marginRight: '1vw', width: '20vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Municipio</option>
                        {municipios.map((mun, index) => (
                            <option key={index} value={mun.nombre}>{mun.nombre}</option>
                        ))}
                    </select>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>4. Sexo: </label>
                        <label htmlFor="mujer" style={{ marginRight: '1vw' }}>Mujer</label>
                        <input onChange={handleSeleccionSexo} checked={userUpdate.sexo === "Mujer"} type="radio" id="mujer" name="sexo" value="Mujer" style={{ marginRight: '1vw' }}/>
                        <label htmlFor="hombre" style={{ marginRight: '1vw' }}>Hombre</label>
                        <input onChange={handleSeleccionSexo} checked={userUpdate.sexo === "Hombre"} type="radio" id="hombre" name="sexo" value="Hombre"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}>¿Se considera una mujer campesina jefe de hogar?: </label>
                        <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                        <input onChange={handleMujerCampesina} checked={userUpdate.mujerCampesina === true} type="radio" id="si" name="mujerCampesina" value={true} style={{ marginRight: '1vw' }}/>
                        <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                        <input onChange={handleMujerCampesina} checked={userUpdate.mujerCampesina === false} type="radio" id="no" name="mujerCampesina" value={false}  />
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
                    <select onChange={handleOrientacion} className="label-register-user" id="orientacionSex" name="orientacionSex" style={{ marginRight: '1vw', width: '15vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
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
                    <select onChange={handleCultura} className="label-register-user" id="reconocimiento" name="reconocimiento" style={{ marginRight: '1vw', width: '15vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Reconocimiento</option>
                        <option>Indigena</option>
                        <option>Gitano</option>
                        <option>Raizal del archipiélago</option>
                        <option>Palenquero</option>
                        <option>Negro</option>
                        <option>Ninguna de las anteriores</option>
                    </select>
                </div>
                {
                    userUpdate.reconocimiento === 'Indigena' && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                            <label style={{ marginRight: '3vw' }}>7. A que pueblo Indigena pertenece: </label>
                            <input onChange={hanldePuebloIndigena} id="puebloIndigena" name="puebloIndigena" style={{ borderRadius: '10px', width: '15vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" defaultValue={userLoged.puebloIndigena}/>
                        </div>
                    )
                }
                {
                    userUpdate.reconocimiento === 'Gitano' && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                            <label style={{ marginRight: '3vw' }}>8. A cuál Vitsa pertenece: </label>
                            <input id="puebloindigena" name="puebloindigena" style={{ borderRadius: '10px', width: '15vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" defaultValue={userLoged.puebloRrom} />
                        </div>
                    )
                }
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '2vw' }}>9. ¿Por enfermedad, accidente o de nacimiento tiene limitantes permanentes?: </label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handleLimitaciones} checked={ userUpdate.tieneLimitaciones === true } type="radio" id="si" name="tieneLimitaciones" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handleLimitaciones} checked={ userUpdate.tieneLimitaciones === false } type="radio" id="no" name="tieneLimitaciones" value={false} />
                </div>
                {
                    userUpdate.tieneLimitaciones === true && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                            <label style={{ marginBottom: '1vw' }}>¿Cuales? (Opción multiple): </label>
                            <div className="checkbox-group">
                                <div className="checkbox-column">
                                    <label htmlFor="ver" style={{ marginRight: '1vw' }}>Ver:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="ver" name="ver" value="Ver" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="oir" style={{ marginRight: '1vw' }}>Oir:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="oir" name="oir" value="Oir" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Hablar:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="hablar" name="hablar" value="Hablar" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="moverse" style={{ marginRight: '1vw' }}>Moverse o caminar por sí mismo:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="moverse" name="moverse" value="Moverse o caminar por sí mismo" style={{ marginRight: '1vw' }} />
                                    <br />
                                </div>
                                <div className="checkbox-column">
                                    <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Bañarse, vestirse o alimentarse por sí mismo:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="bañarse" name="bañarse" value="Bañarse, vestirse o alimentarse" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="salir" style={{ marginRight: '1vw' }}>Dificultad para salir a la calle sin ayuda o compañía:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="salir" name="salir" value="Dificultad para salir" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="entender" style={{ marginRight: '1vw' }}>Entender o Aprender:</label>
                                    <input onChange={handleLimitacionesVarias} type="checkbox" id="entender" name="entender" value="Entender o Aprender" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                                    <input onChange={handleOtrasLim} type="text" name="otra-text" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                                    <button onClick={cargarOtras} style={{ borderRadius: '10px', width: '5vw', marginLeft: '1vw' }}>Cargar</button>
                                    <br />
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginBottom: '1vw' }}>10. ¿Cual es su Ocupación? (Opción multiple): </label>
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label htmlFor="ver" style={{ marginRight: '1vw' }}>Empleado:</label>
                            <input onChange={handleOcupacion} type="checkbox" id="Empleado" name="Empleado" value="Empleado" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="oir" style={{ marginRight: '1vw' }}>Independiente:</label>
                            <input onChange={handleOcupacion} type="checkbox" id="Independiente" name="Independiente" value="Independiente" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Servicios del Hogar:</label>
                            <input onChange={handleOcupacion} type="checkbox" id="Servicios" name="Servicios" value="Servicios del Hogar" style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                        <div className="checkbox-column">
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Campesino:</label>
                            <input onChange={handleOcupacion} type="checkbox" id="Campesino" name="Campesino" value="Campesino" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="salir" style={{ marginRight: '1vw' }}>Trabajador agrario:</label>
                            <input onChange={handleOcupacion} type="checkbox" id="Trabajador" name="Trabajador" value="Trabajador agrario" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="entender" style={{ marginRight: '1vw' }}>Incapacitado permanente para trabajar:</label>
                            <input onChange={handleOcupacion} type="checkbox" id="Incapacitado" name="Incapacitado" value="Incapacitado permanente para trabajar" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                            <input onChange={handleOtrasOcupaciones} type="text" name="otra-text" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                            <button onClick={cargarOtrasOcupaciones} style={{ borderRadius: '10px', width: '5vw', marginLeft: '1vw' }}>Cargar</button>
                            <br />
                        </div>
                    </div>
                </div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}><b>Datos de contacto</b></h6>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '3vw' }}>11. Dirección de Residencia: </label>
                    <input onChange={handleDireccion} id="direccion" name="direccion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" defaultValue={userUpdate.direccion}/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>Departamento:</label>
                    <select onChange={(event)=>{
                            onHandlerChange1(event);
                        }} className="label-register-user" id="deptovive" name="deptovive" style={{ marginRight: '1vw', width: '20vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Departamento</option>
                        {deptos1.map((depto1, index) => (
                            <option key={index} value={depto1.idDepto}>{depto1.nombre}</option>
                        ))}
                    </select>
                    <label style={{ marginRight: '1vw' }}>Municipio:</label>
                    <select onChange={handleMunicipioId} className="label-register-user" id="munvive" name="munvive" style={{ marginRight: '1vw', width: '20vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }}>
                        <option>Seleccione Municipio</option>
                        {municipios1.map((mun1, index) => (
                            <option key={index} value={mun1.idMunicipio}>{mun1.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>Vereda:</label>
                    <input onChange={handlevarios} id="vereda" name="vereda" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    <label style={{ marginRight: '1vw' }}>Corregimiento:</label>
                    <input onChange={handlevarios} id="corregimiento" name="corregimiento" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>Número de Telefono:</label>
                    <input onChange={handlevarios} id="telefono" name="telefono" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    <label style={{ marginRight: '1vw' }}>Correo Electronico:</label>
                    <input id="correo" name="correo" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text" value={userUpdate.correo} readOnly/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label htmlFor="estadoCivil" style={{ marginRight: '0.5vw' }}>12. Estado Civil</label>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '7.5vw' }}>
                    <label htmlFor="bañarse" style={{ marginRight: '0.5vw' }}>Casado(a):</label>
                    <input onChange={handlevarios} type="radio" id="casado" name="estadoCivil" value="Casado" checked={userUpdate.estadoCivil === "Casado"} style={{ marginRight: '1vw' }} />
                    <br />
                    <label htmlFor="salir" style={{ marginRight: '0.5vw' }}>Soltero(a):</label>
                    <input onChange={handlevarios} type="radio" id="soltero" name="estadoCivil" value="Soltero" checked={userUpdate.estadoCivil === "Soltero"} style={{ marginRight: '1vw' }} />
                    <br />
                    <label htmlFor="entender" style={{ marginRight: '0.5vw' }}>Viudo(a):</label>
                    <input onChange={handlevarios} type="radio" id="viudo" name="estadoCivil" value="Viudo" checked={userUpdate.estadoCivil === "Viudo"} style={{ marginRight: '1vw' }} />
                    <br />
                    <label htmlFor="otra" style={{ marginRight: '0.5vw' }}>Separado(a):</label>
                    <input onChange={handlevarios} type="radio" id="separado" name="estadoCivil" value="Separado" checked={userUpdate.estadoCivil === "Separado"} style={{ marginRight: '1vw' }} />
                    <br />
                    <label htmlFor="otra" style={{ marginRight: '0.5vw' }}>Union Libre:</label>
                    <input onChange={handlevarios} type="radio" id="union" name="estadoCivil" value="Union Libre" checked={userUpdate.estadoCivil === "Union Libre"} style={{ marginRight: '1vw' }} />
                    <br />
                </div>
                {
                    userUpdate.estadoCivil === "Casado" && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw' }}>13. ¿Es cabeza de hogar?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cabezaHogar === true} type="radio" id="si" name="cabezaHogar" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cabezaHogar === false} type="radio" id="no" name="cabezaHogar" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>14. ¿La persona con la que se casó aún vive?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.viveEsposa === true} type="radio" id="si" name="viveEsposa" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.viveEsposa === false} type="radio" id="no" name="viveEsposa" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>15. ¿La persona con la que se casó, es con la que actualmente vive?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.viveConEsposa === true} type="radio" id="si" name="viveConEsposa" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.viveConEsposa === false} type="radio" id="no" name="viveConEsposa" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>16. ¿Se separó legalmente (divorcio) de la persona con la que se casó?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.seSeparo === true} type="radio" id="si" name="seSeparo" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.seSeparo === false} type="radio" id="no" name="seSeparo" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>17. ¿Cuenta con sociedad patrimonial o sociedad conyugal vigente?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cuentaConSociedad === true} type="radio" id="si" name="cuentaConSociedad" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cuentaConSociedad === false} type="radio" id="no" name="cuentaConSociedad" value={false} />
                            <br />
                        </div>
                    )
                }
                {
                    (userUpdate.estadoCivil === "Soltero" || userUpdate.estadoCivil === "Union Libre") && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw' }}>13. ¿Es cabeza de hogar?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cabezaHogar === true} type="radio" id="si" name="cabezaHogar" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cabezaHogar === false} type="radio" id="no" name="cabezaHogar" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>17. ¿Cuenta con sociedad patrimonial o sociedad conyugal vigente?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cuentaConSociedad === true} type="radio" id="si" name="cuentaConSociedad" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cuentaConSociedad === false} type="radio" id="no" name="cuentaConSociedad" value={false} />
                            <br />
                        </div>
                    )
                }
                {
                    (userUpdate.estadoCivil === "Viudo" || userUpdate.estadoCivil === "Separado") && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw' }}>13. ¿Es cabeza de hogar?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cabezaHogar === true} type="radio" id="si" name="cabezaHogar" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cabezaHogar === false} type="radio" id="no" name="cabezaHogar" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>16. ¿Se separó legalmente (divorcio) de la persona con la que se casó?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.seSeparo === true} type="radio" id="si" name="seSeparo" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.seSeparo === false} type="radio" id="no" name="seSeparo" value={false} />
                            <br />
                            <label htmlFor="bañarse" style={{ marginRight: '0.5vw', marginTop: '0.5vw' }}>17. ¿Cuenta con sociedad patrimonial o sociedad conyugal vigente?:</label>
                            <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cuentaConSociedad === true} type="radio" id="si" name="cuentaConSociedad" value={true} style={{ marginRight: '1vw' }}/>
                            <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                            <input onChange={handleMujerCampesina} checked={userUpdate.cuentaConSociedad === false} type="radio" id="no" name="cuentaConSociedad" value={false} />
                            <br />
                        </div>
                    )
                }
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );

}