'use strict'
/**
 * Used to add local files (ex, images) and encode then into strings, which can be sent and fetch from and to the backend.
 */
class FileHandler {

    constructor() {

    }

    /**
     * Convert a file to base64 format.
     */
    convertBase64(file) {

        return new Promise((resolve, reject) => {

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    /**
     * Base64 encode a file.
     */
    async base64(file, callback) {
        this.log(`Encoding: ${file.name}...`)
        let startTime = window.performance.now()
        let data = await this.convertBase64(file);
        let endTime = window.performance.now()
        this.log(`Encode completed (${(endTime - startTime).toFixed(2)} ms) for: ${file.name}.`)
        callback(data)
    }

    /**
     * Copies an element value to the system clipboard.
     */
    async copyToClipboard(id) {
        let element = document.getElementById(id)
        element.focus()
        try {
            await navigator.clipboard.writeText(element.value)
            this.log('Copied to the clipboard successfully.')
        } catch (error) {
            this.log(error)
        }
    }

    /**
     * Logs the message to the message div, on the web page.
     */
    log(message) {
        $('#message').prepend(`<div class="row message-row">${new Date().toLocaleString() + ": " + message}</div>`)
    }

    handleFiles(files) {
        // Clear the files element.
        $('#files').text('')

        // Go through all the files and encode them.
        for (let index = 0; index < files.length; index++) {
            let file = files[index]

            fileHandler.base64(file, (data) => {
                let idValue = 'file-' + index
                // Append the current file encoded string.
                let diffSize = (parseFloat(data.length - file.size))
                let diffPct = (parseFloat((diffSize / file.size) * 100))

                $('#files').append(
                    `<div class="row file-row">

                <div class="col-2 mp-2">
                    <img class="rounded" style="width:200px;height:150px;" src="${data}" />
                </div>
                
                <div class="col-2 mp-2">
                    <div class="row">${file.name}</div>
                    <div class="row">Type: ${file.type}</div>
                    <div class="row">File size: ${file.size.toLocaleString()}</div>
                    <div class="row">Text size: ${data.length.toLocaleString()}</div>
                    <div class="row">Diff. size: ${diffSize.toLocaleString()} (${diffPct.toFixed(2).toLocaleString()}%)</div>
                </div>

                <div class="col mp-2">
                    <textarea id="${idValue}" class="form-control col-xs-12" style="height:150px;">${data}</textarea>
                </div>

                <div class="col-1 mp-2">
                    <button class="btn btn-sm btn-primary" style="float:right" onclick="fileHandler.copyToClipboard('${idValue}')">Copy</button>
                </div>
            </div>`)

                document.getElementById('fileCount').innerHTML = files.length
                //console.log(data)
            });
        }
    }
}
var fileHandler = new FileHandler()

/**
 * Event Hooks.
 */
document.getElementById('image').addEventListener("change", (event) => {
    fileHandler.handleFiles(event.target.files)
});

window.addEventListener('load', (event) => {
    $('.dropify').dropify();
})