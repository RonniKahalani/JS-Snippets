'use strict'

/**
 * Uploads local images to a REST backend. 
 */
class ImageUploader {

    /**
     * Default constructor.
     */
    constructor() {
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

            let response = await fetch('http://localhost:8080/api/v1/image', settings)
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
        try {

            let response = await fetch('http://localhost:8080/api/v1/image')
            data = await response.json()

            gallery.innerHTML = ''

            data.forEach(element => {
                let img = document.createElement("img")
                img.setAttribute("src", element.image)
                img.onclick = (e) => {

                    // Enabled delete when the image is clicked on, if the user confirms the delete action. 
                    let confirmed = confirm(`Are you sure you want to remove it?`)
                    if (confirmed) {
                        this.deleteImage(element.id)
                    }
                }
                gallery.appendChild(img)
            });

        } catch (error) {
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

            let response = await fetch('http://localhost:8080/api/v1/image/' + index, settings)
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