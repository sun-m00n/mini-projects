'use strict'

const _$ = (selector) => document.querySelector(selector),
    namesOfMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function ymd(dateStr, ...returnArgs) {
function ymd(dateStr) {
    let t = new Date(dateStr)
    // ,_data = {}

    // if (returnArgs.length > 0) {
    //     for (let arg of returnArgs) {
    //         if (arg == "y") _data["y"] = t.getFullYear()
    //         else if (arg == "m") _data["m"] = asset.namesOfMonth[t.getMonth()]
    //         else if (arg == "d") _data["d"] = t.getDate()
    //     }
    //     return _data
    // }
    return {
        y: t.getFullYear(),
        m: namesOfMonth[t.getMonth()],
        d: t.getDate()
    }
}

// function parent(ele, level) {
//     while (level > 0) {
//         ele = ele.parentNode
//         level--
//     }
//     return ele
// }
// HTMLElement["parent"] = parent.bind("parent")
// node[name] = fn.bind(node)

let randomIDs = []
function randomID() {
    let id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    if (randomIDs.includes(id)) randomID()
    randomIDs.push(id)
    return id
}

// end