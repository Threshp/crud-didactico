let datos = JSON.parse(localStorage.getItem("productos")) || []
const productos = document.getElementById("productos")
const total = document.getElementById("total")
const nombreProducto = document.getElementById("nombre-producto")
const precio = document.getElementById("precio")
const categoria = document.getElementById("categoria")
const estado = document.getElementById("estado")
const btnFormAdd = document.getElementById("btn-form-add")
const btnFormEdit = document.getElementById("btn-form-edit")
const toggle = document.querySelector(".contenedor-form")
const btnAdd = document.querySelector(".btn-add")
const acept = document.querySelector(".acept")
const contenedor = document.querySelector(".contenedor-acept")
const btnBuscar = document.querySelector(".btn-busqueda")
const input = document.getElementById("input-busqueda")

let productoEditando = null;
let idProductoEliminar = null;
let countId = datos.length? Math.max(...datos.map(producto => Number(producto.id)))+1:1;

btnFormAdd.addEventListener("click", ()=>{
    const precioValor = Number(precio.value);
    if(nombreProducto.value =="" || precio.value.trim() === ""|| !Number.isFinite(precioValor)|| precioValor >= 0){
        alert("complete el formulario")
        return;
    }else{
        datos.push({id: countId, nombre:nombreProducto.value, precio:precio.value, categoria:categoria.value, estado:estado.value})
        localStorage.setItem("productos", JSON.stringify(datos))
        agregarProductos({id: countId, nombre:nombreProducto.value, precio:precio.value, categoria:categoria.value, estado:estado.value})
        toggle.style.display="none"
        countId++;
        nombreProducto.value = ""
        precio.value =""
        return;
    }
})
btnFormEdit.style.display= "none"
btnAdd.addEventListener("click",()=>{
    toggle.style.display="block"
})
acept.addEventListener("click", (event)=>{
    if(event.target.classList.contains("cancelar")){
        contenedor.style.display = "none"
    }
    if(event.target.classList.contains("eliminar")){
       
        console.log(idProductoEliminar)
        datos = datos.filter(dato => dato.id !== idProductoEliminar);
        console.log(datos)
        localStorage.setItem("productos", JSON.stringify(datos));

        productos.innerHTML = "";
        datos.forEach(producto => agregarProductos(producto));
        contenedor.style.display = "none"
    }
    
})
productos.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-editar")) {
        editarProducto(event.target.dataset.id);
        btnFormEdit.style.display= "block";
        btnFormAdd.style.display= "none";
        toggle.style.display="block"
    }


    if (event.target.classList.contains("btn-eliminar")) {
        idProductoEliminar = Number(event.target.dataset.id);
        contenedor.style.display ="block"
        
}
    
});

btnBuscar.addEventListener("click", (event)=>{
    if(!input) return;
    busqueda(datos, input.value)
})

function busqueda (datos, input) {
    if(!input)return;
    const productoEncontrado = datos.filter(dato => dato.nombre.toLowerCase().includes(input.toLowerCase().trim()))
    productos.innerHTML=""
    console.log(productoEncontrado)
    productoEncontrado.forEach(dato =>{
        agregarProductos(dato)
    })
}
function agregarProductos(datos) {

    const tr = document.createElement("tr")
    const img = document.createElement("img")
    const tdNombre = document.createElement("td")
    const tdPrecio = document.createElement("td")
    const tdCategoria = document.createElement("td")
    const tdEstado = document.createElement("td")
    const tdImg = document.createElement("td")
    const tdBtn = document.createElement("td")
    const btnEliminar = document.createElement("button")
    const btnEditar = document.createElement("button")

    img.setAttribute("src", "img/ChatGPT Image 21 sept 2026, 12_13_06.png")
    tdNombre.textContent= datos.nombre
    tdPrecio.textContent = datos.precio
    tdCategoria.textContent = datos.categoria
    tdEstado.textContent = datos.estado
    btnEditar.setAttribute("class", "btn-editar")
    btnEliminar.setAttribute("class", "btn-eliminar")
    btnEliminar.setAttribute("data-id", datos.id)
    btnEditar.setAttribute("data-id", datos.id)
    btnEliminar.textContent="Eliminar"
    btnEditar.textContent= "Editar"
    tdImg.appendChild(img)
    tr.appendChild(tdImg)
    tr.appendChild(tdNombre)
    tr.appendChild(tdPrecio)
    tr.appendChild(tdCategoria)
    tr.appendChild(tdEstado)
    tdBtn.appendChild(btnEditar)
    tdBtn.appendChild(btnEliminar)
    tr.appendChild(tdBtn)
    productos.appendChild(tr)
    
}


function editarProducto(id) {
    productoEditando = datos.find(dato=> dato.id == id )
    console.log(productoEditando)
    if(!productoEditando) return;
    nombreProducto.value = productoEditando.nombre
    precio.value = productoEditando.precio
    categoria.value = productoEditando.categoria
    estado.value = productoEditando.estado
       
}
btnFormEdit.addEventListener("click", () => {
    if (!productoEditando) return;

    productoEditando.nombre = nombreProducto.value;
    productoEditando.precio = precio.value;
    productoEditando.categoria = categoria.value;
    productoEditando.estado = estado.value;

    localStorage.setItem("productos", JSON.stringify(datos));

    productos.innerHTML = "";
    datos.forEach(producto => agregarProductos(producto));

    btnFormEdit.style.display = "none";
    btnFormAdd.style.display = "block";
    toggle.style.display = "none";

    productoEditando = null;
});

document.addEventListener("DOMContentLoaded", ()=>{
    productos.innerHTML = "";

    datos.forEach(element => {
        agregarProductos(element)
    });
})