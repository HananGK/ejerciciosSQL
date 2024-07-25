cargarDatos = () => {
    getFatosFetch('http://82.223.202.137:8082/comisiones').then(comisiones => {
        comisiones.forEach(comision => {
            let tr = document.createElement('tr')
            let tdComision = document.createElement('td')
            tdComision.innerHTML = comision.comision
            let tdMaximo = document.createElement('td')
            tdMaximo.innerHTML = comision.maximo
            let tdMinimo = document.createElement('td')
            tdMinimo.innerHTML = comision.minimo
            tdAcciones = document.createElement('td')
            botonELiminar = document.createElement('button')
            bottonEliminar.innerHTML = 'Eliminar'
            botonModificar = document.createElement('button')
            botonEliminar.id = 'b'+comision.id
            botonELiminar.addEventListener('click', ()=> {
                borraDatosFetch(`http://82.223.202.137:8082/comisiones/${botonEliminar.id.substring(1)}`).then (comisionRetorno => {
                    try {
                        alert('comision borrada correctamente')
                        cargarDatos()
                    }
                    catch(err) {
                        alert('comision no ha sido borrada')
                    }
                })
            })
            tdAcciones.appendChild(botonELiminar)
            tdAcciones.appendChild(botonModificar)
            tr.appendChild(tdComision)
            tr.appendChild(tdMaximo)
            tr.appendChild(tdMinimo)
            tr.appendChild(tdAcciones)
            let tabla = document.querySelector('#tabla')
            tabla.appendChild(tr)
        })
    })
}

let borraDatosFetch = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url, {method: 'delete'})
            .then((response) => {
                return response.json()
            })
            .then((comisiones) => {
                resolve(comisiones)
            })
            .catch((err) => {
                reject(err)
            })
    })
}


getDatosFetch =  () => {
    return new Promise((resolve, reject) => {
        fetch('http://82.223.202.137:8082/comisiones')
            .then((response) => {
                return response.json()
            })
            .then((comisiones) => {
                resolve(comisiones)
            })
            .catch((err) => {
                reject(err)
            })
    })

}

