cargarTablaComsiones = async () => {
    let response = await fetch ('http://82.223.202.137:8082/comisiones')
    let jsonComisiones = await response.json()
    
    jsonComisiones.forEach(element => {
        let tr = document.createElement('tr')
        let tdComision = document.createElement('td')
        tdComision.innerHTML = element.comision + ' %'
        let tdMaximo = document.createElement('td')
        tdMaximo.innerHTML = element.maximo
        let tdMinimo = document.createElement('td')
        tdMinimo.innerHTML = element.minimo
        tr.appendChild(tdComision)
        tr.appendChild(tdMaximo)
        tr.appendChild(tdMinimo)
        let tabla = document.querySelector('#tabla')
        tabla.appendChild(tr)
    });
}
    

