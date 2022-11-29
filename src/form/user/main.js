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
        // node.setAttribute("required", true)
        names.push(node.name)
    })
    input_names = new Set(names)
})();

function api_key() {
    const keys = [
        "https://script.google.com/macros/s/AKfycbxQQbzNOoLTpHdxCJCdy6WR_yb49BQnWhUk9azF0yVII5sBrrmH_sERts7TKMgZQCRH/exec",
        "https://script.google.com/macros/s/AKfycbzoZPd7GxDYjq011kk2F9J31yew4eQ2TzD2PmMIUgUN9T3MFXIrMycJUZzw9V4obqe7tA/exec",
        "https://script.google.com/macros/s/AKfycbxKe-CO6TOJkSIJ6VUV3Y3RAxNbkyGMSTbrhwfPU7WkRvyxaScU9bNXsYm40SjbNqzg/exec",
        "https://script.google.com/macros/s/AKfycbxScyz0LDe0Owv8Cd_7kvxmRAkmC8-OrhryXhaqz8w2Z92LNL304oiYU0ySSjAKvx8N5w/exec",
        "https://script.google.com/macros/s/AKfycbyqlpKohSwmP1dGC6IcQvw51TZCvYT29LTHJe78RTJER_UW4Y5-y3iAagKPSox8CDmw/exec",
        "https://script.google.com/macros/s/AKfycbyIUlQ_D7J7QRI2gS56yPAFhVPcDrpcaHQenuoS1M7NoJegv8hnHgJWwCLJQVOGAwK2Xw/exec",
        "https://script.google.com/macros/s/AKfycbwM-T_3yAoKt47tQ8K8oCIYiuN7apydnZLCoNHn3WhjrqIcY-kol8VnUjOJd_Hf6kszmw/exec",
        "https://script.google.com/macros/s/AKfycbx3KBJvmEHX2y1_umC9hXvqnatONVC-Ynpov_7gz-FK6CeIeHKNhcPG7o2PxErpF3DECw/exec",
        "https://script.google.com/macros/s/AKfycbxkdV02qW1G1vE3iBiEKrUW6riMWFHGDWxgUGLRIWMqyGmGbscF5mflWt9hNBBVrP4/exec",
        "https://script.google.com/macros/s/AKfycbzovIo8OifN9ZfLg2iFuOu4-sPCV_fWhhdYBy88s0j3AIkLOgmbm7kKsdpqt-apqHkd/exec",
    ]
    return "https://script.google.com/macros/s/AKfycbxQQbzNOoLTpHdxCJCdy6WR_yb49BQnWhUk9azF0yVII5sBrrmH_sERts7TKMgZQCRH/exec"
    return keys[Math.round(Math.random() * keys.length)]
}

function handleFormSubmission(e) {
    e.preventDefault();
    let data = {}
    input_names.forEach(function (name) {
        let field = document.querySelector(`[name=${name}]`)
        let val
        if (field.type != "file") val = field.value
        else if (field.type == "file") val = field.getAttribute("data-of-cropped-image")
        data[name] = val
        // console.log(name)
    })

    // console.log(api_key())
    // console.log(JSON.stringify(data))
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch("https://script.google.com/macros/s/AKfycbxQQbzNOoLTpHdxCJCdy6WR_yb49BQnWhUk9azF0yVII5sBrrmH_sERts7TKMgZQCRH/exec", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
        mode: "cors"
    })
        // .then(response => console.log(response))
        .then(response => response.json())
        .then(result => {
            alert("Response has been collected.")
            alert("Your Form No:. " + result.formNo)
        })
        .catch(error => {
            console.log(error)
            alert("WAIT...")
            setTimeout(function (e) {
                handleFormSubmission(e)
            }, 60 * 1000, e)
        })
    // console.log(data)
    // console.log(Object.keys(data))
    // console.log(sizeOfData(data))
}

document.querySelector("form").onsubmit = handleFormSubmission


// function sizeOfData(json_data) {
//     let str = null;
//     if (typeof json_data === 'string') str = json_data
//     else str = JSON.stringify(json_data)
//     // Get the length of the Uint8Array
//     let bytes = new TextEncoder().encode(str).length;
//     let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     if (bytes == 0) return `0 ${sizes[0]}`;
//     let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
//     if (i == 0) return bytes + ' ' + sizes[i];
//     return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
// }

