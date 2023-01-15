'use strict'
console.clear()
const $s = (e) => document.querySelector(e)
const $all = (e) => document.querySelectorAll(e)
const $c = (e) => document.createElement(e)
function tagArray(tagName, dataArray) {
    let tags = []
    let len = dataArray.length - 1
    for (let index in dataArray) {
        let data = dataArray[index]
        let tag = $c(tagName)
        tag.append(data)
        if (parseInt(index) === len) {
            let date = new Date(data)
            let yyyy = date.getFullYear()
            let mm = date.getMonth() + 1
            let dd = date.getDate()
            tag.setAttribute('data-filterby', `${yyyy}-${mm}-${dd}`)
        }
        tags.push(tag)
    }
    return tags
}
const container = $s("#container")
const table = container.querySelector("#myTable")
const tbody = table.querySelector("tbody")
for (let data of array_2d) {
    let tr = $c('tr')
    let tds = tagArray('td', data)
    tr.append(...tds)
    tbody.append(tr)
}


function initFilter(self, columnNo) {
    // let trs = tbody.querySelectorAll('tr td:first-child')
    let tds = tbody.querySelectorAll(`tr td:nth-child(${columnNo})`)
    let list = new Set()
    console.log(self)
    let filter_body = self.querySelector('form.filter-box > div.body')
    console.log(filter_body)
    tds.forEach((tr, index, arr) => {
        // list.add(tr.innerText || tr.textContent)
        console.log(tr)
        // self.querySelector('form.filter-box .body').innerText += tr.innerText || tr.textContent
    })
    list.forEach(v => {
    })
    // let list = new Set()
}
function filter(self, columnNo) {
    initFilter(self, columnNo)

    self.querySelector('form.filter-box').onsubmit = (e) => {
        e.preventDefault()
        applyFilter(e, columnNo)
    }
}
function applyFilter(form, columnNo) {
    console.log(form, columnNo)
}

function sort(columnNo) { }
$all('form.filter-box').forEach(form => {
    form.onsubmit = function (e) {
        e.preventDefault()
    }
})

