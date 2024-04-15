

const initialFiso = {
    nroFormulario: "",
    idMunicipio: "",
    fecha: "", 
    tipoEntrada: "",
    idBarrido: "",
    declaroVerdad: null,
    autorizacion: null,
    autConyuge: null,
    idFuncionario: "",
    haSidoBeneficiario: null,
    acreditaBeneficio: null,
    idAcreditacion: "",
    numResolucion: "",
    fechaAcreditacion: "",
    patrimonio: 0,
    esPropietario: null,
    areaPredioPropiedad: 0,
    tipoDestinacion: "",
    asociacionCampesina: null,
    nombre: "",
    compuestaMujeres: null,
    parteDirectiva: null,
    encuentraReserva: null,
    tieneExperiencia: null,
    cualesCuanto: "",
    haEntregadoPredios: "",
    haTomadoCursos: "",
    nivelMasAlto: "",
    numPeriodosAprobados: "",
    programaReubicacion: null,
    ocupacionIndebida: null,
    deptoAcceso: "",
    municipioAcceso: "",
    tiempoResidencia: "",
    beneficiarioRestitucion: "",
    segundoOcupante: null,
    beneficiarioDerechosPro: null,
    deseaSerIncluidoProgramas: null,
    beneficiarioSentencias: null,
    tipoSolicitud: "",
    firmas: null,
    estado: "",
    observaciones: "",
    foranea: {
        idPredio: "",
        cedula: "",
    }
}

export const formReducer = (state = {}, action) => {

    switch (action.type) {
        case 'formValues':
            return {
                ...state,
                idMunicipio: action.payload.idMunicipio,
                fecha: action.payload.fecha,
                tipoentrada: action.payload.tipoentrada,
                idbarrido: action.payload.idbarrido,
            };
        case 'id':
            return {
                ...state,
                nroformulario: action.payload,
            };
        case 'autorizaciones':
            return {
                ...state,
                declaroverdad: action.payload.declaroverdad,
                autorizacion: action.payload.autorizacion,
                autconyuge: action.payload.autconyuge,
            };
        case 'verificaciones':
            return {
                ...state,
                haSidoBeneficiario: action.payload.haSidoBeneficiario,
                acreditaBeneficio: action.payload.acreditaBeneficio,
                idAcreditacion: action.payload.idAcreditacion,
                numResolucion: action.payload.numResolucion,
                fechaAcreditacion: action.payload.fechaAcreditacion,
            }
        case 'reset':
            return initialFiso;
        default:
            return state;
    }

}