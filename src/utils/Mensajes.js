import swal from 'sweetalert';

export const mensajeAlerta = () => {
    
    const showAlert = (titulo,tipoTensaje, mensaje ) => {
        swal({
            title: titulo,
            text: mensaje,
            icon: tipoTensaje===true?"success":"error",
            buttons: {
                cancel: {
                    text: "Cerrar",
                    value: true,
                    visible: true,
                    className: tipoTensaje==="OK"?"btn btn-primary":"btn btn-danger",
                    closeModal: true,

                }
            }
        });
    }
    return [showAlert];
}