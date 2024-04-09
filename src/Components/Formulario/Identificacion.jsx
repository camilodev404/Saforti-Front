import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { findAllDeptosForm, findMunByDeptoForm } from "../../services/formularioService";

export const Identificacion = () => {

    const { ugtLoged } = useContext(UserContext);
    const [ deptos, setDeptos ] = useState([]);
    const [ municipios, setMunicipios ] = useState([]);


    //FIXME: Desde la solicitud creada por el campesino no tiene ugt asignada, asignarla una vez se asigne abogado.
    const ugt = 'Occidente';

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


    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '29vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>1. IDENTIFICACIÓN DE LA SOLICITUD</h5>
            </div>
            <h6 style={{ textAlign: 'left', marginTop: '0.5vw' }}>Lugar de la solicitud</h6>
            <div className="col" style={{ textAlign: 'left' }}>
                <label style={{ marginRight: '5vw' }}>Fecha diligenciamiento de la solicitud</label>
                <input style={{ borderRadius: '10px' }} type="date"/>
            </div>
            <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                <label style={{ marginRight: '1vw' }}>Departamento:</label>
                <select onChange={onHandlerChange} className="label-register-user" id="tipodoc" name="tipodoc" style={{ marginRight: '1vw', width: '20vw' }}>
                    {deptos.map((depto, index) => (
                        <option key={index} value={depto.idDepto}>{depto.nombre}</option>
                    ))}
                </select>
                <label style={{ marginRight: '1vw' }}>Municipio:</label>
                <select className="label-register-user" id="tipodoc" name="tipodoc" style={{ marginRight: '1vw', width: '20vw' }}>
                    {municipios.map((mun, index) => (
                        <option key={index} value={mun.idDepto}>{mun.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                <label style={{ marginRight: '1vw' }}>Tipo de Entrada:</label>
                <select className="label-register-user" id="tipodoc" name="tipodoc" style={{ marginRight: '1vw', width: '20vw' }}>
                    <option value="Oficina ANT">Inscripcion en la Oficina ANT</option>
                    <option value="Barrido Predial">Barrido Predial</option>
                    <option value="INCODER">Registro Administrativo</option>
                    <option value="Decisiones Judiciales">Decisiones Judiciales</option>
                </select>
                <label style={{ marginRight: '1vw', marginLeft: '1vw' }}>ID Barrido ANT:</label>
                <input style={{ borderRadius: '10px' }}/>
            </div>
            <div className="col" style={{ textAlign: 'left', marginTop: '1vw' }}>
                <label>Responsable del diligenciamiento de la solicitud: <b>UGT { ugtLoged ? ugtLoged.nombre : '' }</b></label>
            </div>
        </div>
    );

}