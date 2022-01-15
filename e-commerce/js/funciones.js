//FUNCTIONS 


let listaProcesadores = [];
let listaGraficas = [];
let listaMotherboards = [];

function agregarProductos(entrada,categoria)
{
        switch(categoria)
        {
            case 1: 
            {
                if('arrayProces' in localStorage)
                {
                    listaProcesadores = JSON.parse(localStorage.getItem('arrayProces').split(','));
                }
                listaProcesadores.push(entrada);
                localStorage.setItem('arrayProces',JSON.stringify(listaProcesadores));
                break;
            }
            case 2:
            {
                if('arrayGraficas' in localStorage)
                {
                    listaGraficas = JSON.parse(localStorage.getItem('arrayGraficas').split(','));
                }
                listaGraficas.push(entrada);
                localStorage.setItem('arrayGraficas',JSON.stringify(listaGraficas));
                break;
            }
            case 3:
            {
                if('arrayMothers' in localStorage)
                {
                    listaMotherboards = JSON.parse(localStorage.getItem('arrayMothers').split(','));
                }
                listaMotherboards.push(entrada);
                localStorage.setItem('arrayMothers',JSON.stringify(listaMotherboards));
                break;
            }
        }
}

function completarListas()
{
    let procesadores = [{nombre: "Ryzen 5",precio: 20000,cod: 1,img:"js/imagenes/rzn5.jpg",cantidad:1},
                    {nombre: "Ryzen 7",precio: 35000,cod: 2,img:"js/imagenes/rzn7.jpg",cantidad:1},
                    {nombre: "Ryzen 9",precio: 50000,cod: 3,img:"js/imagenes/rzn9.jpg",cantidad:1}];
    
    let graficas = [{nombre: "GTX - 1660",precio: 100000,cod:4,img:"js/imagenes/1660.jpg",cantidad:1},
                    {nombre: "RTX - 2060",precio: 190000,cod:5,img:"js/imagenes/2070.jpg",cantidad:1},
                    {nombre: "RX - 580",precio: 100000,cod:6.,img:"js/imagenes/rx580.jpg",cantidad:1}];

    let motherboards = [{nombre: "Gigabyte - H510m",precio: 10000,cod:7,img:"js/imagenes/h510.jpg",cantidad:1},
                        {nombre: "ASUS - A320m",precio: 8000,cod: 8,img:"js/imagenes/a320.jpg",cantidad:1},
                        {nombre: "MSI - B460m",precio: 13000,cod:9,img:"js/imagenes/b460.jpg",cantidad:1}];

    for(const productoP of procesadores)
    {
        listaProcesadores.push(productoP);
    }
    
    for(const productoG of graficas)
    {
        listaGraficas.push(productoG);
    }

    for(const productoM of motherboards)
    {
        listaMotherboards.push(productoM);
    }
}

function completarEspacios()
{
    for (const procesador of listaProcesadores) {
        $('#procesadores').prepend(`<div class="card" style="width: 18rem;">
                                    <img src='${procesador.img}'class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${procesador.nombre}</h5>
                                    <p class="card-text">Precio: $${procesador.precio}</p>
                                    <a href="#" id ="${procesador.cod}"class="btn btn-primary btn-compra">Agregar <i class="fas fa-cart-plus"></i></a>
                                    </div>
                                </div>`);
    }
    for (const grafica of listaGraficas) {
        $('#graficas').prepend(`<div class="card" style="width: 18rem;">
                                <img src='${grafica.img}' class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${grafica.nombre}</h5>
                                <p class="card-text">Precio: $${grafica.precio}</p>
                                <a href="#" id = "${grafica.cod}" class="btn btn-primary btn-compra">Agregar <i class="fas fa-cart-plus"></i></a>
                                </div>
                            </div>`);
    }
    for (const motherboard of listaMotherboards) {
        $('#motherboards').prepend(`<div class="card" style="width: 18rem;">
                                    <img src='${motherboard.img}' class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${motherboard.nombre}</h5>
                                    <p class="card-text">Precio: $${motherboard.precio}</p>
                                    <a href="#" id="${motherboard.cod}" class="btn btn-primary btn-compra">Agregar <i class="fas fa-cart-plus"></i></a>
                                    </div>
                                </div>`);
    }
}
function pickForm()
{
    let formulario = document.getElementById("addProd");
    formulario.addEventListener("submit",clasificarDatos);
}

