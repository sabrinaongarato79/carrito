let contenedorProductos = document.querySelector('#contenedorProductos');
let arregloCarrito = [];

let carrito = JSON.parse(localStorage.getItem('carrito'));

if(carrito){
    arregloCarrito = carrito;
}

for (let i = 0; i < productos.length; i++) {

    contenedorProductos.innerHTML += `
    
    <div class="producto">
        <div class="img-producto">
            <img src="${productos[i].imagen}" alt="">
        </div>
        <div class="info-producto">
            <h4>${productos[i].nombre}</h4>
            <p>${productos[i].descripcion}</p>
            <p class="precio">$${productos[i].precio}</p>
            <a href="#" class="btn-carrito" id="${productos[i].codigo}">Añadir al carrito</a>
        </div>
    </div>

    `;
    
}

let botonesCarrito = document.querySelectorAll('.btn-carrito');

for (let i = 0; i <  botonesCarrito.length; i++) {
    botonesCarrito[i].addEventListener('click', (e) => {
        e.preventDefault();

        let productoSeleccionado = productos.find( (element) =>{  return element.codigo == e.target.id; } );

        let productoRepetido = arregloCarrito.findIndex( (element) => { return element.codigo === productoSeleccionado.codigo} );


        if(productoRepetido != -1){
            alert('El producto ya se encuentra en su carrito');
        }else{
            arregloCarrito.push(productoSeleccionado);
            localStorage.setItem("carrito", JSON.stringify(arregloCarrito));
        }
        
    

    });
}


