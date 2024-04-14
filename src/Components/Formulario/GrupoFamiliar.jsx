import Swal from "sweetalert2";
import { FamiliarForm } from "../FamiliarForm";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

export const GrupoFamiliar = () => {

    const { familiares, handlerRemove } = useContext(UserContext);
    const [ vaCrear, setVaCrear ] = useState(false);

    const handleCrear = () => {
        setVaCrear(false);
    }

    const handleCrear1 = () => {
        setVaCrear(true);
    }

    const handleDelete = (id) => {
        handlerRemove(id);
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ backgroundColor: '#037250', width: '29vw', padding: '0.1vw' }}>
                    <h5 style={{ textAlign: 'left', color: 'white', marginLeft: '1vw', marginTop: '0.5vw' }}>3. INFORMACIÓN DEL GRUPO FAMILIAR</h5>
                </div>
                <button onClick={handleCrear1} style={{ marginLeft: '2vw', borderRadius: '10px', borderColor: '#037250', borderWidth: '1px', borderStyle: 'solid' }}>Crear Familiar</button>
            </div>
            {
                vaCrear && (
                    <FamiliarForm onClose={handleCrear}/>
                )
            }
            <div className="col" style={{ textAlign: 'left', marginTop: '0.5vw', marginLeft: '0.1vw' }}>
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
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    {
                        (familiares !== null || familiares !== undefined) && (
                            <tbody>
                                {familiares && Object.values(familiares).map((familiar, index) => (
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
                                        <td>
                                            <button onClick={() => handleDelete(familiar.idFamiliar)} className="btn btn-danger" style={{ width:'5vw', height: '2vw' }}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>  
                        )
                    }
                </table>
            </div>
        </div>
    );
}