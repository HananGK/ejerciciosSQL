let nombre = 'federico'
console.log('longitud: '+nombre.length)
console.log('substring: '+nombre.substring(2)) //derico
console.log('substring: '+nombre.substring(2,5)) //der 
console.log(nombre.charAt(3)) //e
console.log(nombre.indexOf('e')) //1
console.log(nombre.lastIndexOf('e')) //3
console.log(nombre.indexOf('z')) //-1, porque no está esa letra
console.log(nombre.startsWith('fede')) //true
console.log(nombre.startsWith('de'))  //false
console.log(nombre.endsWith('ico')) //true

let valor='inputChicos2467'
console.log(valor.substring(11))

let elemento = document.querySelector('#h1')
let elementoAntiguo = document.getElementById('h1')
alert(elemento===elementoAntiguo)

let elementos = document.getElementsByTagName('h1')
for (i=0; i<elementos.length; i++) {
    alert(elementos[i].innerHTML)
}

let elementos2 = document.querySelectorAll('h1')
for (i=0; i<elementos2.length; i++) {
    alert(elementos2[i].innerHTML)
}
