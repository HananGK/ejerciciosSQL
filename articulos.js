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
        articulos.forEach(articulo => {
            tabla = document.querySelector('#tabla')
            let tr = document.createElement('tr')
            let tdDescripcion = document.createElement('td')
            tdDescripcion.innerHTML = articulo.descripcion
            let tdPrecio = document.createElement('td')
            tdPrecio.innerHTML = articulo.precio
            let tdIVA = document.createElement('td')
            tdIVA.innerHTML = articulo.tiposIva.iva
            tabla.appendChild(tr)
            tr.appendChild(tdDescripcion)
            tr.appendChild(tdPrecio)
            tr.appendChild(tdIVA)

            let tdAcciones = document.createElement('td')
            tr.appendChild(tdAcciones)

            let botonELiminar = document.createElement('button')
            botonELiminar.innerHTML = 'Eliminar'
            botonELiminar.id = 'b'+articulo.id
            botonELiminar.addEventListener('click', ()=> {
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
            })

            let botonModificar = document.createElement('button')
            botonModificar.innerHTML = 'Modificar'
            botonModificar.id = 'm'+articulo.id
            botonModificar.addEventListener('click', ()=> {
                let inputDescripcion = document.createElement('input')
                inputDescripcion.value = articulo.descripcion
                let divModificar = document.querySelector('#divModificar')
                divModificar.innerHTML = ''
                divModificar.appendChild(inputDescripcion)
                let inputPrecio = document.createElement('input')
                inputPrecio.value = articulo.precio
                divModificar.appendChild(inputPrecio)
                let selectIva = document.createElement('select')
                divModificar.appendChild(selectIva)

                let tiposIva = getTiposIvaFetch('http://82.223.202.137:8082/tiposIva').then(tiposIva => {
                    tiposIva.forEach(tipoIva => {
                        let option = document.createElement('option')
                        option.value = tipoIva.id
                        option.text = tipoIva.iva
                        selectIva.appendChild(option)
                    })
                })
                                
    
                let botonEnviarModificacion = document.createElement('button')
                botonEnviarModificacion.innerHTML = 'Enviar'
                divModificar.appendChild(botonEnviarModificacion)

                botonEnviarModificacion.addEventListener('click', ()=> {
                    console.log(articulo)
                    divModificar.innerHTML = ''
                    let articuloModificado = new Articulo(articulo.id, inputDescripcion.value, parseInt(inputPrecio.value), new TiposIva(parseInt(selectIva.value), null))
                    console.log(articuloModificado)

                    grabaDatosFetch('http://82.223.202.137:8082/articulos', articuloModificado).then(function(objeto) {
                        cargarDatos()
                        
                    })
                    
                    
                })
            })

            tdAcciones.appendChild(botonELiminar)
            tdAcciones.appendChild(botonModificar)
           
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

botonAnadir = () => {
    let divAnadir = document.querySelector('#divAnadir')
    divAnadir.innerHTML = ''
    let inputDescripcion = document.createElement('input')
    divAnadir.appendChild(inputDescripcion)
    let inputPrecio = document.createElement('input')
    divAnadir.appendChild(inputPrecio)
    let selectIva = document.createElement('select')
    divAnadir.appendChild(selectIva)
    let tiposIva = getTiposIvaFetch('http://82.223.202.137:8082/tiposIva').then(tiposIva => {
        tiposIva.forEach(tipoIva => {
            let option = document.createElement('option')
            option.value = tipoIva.id
            option.text = tipoIva.iva
            selectIva.appendChild(option)
        })
    })

    let botonEnviar = document.createElement('button')
    botonEnviar.innerHTML = 'Enviar'
    divAnadir.appendChild(botonEnviar)

    botonEnviar.addEventListener('click', ()=> {
        divAnadir.innerHTML = ''
        let articulo = new Articulo(0, inputDescripcion.value, parseInt(inputPrecio.value), new TiposIva(parseInt(selectIva.value), null))
        console.log(articulo)
        grabaDatosFetch('http://82.223.202.137:8082/articulos', articulo).then(function(objeto) {
                cargarDatos()
        })
    })


}

