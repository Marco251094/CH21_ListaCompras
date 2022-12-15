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
let btnClear = document.getElementById("btnClear");
let datos = []; //new array
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

localStorage.setItem("contadorProductos", contador);//Se guarda información en la memoria local
localStorage.setItem("totalEnProductos", totalEnProductos);
localStorage.setItem("costoTotal", costoTotal);

let row = `<tr>
     <td>${contador}</td>
     <td>${txtNombre.value}</td>
     <td>${txtNumber.value}</td>
     <td>${precio}</td>
</tr>`;
cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
let elemento = `{
         "id": ${contador},
     "nombre": "${txtNombre.value}",
     "cantidad": ${txtNumber.value},
     "precio": ${precio}
}`;

datos.push(JSON.parse(elemento)); //Convertimos la cadena elemento en objeto
//console.log(elemento);
localStorage.setItem("datos", JSON.stringify(datos) ); //convertimos el objeto en string 

txtNombre.value= "";
txtNumber.value="";
txtNombre.focus();

});// aqui termina el evento click
//el evento  blur hace lo contrario de focus
txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    event.target.value = event.target.value.trim();
}
);
txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
   event.target.value = event.target.value.trim();
});
window.addEventListener("load", function(event){
    let tmpContador= localStorage.getItem("contadorProductos", contador);

    if(tmpContador !=null){
        contador = tmpContador;
        contadorProductos.innerHTML =contador;
    }
    let tmp = localStorage.getItem("totalEnProductos", totalEnProductos);
    if(tmp !=null){
        totalEnProductos = parseInt(tmp);
        productosTotal.innerHTML=totalEnProductos;
    }
    tmp = localStorage.getItem("costoTotal");
    if(tmp!=null){
        costoTotal= parseFloat(tmp);
        precioTotal.innerHTML= "$ "+ costoTotal.toFixed(2);
    }
    tmp =localStorage.getItem("datos", JSON.stringify(datos) ); //convertimos el objeto en string 
if(tmp!=null){
    datos = JSON.parse(tmp);
    datos.forEach(element =>{
        cuerpoTabla[0].innerHTML += `<tr>
            <th> ${element.id}</th>
        <td>${element.nombre}</td>
        <td> ${element.cantidad}</td>
        <td>$ ${element.precio}</td>
   </tr>`;
    })
}
})
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    contador =0;
    contadorProductos.innerHTML = contador;
    totalEnProductos=0;
    productosTotal.innerHTML=totalEnProductos;
    costoTotal=0;
    precioTotal.innerHTML="$ "+ costoTotal.toFixed(2);
    cuerpoTabla[0].innerHTML="";

    localStorage.clear();
})
