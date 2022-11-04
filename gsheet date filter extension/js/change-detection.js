'use strict'

let filter_menu_selector = "body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material"

function is_Filter_Menu_Visible() {
    if (!_$(filter_menu_selector) || (_$(filter_menu_selector).style.display == 'none')) return false
    return true
}

// Filter Menu
let Filter_Menu_Observer = new MutationObserver(function () {
    if (!is_Filter_Menu_Visible()) {
        Remove_Date_Filter()
        return
    }
    Insert_Date_Filter()
})


// Body
let Body_Observer = new MutationObserver(function () {
    if (_$(filter_menu_selector)) {
        Insert_Date_Filter()
        // start observing filter menu if exists
        Filter_Menu_Observer.observe(_$(filter_menu_selector), { attributes: true, attributeFilter: ['style'] })

        // Body_Observer.disconnect()
    }
})

// start observe changes in body when dom is loaded
document.addEventListener("DOMContentLoaded", function () {
    Body_Observer.observe(_$("body"), { childList: true })
});

// end