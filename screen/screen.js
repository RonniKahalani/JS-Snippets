'use strict'

class ScreenHandler {

    constructor() {

    }

    dumpValues() {

        let output = document.getElementById('output')

        output.innerHTML = ''
        output.innerHTML += `Available width: ${screen.availWidth} (excludes OS taskbar)<br>`
        output.innerHTML += `Available height: ${screen.availHeight} (excludes OS taskbar)<br>`
        output.innerHTML += `Width: ${screen.width}<br>`
        output.innerHTML += `Height: ${screen.height}<br>`
        output.innerHTML += `Color depth: ${screen.colorDepth}<br>`
        output.innerHTML += `Pixel depth: ${screen.pixelDepth}<br>`
    }

}
var screenHandler = new ScreenHandler()