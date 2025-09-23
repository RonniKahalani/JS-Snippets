'use strict'

/**
 * Uploads local images to a REST backend. 
 */
class ImageUploader {

    /**
     * Default constructor.
     */
    constructor() {
        this.url = 'http://localhost:8080/api/v1/image/'
        this.selectedFiles = []
    }

    /**
     * Sends a POST request to the backend.
     */
    async postData(postData) {
        
        let settings = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(postData)
        }

        let data = null
        try {

            let response = await fetch(this.url, settings)
            data = await response.json()

            this.updateGallery()

        } catch (error) {
            console.log(error)
        }
        return data
    }

    /**
     * Sets the files that are to be sent to the backend.
     */
    setFiles(files) {
        this.selectedFiles = files
    }

    /**
     * Updates the gallery DIV in the HTML iwth the latest images from backend.
     */
    async updateGallery() {
        let gallery = document.getElementById("gallery")

        let data = null
        let response = null

        try {
            // Get all get images.
            response = await fetch(this.url)
            data = await response.json()

            // Clear the gallery div content.
            gallery.innerHTML = ''

            // Go through all the returned image objects, dedicate an image HTML template for each image.
            data.forEach(element => {

                let clone = cloneHtmlTemplate('template-image')
                // Locate the image tag.
                let img = clone.querySelector('img')
                // Set the image source to the current element image propert (a Base64 encoded image in string format, directly applicable as a image source)
                img.setAttribute("src", element.image)

                // Locate the delete button.
                let btn = clone.querySelector('button')
                btn.onclick = (e) => {

                    // Enabled delete when the image is clicked on, if the user confirms the delete action. 
                    let confirmed = confirm(`Are you sure you want to delete '${element.name}'?`)
                    if (confirmed) {
                        // Request the backend to delete the image.
                        this.deleteImage(element.id)
                    }
                }

                let metaDiv = clone.querySelector('.meta')
                metaDiv.innerHTML += `<b>Created</b>: ${new Date(element.created).toLocaleString()}<br>`
                metaDiv.innerHTML += `<b>User</b>: ${element.user}<br>`
                metaDiv.innerHTML += `<b>Filename</b>: ${element.name}<br>`
                metaDiv.innerHTML += `<b>Original size</b>: ${element.size.toLocaleString()} bytes<br>`
                metaDiv.innerHTML += `<b>Current size</b>: ${element.image.length.toLocaleString()} bytes<br>`
                metaDiv.innerHTML += `<b>Title</b>: ${element.title}<br>`
                metaDiv.innerHTML += `<b>Description</b>:<br> ${element.description.replaceAll("\n", "<br>")}<br>`

                gallery.appendChild(clone)
            });

        } catch (error) {
            let status = (response ===null) ? "Unreachable" : `${response.status}:\n${error}`
            if( (response ===null) && confirm(`Failed to connect to backend (${status})\nDo you have the ImageStore backend running locally?\nIf not, click Ok to get the code at GitHub.`)) {
                location.href = 'https://github.com/RonniKahalani/ImageStore'
            }
            console.log(error)
        }
    }

    /**
     * Deletes an images from the backend.
     */
    async deleteImage(index) {

        let settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }

        let data = null
        try {

            let response = await fetch(this.url + index, settings)
            data = await response.json()

            this.updateGallery()
        
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Uploads the selected files to the backend.
     */
    async upload() {

        for (let index = 0; index < this.selectedFiles.length; index++) {

            
            let file = this.selectedFiles[index]
            let data = await this.loadFile(file);
            console.log('My data:' + data);
            console.log(`Sending: ${file.name}...`)

            let postData = {
                name: file.name,
                size: file.size,
                user: document.getElementById('user').value,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                image: data,
            }
            this.postData(postData)
        }
    }

    /**
     * Loads a file, from a file upload input element.
     */
    loadFile(file) {

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
    }
}

var imageUploader = new ImageUploader()