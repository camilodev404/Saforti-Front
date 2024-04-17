import { useReducer } from "react"
import { formReducer } from "../reducers/formReducer"


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
    beneficiarioRestitucion: null,
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

export const useFiso = () => {

    const [ solicitud, dispatch ] = useReducer(formReducer, initialFiso);

    const handlerInitialFiso = (formvalues) => {
        dispatch({
            type: 'formValues',
            payload: formvalues,
        });
    }

    const handlerId = (id) => {
        dispatch({
            type: 'id',
            payload: id,
        });
    }

    const handlerAuths = (auths) => {
        dispatch({
            type: 'autorizaciones',
            payload: auths,
        });
    }

    const handlerVerificacion = (verificaciones) => {
        dispatch({
            type: 'verificaciones',
            payload: verificaciones,
        });
    }

    const handlerForanea = (foran) => {
        dispatch({
            type: 'foranea',
            payload: foran,
        });
    }

    const handlerResetValuesForm = () => {
        dispatch({
            type: 'reset'
        });
    }

    const handlerFinalValues = (forms) => {
        console.log("AAAAAAAAAA", forms);
        dispatch({
            type: 'finalValues',
            payload: forms,
        });
    }

    return {
        solicitud,
        handlerInitialFiso,
        handlerId,
        handlerResetValuesForm,
        handlerAuths,
        handlerVerificacion,
        handlerForanea,
        handlerFinalValues,
    };

}