import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const Autorizaciones = () => {

    const { handlerAuths, solicitud } = useContext(UserContext);

    const [ formValues, setFormValues ] = useState(solicitud);

    useEffect(()=>{
        console.log(solicitud);
    }, [])

    const onChangeValuesForm = ({target}) => {
        const { name, value } = target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const onClickButon = () => {
        console.log(formValues);
        handlerAuths(formValues);
    }

    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '29vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>SALVEDADES Y AUTORIZACIONES</h5>
            </div>
            <div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '0.5vw' }}><b>Solicitante</b></h6>
                <p style={{ textAlign: 'justify' }}>
                    1. Bajo la gravedad de juramento declaro que la información personal suministrada es verdadera y 
                    autorizo que sea verificada con otras fuentes de información y que se actualice de forma automatica a través del 
                    cruce de registros administrativos y consultas de información a la DIAN, de acuerdo con lo dispuesto en el articulo
                    584 del estatuto tributario Decreto 624 de 1989: "Examen de la declaracion con autorización del declarante" u otras 
                    fuentes que la ANT defina. Cualquier presunta falsedad identificada a través de cruces de bases de datos generará la
                    exclusión del RESO y no podrá ingresar en un periodo de 10 años, independiente de las acciones legales que haya lugar.
                    (Artículo 15 del Decreto 902 de 2017).
                </p>
                <div style={{ textAlign: 'left', marginBottom: '1vw' }}>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={onChangeValuesForm} type="radio" id="si" name="declaroverdad" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={onChangeValuesForm} type="radio" id="no" name="declaroverdad" value={false} />
                </div>
                <p style={{ textAlign: 'justify' }}>
                    2. Autorizo a la ANT para remitir mensajes a través del correo electrónico del estado y/o avance del proceso
                    y ser notificado por dicho medio electrónico, de conformidad con los dispuesto en el artículo 56 de la Ley
                    1437 de 2011.
                </p>
                <div style={{ textAlign: 'left', marginBottom: '1vw' }}>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={onChangeValuesForm} type="radio" id="si" name="autorizacion" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={onChangeValuesForm} type="radio" id="no" name="autorizacion" value={false}/>
                </div>
                <h6 style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '0.5vw' }}><b>Cónyuge o compañero(a) permanente</b></h6>
                <p style={{ textAlign: 'justify' }}>
                    3. En virtud de los principios de planeación y eficiencia se precisa que en caso de que el (la) cónyuge no
                    pueda ser valorado(a) al momento de analizar la presente solicitud - FISO, conforme al artículo 25 del Decreto 
                    Ley 902 de 2017 la titulación se realizará de manera conjunta, para ello se entenderá que con el solo diligenciamiento 
                    de este documento por parte suya o de su cónyuge o compañero(a) permanente será posible aplicar un esquema de arrastre tanto
                    de puntajes como de infromación reportada en el formulario, el cual no requerirá de un nuevo FISO. Ello sin perjuicio 
                    de la obligación de la ANT de verificar en VUR, DIAN y demás bases de datos la existencia de alguna prohibición que 
                    impida la adjudicación.
                </p>
                <p style={{ textAlign: 'justify' }}>
                    Identificación de cónyuge o compañero(a) permanente: Autorizo a la Agencia Nacional de Tierras para realizar
                    consultas de información a la DIAN, de acuerdo con lo dispuesto en el articulo 584 del estatuto tributario 
                    Decret 624 de 1989: "Examen de declaración con autorización del declarante"; al igual que la consulta de otras bases
                    de datos e información que por ley tengan reserva, tendiente a la verificación de los requisitos dispuestos en el Decreto Ley 
                    902 de 2017 y disposiciones reglamentarias, para la inscripción en el Registro de Sujetos de Ordenamiento RESO y demás 
                    actuaciones administrativas que se encuentren vinculadas con el tramite principal.
                </p>
                <div style={{ textAlign: 'left', marginBottom: '1vw' }}>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={onChangeValuesForm} type="radio" id="si" name="autconyuge" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={onChangeValuesForm} type="radio" id="no" name="autconyuge" value={false}/>
                </div>
                <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
            </div>
        </div>
    );
}