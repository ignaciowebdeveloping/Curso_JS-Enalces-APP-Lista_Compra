// (1)Definición de variables
const articulo = document.getElementById("articulo");
const cantidad = document.querySelector("#cantidad");
const prioridad = document.querySelector("#prioridad");
const agregar = document.querySelector("#agregar");
const formulario = document.querySelector("#formulario");
const listaCompra = document.querySelector("#listacompra");
let listado = []; //El let sirve para hacer constante una variable en un mismo ámbito

//(2) Definición de funciones
function comprobarInput() {
  console.log(`Input: ${articulo.value} - ${articulo.value.length}`);
  if (articulo.value.length === 0) {
    agregar.disabled = true;
  } else {
    agregar.disabled = false;
  }
} // Que sería lo mismo que  agregar-disabled = articulo.value.length === 0;

const eliminarElemento = identificador => {
  //Se encarga de eliminar el articulo con un condicional
  // hecho por un for que recorre el array y lo elimina con un splice añadiendo seguidamente el
  // local Storage, para que lo borre del almacenamiento del navegador
  // y el mostrar lista para que lo borre del body
  let posicion;
  for (let j = 0; j < listado.length; j++) {
    if (listado[j].id === identificador) {
      posicion = j;
    }
  }
  listado.splice(posicion, 1);
  localStorage.setItem("listado", JSON.stringify(listado));
  mostrarLista();
};

const actuar = e => {
  //Estaconstante sirve para que el evento e encuentre el path exacto de la papelera con su propio ID
  //y luego compruebas que el innerHTML sea el delete
  if (e.target.innerHTML.trim() === "delete") {
    //el trim limpia espacios en blanco
    console.log(e.path[1].children[4].innerHTML);
    eliminarElemento(e.path[1].children[4].innerHTML); //Hace que se elimine el artículo
  } //No hace falta else porque solo quiero que me detecte la papelera
  console.log(e);
  if (e.target.innerHTML.trim() === "euro") {
    console.log(e.target.id);
    console.log(document.getElementById(e.target.id)style.color);
  }

};

const inicializar = () => {
  comprobarInput(); //comprobar el input para habilitar el boton
  if (localStorage.getItem("listado") == null) {
    listado = [];
  } else {
    listado = JSON.parse(localStorage.getItem("listado")); //Coge el array de la consola/aplication guardada y lo traducimos de string a array
  }
  mostrarLista(); //Coge lo que hay en la lista de la compra y lo muestra
};

function crearLista(art, cant, pri) {
  let elemento = {
    articulo: art,
    cantidad: cant,
    prioridad: pri,
    estado: false,
    id: Math.random()
      .toString()
      .substring(2, 9)
  };
  listado.push(elemento);
  console.log(listado);
}

const mostrarLista = () => {
  listaCompra.innerHTML = "";
  if (listado.length === 0) {
    listaCompra.innerHTML = /*html*/ `<div class="alert alert-danger">
    <i class="material-icons align-middle">list</i> No hay artículos que comprar
      </div>`;
  } else {
    for (let i = 0; i < listado.length; i++) {
      listaCompra.innerHTML += /*html*/ `<div class="alert alert-succes" style="background-color: gold">
    <i class="material-icons align-middle">list</i>
    <b class="text-uppercase">${listado[i].articulo}</b> 
    <span class="badge badge-primary" style="font-size: 1.2em;">${
      listado[i].cantidad
    }</span>
    <span style="padding: 10px; background-color: orange; border-radius: 10%;">${
      listado[i].prioridad
    }</span>
    <span id="identificador" style="display: none">${listado[i].id}</span>
    <i id="euro"class="material-icons float-right align-middle" style="color: green; cursor: pointer;">euro_symbol</i>
    <i class="material-icons float-right align-middle"style="font-size: 1.5em; cursor: pointer;">delete</i></div>`;
    }
  }
};

const agregarArticulo = e => {
  e.preventDefault(); // prevent default hace que la función de button de recargar página se anule, que proviene del HTML
  crearLista(articulo.value, cantidad.value, prioridad.value);
  localStorage.setItem("listado", JSON.stringify(listado)); //localSotrage hace que se almacene el artículo en la web, en applicatipn.
  //Le pasamos un array, el array de listado con sus 3 objetos, pero como solo lo lee en string hay que añadirle la funcion JSON.stringify(Array o objeto)
  mostrarLista();
  formulario.reset();
  comprobarInput();
};

//(3) Definición de eventos
document.addEventListener("DOMContentLoaded", inicializar); // El DOMContentLoaded hace que no se ejecute JavaScript hasta que se haya cargado todo el HTML
articulo.addEventListener("keyup", comprobarInput);
agregar.addEventListener("click", agregarArticulo);
listaCompra.addEventListener("click", actuar);
