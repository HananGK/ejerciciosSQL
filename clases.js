class Hijo {
    constructor(id, chicos, chicas) {
        this.id = id
        this.chicos = chicos
        this.chicas = chicas
    }
}

class EstadoCivil {
    constructor(id, descripcion) {
        this.id = id
        this.descripcion = descripcion
    }
}

class DatoPersonal {
    constructor(id, hijo, estadoCivil) {
        this.id = id
        this.hijo = hijo
        this.estadoCivil = estadoCivil
    }
}

class Cargo {
    constructor(id, descripcion) {
        this.id = id
        this.descripcion = descripcion
    }
}

class DatoLaboral {
    constructor(id, cargo, salario) {
        this.id = id
        this.cargo = cargo
        this.salario = salario
    }
}

class Empresa {
    constructor(id, nombre, cif){
        this.id = id
        this.nombre = nombre
        this.cif = cif
    }
}

class Empleado {
    constructor(id, dni, nombre, apellidos, fechaNacimiento, fechaAlta, fechaBaja, datoPersonal, datoLaboral, empresa) {
        this.id = id
        this.dni = dni
        this.nombre = nombre
        this.apellidos = apellidos
        this.fechaNacimiento = fechaNacimiento
        this.fechaAlta = fechaAlta
        this.fechaBaja = fechaBaja
        this.datoPersonal = datoPersonal
        this.datoLaboral = datoLaboral
        this.empresa = empresa
    }
}

/* let hijo = new Hijo(1, 2, 3)
let estadoCivil = new EstadoCivil(1, 'casado')
let datoPersonal = new DatoPersonal(1, hijo, estadoCivil)
let cargo = new Cargo(1, 'gerente')
let datoLaboral = new DatoLaboral(1, cargo, 2000)
let empresa = new Empresa(1, 'Coca Cola', 'B12345678')
let empleado = new Empleado(1, '12345678A', 'Pepe', 'Perez', '1990-01-01', '2020-01-01', null, datoPersonal, datoLaboral, empresa)
console.log(JSON.stringify(empleado)) */


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


function grabarEmpleado() {
    let id = document.querySelector('#id').value
    let dni = document.querySelector('#dni').value
    let nombre = document.querySelector('#nombre').value
    let apellidos = document.querySelector('#apellidos').value
    let fechaNacimiento = document.querySelector('#fechaNacimiento').value
    let fechaAlta = document.querySelector('#fechaAlta').value
    let fechaBaja = document.querySelector('#fechaBaja').value
    let datosPersonales = document.querySelector('#datosPersonales').value
    let datosLaborales = document.querySelector('#datosLaborales').value
    let empresa = document.querySelector('#empresa').value

    let empleado = new Empleado (parseInt(id), dni, nombre, apellidos, new Date(fechaNacimiento), new Date(fechaAlta), null, new DatoPersonal(parseInt(datosPersonales), null, null), new DatoLaboral(parseInt(datosLaborales), null, null), new Empresa(parseInt(empresa), null, null))
    console.log(empleado)
    grabaDatosFetch('http://82.223.202.137:8082/empleados', empleado).then(empleadoRetorno => {
        console.log(empleadoRetorno)
    })
    .catch(error => console.log(error))
}



