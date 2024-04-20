import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { findAllDeptosForm, findMunByDeptoForm } from "../../services/formularioService";
import { generatePredioId } from "../../services/predioService";

export const IdentificacionPredio = () => {

    const { predio, handlerPredio } = useContext(UserContext);
    const [ predioValues, setPredioValues ] = useState(predio);
    const [ idPredios, setIdPredio ] = useState("");
    const [ deptos, setDeptos ] = useState([]);
    const [ municipios, setMunicipios ] = useState([]);
    const [ otrosConf, setOtrosConf ] = useState("");

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
        setIdPredio(generatePredioId());
    },[])

    useEffect(()=>{
        if(idDepto !== ''){
            getMunicipios(idDepto);
            setPredioValues({
                ...predioValues,
                idPredio: idPredios,
            });
        }
    }, [idDepto])

    const handlerChange = ({target}) => {
        setPredioValues({
            ...predioValues,
            [target.name]: target.value,
        });
    }

    const onHandlerChange = ({target}) => {
        const { value } = target;
        setIdDepto(value);
    }

    const onChangeValuesForm = ({target}) => {
        const { name, value } = target;
        setPredioValues({
            ...predioValues,
            [name]: value,
        });
    }

    const handlerChangeBool = ({target}) => {
        setPredioValues({
            ...predioValues,
            [target.name]: JSON.parse(target.value),
        });
    }

    const handlerChangeArea = ({target}) => {
        setPredioValues({
            ...predioValues,
            areaPredioSolicitud: parseInt(target.value),
        });
    }

    const handleConflictos = ({target}) => {
        const { value } = target;
        setPredioValues({
            ...predioValues,
            conflictos: predioValues.conflictos === "" ? predioValues.conflictos + value : predioValues.conflictos +" - "+ value
        });
    }

    const handleOtrosConflictos = ({target}) => {
        setOtrosConf(target.value);
    }

    const cargarOtrosConflictos = () => {
        setPredioValues({
            ...predioValues,
            conflictos: predioValues.conflictos + " - " + otrosConf
        });
    }

    const onClickButon = () => {
        handlerPredio(predioValues);
    }

    return(
        <div>
            <div style={{ backgroundColor: '#037250', width: '33vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>6. IDENTIFICACIÓN GENERAL DEL PREDIO</h5>
            </div>
            <div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '0.5vw' }}><b>Datos de identificación del predio</b></h6>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>37. Nupre (Identificador único):</label>
                    <input onChange={handlerChange} id="nupre" name="nupre" style={{ borderRadius: '10px', width: '17vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    <label style={{ marginRight: '1vw' }}>Número predial antiguo: </label>
                    <input onChange={handlerChange} id="numPredialAnti" name="numPredialAnti" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>Número predial nacional:</label>
                    <input onChange={handlerChange} id="numPredialNal" name="numPredialNal" style={{ borderRadius: '10px', width: '17vw', marginRight: '2vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>Número de folio de matricula inmobiliaria: </label>
                    <input onChange={handlerChange} id="numFolio" name="numFolio" style={{ borderRadius: '10px', width: '17vw', marginRight: '1.5vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1.5vw' }}><b>Datos de ubicación del predio</b></h6>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>38. Departamento:</label>
                    <select onChange={(event)=>{
                            onHandlerChange(event);
                        }} className="label-register-user" id="departamentosForm" name="departamentosForm" style={{ marginRight: '1vw', width: '20vw' }}>
                        <option>Seleccione Departamento</option>
                        {deptos.map((depto, index) => (
                            <option key={index} value={depto.idDepto}>{depto.nombre}</option>
                        ))}
                    </select>
                    <label style={{ marginRight: '1vw' }}>Municipio:</label>
                    <select onChange={onChangeValuesForm} className="label-register-user" id="idMunicipio" name="idMunicipio" style={{ marginRight: '1vw', width: '20vw' }}>
                        <option>Seleccione Municipio</option>
                        {municipios.map((mun, index) => (
                            <option key={index} value={mun.idMunicipio}>{mun.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>Vereda:</label>
                    <input onChange={handlerChange} id="vereda" name="vereda" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    <label style={{ marginRight: '1vw' }}>Corregimiento: </label>
                    <input onChange={handlerChange} id="corregimiento" name="corregimiento" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    <label style={{ marginRight: '1vw' }}>Centro Poblado: </label>
                    <input onChange={handlerChange} id="centroPoblado" name="centroPoblado" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>Dirección del predio:</label>
                    <input onChange={handlerChange} id="direccion" name="direccion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                    <label style={{ marginRight: '1vw' }}>Nombre del predio: </label>
                    <input onChange={handlerChange} id="nombre" name="nombre" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>¿El predio pertenece a uno de mayor extensión?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="pertenencia" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="pertenencia" value={false}  />
                </div>
                {
                    predioValues.pertenencia && (
                        <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                            <label style={{ marginRight: '1vw' }}>Nombre del predio al que pertenece:</label>
                            <input onChange={handlerChange} id="nombrePertenece" name="nombrePertenece" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                        </div>
                    )
                }
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                    <label style={{ marginRight: '1vw' }}>39. Área del predio objeto de la solicitud (m2):</label>
                    <input onChange={handlerChangeArea} id="areaPredioSolicitud" name="areaPredioSolicitud" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>40. ¿Existen conflictos?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="tieneConflictos" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="tieneConflictos" value={false}  />
                </div>
                {
                    predioValues.tieneConflictos && (
                        <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                            <label style={{ marginBottom: '1vw' }}>Seleccion tipo(s) de conflicto(s) identificado(s) (Opción multiple): </label>
                            <div className="checkbox-group">
                                <div className="checkbox-column">
                                    <label htmlFor="ver" style={{ marginRight: '1vw' }}>Sucesión sin acuerdos de herederos:</label>
                                    <input onChange={handleConflictos} type="checkbox" id="Sucesion" name="Sucesion" value="Sucesion" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="oir" style={{ marginRight: '1vw' }}>De paso o servidumbres:</label>
                                    <input onChange={handleConflictos} type="checkbox" id="paso" name="paso" value="Paso o Servidumbre" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Por linderos:</label>
                                    <input onChange={handleConflictos} type="checkbox" id="linderos" name="linderos" value="Linderos" style={{ marginRight: '1vw' }} />
                                    <br />
                                </div>
                                <div className="checkbox-column">
                                    <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Predios con prestasiones territoriales:</label>
                                    <input onChange={handleConflictos} type="checkbox" id="prestasiones" name="prestasiones" value="Prestasiones" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Usurpación:</label>
                                    <input onChange={handleConflictos} type="checkbox" id="usurpacion" name="usurpacion" value="Usurpacion" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Seguridad para acceso al predio:</label>
                                    <input onChange={handleConflictos} type="checkbox" id="seguridad" name="seguridad" value="Seguridad" style={{ marginRight: '1vw' }} />
                                    <br />
                                    <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                                    <input onChange={handleOtrosConflictos} type="text" name="otroConflicto" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                                    <button onClick={cargarOtrosConflictos} style={{ borderRadius: '10px', width: '5vw', marginLeft: '1vw' }}>Cargar</button>
                                    <br />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );
}