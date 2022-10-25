'use strict'

class LocationHandler {

    constructor() {

    }

    dumpValues() {

        let output = document.getElementById('output')

        output.innerHTML = ''
        output.innerHTML += `Href: ${location.href}<br>`
        output.innerHTML += `Host: ${location.host}<br>`
        output.innerHTML += `Host name: ${location.hostname}<br>`
        output.innerHTML += `Path name: ${location.pathname}<br>`
        output.innerHTML += `Protocol: ${location.protocol}<br>`
        output.innerHTML += `Port: ${location.port}<br>`
        output.innerHTML += `Search: ${location.search}`
    }

}
var locationHandler = new LocationHandler()