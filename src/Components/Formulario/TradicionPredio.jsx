import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const TradicionPredio = () => {

    const { predioUsuario, handlerSecondUpdate, predio, userLoged } = useContext(UserContext);
    const [ formsPrediosUsuarios, setFormsPrediosUsuarios ] = useState(predioUsuario);

    useEffect(()=>{
        setFormsPrediosUsuarios({
            ...formsPrediosUsuarios,
            idPredio: predio.idPredio,
            cedula: userLoged.cedula,
        });
    }, []);

    const handleChange = ({target}) => {
        setFormsPrediosUsuarios({
            ...formsPrediosUsuarios,
            [target.name]: target.value
        });
    }

    const handlerChangeBool = ({target}) => {
        setFormsPrediosUsuarios({
            ...formsPrediosUsuarios,
            [target.name]: JSON.parse(target.value)
        });
    }

    const onClickButon = () => {
        console.log(formsPrediosUsuarios);
    }

    return (
        <div>
            <div style={{ backgroundColor: '#037250', width: '23vw', padding: '0.1vw' }}>
                <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>7. TRADICIÓN DEL PREDIO</h5>
            </div>
            <div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginBottom: '1vw' }}>41. ¿Cuál de las siguientes es la que usted considera que le otorga algún tipo de derecho sobre el predio?</label>
                    <div className="checkbox-group">
                        <div className="checkbox-column">
                            <label htmlFor="ver" style={{ marginRight: '1vw' }}>Lo compró mediante algún documento:</label>
                            <input onChange={handleChange} type="radio" id="compro" name="derechoSobrePredio" value="Compro con documento" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="oir" style={{ marginRight: '1vw' }}>Es una donación:</label>
                            <input onChange={handleChange} type="radio" id="donacion" name="derechoSobrePredio" value="Donacion" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="hablar" style={{ marginRight: '1vw' }}>Es una herencia:</label>
                            <input onChange={handleChange} type="radio" id="herencia" name="derechoSobrePredio" value="Herencia" style={{ marginRight: '1vw' }} />
                            <br />
                        </div>
                        <div className="checkbox-column">
                            <label htmlFor="bañarse" style={{ marginRight: '1vw' }}>Lo compró de forma verbal:</label>
                            <input onChange={handleChange} type="radio" id="comproVerbal" name="derechoSobrePredio" value="Compro verbal" style={{ marginRight: '1vw' }} />
                            <br />
                            <label htmlFor="otra" style={{ marginRight: '1vw' }}>Otra ¿Cual?:</label>
                            <input onChange={handleChange} type="text" name="derechoSobrePredio" style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw'}}/>
                            <br />
                        </div>
                    </div>
                </div>
                <div className="col" style={{ textAlign: 'left', marginLeft: '0.5vw', marginTop: '1vw' }}>
                    <label style={{ marginRight: '3vw' }}>42. ¿Tiene los datos de contacto de la persona de la cual obtuvo el predio?</label>
                    <label htmlFor="si" style={{ marginRight: '1vw' }}>Si</label>
                    <input onChange={handlerChangeBool} type="radio" id="si" name="tieneDatos" value={true} style={{ marginRight: '1vw' }}/>
                    <label htmlFor="no" style={{ marginRight: '1vw' }}>No</label>
                    <input onChange={handlerChangeBool} type="radio" id="no" name="tieneDatos" value={false}  />
                </div>
                {
                    formsPrediosUsuarios.tieneDatos && (
                        <div>
                            <label style={{ marginRight: '3vw' }}>En caso afirmatio responda:</label>
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}>¿Cuál es el nombre de la persona de la cual obtuvo el predio?</label>
                                <input onChange={handleChange} id="nombre" name="nombre" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                            <div className="col" style={{ textAlign: 'left', marginTop: '1vw', marginLeft: '0.5vw' }}>
                                <label style={{ marginRight: '1vw' }}>Datos de ubicación:</label>
                                <input onChange={handleChange} id="ubicacion" name="ubicacion" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                                <label style={{ marginRight: '1vw' }}>Telefono: </label>
                                <input onChange={handleChange} id="telefono" name="telefono" style={{ borderRadius: '10px', width: '17vw', marginRight: '1vw', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', height: '1.5vw' }} type="text"/>
                            </div>
                        </div>
                    )
                }
            </div>
            <button style={{ marginTop: '1vw' }} onClick={onClickButon}>Guardar</button>
        </div>
    );
}