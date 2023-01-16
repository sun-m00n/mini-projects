// console.log(array_2d)

function stringToHtml(str) {
    let p = document.createElement('p')
    p.innerHTML = str
    return p.children
}

const Generate = {
    sortBtn: (columnNo) => stringToHtml(`
    <button type="button" onclick="sort(this,${columnNo})">
        <img src="./imgs/caret-down.svg"/>
    </button>`)[0],
    filterBtn: (columnNo) => stringToHtml(`
    <button type="button" onclick="filter(this,${columnNo})">
        <img src="./imgs/filter.svg"/>
        <form class="filter-box">
            <span class="head">
                <button type="button">refresh</button>
            </span>
            <span class="body"></span>
            <span class="footer">
                <button type="reset">reset</button>
                <button type="submit">apply</button>
            </span>
        </form>
    </button>`)[0]

}

function GenerateHtmlTags(str) {

    let arrayOfTagString = str.split(';') || [str]
    let tags = []

    for (const stringTag of arrayOfTagString) {

        let tagName = stringTag.split('@')[0] || stringTag
        let tag = document.createElement(tagName)

        if (tag.toString() === "[object HTMLUnknownElement]") {
            tag = document.createElement('span')
            let text = document.createTextNode(tagName)
            tag.append(text)
        }

        let arrayOfAttributes = (stringTag.split('@')[1])?.split(',') || []

        arrayOfAttributes.forEach(attribute => {
            let attributeName = attribute.split('=')[0]
            let attributeValue = attribute.split('=')[1] || ''
            tag.setAttribute(attributeName, attributeValue)
        });

        tags.push(tag)
    }

    return tags;
}

function NewHtmlNestedTag(str) {

    let stringArrayOfTags = str.split(' > ')
    let child = GenerateHtmlTags(stringArrayOfTags.pop())[0]
    let parent = 'undefined'

    while (stringArrayOfTags.length > 0) {
        parent = GenerateHtmlTags(stringArrayOfTags.pop())[0]
        parent.append(child)
        child = parent
    }

    document.body.append(parent)
}

document.body.append(
    ...GenerateHtmlTags('input@id=mytable,class=table,type=text,value=hii;input;siru@id'),
)
NewHtmlNestedTag('div > p@id=p > text')










