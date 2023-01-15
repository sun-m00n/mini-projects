// function $t(tagStr, childrens = []) {
//     let htmlTag;

//     let str = tagStr.split(/[@]/gm)
//     let attrs = (str[1])?.split(',') || []

//     htmlTag = document.createElement(str[0]) // str[0] = tag-name

//     for (let attr of attrs) {
//         attr = attr.split('=')
//         htmlTag.setAttribute(attr[0], attr[1])
//     }

//     if (childrens.length > 0 && Array.isArray(childrens))
//         htmlTag.append(...childrens)

//     return htmlTag;
// }
function $tv2(tagStr, childrens = []) {
    let htmlTag;

    // console.log(tagStr)
    // if (Array.isArray(tagStr)) {
    //     tagStr = tagStr[0]
    //     childrens = tagStr[1]
    // }

    let str = tagStr.split(/[@]/gm)
    let attrs = (str[1])?.split(',') || []

    htmlTag = document.createElement(str[0]) // str[0] = tag-name

    for (let attr of attrs) {
        attr = attr.split('=')
        htmlTag.setAttribute(attr[0], attr[1])
    }

    if (childrens.length > 0 && Array.isArray(childrens)) {
        childrens.forEach(child => {
            let tagName = (typeof child === 'string') ? child : child[0],
                tagChildrens = (typeof child === 'object') ? child[1] : [];
            // tagChildrens = (typeof child[1] === 'string') ? child[1] : []
            htmlTag.append($tv2(tagName, tagChildrens))
        })
    } else if (typeof childrens === 'string') {
        htmlTag.append(childrens)
    }

    return htmlTag;
}
// ("table",
//     [
//         ["thead",
//             ['tr',
//                 [
//                     ['th', 'siru'],
//                     ['th', 's2']
//                 ]
//             ]
//         ],
//         ['tbody']
//     ]
// )
let param = ['table', [
    ['thead', [
        ['tr', [
            ['th', 'a'],
            ['th', 'b'],
            ['th', 'c']]
        ]]],
    ['tbody']
]]

function $tv3(array) {
    let htmlTag;

    let str = array[0].split(/[@]/gm)
    let attrs = (str[1])?.split(',') || []

    htmlTag = document.createElement(str[0]) // str[0] = tag-name

    for (let attr of attrs) {
        attr = attr.split('=')
        htmlTag.setAttribute(attr[0], attr[1])
    }

    if (array[1] && array[1].length > 0 && Array.isArray(array[1])) {
        array[1].forEach(arr => htmlTag.append($tv3(arr)))
    }
    else if (typeof array[1] === 'string') {
        htmlTag.append(array[1])
    }

    return htmlTag;
}


// function _TAG_(object) {
//     let htmlTag;
//     for (let parent in object) {
//         let str = parent.split(/[@]/gm)
//         // let str = parent.split(/[@&]/gm)
//         let attrs = (str[1])?.split(',') || []
//         // let events = (str[2]).split(',') || []

//         htmlTag = document.createElement(str[0]) // str[0] = tag-name

//         for (let attr of attrs) {
//             attr = attr.split('=')
//             htmlTag.setAttribute(attr[0], attr[1])
//         }

//         if (typeof object[parent] === 'object') {
//             htmlTag.append(_TAG_(object[parent]))
//         }

//         // if (typeof object[parent] != 'object') {
//         if (object[parent].length > 0 || typeof object[parent] === 'string')
//             htmlTag.append(document.createTextNode(object[parent]))
//         // }
//     }
//     return htmlTag;
// }

/**
 * @notes
 * var str="ao3 ako lopo"
 * var index = str.indexOf(" ") // get first index of " "
 * var firstStr=str.subString(0,index)
 * var remainingStr=str.subString(index+1)
 */


// function _TAG_(param) {

// }
// _TAG_(
//     [{
//         parent: "html",
//         childrens: [
//             {parent: ""}
//         ]
//     }]
// )
