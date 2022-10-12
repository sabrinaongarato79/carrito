let contenedorCarrito = document.querySelector('#carrito');
let spanTotal = document.querySelector('#spanTotal');
let arregloCarrito = [];
let carrito = JSON.parse(localStorage.getItem('carrito'));
let total = 0;
let contenedorTotal = document.querySelector('#contenedorTotal');

if(carrito){
    arregloCarrito = carrito;
    contenedorTotal.style.display = 'block';
}

for (let i = 0; i < arregloCarrito.length; i++) {
    contenedorCarrito.innerHTML += `
    <div class="producto">
        <div class="img-producto">
            <img src="${arregloCarrito[i].imagen}" alt="">
        </div>
        <div class="info-producto">
            <h4>${arregloCarrito[i].nombre}</h4>
            <p>${arregloCarrito[i].descripcion}</p>
            <p class="precio"> $<span class="precio-producto">${arregloCarrito[i].precio}</span></p>
            <div class="cantidad">
                <label for=""><b>Cantidad:</b></label>
                <input type="number" class="inputCantidad" min="1" max="${arregloCarrito[i].stock}" value="1">
            </div>
            <p>Subtotal:</p>
            <p class="precio"> $<span class="subtotal">${arregloCarrito[i].precio}</span></p>

            <a href="#" class="quitar" id="${arregloCarrito[i].codigo}">Quitar</a>
        </div>
    </div>
    `;
    total += arregloCarrito[i].precio;
}

spanTotal.textContent = total;

let inputsCantidad = document.querySelectorAll('.inputCantidad');
let precios = document.querySelectorAll('.precio-producto');
let btnQuitar = document.querySelectorAll('.quitar');

for (let i = 0; i < inputsCantidad.length; i++) {
    inputsCantidad[i].addEventListener('input', (e) => {

        if(e.target.value >= e.target.getAttribute('max')){
            alert('Stock maximo alcanzado');
        }
        
        let subtotal = e.target.parentNode.parentNode.querySelector('.subtotal');

        total -= parseFloat(subtotal.textContent);
        
        let precioSubtotal =  parseInt(e.target.value) * parseFloat(precios[i].textContent);

        total += precioSubtotal;

        subtotal.textContent = precioSubtotal;
        spanTotal.textContent = total;

        
    });

    btnQuitar[i].addEventListener('click',(e) => {
        e.preventDefault();
        e.target.parentNode.parentNode.remove();
        let subtotal = e.target.parentNode.parentNode.querySelector('.subtotal');

        let indice = arregloCarrito.findIndex( (element) => { return element.codigo == e.target.id});
        arregloCarrito.splice(indice, 1);
        localStorage.setItem('carrito', JSON.stringify(arregloCarrito));

        total -= parseFloat(subtotal.textContent);
        spanTotal.textContent = total;
    });
}

let btnComprar = document.querySelector('#comprar');

btnComprar.addEventListener('click', (e) => {
    e.preventDefault();
    contenedorCarrito.innerHTML = '<p class="msj-compra">Compra finalizada éxitosamente.</p>';
    contenedorTotal.remove();
    localStorage.clear();

});
