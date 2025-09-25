const MB_1 = 1024 * 1024; // 1 MB in bytes
const MAX_UPLOAD_FILE_SIZE = MB_1;

const imageTag = document.querySelector("#image-tag");
const imageText = document.querySelector("#image-text");
const imageTextSize = document.querySelector("#image-text-size");
const fileImageSizeDiff = document.querySelector("#file-image-size-diff");
const fileSize = document.querySelector("#file-size");
const fileName = document.querySelector("#file-name");
const btnUpload = document.querySelector("#btn-upload");

btnUpload.onchange = (ev) => setFiles(ev.target.files);


/**
 * Loads a file, from a file upload input element.
 */
function loadFile(file) {

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

/**
 * Set files from file input element
 * @param files
 * @returns {Promise<void>}
 */
async function setFiles(selectedFiles) {
    
    if (selectedFiles.length == 0) {
        return;
    }

    const file = selectedFiles[0];

    if (file.size > MAX_UPLOAD_FILE_SIZE) {
        alert(`The selected file (${file.name}) is too large (${file.size}). Maximum allowed size is ${MAX_UPLOAD_FILE_SIZE / MB_1} MB.`);
        return;
    }

    // Get the file data (in a Base64 encoded string)
    const data = await loadFile(file)
    updateFileInfo(file, data);
}

function updateFileInfo(file, data) {
    fileSize.innerHTML = file.size;
    fileImageSizeDiff.innerHTML = data.length - file.size;
    fileName.innerHTML = file.name;

    imageText.innerHTML = data;
    imageTextSize.innerHTML = data.length;
    imageTag.src = data

}