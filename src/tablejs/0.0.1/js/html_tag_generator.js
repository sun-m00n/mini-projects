function generateTag(array) {
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
