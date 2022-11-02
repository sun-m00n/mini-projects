// filter by values
(() => {
    console.clear()

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let ymd = (dateStr) => {
        let t = new Date(dateStr)
        return {
            y: t.getFullYear(),
            m: monthNames[t.getMonth()],
            d: t.getDate()
        }
    }

    let tag = (name, id, context) => {
        let t = document.createElement(name);
        if (context) t.textContent = context
        if (id) t.id = id
        return t
    }

    let container = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material")
    if (container.querySelector("#filter-by-date")) return

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
    let details = tag("details", "")
    details.append(tag("summary", "", "Filter by Date"))
    details.append(tag("div"))
    for (let y in filter_data) {
        let yt = tag("details", "details-" + y)
        yt.append(tag("summary", "summary-" + y, y))
        for (let m in filter_data[y]) {
            let mt = tag("details", "details-" + y + "" + m)
            mt.append(tag("summary", "summary-" + y + "" + m, m))
            for (let d in filter_data[y][m]) {
                let dt = tag("span", "" + y + "" + m + "" + d, d)
                mt.append(dt)
            }
            yt.append(mt)
        }
        details.querySelector("div").append(yt)
    }

    // add tag
    let child = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material > div.waffle-filterbox-with-condition > div.waffle-filterbox-boolean-condition-picker > div.waffle-filterbox-boolean-condition-picker-title.goog-zippy-header.goog-zippy-collapsed")
    let parent = child.parentNode

    parent.insertBefore(details, child)

    // observe style change
    var observer = new MutationObserver(function (mutations) {
        console.log('style changed!', mutations.target);
    });

    var target = filter_menu;
    observer.observe(target, { attributes: true, attributeFilter: ['style'] });
})();
// 8097814045