function clasificarDatos(e)
{
    e.preventDefault();
    let nombreProducto = document.getElementById("prod").value;
    let categoriaProducto = parseInt(document.getElementById("categoria").value);
    let precioProducto = parseFloat(document.getElementById("precio").value);
    let codProducto = document.getElementById("cod").value;
    let productoRecibido = new Producto (nombreProducto,precioProducto,codProducto);
    agregarProductos(productoRecibido,categoriaProducto);
    $('#prodSucces').append(`<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Producto Agregado!</strong> Vuelve a la pagina principal para verlo en el listado.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`);
}

function addCarrito(e)
{
    e.preventDefault();
    let idProd = e.target.id;
    //Recorro los 3 arrays de productos (puede que esta no sea una forma eficiente de buscar los productos pero es la unica que se me ocurre)
    let seleccionado = listaProcesadores.find(producto => producto.cod == idProd);
    if(seleccionado == undefined)
    {
        seleccionado = listaGraficas.find(producto => producto.cod == idProd);
    }
    if(seleccionado == undefined)
    {
        seleccionado = listaMotherboards.find(producto => producto.cod == idProd);
    }
    guardarCarrito(seleccionado);
    interfazCarrito(carrito);
}

function interfazCarrito(lista)
{
        $('#carrito').empty();
        for (const producto of lista) {
            $('#carrito').prepend(`<p>${producto.nombre} - $${producto.precio}</p>`); 
        }
        $('#carrito').append("<button id='confirmaCompra' type='button' class='btn btn-dark'>Comprar</button>");
}


function rellenarCarrito()
{
    if('arrayCarrito' in localStorage)
    {
        $('#carrito').empty();
        lista = JSON.parse(localStorage.getItem('arrayCarrito').split(','));
        for (const producto of lista) {
            $('#carrito').prepend(`<p>${producto.nombre} - $${producto.precio}</p>`);    
        }
        $('#carrito').append("<button id='confirmaCompra' type='button' class='btn btn-dark'>Comprar</button>");
    }
    else
    {
        $('#carrito').append("<p class='emptyCart'>Carrito Vacio :C</p>");
    }
    $('#confirmaCompra').click(postCompra);
}

function guardarCarrito(entrada)
{
    let esRepetido = false;
    if('arrayCarrito' in localStorage)
    {
        carrito = JSON.parse(localStorage.getItem('arrayCarrito').split(','));
    }
    for (const produ of carrito) {
        if(entrada.nombre == produ.nombre)
        {
            console.log("El producto esta en el carrito");
            esRepetido = true;
            produ.sumarCantidad;
            console.log(produ.subTotal);
             break;
        }
    }
    if(esRepetido == false)
    {
        carrito.push(entrada);
    }
    localStorage.setItem('arrayCarrito',JSON.stringify(carrito));
}

function eliminarCarrito()
{
    carrito.splice(0,carrito.length);
    localStorage.removeItem('arrayCarrito');
    $('#carrito').empty();
    $('#carrito').append("<p class='emptyCart'>Carrito Vacio :C</p>");
    Swal.fire({
        title: 'Desea eliminar el carrito?',
        text: "Perdera todos los productos seleccionados",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText:'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
              icon: 'success',
              title: "Carrito Eliminado"
          }
          )
        }
    });
}

function getJSON()
{
    $.get("data/src_data.json",function(respuesta,estado){
        console.log(respuesta);
        console.log(estado)
    })
}

function postCompra()
{
    $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(respuesta,estado)
    {
        if(estado == 'success')
        {
            console.log("Carrito Posteado");
            $('#carrito').empty();
            localStorage.removeItem('arrayCarrito');
            carrito.splice(0,carrito.length);
            Swal.fire({
                icon: 'success',
                title: 'Compra Realizada!'
            });
            $('#carrito').append("<p class='emptyCart'>Carrito Vacio :C</p>");
        }
    });
}