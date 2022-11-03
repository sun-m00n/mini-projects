'use strict'

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
    },
    parent: function (ele, level) {
        while (level > 0) {
            ele = ele.parentNode
            level--
        }
        return ele
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
            filterByDateData: "",
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
                    let child_ids = []
                    let r = () => {
                        let s = Math.round(Math.random() * 1e9)
                        if (child_ids.includes(s))
                            r()
                        child_ids.push(s)
                        return s
                    }

                    for (let child of childrens) {
                        let { y, m, d } = ymd(child.innerText)

                        let t = r()
                        child.setAttribute("data-id-parent", t)
                        filter_data[y][m][d] = t
                    }

                    // generate tag
                    let ele = document.createElement("p")
                    let _checkbox = (context) => `<label><input type="checkbox">${context}</label>`;
                    let _date = (y, m, d, dataID) => `<span class="date" id="${d} ${m} ${y}"><label><input type="checkbox" data-id="${dataID}">${d}</label></span>`;

                    let _ele = `<details id="customDateFilter"><summary>Filter by Date</summary><div>`
                    for (let y in filter_data) {
                        let _y = `<details><summary class="year" id="summary-${y}">${_checkbox(y)}</summary>`
                        for (let m in filter_data[y]) {
                            let _m = `<details><summary class="month" id="summary-${y}-${m}">${_checkbox(m)}</summary><div>`
                            for (let d in filter_data[y][m]) {
                                _m += _date(y, m, d, filter_data[y][m][d])
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

                    // add tag
                    let child = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material > div.waffle-filterbox-with-condition > div.waffle-filterbox-boolean-condition-picker > div.waffle-filterbox-boolean-condition-picker-title.goog-zippy-header.goog-zippy-collapsed")
                    let parent = child.parentNode

                    if (document.querySelector("#customDateFilter"))
                        document.querySelector("#customDateFilter").remove()

                    customTag.querySelectorAll("input[type='checkbox']").
                        forEach(function (checkbox) {
                            checkbox.addEventListener("click", FilterMenu.customFilter.add.filterByDateEventListner, true)
                        })

                    customTag.querySelectorAll("span.date label input[type='checkbox']")
                        .forEach(function (checkbox) {
                            checkbox.addEventListener("change", function (e) {
                                let data_id = (e.target).getAttribute("data-id")
                                let selected = e.target.checked
                                let source_ele = document.querySelector(`[data-id-parent="${data_id}"]`)
                                source_ele.setAttribute("aria-checked", selected)
                                if (selected)
                                    source_ele.classList.add("goog-option-selected")
                                else if (!selected)
                                    source_ele.classList.remove("goog-option-selected")
                            })
                        })

                    parent.insertBefore(customTag, child)
                    FilterMenu.customFilter.ids.push(customTag.id)
                    FilterMenu.customFilter.filterByDateData = filter_data
                },
                filterByDateEventListner: function (e) {
                    let { parent } = asset
                    let p = e.target.parentNode.parentNode
                    let isChecked = (e.target).checked;
                    // date
                    if (p.classList.contains("date")) {
                        if (isChecked) p.classList.add("checked")
                        else if (!isChecked) p.classList.remove("checked")
                        console.log(p)
                    }
                    // month
                    else if (p.classList.contains("month")) {
                        let sibling = p.parentNode.parentNode.querySelector("div")
                        sibling.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
                            checkbox.checked = isChecked
                            if (isChecked) checkbox.parentNode.parentNode.classList.add("checked")
                            else if (!isChecked) checkbox.parentNode.parentNode.classList.remove("checked")
                        })
                        console.log(sibling)
                    }
                    // year
                    else if (p.classList.contains("year")) {
                        // let gp = p.parentNode.parentNode.querySelector("details")
                        let gp = parent(p, 2).querySelector("details")
                        gp.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
                            checkbox.checked = isChecked
                            if (isChecked) checkbox.parentNode.parentNode.classList.add("checked")
                            else if (!isChecked) checkbox.parentNode.parentNode.classList.remove("checked")
                        })
                        console.log(gp)
                    }
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
    },
    Body = {
        selector: "body",
        mutationObserver: new MutationObserver(function () {
            if (_$(FilterMenu.selector)) {
                FilterMenu.customFilter.add.filterByDate()
                // start observing filter menu if exists
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




// end