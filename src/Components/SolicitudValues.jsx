import { useEffect, useState } from "react";
import { findMunicipio, findMunicipioByDepto, findUserById } from "../services/usuarioService";
import { familiarByCedula } from "../services/familiarService";
import { getPredioById } from "../services/predioService";
import { predioUsuarioFinder } from "../services/predioUsuarioService";

export const SolicitudValues = ({fiso}) => {

    const [ solicitudPendiente, setSolicitudPendiente ] = useState(fiso);
    const [ respuestSolicitud, setRespuestSolicitu ] = useState(false);
    const [ usuario, setUsuario ] = useState({});
    const [ mun, setMun ] = useState("");
    const [ depto, setDepto ] = useState("");
    const [ families, setFamilies ] = useState([]);
    const [ territorio, setTerritorio ] = useState({});
    const [ munPred, setMunPred ] = useState("");
    const [ deptoPred, setDeptoPred ] = useState("");
    const [ territorioUsuario, setTerritorioUsuario ] = useState({});

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

    const formatDate = (dateString) => {
        if(dateString!==undefined && dateString!== null){
            return dateString.slice(0, 10);
        } else {
            return "";
        } 
    }

    const handlerAcept = () => {
        setRespuestSolicitu(true);
        console.log("USUARIO:", usuario);
        console.log("FAMILARES", families);
        console.log("PREDIO", territorio);
        console.log("Relacion", territorioUsuario);
    }
    const handlerReject = () => {
        setRespuestSolicitu(true);
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
                                <textarea id="limitaciones" name="limitaciones" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={usuario.limitaciones}/>
                            </div>
                        )
                    }
                    <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}><b>Ocupaciones:</b></label>
                                <textarea id="ocupaciones" name="ocupaciones" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={usuario.ocupaciones}/>
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
                                <textarea id="conflictos" name="conflictos" rows="10" cols="80" style={{ borderRadius: '10px', width: 'auto', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} value={territorio.conflictos}/>
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '36vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>RELACION PREDIO CON SOLICITANTE</h5>
                </div>
                
            </div>
            <div style={{ padding: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginTop: '1vw', marginLeft: '1vw', marginRight: '1vw', marginBottom: '1vw', height: 'auto' }}>
                <div style={{ backgroundColor: '#037250', width: '16vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>SOLICITUD</h5>
                </div>
                
            </div>
            <div>
                <div style={{ marginBottom: '2vw', marginTop: '2vw' }}>
                    <button onClick={handlerAcept} className="btn btn-primary" style={{ backgroundColor: '#037250', marginRight: '3vw' }} disabled={respuestSolicitud}>Aprobar</button>
                    <button onClick={handlerReject} className="btn btn-danger" disabled={respuestSolicitud}>Rechazar</button>
                </div>
            </div>
        </div>
    );
}