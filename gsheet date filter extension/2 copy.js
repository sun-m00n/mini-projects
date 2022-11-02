
const _$ = (selector) => document.querySelector(selector)
let asset = {
    namesOfMonth: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ymd: function (dateStr) {
        let t = new Date(dateStr)
        return {
            y: t.getFullYear(),
            m: asset.namesOfMonth[t.getMonth()],
            d: t.getDate()
        }
    }
}
let
    FilterMenu = {
        selector: "body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material",
        isVisible: function () {
            if (!_$(FilterMenu.selector)) return false
            let menu = _$(FilterMenu.selector)
            if (menu.style.display == 'none') return false
            return true
        },
        mutationObserver: new MutationObserver(function () {
            if (!FilterMenu.isVisible()) {
                FilterMenu.customFilter.remove()
                return
            }
            FilterMenu.customFilter.add.filterByDate()
        }),
        items: {
            selector: "",

        },
        observer: {
            options: { attributes: true, attributeFilter: ['style'] },
            start: () => FilterMenu.mutationObserver.observe(_$(FilterMenu.selector), FilterMenu.observer.options)
        },
        customFilter: {
            ids: [],
            add: {
                filterByDate: function () {
                    let { ymd } = asset
                    let childrens = document.querySelector("#\\:xo\\.content-el").children
                    let filter_data = {}
                    // years
                    for (let child of childrens) {
                        let { y } = ymd(child.innerText)
                        filter_data[y] = {}
                    }
                    // months
                    for (let child of childrens) {
                        let { y, m } = ymd(child.innerText)
                        filter_data[y][m] = {}
                    }
                    // days
                    for (let child of childrens) {
                        let { y, m, d } = ymd(child.innerText)
                        filter_data[y][m][d] = child.id
                    }

                    // generate tag
                    let ele = document.createElement("p")
                    let _checkbox = (context) => `<label><input type="checkbox">${context}</label>`;
                    let _date = (y, m, d) => `<span class="date" id="${d}-${m}-${y}><label><input type="checkbox">${d}</label></span>`;

                    let _ele = `<details id="customDateFilter"><summary>Filter by Date</summary><div>`
                    for (let y of filter_data) {
                        let _y = `<details><summary class="year" id="summary-${y}">${_checkbox(y)}</summary>`
                        for (let m of filter_data[y]) {
                            let _m = `<details><summary class="month" id="summary-${y}-${m}">${_checkbox(m)}</summary><div>`
                            for (let d of filter_data[y][m]) {
                                _m += _date(y, m, d)
                            }
                            _m += `</div></details>`
                            _y += _m
                        }
                        _y += `</details>`
                        _ele += _y
                    }
                    _ele += `</div></details>`
                    ele.innerHTML = _ele
                    let customTag = ele.firstChild

                    console.log(customTag)

                    // add tag
                    let child = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material > div.waffle-filterbox-with-condition > div.waffle-filterbox-boolean-condition-picker > div.waffle-filterbox-boolean-condition-picker-title.goog-zippy-header.goog-zippy-collapsed")
                    let parent = child.parentNode

                    if (document.querySelector("#customDateFilter"))
                        document.querySelector("#customDateFilter").remove()

                    parent.insertBefore(customTag, child)

                    FilterMenu.customFilter.ids.push(customTag.id)
                }
            },
            remove: function () {
                for (let i in FilterMenu.customFilter.ids) {
                    let ele = _$("#" + (FilterMenu.customFilter.ids)[i])
                    if (ele)
                        ele.remove()
                    FilterMenu.customFilter.ids.slice(0, 1)
                }
            }
        }
    }
Body = {
    selector: "body",
    mutationObserver: new MutationObserver(function () {
        if (_$(FilterMenu.selector)) {
            // start observing filter menu if exists.
            FilterMenu.observer.start()
            // disconnect body observer
            Body.observer.end()
        }
    }),
    observer: {
        options: { childList: true },
        start: () => Body.mutationObserver.observe(_$(Body.selector), Body.observer.options),
        end: () => Body.mutationObserver.disconnect()
    }
};

document.addEventListener("DOMContentLoaded", function () {
    console.log("DomContentLoaded")
    Body.observer.start()
});



function createTag({ name, id, classname, context, childrens }) {
    let _create = (name) => document.createElement(name)

    let _tag = _create(name)
    if (id) _tag.id = id
    if (classname) _tag.class = classname
    if (context) _tag.innerText = context
    if (childrens && childrens.length > 0) {
        for (let child of childrens) _tag.append(child)
    }
    return _tag
}


function createTagFromTextHTML(tagInTextFormat) {
    let ele = document.createElement("p")
    ele.innerHTML = tagInTextFormat
    return ele.firstChild
}

function e() {
    let _checkbox = (context) => `<label><input type="checkbox">${context}</label>`;
    let _date = (y, m, d) => `<span class="date" id="${d}-${m}-${y}><label><input type="checkbox">${d}</label></span>`;

    let _ele = `<details id="customDateFilter"><summary>Filter by Date</summary><div>`
    for (let y of filter_data) {
        let _y = `<details><summary class="year" id="summary-${y}">${_checkbox(y)}</summary>`
        for (let m of filter_data[y]) {
            let _m = `<details><summary class="month" id="summary-${y}-${m}">${_checkbox(m)}</summary><div>`
            for (let d of filter_data[y][m]) {
                _m += _date(y, m, d)
            }
            _m += `</div></details>`
            _y += _m
        }
        _y += `</details>`
        _ele += _y
    }
    _ele += `</div></details>`
}

// end