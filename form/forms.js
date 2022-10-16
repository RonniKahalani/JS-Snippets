'use strict'
/**
 * 
 */
class Form {
    constructor(form) {
        this.form = form
    }

    json() {
        const formData = new FormData(this.form);

        var checkbox = $(form).find("input[type=checkbox]");
        $.each(checkbox, function(key, val) {
            let k = $(val).attr('id')
            let v = $(val).is(':checked')
            formData.append(k, v)
        });

        var file = $(form).find("input[type=file]");
        $.each(file, function(key, val) {
            
            formData.set(key, val)
        });
        const jsonData = Object.fromEntries(formData);

        return jsonData           
    }
}

document.forms['form'].onsubmit = (event) =>{
    event.preventDefault();
    let json = new Form(event.target).json();
    let jsonElement = document.getElementById("preview")
    jsonElement.innerHTML = JSON.stringify(json)
}
