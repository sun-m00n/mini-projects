let $ = (selector) => document.querySelector(selector)
let $$ = (selector) => document.querySelectorAll(selector)

function log(str) {
    $("console").innerText = str
    $("console").classList = ["active"]
    setTimeout(() => {
        $("console").classList = []
        $("console").innerText = ""
    }, 3000);
}

$$("tabs a").forEach(a => {
    a.onclick = function (e) {
        $$("tabs a").forEach(a => a.classList = [])
        e.target.classList = ["active"]
    }
})

$("#page1 form").onsubmit = function (e) {
    e.preventDefault()
    let url = $("#page1 * #url").value,
        keyword = $("#page1 * #keyword").value,
        keywords = ($("#page1 * #keywords").value).split("\n")

    log(keyword)
    log(keywords)
}

function loadvideocahce() {

}
loadvideocahce()