'use strict'

class RestRequest {

    constructor() {

    }

    async execute(url, settings, callback) {

        try {
            let response = await fetch(url, settings)
            let data = await response.json()
            callback(data)
        } catch (error) {
            console.log(error)
        }
    }
}

$( document ).ready(function() {
    
    let url = "https://api.spacexdata.com/v2/launches"

    console.log( `Fetching data from ${url}...` );
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

      let started = new Date()

    new RestRequest().execute(url, settings, (data) => {
        let ended = new Date()
        let seconds = (ended.getTime() - started.getTime()) / 1000;
        let msg = `${data.length} data rows fetched. Time:${seconds} second(s)`
        console.log(msg);
        
        let header = $('h2')
        header.removeClass('blink')
        header.text(msg)

        for (let dataIndex in data) {
            let entry = data[dataIndex];

            let success = entry.launch_success;
            let launchDate = new Date(entry.launch_date_utc).toDateString();
            let commonLinkTD = '<td><a class="tiny btn btn-dark" target="_blank" href="';

            let table = `<tr style="vertical-align:middle;"><td style="color:${!success? "#FF0000" : "#00FF00"};font-size:30px;width:5px;">&#8226;</td>
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
        $("#spinner").hide();
        $("#table").fadeIn("slow");
    })
    console.log( "ready!" );
});