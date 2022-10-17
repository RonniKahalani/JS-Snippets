'use strict'
/**
 * Used to add local files (ex, images) and encode then into strings, which can be sent and fetch from and to the backend.
 */
class FileHandler {

    constructor() {
        this.base64Files = new Map()
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
        let data = await this.convertBase64(file);
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
        let logMessage = new Date().toLocaleString() + ": " + message
        console.log(logMessage)

        let messageDiv = $('#message')
        if (messageDiv != null) {

            messageDiv.prepend(`<div class="row message-row">${logMessage}</div>`)
        }
    }

    handleFiles(files, callback) {
        // Clear the files element.
        $('#files').text('')
        this.base64Files.clear()

        // Go through all the files and encode them.
        for (let index = 0; index < files.length; index++) {
            let file = files[index]

            this.log(`Encoding: ${file.name}...`)
            let startTime = window.performance.now()

            fileHandler.base64(file, (data) => {

                let endTime = window.performance.now()
                this.log(`Encoded ${file.name} (${(endTime - startTime).toFixed(2)} ms).`)

                let idValue = 'file-' + index
                this.base64Files.set(idValue, data)
                // Append the current file encoded string.
                let diffSize = (parseFloat(data.length - file.size))
                let diffPct = (parseFloat((diffSize / file.size) * 100))

                let filesDiv = $('#files')

                if (filesDiv != null) {
                    $(filesDiv).append(
                        `<div class="row card rounded m-2 p-2 file-row">
                        <div class="card-body">
                            <h5 class="card-title">Encoding Log</h5>

                            <div class="row">
                            <div class="col m-2 p-2">
                                <img class="rounded" style="width:200px;height:150px;" src="${data}" />
                            </div>
                            
                            <div class="col-2 m-2 p-2">
                                <div class="row">${file.name}</div>
                                <div class="row">Type: ${file.type}</div>
                                <div class="row">File size: ${file.size.toLocaleString()}</div>
                                <div class="row">Text size: ${data.length.toLocaleString()}</div>
                                <div class="row">Diff. size: ${diffSize.toLocaleString()} (${diffPct.toFixed(2).toLocaleString()}%)</div>
                            </div>

                            <div class="col-6 m-2 p-2">
                                <textarea id="${idValue}" class="form-control col-xs-12" style="height:150px;">${data}</textarea>
                            </div>

                            <div class="col-1 m-2 p-2">
                                <button class="btn btn-sm btn-primary" style="float:right" onclick="fileHandler.copyToClipboard('${idValue}')">Copy</button>
                            </div>
                        </div></div></div></div>`)
                }

                let fileCount = document.getElementById('fileCount')
                if(fileCount != null) {
                    fileCount.innerHTML = files.length
                }

                callback(this.base64Files)
            });
        }
    }
}
var fileHandler = new FileHandler()