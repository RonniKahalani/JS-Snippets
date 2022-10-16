'use strict'
/**
 * 
 */
class FileHandler {
    constructor() {

    }

    /**
     * Convert a file to base64 format.
     * @param {*} file 
     * @returns 
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
     * Base64 incoding of a file.
     * @param {*} event 
     * @param {*} callback 
     */
    async base64(file, callback) {
        let data = await this.convertBase64(file);
        callback(data)
    };

}

document.getElementById('image').addEventListener("change", (event) => {
    let files = event.target.files
    let fileHandler = new FileHandler()
    $('#files').text('')
    for (let index = 0; index < files.length; index++) {
        let file = event.target.files[index]

        fileHandler.base64(file, (data) => {

            $('#files').append(
                `<div class="row">
                    <div class="col">
                    <img style="width:800px;height:600px;" src="${data}" />
                    </div>
                    <div class="col">
                    <h6>${file.name} (${file.size}) / ${file.type}</h6>
                    <h6>Base64 String</h6>
                    <textarea class="form-control col-xs-12" style="height:500px;">${data}</textarea>
                    </div>

                </div>`)
            console.log(data)
        });
    }
});
