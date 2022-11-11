export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido",
    },
    password:{
        valueMissing: "El campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una mayúscula, una minúscula, un número y no puede contener catacteres especiales.",
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo número telefónico no puede estar vacío",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
    },
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento(input){ //Obtenemos el valor de la fecha ingresada
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad";
        //console.log(mensaje)
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return diferenciaFechas <= fechaActual;
}