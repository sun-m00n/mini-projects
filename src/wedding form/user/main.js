const _$ = (selector) => document.querySelector(selector)

_$("form")

const Form = {
    fields: [
        "वधू / वराचे संपूर्ण नाव",
        "पत्ता",
        "जन्मस्थळ",
        "जन्म तारीख",
        "जन्म वेळ",
        "उंची", "फुट", "इंच", "वर्ण(रंग)",
        "शिक्षण",
        "नोकरी / व्यवसाय",
        "मसिक उत्पन्",
        "राहते घर स्वतःचे", "भाड्याचे",
        "बधू / वराची अपेक्षा",
        "इतर माहीती",
        "प्रथम", "घटस्फोटीत", "विधुर", "विधवा",
        "वडिलांचे पूर्ण नाव",
        "व्यवसाय / नोकरी",
        "आईचे पूर्ण नाव",
        "कौटुंवीक माहीती",
        "अर्जदाराचे पूर्ण नाव", "वधू / वराचे नाते",
        "संपक क.",
        "date",
        "अर्जदाराची सही"
    ]
}

Form.fields.forEach(fieldName => {
    _$("form").innerHTML += `<label class="input">
    <input class="input__field" type="text" placeholder=" " />
    <span class="input__label">${fieldName}</span>
            </label><br>`
})
_$("form").innerHTML += `<button>Submit</button>`

window.onfocus = function () {
    window.location.reload()
}
