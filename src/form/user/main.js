'use strict';

let input_names = [];
(function () {
    // apply CustomCroppr
    ["ApplicantImage", "ApplicantSign"].forEach(fileTagID => {
        let i = document.querySelector(`input[name='${fileTagID}']`)
        let btns = (i.parentNode).querySelectorAll("button")
        CustomCroppr.init({ input: i, crop: btns[0], view: btns[1] })
    })

    // collect form input names
    let names = [];
    document.querySelectorAll("[name]").forEach(node => {
        if (node.tagName == "META") return
        names.push(node.name)
    })
    input_names = new Set(names)
})();

function reduceImageSize2(file) {
    console.log(file)
    let img = new Image()
    // let blobURL = window.URL.createObjectURL(file)
    // img.src = blobURL
    img.src = window.URL.createObjectURL(file)
    // img.onload = function (ev) {
    // window.URL.revokeObjectURL(blobURL); // release memory
    // // Use the img
    // };

    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL("image/jpeg")
}

function handleFormSubmission(e) {
    e.preventDefault();
    input_names.forEach(function (name) {
        let field = document.querySelector(`[name=${name}]`)
        let val
        if (field.type != "file") val = field.value
        else if (field.type == "file") {
            console.log(field.value)
            // let cropped_image_data = field.getAttribute("data-of-cropped-image")
            // if (cropped_image_data == null) val = generateSubmissionDataOfImage(field.files[0])
            // else if (cropped_image_data != null) val = cropped_image_data
            // console.log(val)
            console.log(
                reduceImageSize(field.files[0])
            )
        }
    })
}

document.querySelector("form").onsubmit = handleFormSubmission

