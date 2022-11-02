
console.log("wow")

const _$ = (selector) => document.querySelector(selector)
const filter_menu_selector = "body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material"

let Observers = {
    body: new MutationObserver(function () {
        if (_$(FilterMenu.selector)) {
            Observers.body.disconnect()
            observe.filter_menu
        }
    }),
    filter_menu: new MutationObserver(changesDetectedInFilterMenu)
}

let observe = {
    body: () => Observers.body.observe(_$("body"), { childList: true }),
    filter_menu: () => Observers.filter_menu.observe(_$(FilterMenu.selector), { attributes: true, attributeFilter: ['style'] })
}

function changesDetectedInFilterMenu() {
    if (!_$(FilterMenu.selector)) return
    let filter_menu = _$(FilterMenu.selector)
    console.log(
        filter_menu.getAttribute("display")
    )
}

observe.body()

