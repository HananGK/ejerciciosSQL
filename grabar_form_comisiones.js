grabaDatosFetch = (url, Object) => {
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

class Comision{
    constructor(id, comision, minimo, maximo){
        this.id = id
        this.comision = comision
        this.minimo = minimo
        this.maximo = maximo
    }
}

grabarComisiones = () => {
    let idForm = parseInt(document.querySelector('#id').value)
    let comisionForm = parseInt(document.querySelector('#comision').value)
    let minimoForm = parseInt(document.querySelector('#minimo').value)
    let maximoForm = parseInt(document.querySelector('#maximo').value)

    let comision = new Comision(idForm, comisionForm, minimoForm, maximoForm)
    grabaDatosFetch('http://82.223.202.137:8082/comisiones', comision).then(comisionRetorno => {
        console.log(comisionRetorno)
    })
    .catch(error => console.log(error))
}