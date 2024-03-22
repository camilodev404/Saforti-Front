
export const Solicitudes = () => {
    return (
        <> 
            <div className="div-menu-solicitud" >
                <table className="table table-hover table-striped" style={{ borderColor: 'black', border: '2px solid #ccc'}}>
                    <thead>
                        <tr>
                            <th>#Formulario</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Ver</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0123</td>
                            <td>01-02-2024</td>
                            <td>Enviado</td>
                            <td>
                                <button className="btn" style={{ backgroundColor: '#037250', color: 'white' }}>
                                    Ver
                                </button>
                            </td>
                            <td>
                                <button className="btn" style={{ backgroundColor: '#037250', color: 'white' }}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>0123</td>
                            <td>01-02-2024</td>
                            <td>Enviado</td>
                            <td>
                                <button className="btn" style={{ backgroundColor: '#037250', color: 'white' }}>
                                    Ver
                                </button>
                            </td>
                            <td>
                                <button className="btn" style={{ backgroundColor: '#037250', color: 'white' }}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>0123</td>
                            <td>01-02-2024</td>
                            <td>Enviado</td>
                            <td>
                                <button className="btn" style={{ backgroundColor: '#037250', color: 'white' }}>
                                    Ver
                                </button>
                            </td>
                            <td>
                                <button className="btn" style={{ backgroundColor: '#037250', color: 'white' }}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}