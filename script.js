var cancion = null;
var id_antes = null;
SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
});

document.querySelector('.buscarCancion').addEventListener('submit', function(event) {
    event.preventDefault();
    console.log(event.target.busqueda.value);
    SC.get('/tracks', {
            q: event.target.busqueda.value
        })
        .then(function(res) {
            document.querySelector('.results').innerHTML = '';
            console.log(res)
            var cincocaratulas = res.slice(0, 5);
            for (let i = 0; i < cincocaratulas.length; i++) {
                const imagen = document.createElement('img')
                imagen.src = res[i].artwork_url == null ? imagen.src = "./nodisponible.jpg" : res[i].artwork_url
                imagen.id = res[i].id
                imagen.draggable = "true";
                imagen.ondragstart = function(ev) {
                    drag(ev)
                };
                imagen.classList.add('editor');
                document.querySelector('.results').append(imagen);

            }
        })
})

function allowDrop(ev) {
    ev.preventDefault();

    let imagenantes = document.querySelector('#player').src;
    if (player != null) {
        document.getElementById(id_antes).style.boxShadow = "6px 6px 0px #ccc";
    }

}

function drag(ev) {
    ev.dataTransfer.setData("identificador", ev.target.id);
    ev.dataTransfer.setData("srcCancion", ev.target.src);

    // ev.getElementsByClassName(".results").style.WebkitTransform = "rotate(20deg)";
    // ev.getElementsByClassName(".results").style.boxShadow = "10px 20px 30px rgb(95, 107, 110)" 

}


function drop(ev) {
    ev.preventDefault();
    ev.target.parentNode.style.backgroundImage = 'url(gifmusica.gif)';
    var identificador = ev.dataTransfer.getData("identificador");
    var srcCancion = ev.dataTransfer.getData("srcCancion");
    id_antes = identificador;
    ev.target.src = srcCancion;
    // document.getElementById(identificador).style.WebkitTransform = "rotate(360deg)";
    // document.getElementById(identificador).style.animation = "spin 3s";
    document.getElementById(identificador).style.boxShadow = "10px 20px 30px 12px rgba(0, 113, 131, 0.5) ";
    SC.stream('/tracks/' + identificador).then(function(player) {
        player.play();
        cancion = player;

    }).catch(function(error) {
        alert('Error : ' + error.message);
    });
}

function playPause(ev) {
    console.log(cancion, ev)
    if (!cancion.isPlaying()) {
        cancion.play();
    } else {
        cancion.pause();
    }
}

var modal = document.getElementById("miModal");

var botoncerrar = document.getElementById("modal");

// Para cerrar el modal
var span = document.getElementsByClassName("close")[0];

botoncerrar.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

//Click fuera del modal, volvera a nuestra aplicación SC
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}