'use strict'

function extract_Dates() {
    let nodes = document.querySelectorAll("div.waffle-filterbox-content > div.goog-menuitem.goog-option-selected.apps-menuitem.goog-option[role='menuitemcheckbox'] > div.goog-menuitem-content"),
        _data = {};

    nodes.forEach(node => {
        let context = node.textContent,
            date = new Date(context),
            yyyy = date.getFullYear(),
            mm = date.getMonth(),
            dd = date.getDate();
        if (!_data[yyyy]) _data[yyyy] = {}
        if (!_data[yyyy][mm]) _data[yyyy][mm] = {}
        if (!_data[yyyy][mm][dd]) {
            let uid = Math.random().toString(36).slice(2) + Date.now().toString(36)
            node.parentNode.setAttribute("uid", uid)
            _data[yyyy][mm][dd] = uid
        }
    })

    if (_data["NaN"]) delete _data["NaN"]

    return _data
}

function generate_Tag(_data) {
    let ele = document.createElement("p"),
        _checkbox = (context) => `<label><input type="checkbox">${context}</label>`,
        _ele = `<details id="customDateFilter"><summary>Filter by Date</summary><div>`;

    for (let y in _data) {
        let _y = `<details  class="year" data-year="${y}"><summary>${_checkbox(y)}</summary>`

        for (let m in _data[y]) {
            let _m = `<details class="month" data-month="${m}"><summary>${_checkbox(m)}</summary><div>`

            for (let d in _data[y][m]) {
                _m += `<span class="date" data-date="${d}" uid-copy="${_data[y][m][d]}">${_checkbox(d)}</span>`
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

function attach_Event_Listeners(tag) {
    function igotaclick(e) {
        let checkbox = (e.target),
            status = checkbox.checked,
            { parentName, parent } = identifyParent(checkbox)
        if (parentName == "date") clickedOn.date(parent, status)
        else if (parentName == "month") clickedOn.month(parent, status)
        else if (parentName == "year") clickedOn.year(parent, status)
    }

    let checkboxes = tag.querySelectorAll("input[type='checkbox']")
    checkboxes.forEach(checkbox => checkbox.onchange = igotaclick)

    return tag
}

function identifyParent(tag) {
    let existClass = (className) => tag.classList.contains(className),
        tagName = undefined,
        loop_condition = true
    do {
        tag = tag.parentNode
        if (tag.tagName == "SPAN" && existClass("date")) {
            tagName = "date"
            loop_condition = false
        }
        else if (tag.tagName == "DETAILS" && existClass("month")) {
            tagName = "month"
            loop_condition = false
        }
        else if (tag.tagName == "DETAILS" && existClass("year")) {
            tagName = "year"
            loop_condition = false
        }
    }
    while (loop_condition)

    return { parentName: tagName, parent: tag }
}
function performClickOnUid(id, state) {
    let t = document.querySelector(`[uid='${id}']`),
        cid = t.id
    // t.parentNode.parentNode.toggleAttribute("aria-activedescendant", true)
    t.parentNode.parentNode.setAttribute("aria-activedescendant", cid)
    t.classList.add("goog-menuitem-highlight")

    t.setAttribute("aria-checked", state)
    if (state)
        t.classList.add("goog-option-selected")
    else
        t.classList.remove("goog-option-selected")
    t.querySelector(".goog-menuitem-content").click()

    t.classList.remove("goog-menuitem-highlight")
    t.parentNode.parentNode.setAttribute("aria-activedescendant", "")
    // t.parentNode.parentNode.click()
    // t.parentNode.parentNode.toggleAttribute("aria-activedescendant", false)
}
let clickedOn = {
    date: function (dateTag, status) {
        let id = dateTag.getAttribute("uid-copy")
        if (status) {
            dateTag.classList.add("checked")
            performClickOnUid(id, true)
            console.log('checked')
        }
        else if (!status) {
            dateTag.classList.remove("checked")
            performClickOnUid(id, false)
            console.log('unchecked')
        }
    },
    month: function (monthTag) { },
    year: function (yearTag) { }
}

// function unCheck(tag) {
//     let checkboxes = tag.querySelector("input[type='checkbox']")
//     checkboxes.forEach(checkbox => checkbox.checked = false)
// }

function Insert_Date_Filter() {
    // remove filter if exist
    if (_$("#customDateFilter")) _$("#customDateFilter").remove()

    let dates = extract_Dates(),
        tag = generate_Tag(dates);

    tag = attach_Event_Listeners(tag)
    // add tag
    let node = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material > div.waffle-filterbox-with-condition > div.waffle-filterbox-boolean-condition-picker > div.waffle-filterbox-boolean-condition-picker-title.goog-zippy-header.goog-zippy-collapsed"),
        parent = node.parentNode

    parent.insertBefore(tag, node)
}

function Remove_Date_Filter() {
    if (_$("#customDateFilter")) _$("#customDateFilter").remove()
}

// end