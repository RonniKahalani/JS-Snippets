'use strict'
/**
 * Handles calling REST API endpoints
 */
class RestRequest {

    constructor() {

    }

    /**
     * Executes an async fetch operation.
     */
    async execute(url, settings, callback) {

        let data = null
        try {

            let response = await fetch(url, settings)
            data = await response.json()
            
            // Call the supplied callback function with the json data.
            if(callback != undefined) {
                callback(data)
            }
            
        } catch (error) {
            console.log(error)
        }
        return data
    }
}
