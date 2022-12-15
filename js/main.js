//Campo producto - Name
//Campo 

//Vamos ir por una tabla
//campo cantidad- number
//boton agregar 
//alertValidacionesTexto
//alertValidaciones
//contadorProductos
//productosTotal
//precioTotal
let contadorProductos = document.getElementById("contadorProductos");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("precioTotal");
let alertValidaciones = document.getElementById("alertValidaciones");
let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
let idTimeout;
let contador =0;
let precio = 0;
let costoTotal =0;
let cantidad = 0;
let totalEnProductos =0;
let precioTotal =  document.getElementById("precioTotal");
let productosTotal = document.getElementById("productosTotal");
// alertError.style.display="none";
// alertError.innerHTML="";

let btnAgregar = document.getElementById("btnAgregar");
//genera un precio al azar
function getPrecio(){
 return  Math.floor(Math.random() * 50 *100)/100; //se divide en 100 para los decimales
}
function validarNombre(){
    return(txtNombre.value.length>2)?true:false; //if ternario 
}
function validarCantidad(){
    if((txtNumber.value.length==0) || (isNaN(txtNumber.value))||(parseFloat(txtNumber.value)<=0)){
        return false;}
    return true;} 
   

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    clearTimeout(idTimeout);
    alertValidacionesTexto.innerHTML="";
if((! validarNombre() || ! validarCantidad())){
    let lista="Los campos deben llenarse correctamente.<ul>";
    if (!validarNombre()){
        txtNombre.style.border = "red thin solid";
        lista += " <li> Se debe escribir una cantidad válida </li>";   
    }
    if (! validarCantidad()){
        txtNumber.style.border = "red thin solid";
        lista += "<li> Se debe escribir una cantidad válida </li>";
    }
lista += "</ul>";
alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
alertValidaciones.style.display="block";
idTimeout = setTimeout (function(){
    alertValidaciones.style.display="none";
}, 5000);
return false;//interrumpe la función;
}
txtNombre.style.border="";
txtNumber.style.border="";
alertValidaciones.style.display="none";
contador++;
contadorProductos.innerHTML= contador;
cantidad = parseFloat(txtNumber.value);
totalEnProductos += cantidad; 
productosTotal.innerHTML =totalEnProductos;
precio = getPrecio();
costoTotal += precio * cantidad;
precioTotal.innerHTML = "$" + costoTotal.toFixed(2);
// se realiza la tabla para agregar los archivos productos
let row = `<tr>
     <td>${contador}</td>
     <td>${txtNombre.value}</td>
     <td>${txtNumber.value}</td>
     <td>${precio}</td>
</tr>`
cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
txtNombre.value= "";
txtNumber.value="";
txtNombre.focus();

});

