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
}


function drag(ev) {
    ev.dataTransfer.setData("identificador", ev.target.id);
    ev.dataTransfer.setData("srcCancion", ev.target.src);
}


function drop(ev) {
    ev.preventDefault();
    ev.target.parentNode.style.backgroundImage = 'url(gifmusica.gif)';
    var identificador = ev.dataTransfer.getData("identificador");
    var srcCancion = ev.dataTransfer.getData("srcCancion");

    ev.target.src = srcCancion;

    SC.stream('/tracks/' + identificador).then(function(player) {
        player.play();
    }).catch(function(error) {
        alert('Error : ' + error.message);
    });

}

// var button = document.getElementById("button");
// var identificador = document.getElementById("identificador");

// button.addEventListener("click", function() {
//     if (identificador.paused) {
//         identificador.play();
//         button.innerHTML = "Pause";
//     } else {
//         audio.pause();
//         button.innerHTML = "Play";
//     }
// });

function playPause(ev) {
    var identificador = ev.dataTransfer.getData("identificador");
    SC.stream('/tracks/' + identificador).then(function(player) {
        player.pause();
    });
}
// function playPause(ev) {
//     var identificador = ev.dataTransfer.getData("identificador");

//     SC.stream('/tracks/' + identificador).then(function(player) {
//         player.pause();
//     })};