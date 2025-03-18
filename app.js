// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
function asignarTextoElemento(elementoSelector, texto) {
    let elementoHTML = document.querySelector(elementoSelector);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    } else {
        console.error(`No se encontró el elemento con el selector: ${elementoSelector}`);
    }
}

// Establecer los textos iniciales
asignarTextoElemento('.main-title', 'Juego Del Amigo Secreto');
asignarTextoElemento('.section-title', 'Agrege el nombre de sus amigos');

let amigos = [];
let ganadores = new Set();
let ultimoGanador = null;

// funcion para agregar participante con boton "Enter"
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarParticipante();
    }
});

function agregarParticipante() {
    let participante = document.getElementById('amigo').value.trim();
    const participanteLower = participante.toLowerCase();
    if (participanteLower === "") {
        alert("Por favor, inserte un nombre.");
        return;
    } else if (amigos.map(amigo => amigo.toLowerCase()).includes(participanteLower)) {
        alert("Este Nombre ya fue Ingresado");
        return;
    } else {
        amigos.push(participante);
        document.getElementById('amigo').value = "";
        mostrarAmigosDeLista();
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos dos amigos para sortear.");
        return;
    }
    if (ganadores.size === amigos.length) {
        alert("Ya todos fueron ganadores.");
        return;
    }

    let posiblesAmigos = amigos.filter(amigo => !ganadores.has(amigo) && amigo !== ultimoGanador);

    if (posiblesAmigos.length === 0) {
        posiblesAmigos = amigos.filter(amigo => !ganadores.has(amigo));
        if (posiblesAmigos.length === 0) {
            alert("No se pudo realizar un nuevo sorteo.");
            return;
        }
    }

    let indiceAleatorio = Math.floor(Math.random() * posiblesAmigos.length);
    let amigoSecreto = posiblesAmigos[indiceAleatorio];

    document.getElementById('resultado').innerHTML = `Tu amigo secreto es: ${amigoSecreto}`;
    ultimoGanador = amigoSecreto;
    ganadores.add(amigoSecreto);
    return amigoSecreto;
}

function mostrarAmigosDeLista() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    amigos.forEach((amigo, index) => {
        let elementoLI = document.createElement('li');
        elementoLI.textContent = amigo;

        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('boton-eliminar'); // Agrega esta línea
        botonEliminar.addEventListener('click', () => eliminarParticipante(index));

        elementoLI.appendChild(botonEliminar);
        lista.appendChild(elementoLI);
    });

    if (amigos.length > 3) {
        lista.classList.add('scrollable');
    } else {
        lista.classList.remove('scrollable');
    }
}

function eliminarParticipante(indice) {
    amigos.splice(indice, 1);
    mostrarAmigosDeLista();
    ganadores.delete(amigos[indice]); // Eliminar si ya había ganado
    if (ultimoGanador === amigos[indice]) {
        ultimoGanador = null;
    }
}

function reiniciar() {
    amigos = [];
    ganadores.clear();
    ultimoGanador = null;
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    lista.classList.remove('scrollable');
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('amigo').value = '';
}
