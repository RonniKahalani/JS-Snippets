'use strict'
/**
 * 
 */
class RestRequest {

    constructor() {

    }

    /**
     * Executes an async fetch operation.
     */
    async execute(url, settings, callback) {

        let data = {}
        try {

            let response = await fetch(url, settings)
            data = await response.json()
            
            // Call the supplied callback function with the json data.
            callback(data)
            
        } catch (error) {
            console.log(error)
        }
        return data
    }
}

$(document).ready(function () {

    let url = "https://api.spacexdata.com/v2/launches"

    console.log(`Fetching data from ${url}...`);
    let settings = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            'Content-Type': 'application/json'
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //body: JSON.stringify(data) // body data type must match "Content-Type" header
    }

    new RestRequest().execute(url, settings, (data) => {

        for (let dataIndex in data) {
            let entry = data[dataIndex];

            let success = entry.launch_success;
            let launchDate = new Date(entry.launch_date_utc).toDateString();
            let commonLinkTD = '<td><a class="btn btn-sm btn-primary" target="_blank" href="';

            let table = `<tr style="vertical-align:middle;"><td style="color:${!success ? "#FF0000" : "#00FF00"};font-size:30px;width:5px;">&#8226;</td>
            <td>${entry.mission_name}</td>
            <td>${launchDate}</td>
            <td>${entry.rocket.rocket_name}</td>
            <td title="${entry.launch_site.site_name_long}">${entry.launch_site.site_name}</td>
            ${commonLinkTD + entry.links.video_link}">Video</a></td>
            ${commonLinkTD + entry.links.mission_patch}">Image</a></td>
            ${commonLinkTD + entry.links.wikipedia}">Wikipedia</a></td>
            ${commonLinkTD + entry.links.article_link}">Article</a></td></tr>`;

            $('#data').append(table);
        }
        $('#loading').hide()
        $("#table").fadeIn("slow");
    })
    console.log("ready!");
});