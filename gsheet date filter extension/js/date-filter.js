'use strict'

function Extract_Dates() {
    let
        nodes = document.querySelector("#\\:xo\\.content-el").children,
        _data = {};

    // years
    for (let node of nodes) {
        let { y } = ymd(node.innerText)
        _data[y] = {}
    }

    // months
    for (let node of nodes) {
        let { y, m } = ymd(node.innerText)
        _data[y][m] = {}
    }

    // days
    for (let node of nodes) {
        let { y, m, d } = ymd(node.innerText),
            uid = randomID()
        node.setAttribute("data-id-parent", uid)
        _data[y][m][d] = uid
    }
    return _data
}

function Generate_Tag(_data) {
    let ele = document.createElement("p"),
        _checkbox = (context) => `<label><input type="checkbox">${context}</label>`,
        _date = (y, m, d, dataID) => {
            let selected = (document.querySelector(`[data-id-parent="${dataID}"]`).classList.contains("goog-option-selected")) ? "checked" : "";
            let str = `<span class="date" id="${d} ${m} ${y}"><label><input type="checkbox" data-id="${dataID}" ${selected}>${d}</label></span>`
            return str
        },
        _ele = `<details id="customDateFilter"><summary>Filter by Date</summary><div>`;

    for (let y in _data) {
        let _y = `<details><summary class="year" id="summary-${y}">${_checkbox(y)}</summary>`

        for (let m in _data[y]) {
            let _m = `<details><summary class="month" id="summary-${y}-${m}">${_checkbox(m)}</summary><div>`

            for (let d in _data[y][m]) {
                _m += _date(y, m, d, _data[y][m][d])
            }

            _m += `</div></details>`
            _y += _m
        }

        _y += `</details>`
        _ele += _y
    }

    _ele += `</div></details>`
    ele.innerHTML = _ele

    return ele.firstChild
}

let EventListeners = {
    toggle: {
        Date: function (n, selected) {
            let data_id = n.querySelector("* input[type='checkbox']").getAttribute("data-id"),
                source_ele = document.querySelector(`[data-id-parent="${data_id}"]`)
            n.checked = selected
            source_ele.setAttribute("aria-checked", selected)

            if (selected) {
                source_ele.classList.add("goog-option-selected")
                n.classList.add("checked")
            }
            else if (!selected) {
                source_ele.classList.remove("goog-option-selected")
                n.classList.remove("checked")
            }
        },
        Month: function (e, selected) {
            let parent_node = e.querySelector("div")
            let nodes = parent_node.querySelectorAll("input[type='checkbox']")
            nodes.forEach(function (node) {
                node.checked = selected
                node = node.parentNode.parentNode
                if (node.classList.contains("date")) EventListeners.toggle.Date(node, selected)
                // if (node.classList.contains("date")) console.log(node)
                else if (selected) node.classList.add("checked")
                else if (!selected) node.classList.remove("checked")
            })
        },
        Year: function (e, selected) {
            let parent_node = e.querySelector("details")
            let nodes = parent_node.querySelectorAll("input[type='checkbox']")
            nodes.forEach(function (node) {
                node.checked = selected
                node = node.parentNode.parentNode
                if (node.classList.contains("date")) EventListeners.toggle.Date(node, selected)
                // if (node.classList.contains("date")) console.log(node)
                else if (selected) node.classList.add("checked")
                else if (!selected) node.classList.remove("checked")
            })
        },
        all: function (e) {
            let n = (e.target).parentNode.parentNode,
                selected = (e.target).checked;

            // date
            if (n.classList.contains("date")) EventListeners.toggle.Date(n, selected)
            // month
            else if (n.classList.contains("month")) EventListeners.toggle.Month(n.parentNode.parentNode, selected)
            // year
            else if (n.classList.contains("year")) EventListeners.toggle.Year(n.parentNode.parentNode, selected)
        }
    }
}

function attach_Event_Listeners(tag) {
    // all checkboxes
    let tags = tag.querySelectorAll("input[type='checkbox']")
    tags.forEach(tag => tag.onclick = EventListeners.toggle.all)
    // individuals checkboxes
    // tags = tag.querySelectorAll("span.date label input[type='checkbox']")
    // tags.forEach(checkbox => checkbox.onchange = EventListeners.toggle_Date)
    return tag
}

function apply_Filters(tag, dates) {
    // date
    let tags = tag.querySelectorAll("input[data-id]")
    tags.forEach(function (tag) {
        let id = tag.getAttribute("data-id"),
            selected = document.querySelector(`[data-id-parent='${id}']`).classList.contains("goog-option-selected")
        if (selected) EventListeners.toggle.Date(tag.parentNode.parentNode, selected)
    })

    // month

    return tag
}

function Insert_Date_Filter() {
    Remove_Date_Filter()

    let dates = Extract_Dates(),
        tag = Generate_Tag(dates);

    tag = attach_Event_Listeners(tag)
    tag = apply_Filters(tag, dates)
    // add tag
    let node = _$("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material > div.waffle-filterbox-with-condition > div.waffle-filterbox-boolean-condition-picker > div.waffle-filterbox-boolean-condition-picker-title.goog-zippy-header.goog-zippy-collapsed"),
        parent = node.parentNode

    parent.insertBefore(tag, node)
}

function Remove_Date_Filter() {
    if (_$("#customDateFilter")) _$("#customDateFilter").remove()
}

// end