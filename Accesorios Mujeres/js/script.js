// Se realiza una constante sobre las categorias disponibles
const categorias = ['joyeria', 'bolsos', 'gafas', 'sombreros', 'zapatos'];
// En esta linea se hace una descripcion de los productos por categoria
const productos = {
    joyeria: [
        { nombre: "Collar Elegante", precio: 55.000, imagen: "Acc.1.jpg" },
        { nombre: "Collar de Perlas", precio: 37.000, imagen: "Acc.2.jpg" },
        { nombre: "Anillo de Diamantes", precio: 120.000, imagen: "Acc.3.jpg" },
        { nombre: "Anillo Flor de Loto", precio: 32.500, imagen: "Acc.4.jpg" },
        { nombre: "Pulsera Pandora", precio: 100.000, imagen: "Acc.5.jpg" },
    ],
    bolsos: [
        { nombre: "Bolso de Mano", precio: 58.000, imagen: "Acc.6.jpg" },
        { nombre: "Bolso Cebra", precio: 49.000, imagen: "Acc.7.jpg" },
        { nombre: "Bolso Cartera Clutch", precio: 65.000, imagen: "Acc.8.jpg" },
    ],
    gafas: [
        { nombre: "Gafas de Lectura", precio: 45.000, imagen: "Acc.9.jpg" },
        { nombre: "Gafas de Sol", precio: 26.000, imagen: "Acc.10.jpg" },
        { nombre: "Gafas protectoras", precio: 50.000, imagen: "Acc.11.jpg" },
    ],
    sombreros: [
        { nombre: "Sombrero de Playa", precio: 62.000, imagen: "Acc.12.jpg" },
        { nombre: "Sombrero Pamela", precio: 73.000, imagen: "Acc.13.jpg" },
        { nombre: "Sombrero Capelina", precio: 39.99, imagen: "Acc.14.jpg" },
    ],
    zapatos: [
        { nombre: "Botines", precio: 105.000, imagen: "Acc.15.jpg" },
        { nombre: "Zapatos Casuales", precio: 65.000, imagen: "Acc.16.jpg" },
        { nombre: "Tacones", precio: 57.000, imagen: "Acc.17.jpg" },
    ],
};

//Se define un objeto constante donde representa el carrito de compras
const carrito = {
    totalPagar: 0,
    cantidadArticulos: 0,
    productos: [],
}; 
// Se define una funcion donde se maneja la opcion seleccionada en la barra de navegacion
function manejarOpcion(opcion) {
    switch (opcion) {
        // Casos para cada categoria de productos
        case 'joyeria':
        case 'bolsos':
        case 'gafas':
        case 'sombreros':
        case 'zapatos':
    // Llama a la funcion mostrarCategoria con la categoria seleccionada
            mostrarCategoria(opcion); 
            break; //Termina
        case 'salir':
    // Llama a la funcion salir para gestionar la salida de la tienda
            salir();
            break;
    }
}
//Funcion que muestra los productos de una categoria especifica
function mostrarCategoria(categoria) {
    // Obtiene el contenedor de productos por su ID
    const contenedorProductos = document.getElementById('contenedorProductos'); 
    contenedorProductos; // Muestra el contenedor de productos

    // Obtiene los productos de la categoria seleccionada
    const productosCategoria = productos[categoria];

    // Se crea un encabezado con el nombre de la categoria
    let html = `<h2>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h2>`;

    //Se itera sobre cada producto de la categoria
    for (const producto of productosCategoria) {
    //Genera el HTML para cada producto en la categoria
        html += `
            <div class="producto">
            <!-- Muestra la imagen del producto con la ruta especificada en la propiedad "imagen" del producto -->
                <img src="img/${producto.imagen}" alt="${producto.nombre}">

            <!-- Muestra el nombre del producto -->
                <p>${producto.nombre}</p>

            <!-- Muestra el precio del producto formateado como un valor monetario con dos decimales -->
                <p>Precio: $${producto.precio.toFixed(2)}</p>
                
            <!-- Agrega un boton con un evento onclick que llama a la funcion agregarAlCarrito con parámetros específicos -->
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
                <!-- En el HTML donde se muestra el producto en el carrito -->
                <button onclick="eliminarDelCarrito('${producto.nombre}', ${producto.precio})">Eliminar del Carrito</button>
            </div>
        `;
    }
// Inserta el HTML generado en el contenedor de productos
    contenedorProductos.innerHTML = html;
}
// Funcion que maneja la salida de la tienda
function salir() {
    // aca generamos un mensaje de despedida
    alert('Gracias por visitar nuestra tienda. ¡Hasta luego!');
    // Llama a la funcion reiniciarCarrito para restablecer el carrito
    reiniciarCarrito();
    //Redirige al usuario a la pagina de inicio
    window.location.href = "index.html";
}

// Funcion que nos permite agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    // Agrega el producto al array de productos en el carrito
    carrito.productos.push({ nombre, precio });
    // Aumenta el total a pagar
    carrito.totalPagar += precio;
    // Aumenta la cantidad de articulos en el carrito
    carrito.cantidadArticulos++;

// Llama a la funcion actualizarCarrito para reflejar los cambios en la interfaz
    actualizarCarrito();
}

// Funcion que nos actualiza la informacion del carrito en la interfaz
function actualizarCarrito() {
// Obtiene el elemento que muestra el total a pagar
    const totalPagarElement = document.getElementById('totalPagar');
// Obtiene el elemento que muestra la cantidad de articulos
    const cantidadArticulosElement = document.getElementById('cantidadArticulos');
    
    totalPagarElement.textContent = carrito.totalPagar.toFixed(2);
    cantidadArticulosElement.textContent = carrito.cantidadArticulos;

}
// Funcion de la cual reinicia el carrito
function reiniciarCarrito() {
 // Restablece los valores del carrito a cero
    carrito.totalPagar = 0;
    carrito.cantidadArticulos = 0;
    carrito.productos = [];
// Llama a la funcion actualizarCarrito para reflejar los cambios en la interfaz
    actualizarCarrito();
}
// Funcion para mostrar los detalles del carrito
function mostrarDetallesCarrito() {
    let detalles = "Detalles del Carrito:\n";
    for (const producto of carrito.productos) {
        detalles += `${producto.nombre} - Precio: $${producto.precio.toFixed(2)}\n`;
    }
    detalles += `\nTotal a Pagar: $${carrito.totalPagar.toFixed(2)}\nCantidad de Articulos: ${carrito.cantidadArticulos}`;
    alert(detalles);
}

function eliminarDelCarrito(nombre, precio) {
    const index = carrito.productos.findIndex(producto => producto.nombre === nombre && producto.precio === precio);
    // Verifica si el producto esta en el carrito
    if (index !== -1) {
        // Elimina el producto del array de productos en el carrito
        carrito.productos.splice(index, 1);
    // Agrega el producto al array de productos en el carrito
    // Aumenta el total a pagar
    carrito.totalPagar -= precio;
    // Aumenta la cantidad de articulos en el carrito
    carrito.cantidadArticulos--;
    // Llama a la funcion actualizarCarrito para reflejar los cambios en la interfaz
    actualizarCarrito();
}
}