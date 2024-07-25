var articulos = []
cargarDatos = () => {
    let tabla = document.querySelector('#tabla')
    tabla.innerHTML = ''
    let trCabecera = document.createElement('tr')
    let thDescripcion = document.createElement('th')
    thDescripcion.innerHTML = 'Descripción'
    let thPrecio = document.createElement('th')
    thPrecio.innerHTML = 'Precio'
    let thIVA = document.createElement('th')
    thIVA.innerHTML = 'IVA'
    let thAcciones = document.createElement('th')
    thAcciones.innerHTML = 'Acciones'
    trCabecera.appendChild(thDescripcion)
    trCabecera.appendChild(thPrecio)
    trCabecera.appendChild(thIVA)
    trCabecera.appendChild(thAcciones)
    tabla.appendChild(trCabecera)

    getDatosFetch('http://82.223.202.137:8082/articulos').then(articulos => {
        articulos.push(articulos)
        console.log(articulos)
        articulos.forEach(articulo => { 
            tabla = document.querySelector('#tabla')
            let tr = document.createElement('tr')
            let tdDescripcion = document.createElement('td')
            let tdDescripcionInput = document.createElement('input')
            tdDescripcionInput.type = 'text'
            tdDescripcion.appendChild(tdDescripcionInput)
            tdDescripcionInput.value = articulo.descripcion

            let tdPrecio = document.createElement('td')
            let tdPrecioInput = document.createElement('input')
            tdPrecioInput.type = 'text'
            tdPrecio.appendChild(tdPrecioInput)
            tdPrecioInput.value = articulo.precio

            let tdIVA = document.createElement('td')
            let tdIVAInput = document.createElement('input')
            tdIVAInput.type = 'text'
            tdIVA.appendChild(tdIVAInput)
            tdIVAInput.value = articulo.tiposIva.iva
            
            tabla.appendChild(tr)
            tr.appendChild(tdDescripcion)
            tr.appendChild(tdPrecio)
            tr.appendChild(tdIVA)

            let tdAcciones = document.createElement('td')
            tr.appendChild(tdAcciones)

            let botonELiminar = document.createElement('input')
            botonELiminar.type = 'checkbox'
            botonELiminar.id = 'b'+articulo.id
            tdAcciones.appendChild(botonELiminar)

            let botonELiminarLabel = document.createElement('label')
            botonELiminarLabel.htmlFor = 'b'+articulo.id
            botonELiminarLabel.innerHTML = 'Eliminar'
            tdAcciones.appendChild(botonELiminarLabel)

            let botonModificar = document.createElement('input')
            botonModificar.type = 'checkbox'
            botonModificar.id = 'm'+articulo.id
            tdAcciones.appendChild(botonModificar)

            let botonModificarLabel = document.createElement('label')
            botonModificarLabel.htmlFor = 'm'+articulo.id
            botonModificarLabel.innerHTML = 'Modificar'
            tdAcciones.appendChild(botonModificarLabel)
           
        }) 
    })
}

class Articulo {
    constructor(id, descripcion, precio, tiposIva) {
        this.id = id
        this.descripcion = descripcion
        this.precio = precio
        this.tiposIva = tiposIva
    }

}

class TiposIva {
    constructor(id, iva) {
        this.id = id
        this.iva = iva
    }
}

let borraDatosFetch = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {method: 'delete'})
            .then((response) => {
                return response.status
            })
            .then((status) => {
                resolve(status)
            })
            .catch((err) => {
                reject(err)
            })
    })
}




getDatosFetch =  () => {
    return new Promise((resolve, reject) => {
        fetch('http://82.223.202.137:8082/articulos')
            .then((response) => {
                return response.json()
            })
            .then((articulos) => {
                resolve(articulos)
            })
            .catch((error) => {
                reject(error)
            })
    })

}

getTiposIvaFetch = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((tiposIva) => {
                resolve(tiposIva)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

let grabaDatosFetch = (url, Object) => {
    return new Promise(function(resolve, reject) {
        let cabecera={'Content-Type': 'application/json'}
        let cabeceras = new Headers(cabecera)
        fetch(url, {
            method: 'post',
            body: JSON.stringify(Object), 
            headers: cabeceras
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(objetos) {
            return resolve(objetos)
        })
        .catch(function(error) {
            return reject(error)
        });

    })
}


function eliminar() {
    console.log(articulos)
    articulos.forEach(articulo => {
        let botonELiminar = document.querySelector(`#b${articulo.id}`)

        if (botonELiminar.checked) {
            borraDatosFetch(`http://82.223.202.137:8082/articulos/${botonELiminar.id.substring(1)}`).then (status => {
                try {
                    if (status == 200)
                    alert('articulo borrado')
                    cargarDatos()
                }
                catch(err) {
                    alert('articulo está en uso y no se puede borrar')
                }
            })
        }
    })
}