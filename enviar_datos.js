grabaDatosFetch = (url, Object) => {
    return new Promise(function(resolve, reject) {
        let cabecera={'Content-Type': 'application/json'}
        let cabeceras = new Headers(cabecera)
        fetch(url, {
            method: 'POST',
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

function verEmpleados() {
    /* getDatosFetch('http://82.223.202.137:8082/comisiones').then(comisiones => {
        console.log(empleados)
    }) */
    let comision = new Comision(0, 200, 3456, 12354)
    grabaDatosFetch('http://82.223.202.137:8082/comisiones', comision).then(comisionRetorno => {
        console.log(comisionRetorno)
    })
}

//apuntes

borraDatosFetch = (url,id) => {
    return new Promise(function (resolve, reject) {
      fetch(url+"/"+id,{method:"delete"})
        .then(function (resp) { return resp.json(); })
        .then(function (objetos) { return resolve(objetos); })
        .catch(function (err) { return reject(err); });
    });
  }
  
  
  
  grabaDatosFetch = (url,Object) => {
    return new Promise(function (resolve, reject) {
      let cabecera={"Content-Type":"application/json"}
      let cabeceras= new Headers(cabecera);
      fetch(url,{method:"post",body:JSON.stringify(Object),headers:cabeceras})
        .then(function (resp) { return resp.json(); })
        .then(function (objetos) { return resolve(objetos); })
        .catch(function (err) { return reject(err); });
    });
  }
  
  class Comision{
  
    constructor(id,comision,maximo,minimo){ 
      this.id=id
      this.comision=comision
      this.minimo=minimo
      this.maximo=maximo
     }
  }
  
  getDatosFetch = async url => {
    return new Promise(async function (resolve, reject) {
  
      response = await fetch(url,{method:"get"})
      paises = await response.json()
      if (response.status !== 200) {
        reject(response.status)
      }
      resolve(paises)
  
    })
  }
  
  function verEmpleados(){
    /*getDatosFetch("http://www.recrale.com:8082/comisiones").then(comisiones => {
      console.log(empleados)
    })*/
    /*let comision= new Comision(0,200,3456,12354)
    grabaDatosFetch("http://82.223.202.137:8082/comisiones",comision).then(comisionRetorno => {
      console.log(comisionRetorno)
    })*/
   let comision= new Comision(4,15,5000,501)
   borraDatosFetch("http://82.223.202.137:8082/borrar",4).then(comisionRetorno => {
     console.log("comision borrada correctamente")
   })
  }