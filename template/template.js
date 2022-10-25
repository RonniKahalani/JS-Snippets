'use strict'
/**
 * Handles calling REST API endpoints
 */
class TemplateHandler {

    constructor() {

    }

    /**
     * Load template from document.
     */
    loadFromDocument(templateId, targetId) {
        let template = document.querySelector(templateId)
        let clone = template.content.cloneNode(true)
        let root = clone.querySelector("#embeddedRoot")
        root.setAttribute("style", "background-color: green;color:white;")
        root.textContent = "Loaded from the document."
        let target = document.querySelector(targetId)
        target.appendChild(clone)
    }

     /**
     * Load template from file.
     */
      async loadFromFile(filePath, templateId, targetId) {

        // Loading the template file, using jQuery for simplicity.
            $('#fileTemplate').load("template.html", () => {

                // Waiting for the data to be loaded, and now its ready.
                let template = document.querySelector(templateId)
                let clone = template.content.cloneNode(true)
                let root = clone.querySelector("#externalRoot")
                root.setAttribute("style", "background-color: blue;color:white;")
                root.textContent = "Loaded from an external template file."
                let target = document.querySelector(targetId)
                target.appendChild(clone)
            })
        }
}
var templateHandler = new TemplateHandler()