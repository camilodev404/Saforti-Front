import { useContext, useEffect, useState } from "react";
import { idFamiliarGenerate } from "../services/familiarService";
import { UserContext } from "../context/UserContext";

const initialValueFamiliar = {
    idFamiliar: "",
    tipoDocumento: "",
    documento: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    fechaNacimiento: "",
    sexo: "",
    limitantes: "",
    parentesco: "",
    ocupaciones: "",
    dependeUsuario: null,
    foranea: {
        idPredio: "",
        cedula: ""
    }
}

export const FamiliarForm = ({onClose}) => {

    const { handlerFamiliares } = useContext(UserContext);
    const [ formFamiliar, setFormFamiliar ] = useState(initialValueFamiliar);

    useEffect(()=>{
        const idFam = idFamiliarGenerate();
        setFormFamiliar({
            ...formFamiliar,
            idFamiliar : idFam
        });
    },[])

    const onInputChange = ({target}) => {
        setFormFamiliar({
            ...formFamiliar,
            [target.name] : target.value
        })
    }

    const onInputChangedepende = ({target}) => {
        setFormFamiliar({
            ...formFamiliar,
            dependeUsuario : JSON.parse(target.value)
        })
    }

    const gaudarforms = () => {
        console.log(formFamiliar);
        handlerFamiliares(formFamiliar);
        onClose(false);
    }

    return (
        <div className="col" style={{ textAlign: 'center', marginTop: '0.5vw', marginLeft: '0.5vw',  borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid' }}>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Tipo de Documento</label><br/>
            <select onChange={onInputChange} className="label-register-user" id="tipoDocumento" name="tipoDocumento">
                <option>Seleccione Tipo Documento</option>
                <option value="TI">Tarjeta de Identidad</option>
                <option value="CE">Cédula de Extranjeria</option>
                <option value="CC">Cédula de Ciudadania</option>
            </select><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Documento</label><br/>
            <input onChange={onInputChange} className="label-register-user" type="text" id="documento" name="documento"/> <br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Primer Nombre</label><br/>
            <input onChange={onInputChange} className="label-register-user" type="text" id="primerNombre" name="primerNombre"/> <br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Segundo Nombre</label><br/>
            <input onChange={onInputChange} className="label-register-user" type="text" id="segundoNombre" name="segundoNombre"/><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Primer Apellido</label><br/>
            <input onChange={onInputChange} className="label-register-user" type="text" id="primerApellido" name="primerApellido"/><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Segundo Apellido</label><br/>
            <input onChange={onInputChange} className="label-register-user" type="text" id="segundoApellido" name="segundoApellido"/><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Fecha Nacimiento (yyyy-mm-dd)</label><br/>
            <input onChange={onInputChange} className="label-register-user" type="text" id="fechaNacimiento" name="fechaNacimiento"/><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Parentesco</label><br/>
            <select onChange={onInputChange} className="label-register-user" id="parentesco" name="parentesco">
                <option>Seleccione Parentesco</option>
                <option value="Esposo(a)">Esposo / Esposa</option>
                <option value="Compañero(a)">Compañero / Compañera Permanente</option>
                <option value="Hijo(a)">Hijo / Hija</option>
                <option value="Hijastro(a)">Hijastro / Hijastra</option>
                <option value="Hijo(a) Crianza">Hijo / Hija de Crianza</option>
                <option value="Esposo(a)">Esposo / Esposa</option>
                <option value="Padres">Padre / Madre</option>
                <option value="Abuelo(a)">Abuelo / Abuela</option>
                <option value="Hermano(a)">Hermano / Hermana</option>
                <option value="Suegro(a)">Suegro / Suegra</option>
                <option value="Yerno - Nuera">Yerno / Nuera</option>
                <option value="Cuñado(a)">Cuñado / Cuñada</option>
                <option value="Bisabuelo(a)">Bisabuelo / Bisabuelo</option>
                <option value="Tio(a)">Tio / Tia</option>
                <option value="Sobrino(a)">Sobrino / Sobrina</option>
                <option value="Biznieto(a)">Biznieto / Biznieta</option>
                <option value="Primo(a)">Primo / Prima</option>
                <option value="Otro">Otro</option>
            </select><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Sexo</label><br/>
            <select onChange={onInputChange} className="label-register-user" id="sexo" name="sexo">
                <option>Seleccione Sexo</option>
                <option value="Mujer">Mujer</option>
                <option value="Hombre">Hombre</option>
            </select><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Limitantes</label><br/>
            <select onChange={onInputChange} className="label-register-user" id="limitantes" name="limitantes">
                <option>Seleccione Limitantes</option>
                <option value="No">No</option>
                <option value="Ver">Ver</option>
                <option value="Oir">Oir</option>
                <option value="Hablar">Hablar</option>
                <option value="Moverse">Moverse o Caminar por si mismo</option>
                <option value="Bañarse">Bañarse, Vestirse o Alimentarse por si mismo</option>
                <option value="Salir">Dificultad para salir a la calle sin ayuda o compañia</option>
                <option value="Entender">Entender o Aprender</option>
                <option value="Otra">Otra</option>
            </select><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Ocupaciones</label><br/>
            <select onChange={onInputChange} className="label-register-user" id="ocupaciones" name="ocupaciones">
                <option>Seleccione Ocupaciones</option>
                <option value="Empleado">Empleado</option>
                <option value="Independiente">Independiente</option>
                <option value="Estudiante">Estudiante</option>
                <option value="Oficios del Hogar">Oficios del Hogar</option>
                <option value="Incapacitado">Incapacitado</option>
                <option value="Campesino">Campesino</option>
                <option value="Trabajador Agrario">Trabajador Agrario</option>
                <option value="Otra">Otra</option>
            </select><br/>
            <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Depende Economicamente</label><br/>
            <div>
                <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>Si</label>
                <input onChange={onInputChangedepende} className="label-register-user" type="radio" id="si" name="dependeUsuario" value={true}/>
                <label style={{ color: '#4f4f4d', fontSize: 'large', fontWeight: 'bold', textAlign: 'left' }}>No</label>
                <input onChange={onInputChangedepende} className="label-register-user" type="radio" id="no" name="dependeUsuario" value={false}/>
            </div>
            <button onClick={gaudarforms} style={{borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid', marginBottom: '1vw' }} >Guardar Familiar</button>
        </div>
    );
}