// (() => {
//     let container = document.querySelector("body > div.goog-menu.goog-menu-vertical.waffle-filterbox-container.docs-material"),
//         filterbox = container.querySelector("div.waffle-filterbox-with-condition"),
//         child = filterbox.querySelector("div.waffle-filterbox-boolean-condition-picker"),

//         p = document.createElement("details")

//     p.innerText = "kooo"
//     filterbox.insertBefore(p, child)

// })();

// // filter by values
// (() => {
//     console.clear()
//     let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     let childrens = document.querySelector("#\\:xo\\.content-el").children
//     let filter = {}
//     let log = {}
//     for (let child of childrens) {
//         // let d = new Date(child.innerText)
//         try {
//             // let d = new Date(child.innerText)
//             let d = new Date(child.textContent)
//             log[child.innerText] = d
//             let year = d.getFullYear()
//             let month = monthNames[d.getMonth()]
//             let date = d.getDate()

//             if (filter[year]) {
//                 if (filter[year][month]) {
//                     if (filter[year][month][date]) {
//                         (filter[year][month][date]).push(child.id)
//                     }
//                     else {
//                         filter[year][month][date] = [];
//                         (filter[year][month][date]).push(child.id)
//                     }
//                 }
//                 else {
//                     filter[year][month] = {};
//                     filter[year][month][date] = [];
//                     (filter[year][month][date]).push(child.id)
//                 }
//             }
//             else {
//                 filter[year] = {}
//                 filter[year][month] = {};
//                 filter[year][month][date] = [];
//                 (filter[year][month][date]).push(child.id)
//             }
//         } catch (error) {

//         }
//     }
//     console.log(filter)
//     // console.log(log)
// })();