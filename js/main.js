const arrayPersonajes = [
    {
        nombre: "abra",
        rutaImagen: "img/abra.png"
    },
    {
        nombre: "bullbasaur",
        rutaImagen: "img/bullbasaur.png"
    },
    {
        nombre: "charmander",
        rutaImagen: "img/charmander.png"
    },
    {
        nombre: "dratini",
        rutaImagen: "img/dratini.png"
    },
    {
        nombre: "eevee",
        rutaImagen: "img/eevee.png"
    },
    {
        nombre: "jigglypuff",
        rutaImagen: "img/jigglypuff.png"
    },
    {
        nombre: "mankey",
        rutaImagen: "img/mankey.png"
    },
    {
        nombre: "meowth",
        rutaImagen: "img/meowth.png"
    },
    {
        nombre: "pidgey",
        rutaImagen: "img/pidgey.png"
    },
    {
        nombre: "pikachu-2",
        rutaImagen: "img/pikachu-2.png"
    },
    {
        nombre: "psyduck",
        rutaImagen: "img/psyduck.png"
    },
    {
        nombre: "squirtle",
        rutaImagen: "img/squirtle.png"
    } 
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const ganador = document.getElementById("ganador");
const btnInicio = document.getElementById("inicio");
const reloj = document.getElementById("reloj");
const cartelGameOver = document.getElementById("game-over"); // Creamos el objeto aquí en JavaScript y ...
                                    // ... metemos el elemento de game-over.

// const de los audios
const bounce = document.getElementById("bounce");
const clic = document.getElementById("clic");
const fail = document.getElementById("fail");
const song = document.getElementById("song");
const winner = document.getElementById("winner");

var contador = 0;
var primerSeleccionado = "";
var segundoSeleccionado = "";
var selPrevio = null;
var eliminados = 0;

// Creación de clase rejilla y divs para cada personaje a partir de array

rejilla.setAttribute("class","rejilla");
game.appendChild(rejilla);

function baraja() {

    // Quitamos esta constante que estaba más arriba debajo de const ganador... y la ponemos aquí
    const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(()=> 0.5 - Math.random());

    doblePersonajes.forEach(personaje => {
        const { nombre, rutaImagen } = personaje;
        tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.name = nombre;

        anverso = document.createElement("div");
        anverso.classList.add("anverso");

        reverso = document.createElement("div");
        reverso.classList.add("reverso");
        reverso.style.backgroundImage = `url(${rutaImagen})`;

        rejilla.appendChild(tarjeta);
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
    });
    rejilla.classList.remove("fuera");
    btnInicio.style.display = "none"; // el btnInicio lo cogemos de arriba de cuando hemos creado...
    reloj.style.display ="initial";                                       // ... la constante.
    cartelGameOver.style.opacity = "0";
    eliminados = 0;
    ganador.classList.remove("open"); // Para poner la imagen
    // La propiedad currentTime establece o devuelve la posición actual (en segundos) de la reproducción de audio / video...
    // ... Al establecer esta propiedad, la reproducción saltará a la posición especificada.
    song.currentTime = 0 // Por si viene de haberla reproducido
    song.play();
    song.volume = 0.5;
}

// Función de reloj cuenta atrás
var segundos = 20

function cuentaAtras(){
    var s = parseInt( segundos % 60);
    var ss = ("0" + s).slice(-2); // Para poner los dos dígitos
    var m = parseInt( segundos / 60 );
    var mm = ("0" + m).slice(-2);
    reloj.innerHTML = mm + ":" + ss;

    if (eliminados === 2) {
        return;
    }

    if( segundos > 0) {
        var t = setTimeout(function(){
            cuentaAtras(); // Recursividad (Se llama a sí misma desde dentro y puede dar algún problema de rendimiento)
        }, 1000);
    } else {
        gameOver(); // a GameOver llega cuando llega a 0
    }
    segundos--;
}

// Función para ejecutar la lógica de Game Over
  // escribimos todo lo que se necesita para cuando haya un Game Over

function gameOver() {
    segundos = 20;
    rejilla.classList.add("fuera"); // classList.add añade las clases indicadas.
    btnInicio.style.display = "initial"; // el btnInicio lo cogemos de arriba de cuando hemos creado...
    reloj.style.display ="none";
    cartelGameOver.style.opacity = "1";
    fail.currentTime = 0;
    fail.play();
    song.pause();
    setTimeout(function(){ //setTimeout espera una función, una coma, y el tiempo que queremos para esa función.
        while (rejilla.firstChild) {
            rejilla.removeChild(rejilla.firstChild); // Pone en funcionamiento esta función "while"
        }
    },1000);     
}

// Lógica para el evento de click de selección de cada personaje

rejilla.addEventListener("click", function(evento){
    var seleccionado = evento.target;

    if (seleccionado.nodeName === "SECTION" || 
        seleccionado.parentNode === selPrevio ||
        seleccionado.parentNode.classList.contains("eliminado")) {
        return;
    }

    clic.currentTime = 0;
    clic.play();

    if (contador < 2) {
        contador++;
        if (contador === 1) {
            primerSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
            selPrevio = seleccionado.parentNode;
        } else {
            segundoSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        }

        if (primerSeleccionado !== "" && segundoSeleccionado !== "") {
            if (primerSeleccionado === segundoSeleccionado) {
                setTimeout(eliminar, 1200);
                setTimeout(resetSelec, 1200);
                contEliminados();
            } else {
                setTimeout(resetSelec, 1200);
                selPrevio = null;
            }
        } 
        // selPrevio = seleccionado.parentNode;
    }
});

// Función para asignar la clase eliminado cuando existan dos coincidencias

var eliminar = function () {
    var eliminados = document.querySelectorAll(".seleccionado");
    bounce.currentTime = 0;
    bounce.play(); // Para cuando se apaguen.
    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado");
    });
}

// Función para resetear los seleccionados cuando no coincidan

var resetSelec = function () {
    primerSeleccionado = "";
    segundoSeleccionado = "";
    contador = 0;

    var seleccionados = document.querySelectorAll(".seleccionado");
    seleccionados.forEach(seleccionado => {
        seleccionado.classList.remove("seleccionado");
    });
}

// Función para contar los eliminados y determinar cuando acaba el juego con éxito

var contEliminados = function () {
    eliminados = document.querySelectorAll(".eliminado").length + 2;
    if (eliminados === 2) {
        
        segundos = 20;
        rejilla.classList.add("fuera"); // classList.add añade las clases indicadas.
        btnInicio.style.display = "initial"; // el btnInicio lo cogemos de arriba de cuando hemos creado...
        reloj.style.display ="none";
        song.pause(); // Para que se apague la canción y suene la de winner
        setTimeout(function(){
            ganador.classList.add("open"); // Para poner la imagen
            winner.currentTime = 0; // Para que no se crucen los sonidos del final al ganar.
            winner.play();
        },1500);
        setTimeout(function(){ //setTimeout espera una función, una coma, y el tiempo que queremos para esa función.
            while (rejilla.firstChild) {
                rejilla.removeChild(rejilla.firstChild); // Pone en funcionamiento esta función "while"
            }
        },1000);  
    }
}