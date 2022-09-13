// import { init_firebase } from "./firebase_code.js"

const
    doc = document,
    $ = (selector) => doc.querySelector(selector),
    $$ = (selector) => doc.querySelectorAll(selector)

const
    upload_data_input = $("#upload_data_input"),
    download_firebase_data = $("#download_firebase_data"),
    upload_data_section = $("#upload_data_section"),
    firebase_config_file_input = $("#firebase_config_file_input"),
    download_firebase_config_file = $("#download_firebase_config_file"),
    firebase_config_file_status = $("#firebase_config_file_status"),
    firebase_config_file_section = $("#firebase_config_file_section"),
    download_link = firebase_config_file_status.querySelector("#download_link"),
    logs = $("#logs")

const
    log = (arg) => {
        let
            arg0 = arg.split(" ")[0],
            arg1 = " " + arg.split(" ").slice(1).join(" ")
        logs.innerHTML += `<p><span>${arg0}</span>${arg1}</p>`
    },
    _save = (key, data) => localStorage.setItem(key, data),
    _load = (key) => localStorage.getItem(key)

let
    firebase_config_file_data = null,
    firebase_data = null

upload_data_input.onchange = () => {
    const file = upload_data_input.files[0]
    if (file) {
        log(`Uploading ${file.name}`)
        const reader = new FileReader()
        reader.onload = () => {
            const data = reader.result

            log(`Uploaded ${file.name}`)
            firebase_data = JSON.parse(data)
            // console.log(typeof firebase_data)

            upload_data_section.style.backgroundColor = "green"

            JSONiterater(firebase_data)
        }
        reader.readAsText(file)
    }
}

firebase_config_file_input.onchange = () => {
    const file = firebase_config_file_input.files[0]
    if (file) {
        log("Uploading " + file.name)
        const reader = new FileReader()
        reader.onload = () => {
            const data = reader.result

            log(`Uploaded ${file.name}`)
            _save("firebase_config_file", data)
            firebase_config_file_data = JSON.parse(data)
            console.log(typeof firebase_config_file_data)

            firebase_config_file_section.style.backgroundColor = "green"
        }
        reader.readAsText(file)
    }
}

download_firebase_config_file.onclick = () => {
    firebase_config_file_data = _load("firebase_config_file")
    if (firebase_config_file_data) {
        const blob = new Blob([firebase_config_file_data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        download_link.href = url
        download_link.download = "firebase_firebase_config_file.json"
        download_link.click()
    }
}

download_firebase_data.onclick = () => {
    if (firebase_data) {
        const blob = new Blob([firebase_data], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        download_link.href = url
        download_link.download = "firebase_data.json"
        download_link.click()
    }
}

function JSONiterater(jsonObj) {
    // console.log(jsonObj)
    for (let key in jsonObj) {
        if (typeof jsonObj[key] === "object") {
            JSONiterater(jsonObj[key])
        } else {
            console.log(key + ": " + jsonObj[key])
        }
    }
}

// init = () => {
function init() {
    if (_load("firebase_config_file")) {
        firebase_config_file_data = JSON.parse(_load("firebase_config_file"))
        firebase_config_file_section.style.backgroundColor = "green"
        log("config file exist in memory download to view")

        // init_firebase(firebase_config_file_data)
    }
}
init()