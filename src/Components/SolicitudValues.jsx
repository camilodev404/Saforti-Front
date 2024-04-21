import { useContext, useEffect, useState } from "react";
import { findMunicipio, findMunicipioByDepto, findUserById } from "../services/usuarioService";
import { familiarByCedula } from "../services/familiarService";
import { getPredioById } from "../services/predioService";
import { predioUsuarioFinder } from "../services/predioUsuarioService";
import { actualizarForm } from "../services/formularioService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const SolicitudValues = ({fiso}) => {

    const { solicitud, predioUsuario, predio, 
        familiares, userLoged, handlerReplace, handlerResetValuesForm,
        handlerReset,
        handleResetPredio,
        handleResetPredioUsuario } = useContext(UserContext);

    const [ solicitudPendiente, setSolicitudPendiente ] = useState(fiso);
    const [ usuario, setUsuario ] = useState({});
    const [ mun, setMun ] = useState("");
    const [ depto, setDepto ] = useState("");
    const [ families, setFamilies ] = useState([]);
    const [ territorio, setTerritorio ] = useState({});
    const [ munPred, setMunPred ] = useState("");
    const [ deptoPred, setDeptoPred ] = useState("");
    const [ territorioUsuario, setTerritorioUsuario ] = useState({});
    const [ munFiso, setMunFiso ] = useState("");
    const [ deptoFiso, setDeptoFiso ] = useState("");
    const [ munFisoAcceso, setMunFisoAcceso ] = useState("");
    const [ deptoFisoAcceso, setDeptoFisoAcceso] = useState("");

    const navigate = useNavigate();

    const naigateBack = () => {
        if(userLoged && userLoged.rol == "Administrativo"){
            navigate('/administrador/menu');
        } else if (userLoged && userLoged.rol == "Empleado"){
            navigate('/funcionario/menu');
        } else {
            navigate('/user/menu');
        }
    }

    const buscarUsuario = async(iduser) => {
        const res = await findUserById(iduser);
        setUsuario(res.data);
    }

    const buscarDepto = async(idd) => {
        const res = await findMunicipioByDepto(idd);
        const id = res.data;
        return id;
    }

    const buscarMunicipio = async(idm) => {
        const res = await findMunicipio(idm);
        const id = res.data.nombre;
        setMun(id);
        const deptoId = await buscarDepto(res.data.idDepto);
        setDepto(deptoId.nombre);
    }

    const buscarFamiliares = async(ced, pred) => {
        const res = await familiarByCedula(ced, pred);
        setFamilies(res.data);
    }

    const buscarPredio = async(id) => {
        const res = await getPredioById(id);
        setTerritorio(res.data);
    }

    const buscarDeptoPredio = async(idd) => {
        const res = await findMunicipioByDepto(idd);
        const id = res.data;
        return id;
    }

    const buscarMunicipioPredio = async(idm) => {
        const res = await findMunicipio(idm);
        const id = res.data.nombre;
        setMunPred(id);
        const deptoId = await buscarDeptoPredio(res.data.idDepto);
        setDeptoPred(deptoId.nombre);
    }

    const buscarPredioUsuario = async(idpre, cedu) => {
        const res = await predioUsuarioFinder(idpre, cedu);
        setTerritorioUsuario(res.data);
    }

    const buscarDeptoFiso = async(idd) => {
        const res = await findMunicipioByDepto(idd);
        const id = res.data;
        return id;
    }

    const buscarMunicipioFiso = async(idm) => {
        const res = await findMunicipio(idm);
        const id = res.data.nombre;
        setMunFiso(id);
        const deptoId = await buscarDeptoFiso(res.data.idDepto);
        setDeptoFiso(deptoId.nombre);
    }

    const buscarDeptoFisoAcceso = async(idd) => {
        const res = await findMunicipioByDepto(idd);
        const id = res.data;
        return id;
    }

    const buscarMunicipioFisoAcceso = async(idm) => {
        const res = await findMunicipio(idm);
        const id = res.data.nombre;
        setMunFisoAcceso(id);
        const deptoId = await buscarDeptoFisoAcceso(res.data.idDepto);
        setDeptoFisoAcceso(deptoId.nombre);
    }

    useEffect(()=>{
        buscarUsuario(solicitudPendiente.foranea.cedula);
        buscarFamiliares(solicitudPendiente.foranea.cedula, solicitudPendiente.foranea.idPredio);
        buscarPredio(solicitudPendiente.foranea.idPredio);
        buscarPredioUsuario(solicitudPendiente.foranea.idPredio, solicitudPendiente.foranea.cedula);
    },[])

    useEffect(()=>{
        if(usuario.idMunicipio){
            buscarMunicipio(usuario.idMunicipio);
        }
    }, [usuario.idMunicipio]);

    useEffect(()=>{
        if(territorio.idMunicipio){
            buscarMunicipioPredio(territorio.idMunicipio);
        }
    }, [territorio.idMunicipio])

    useEffect(()=>{
        if(solicitudPendiente.idMunicipio){
            buscarMunicipioFiso(solicitudPendiente.idMunicipio);
            buscarMunicipioFisoAcceso(solicitudPendiente.municipioAcceso);
        }
    }, [solicitudPendiente])

    const formatDate = (dateString) => {
        if(dateString!==undefined && dateString!== null){
            return dateString.slice(0, 10);
        } else {
            return "";
        } 
    }

    const handlerAcept = () => {
        aprobar();
        naigateBack();
    }
    const handlerReject = () => {
        rechazar();
        naigateBack();
    }

    const handlerBack = () => {
        naigateBack();
    }

    const handlerChangeObservaciones = ({target}) => {
        setSolicitudPendiente({
            ...solicitudPendiente,
            observaciones: target.value,
        });
    }

    const guardarFiso = async(form) => {
        const res = await actualizarForm(form);
    }

    const aprobar = () => {
        
        const newData = {
            ...solicitudPendiente,
            estado: 'Aprobada',
        }
        guardarFiso(newData)
        
    }

    const rechazar = () => {
        const newData = {
            ...solicitudPendiente,
            estado: 'Rechazada',
        }
        guardarFiso(newData)
    }

    return(
        <div className="div-formulario">
            <p style={{ fontWeight: 'bold', marginTop: '0.1vw', fontSize: '2vw', color: '#4f4f4d' }}>Número de Formulario {fiso.nroFormulario}</p>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>SOLICITANTE</h5>
                </div>
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Primer Nombre:</b></label>
                        <input id="primerNombre" name="primerNombre" value={usuario.primerNombre} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Segundo Nombre:</b></label>
                        <input id="segundonombre" name="segundonombre" value={usuario.segundoNombre} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Primer Apellido:</b></label>
                        <input id="primerapellido" name="primerapellido" value={usuario.primerApellido} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Segundo Apellido:</b></label>
                        <input id="segundoApellido" name="segundoApellido" value={usuario.segundoApellido} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Tipo Documento:</b></label>
                        <input id="tipoDocumento" name="tipoDocumento" value={usuario.tipoDocumento} readOnly style={{ borderRadius: '10px', width: '4vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Documento:</b></label>
                        <input id="cedula" name="cedula" value={usuario.cedula} readOnly style={{ borderRadius: '10px', width: '9vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Fecha Expedición:</b></label>
                        <input id="fechaExpe" name="fechaExpe" value={formatDate(usuario.fechaExpe)} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Fecha Nacimiento:</b></label>
                        <input id="fechaNacimiento" name="fechaNacimiento" value={formatDate(usuario.fechaNacimiento)} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Departamento Nacimiento:</b></label>
                        <input id="deptoNacimi" name="deptoNacimi" value={usuario.deptoNacimi} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Municipio Nacimiento:</b></label>
                        <input id="municipioNacimi" name="municipioNacimi" value={usuario.municipioNacimi} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Sexo:</b></label>
                        <input id="sexo" name="sexo" value={usuario.sexo} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Mujer Campesina:</b></label>
                        <input id="mujerCampesina" name="mujerCampesina" value={usuario.mujerCampesina ? "Si" : usuario.mujerCampesina === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '5vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Orientación Sexual:</b></label>
                        <input id="orientacionSex" name="orientacionSex" value={usuario.orientacionSex} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Reconocimiento:</b></label>
                        <input id="reconocimiento" name="reconocimiento" value={usuario.reconocimiento} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Limitaciones:</b></label>
                        <input id="tieneLimitaciones" name="tieneLimitaciones" value={usuario.tieneLimitaciones ? "Si" : usuario.tieneLimitaciones === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '5vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    {
                        usuario.tieneLimitaciones && (
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Cuales:</b></label>
                                <textarea id="limitaciones" name="limitaciones" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={usuario.limitaciones} readOnly/>
                            </div>
                        )
                    }
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Ocupaciones:</b></label>
                                <textarea id="ocupaciones" name="ocupaciones" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={usuario.ocupaciones} readOnly/>
                            </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Dirección Residencia:</b></label>
                        <input id="direccion" name="direccion" value={usuario.direccion} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Departamento:</b></label>
                        <input id="depto" name="depto" value={depto} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Municipio:</b></label>
                        <input id="munic" name="munic" value={mun} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Vereda:</b></label>
                        <input id="vereda" name="vereda" value={usuario.vereda} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Corregimiento:</b></label>
                        <input id="corregimiento" name="corregimiento" value={usuario.corregimiento} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Telefono:</b></label>
                        <input id="telefono" name="telefono" value={usuario.telefono} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Estado Civil:</b></label>
                        <input id="estadoCivil" name="estadoCivil" value={usuario.estadoCivil} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Cabeza de Hogar:</b></label>
                        <input id="corregimiento" name="corregimiento" value={usuario.cabezaHogar ? "Si" : usuario.cabezaHogar === false ? "No" : "" } readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Cuenta con Sociedad:</b></label>
                        <input id="cuentaConSociedad" name="cuentaConSociedad" value={usuario.cuentaConSociedad ? "Si" : usuario.cuentaConSociedad === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Se Separo:</b></label>
                        <input id="seSeparo" name="seSeparo" value={usuario.seSeparo ? "Si" : usuario.seSeparo === false ? "No" : "" } readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Vive con Esposa:</b></label>
                        <input id="viveConEsposa" name="viveConEsposa" value={usuario.viveConEsposa ? "Si" : usuario.viveConEsposa === false ? "No" : "" } readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Vive Esposa:</b></label>
                        <input id="viveEsposa" name="viveEsposa" value={usuario.viveEsposa ? "Si" : usuario.viveEsposa === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                </div>
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '26vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>FAMILIA DEL SOLICITANTE</h5>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <table  className="table table-hover table-striped" style={{ borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid' }}>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Documento</th>
                                <th>Primer Nombre</th>
                                <th>Segundo Nombre</th>
                                <th>Primer Apellido</th>
                                <th>Segundo Apellido</th>
                                <th>Fecha Nacimiento</th>
                                <th>Parentesco</th>
                                <th>Sexo</th>
                                <th>Limitaciones</th>
                                <th>Ocupacion</th>
                                <th>Depende</th>
                            </tr>
                        </thead>
                        {
                            (families !== null || families !== undefined) && (
                                <tbody>
                                    {families && Object.values(families).map((familiar, index) => (
                                        <tr key={index}>
                                            <td>{familiar.tipoDocumento}</td>
                                            <td>{familiar.documento}</td>
                                            <td>{familiar.primerNombre}</td>
                                            <td>{familiar.segundoNombre}</td>
                                            <td>{familiar.primerApellido}</td>
                                            <td>{familiar.segundoApellido}</td>
                                            <td>{familiar.fechaNacimiento}</td>
                                            <td>{familiar.parentesco}</td>
                                            <td>{familiar.sexo}</td>
                                            <td>{familiar.limitantes}</td>
                                            <td>{familiar.ocupaciones}</td>
                                            <td>{familiar.dependeUsuario === true ? 'Sí' : familiar.dependeUsuario === false ? 'No' : ""}</td>
                                        </tr>
                                    ))}
                                </tbody>  
                            )
                        }
                    </table>
                </div>
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>PREDIO</h5>
                </div>
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Nupre:</b></label>
                        <input id="nupre" name="nupre" value={territorio.nupre} readOnly style={{ borderRadius: '10px', width: '25vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Número Predial Antiguo:</b></label>
                        <input id="numPredialAnti" name="numPredialAnti" value={territorio.numPredialAnti} readOnly style={{ borderRadius: '10px', width: '25vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Número Predial Nacional:</b></label>
                        <input id="numPredialNal" name="numPredialNal" value={territorio.numPredialNal} readOnly style={{ borderRadius: '10px', width: '22vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Número Folio Matricula:</b></label>
                        <input id="numFolio" name="numFolio" value={territorio.numFolio} readOnly style={{ borderRadius: '10px', width: '20vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Departamento:</b></label>
                        <input id="deptoPred" name="deptoPred" value={deptoPred} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Municipio:</b></label>
                        <input id="munPred" name="munPred" value={munPred} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Vereda:</b></label>
                        <input id="vereda1" name="vereda1" value={territorio.vereda} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Corregimiento:</b></label>
                        <input id="corregimiento1" name="corregimiento1" value={territorio.corregimiento} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Centro Poblado:</b></label>
                        <input id="centroPoblado1" name="centroPoblado1" value={territorio.centroPoblado} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Dirección:</b></label>
                        <input id="direccion1" name="direccion1" value={territorio.direccion} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Nombre:</b></label>
                        <input id="nombre1" name="nombre1" value={territorio.nombre} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Pertenencia:</b></label>
                        <input id="pertenencia" name="pertenencia" value={territorio.pertenencia ? "Si" : territorio.pertenencia === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    {
                        territorio.pertenencia && (
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Nombre:</b></label>
                                <input id="nombrePertenece" name="nombrePertenece" value={territorio.nombrePertenece} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                        )
                    }
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Area m2:</b></label>
                        <input id="areaPredioSolicitud" name="areaPredioSolicitud" value={territorio.areaPredioSolicitud} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Conflictos:</b></label>
                        <input id="tieneConflictos" name="tieneConflictos" value={territorio.tieneConflictos ? "Si" : territorio.tieneConflictos === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    {
                        territorio.tieneConflictos && (
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Cuales:</b></label>
                                <textarea id="conflictos" name="conflictos" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={territorio.conflictos} readOnly/>
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '36vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>RELACION PREDIO CON SOLICITANTE</h5>
                </div>
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Legalización Juridica:</b></label>
                        <input id="legalizarJuridica" name="legalizarJuridica" value={territorioUsuario.legalizarJuridica ? "Si" : territorioUsuario.legalizarJuridica === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    {
                        territorioUsuario.legalizarJuridica && (
                            <div>
                                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                    <label style={{ marginRight: '1vw' }}><b>Inicio Tramite:</b></label>
                                    <input id="inicioTramite" name="inicioTramite" value={territorioUsuario.inicioTramite ? "Si" : territorioUsuario.inicioTramite === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                    <label style={{ marginRight: '1vw' }}><b>Entidad:</b></label>
                                    <input id="entidad" name="entidad" value={territorioUsuario.entidad} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                </div>
                                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                    <label style={{ marginRight: '1vw' }}><b>Fecha Tramite:</b></label>
                                    <input id="fechaSolicitud" name="fechaSolicitud" value={formatDate(territorioUsuario.fechaSolicitud)} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                    <label style={{ marginRight: '1vw' }}><b>Número Radicado:</b></label>
                                    <input id="numSolicitud" name="numSolicitud" value={territorioUsuario.numSolicitud} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                </div>
                                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                    <label style={{ marginRight: '1vw' }}><b>Habita o Explota:</b></label>
                                    <input id="habitaExplota" name="habitaExplota" value={territorioUsuario.habitaExplota ? "Si" : territorioUsuario.habitaExplota === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                    <label style={{ marginRight: '1vw' }}><b>Fecha:</b></label>
                                    <input id="fechaHabita" name="fechaHabita" value={formatDate(territorioUsuario.fechaHabitaExplota)} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                </div>
                                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                    <label style={{ marginRight: '1vw' }}><b>Explotaciones:</b></label>
                                    <textarea id="explotaciones" name="explotaciones" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={territorioUsuario.explotaciones} readOnly/>
                                    <label style={{ marginRight: '1vw' }}><b>Explotan Otros Predios:</b></label>
                                    <input id="explotanOtros" name="explotanOtros" value={territorioUsuario.explotanOtros ? "Si" : territorioUsuario.explotanOtros === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                </div>
                                {
                                    territorioUsuario.explotanOtros && (
                                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                            <label style={{ marginRight: '1vw' }}><b>Derechos de Explotación:</b></label>
                                            <textarea id="derechoExplotacion" name="derechoExplotacion" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={territorioUsuario.derechoExplotacion} readOnly/>
                                        </div>
                                    )
                                }
                                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                    <label style={{ marginRight: '1vw' }}><b>Derecho Sobre Predio:</b></label>
                                    <input id="derechoSobrePredio" name="derechoSobrePredio" value={territorioUsuario.derechoSobrePredio} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                    <label style={{ marginRight: '1vw' }}><b>Tiene Datos:</b></label>
                                    <input id="tieneDatos" name="tieneDatos" value={territorioUsuario.tieneDatos ? "Si" : territorioUsuario.tieneDatos === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                </div>
                                {
                                    territorioUsuario.tieneDatos && (
                                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                            <label style={{ marginRight: '1vw' }}><b>Nombre:</b></label>
                                            <input id="telefono2" name="telefono2" value={territorioUsuario.nombre} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                            <label style={{ marginRight: '1vw' }}><b>Telefono:</b></label>
                                            <input id="telefono2" name="telefono2" value={territorioUsuario.telefono} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                            <label style={{ marginRight: '1vw' }}><b>Ubicación:</b></label>
                                            <input id="ubicacion2" name="ubicacion2" value={territorioUsuario.ubicacion} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>SOLICITUD</h5>
                </div>
                <div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Fecha:</b></label>
                        <input id="fechaFiso" name="fechaFiso" value={formatDate(solicitudPendiente.fecha)} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Departamento:</b></label>
                        <input id="deptoPred" name="deptoPred" value={deptoFiso} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Municipio:</b></label>
                        <input id="munPred" name="munPred" value={munFiso} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Tipo Entrada:</b></label>
                        <input id="tipoEntrada" name="tipoEntrada" value={solicitudPendiente.tipoEntrada} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        {
                            solicitudPendiente.tipoEntrada === "Barrido Predial" && (
                                <div>
                                    <label style={{ marginRight: '1vw' }}><b>ID Barrido:</b></label>
                                    <input id="idBarrido" name="idBarrido" value={solicitudPendiente.idBarrido} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                </div>
                            )
                        }
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Declara Verdad:</b></label>
                        <input id="declaroVerdad" name="declaroVerdad" value={solicitudPendiente.declaroVerdad ? "Si" : solicitudPendiente.declaroVerdad === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Autorización:</b></label>
                        <input id="autorizacion" name="autorizacion" value={solicitudPendiente.autorizacion ? "Si" : solicitudPendiente.autorizacion === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Autorización Conyuge:</b></label>
                        <input id="autConyuge" name="autConyuge" value={solicitudPendiente.autConyuge ? "Si" : solicitudPendiente.autConyuge === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Ha Sido Beneficiario:</b></label>
                        <input id="haSidoBeneficiario" name="haSidoBeneficiario" value={solicitudPendiente.haSidoBeneficiario ? "Si" : solicitudPendiente.haSidoBeneficiario === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Acredita Beneficio:</b></label>
                        <input id="acreditaBeneficio" name="acreditaBeneficio" value={solicitudPendiente.acreditaBeneficio ? "Si" : solicitudPendiente.acreditaBeneficio === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>ID Acreditación:</b></label>
                        <input id="idAcreditacion" name="idAcreditacion" value={solicitudPendiente.idAcreditacion} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Número Resolución:</b></label>
                        <input id="numResolucion" name="numResolucion" value={solicitudPendiente.numResolucion} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Fecha:</b></label>
                        <input id="fechaAcreditacion" name="fechaAcreditacion" value={formatDate(solicitudPendiente.fechaAcreditacion)} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Patrimonio:</b></label>
                        <input id="patrimonio" name="patrimonio" value={solicitudPendiente.patrimonio} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Es Propietario:</b></label>
                        <input id="esPropietario" name="esPropietario" value={solicitudPendiente.esPropietario ? "Si" : solicitudPendiente.esPropietario === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>                                      
                    </div>
                    {
                        solicitudPendiente.esPropietario && (
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Área Predio:</b></label>
                                <input id="areaPredioPropiedad" name="areaPredioPropiedad" value={solicitudPendiente.areaPredioPropiedad} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                <label style={{ marginRight: '1vw' }}><b>Tipo Destinación:</b></label>
                                <input id="tipoDestinación" name="tipoDestinación" value={solicitudPendiente.tipoDestinación ?? "" } readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                        )
                    }
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Asociación Campesina:</b></label>
                        <input id="asociacionCampesina" name="asociacionCampesina" value={solicitudPendiente.asociacionCampesina ? "Si" : solicitudPendiente.esPropietario === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>                                      
                    </div>
                    {
                        solicitudPendiente.asociacionCampesina && (
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Razón Social o NIT:</b></label>
                                <input id="nombre3" name="nombre3" value={solicitudPendiente.nombre} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                <label style={{ marginRight: '1vw' }}><b>Compuesta Mujeres:</b></label>
                                <input id="compuestaMujeres" name="compuestaMujeres" value={solicitudPendiente.compuestaMujeres ? "Si" : solicitudPendiente.compuestaMujeres === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                <label style={{ marginRight: '1vw' }}><b>Pertenece Directiva:</b></label>
                                <input id="parteDirectiva" name="parteDirectiva" value={solicitudPendiente.parteDirectiva ? "Si" : solicitudPendiente.parteDirectiva === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                        )
                    }
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Se encuentra en una Reserva:</b></label>
                        <input id="encuentraReserva" name="encuentraReserva" value={solicitudPendiente.encuentraReserva ? "Si" : solicitudPendiente.encuentraReserva === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Tiene Experiencia:</b></label>
                        <input id="tieneExperiencia" name="tieneExperiencia" value={solicitudPendiente.tieneExperiencia ? "Si" : solicitudPendiente.tieneExperiencia === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    {
                        solicitudPendiente.tieneExperiencia && (
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Cuales y Cuanto:</b></label>
                                <textarea id="cualesCuanto" name="cualesCuanto" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={solicitudPendiente.cualesCuanto} readOnly/>
                            </div>
                        )
                    }
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Ha Entregado Predios:</b></label>
                        <input id="haEntregadoPredios" name="haEntregadoPredios" value={solicitudPendiente.haEntregadoPredios ? "Si" : solicitudPendiente.haEntregadoPredios === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Ha Tomado Cursos:</b></label>
                        <input id="haTomadoCursos" name="haTomadoCursos" value={solicitudPendiente.haTomadoCursos ? "Si" : solicitudPendiente.haTomadoCursos === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Nivel Educativo:</b></label>
                        <input id="nivelMasAlto" name="nivelMasAlto" value={solicitudPendiente.nivelMasAlto} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Número Periodos Aprobados:</b></label>
                        <input id="numPeriodosAprobados" name="numPeriodosAprobados" value={solicitudPendiente.numPeriodosAprobados} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Programas Reubicación:</b></label>
                        <input id="programaReubicacion" name="programaReubicacion" value={solicitudPendiente.programaReubicacion ? "Si" : solicitudPendiente.programaReubicacion === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Ocupación Indebida:</b></label>
                        <input id="ocupacionIndebida" name="ocupacionIndebida" value={solicitudPendiente.ocupacionIndebida ? "Si" : solicitudPendiente.ocupacionIndebida === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Departamento Pretende Acceder:</b></label>
                        <input id="deptoPred" name="deptoPred" value={deptoFisoAcceso} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Municipio:</b></label>
                        <input id="munPred" name="munPred" value={munFisoAcceso} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Tiempo Residencia:</b></label>
                        <input id="tiempoResidencia" name="tiempoResidencia" value={solicitudPendiente.tiempoResidencia} readOnly style={{ borderRadius: '10px', width: '7vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Beneficiario Restitución:</b></label>
                        <input id="beneficiarioRestitucion" name="beneficiarioRestitucion" value={solicitudPendiente.beneficiarioRestitucion ? "Si" : solicitudPendiente.beneficiarioRestitucion === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Segundo Ocupante:</b></label>
                        <input id="segundoOcupante" name="segundoOcupante" value={solicitudPendiente.segundoOcupante ? "Si" : solicitudPendiente.segundoOcupante === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Beneficiario Derechos Propiedad:</b></label>
                        <input id="beneficiarioDerechosPro" name="beneficiarioDerechosPro" value={solicitudPendiente.beneficiarioDerechosPro ? "Si" : solicitudPendiente.beneficiarioDerechosPro === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '8vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Deseo Inclusión Programas:</b></label>
                        <input id="deseaSerIncluidoProgramas" name="deseaSerIncluidoProgramas" value={solicitudPendiente.deseaSerIncluidoProgramas ? "Si" : solicitudPendiente.deseaSerIncluidoProgramas === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '6vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Favorecido Sentencias Judiciales:</b></label>
                        <input id="beneficiarioSentencias" name="beneficiarioSentencias" value={solicitudPendiente.beneficiarioSentencias ? "Si" : solicitudPendiente.beneficiarioSentencias === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '6vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        <label style={{ marginRight: '1vw' }}><b>Tipo Solicitud:</b></label>
                        <input id="tipoSolicitud" name="tipoSolicitud" value={solicitudPendiente.tipoSolicitud} readOnly style={{ borderRadius: '10px', width: '15vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Firma:</b></label>
                        <input id="firmas" name="firmas" value={solicitudPendiente.firmas ? "Si" : solicitudPendiente.firmas === false ? "No" : ""} readOnly style={{ borderRadius: '10px', width: '6vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    </div>
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                        <label style={{ marginRight: '1vw' }}><b>Observaciones:</b></label>
                        <textarea onChange={handlerChangeObservaciones} id="observaciones" name="observaciones" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} defaultValue={solicitudPendiente.observaciones} readOnly={solicitudPendiente.estado !== "Pendiente" || !userLoged?.documento}/>
                    </div>
                </div>
            </div>
            <div>
                {
                    solicitudPendiente.estado === "Pendiente" && userLoged?.documento ? (
                        <div style={{ marginBottom: '2vw', marginTop: '2vw' }}>
                            <button onClick={handlerAcept} className="btn btn-primary" style={{ backgroundColor: '#037250', marginRight: '3vw' }}>Aprobar</button>
                            <button onClick={handlerReject} className="btn btn-danger">Rechazar</button>
                        </div>
                    ) : (
                        <button onClick={handlerBack} className="btn btn-primary" style={{ backgroundColor: '#037250', marginRight: '3vw', marginBottom: '1vw' }}>Regresar</button>
                    )
                }
            </div>
        </div>
    );
}