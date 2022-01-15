//MAIN
completarListas();
/*$.get("js/data/src_data.json",function(respuesta,estado)
{
    console.log(respuesta);
    console.log(estado);
});*/
if('arrayProces' in localStorage)
{
    listaProcesadores = JSON.parse(localStorage.getItem('arrayProces').split(','));
}
localStorage.setItem('arrayProces',JSON.stringify(listaProcesadores));
if('arrayGraficas' in localStorage)
{
    listaGraficas = JSON.parse(localStorage.getItem('arrayGraficas').split(','));
}
localStorage.setItem('arrayGraficas',JSON.stringify(listaGraficas));
if('arrayMothers' in localStorage)
{
    listaMotherboards = JSON.parse(localStorage.getItem('arrayMothers').split(','));
}
localStorage.setItem('arrayMothers',JSON.stringify(listaMotherboards));
completarEspacios();
rellenarCarrito();


$(window).on('load',function (){
    $('#espera').remove()
    })

let botones = $('.btn-compra');
for (const boton of botones) {
    boton.onclick = addCarrito;
}

$("#clearCarrito").click(eliminarCarrito);

