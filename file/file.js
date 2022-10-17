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
        this.log(`Encoding file: ${file.name}...`)
        let data = await this.convertBase64(file);
        this.log(`Done encoding file: ${file.name}...`)
        callback(data)
    }

    /**
     * Copies an element value to the system clipboard.
     */
    async copyToClipboard(id) {
        let element = document.getElementById(id)
        element.focus()

        let data = element.value 

        try {
            await navigator.clipboard.writeText(data)
            this.log('Copied to the clipboard successfully.')
        }catch(error) {
            this.log(error)
        }
    }

    /**
     * Logs the message to the message div, on the web page.
     */
    log(message) {
        $('#message').prepend(`<div>${message}</div>`)
    }
}

/**
 * Event Hooks.
 */
document.getElementById('image').addEventListener("change", (event) => {
    // Get the list of files, from the file input element.
    let files = event.target.files
    // Get a file handler.
    let fileHandler = new FileHandler()
    // Clear the files element.
    $('#files').text('')

    // Go through all the files and encode them.
    for (let index = 0; index < files.length; index++) {
        let file = event.target.files[index]

        fileHandler.base64(file, (data) => {
            let idValue = 'file-' + index
            // Append the current file encoded string.
            let diffSize = (parseFloat(data.length - file.size))
            let diffPct = (parseFloat((diffSize / file.size) * 100))

            $('#files').append(
                `<div class="row">
                    <div class="col-2">
                        <img class="rounded" style="width:200px;height:150px;" src="${data}" />
                    </div>
                    <div class="col">
                        <textarea id="${idValue}" class="form-control col-xs-12" style="height:150px;">${data}</textarea>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-sm btn-primary" onclick="fileHandler.copyToClipboard('${idValue}')">Copy</button>
                    </div>
                    <div class="col-2">
                        <div class="row">${file.name}</div>
                        <div class="row">File type: ${file.type}</div>
                        <div class="row">File size: ${file.size.toLocaleString()}</div>
                        <div class="row">Text size: ${data.length.toLocaleString()}</div>
                        <div class="row">Diff. size: ${diffSize.toLocaleString()} (${diffPct.toFixed(2).toLocaleString()}%)</div>
                    </div>
                </div>`)
                
            //console.log(data)
        });
    }
});
var fileHandler = new FileHandler()


window.addEventListener('load', (event) => {
    $('.dropify').dropify();
})