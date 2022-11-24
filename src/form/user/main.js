const _$ = (selector) => document.querySelector(selector)
const _$$ = (selector) => document.querySelectorAll(selector)

console.log(
    _$$("form * button")
)

function init() {
    // CustomCroppr
    ["ApplicantImage", "ApplicantSign"].forEach(fileTagID => {
        let i = document.querySelector(`input[name='${fileTagID}']`)
        let btns = (i.parentNode).querySelectorAll("button")
        CustomCroppr.init({ input: i, crop: btns[0], view: btns[1] })
    })
}
init()
