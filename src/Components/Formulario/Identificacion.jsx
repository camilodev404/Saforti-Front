import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { findAllDeptosForm, findMunByDeptoForm, generateFormId } from "../../services/formularioService";
import { allUgts, asignacionFun, funcionarioByUgt } from "../../services/ugtService";

export const Identificacion = () => {

    const { ugtLoged, solicitud, handlerInitialFiso } = useContext(UserContext);
    const [ deptos, setDeptos ] = useState([]);
    const [ municipios, setMunicipios ] = useState([]);
    const [ formValues, setFormValues ] = useState(solicitud);
    const [ sucursales, setSucursales ] = useState([]);
    const [  idSucursal, setIdSucursal ] = useState("");
    const [ funcionarios, setFuncionarios ] = useState([]);

    const [ idDepto, setIdDepto ] = useState('');

    const getAll = async() => {
        const depas = await findAllDeptosForm();
        setDeptos(depas.data);
    }

    const getAllUgts = async() => {
        const ugts = await allUgts();
        setSucursales(ugts.data);
    }

    const getMunicipios = async(iddepto) => {
        const munis = await findMunByDeptoForm(iddepto);
        setMunicipios(munis.data);
    }

    const getFuncionarios = async(iden) => {
        const funcs = await funcionarioByUgt(iden);
        setFuncionarios(funcs.data);
    }

    useEffect(()=>{
        const n = funcionarios.length;
        if (n>0){
            if(n === 1){
                const idfun = funcionarios[0].idFuncionario;
                console.log(idfun);
                setFormValues({
                    ...formValues,
                    idFuncionario: idfun,
                });
            } else {
                const ins = asignacionFun(n);
                const idfun = funcionarios[ins].idFuncionario;
                console.log(idfun);
                setFormValues({
                    ...formValues,
                    idFuncionario: idfun,
                });
            }
        }
    }, [funcionarios])

    useEffect(()=>{
        getAll();
        getAllUgts();
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

    const onChangeUgt = ({target}) => {
        setIdSucursal(target.value);
        getFuncionarios(target.value);
    }

    const onClickButon = () => {
        console.log(formValues);
        handlerInitialFiso(formValues);
    }


    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '29vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>1. IDENTIFICACIÓN DE LA SOLICITUD</h5>
            </div>
            <h6 style={{ textAlign: 'left', marginTop: '0.5vw' }}>Lugar de la solicitud</h6>
            <div className="col" style={{ textAlign: 'left' }}>
                <label style={{ marginRight: '5vw' }}>Fecha diligenciamiento de la solicitud (yyyy-mm-dd):</label>
                <input onChange={onChangeValuesForm} id="fecha" name="fecha" style={{ borderRadius: '10px' }} type="text"/>
            </div>
            <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                <label style={{ marginRight: '1vw' }}>Departamento:</label>
                <select onChange={(event)=>{
                        onHandlerChange(event);
                    }} className="label-register-user" id="departamentosForm" name="departamentosForm" style={{ marginRight: '1vw', width: '20vw' }}>
                    <option>Seleccione Departamento</option>
                    {deptos.map((depto, index) => (
                        <option key={index} value={depto.idDepto}>{depto.nombre}</option>
                    ))}
                </select>
                <label style={{ marginRight: '1vw' }}>Municipio:</label>
                <select onChange={onChangeValuesForm} className="label-register-user" id="municipiosForm" name="idMunicipio" style={{ marginRight: '1vw', width: '20vw' }}>
                    <option>Seleccione Municipio</option>
                    {municipios.map((mun, index) => (
                        <option key={index} value={mun.idMunicipio}>{mun.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                <label style={{ marginRight: '1vw' }}>Tipo de Entrada:</label>
                <select onChange={onChangeValuesForm} className="label-register-user" id="tipoentrada" name="tipoEntrada" style={{ marginRight: '1vw', width: '20vw' }}>
                    <option>Seleccion Tipo de Entrada</option>
                    <option value="Oficina ANT">Inscripcion en la Oficina ANT</option>
                    <option value="Barrido Predial">Barrido Predial</option>
                    <option value="INCODER">Registro Administrativo</option>
                    <option value="Decisiones Judiciales">Decisiones Judiciales</option>
                </select>
                {
                    formValues.tipoEntrada === "Barrido Predial" && (
                        <div>
                            <label style={{ marginRight: '1vw', marginLeft: '1vw' }}>ID Barrido ANT:</label>
                            <input id="idbarrido" name="idBarrido" onChange={onChangeValuesForm} style={{ borderRadius: '10px' }}/>
                        </div>
                    )
                }
                <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                    <label style={{ marginRight: '1vw' }}>UGT:</label>
                    <select onChange={onChangeUgt} className="label-register-user" id="ugtes" name="ugtes" style={{ marginRight: '1vw', width: '20vw' }}>
                        <option>Seleccione Departamento</option>
                        {sucursales.map((ugtes, index) => (
                            <option key={index} value={ugtes.idugt}>{ugtes.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );

}