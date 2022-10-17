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
        $.each(checkbox, function (key, val) {
            let k = $(val).attr('id')
            let v = $(val).is(':checked')
            formData.append(k, v)
        });
        // Remove the file input element, from the final form data
        formData.delete('image')

        fileHandler.base64Files.forEach(function (val, key, map) {
            formData.set(key, val)
        });

        return Object.fromEntries(formData)
    }
}

document.forms['form'].onsubmit = (event) => {
    event.preventDefault();
    let json = new Form(event.target).json();
    document.getElementById("preview").innerText = JSON.stringify(json, null, '\t')
}
