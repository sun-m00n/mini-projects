function Tag(arg = { tag: 'p', attr: {}, content: '' }) {
    let tag = document.createElement(arg.tag)
    for (let attr in arg.attr)
        tag.setAttribute(attr, arg.attr[attr])
    tag.innerHTML = arg.content
    return tag;
}

let config = {
    refetch: false
}

// export Basket variable
export const Basket = {
    // config: function (arg = { refetch: false }) {
    //     config.refetch = arg.refetch
    // },
    require: function (...args) {
        for (let arg of args) {
            let key = (arg.key != null) ? arg.key : arg.url;
            let should_refetch = (arg.refetch) ? true : (Basket.load(key)) ? false : true;
            if (should_refetch) {
                fetch(arg.url, { method: 'GET', redirect: 'follow' })
                    .then(response => response.text())
                    .then(result => {
                        localStorage.setItem(key, result)
                        Basket.load(key)
                    })
            }
        }
    },
    load: function (key) {
        if (localStorage.getItem(key) != null) {
            let file_type = ((key.split('.')).slice(-1))[0]
            if (file_type === 'js')
                document.querySelector('head').append(Tag({ tag: 'script', attr: { defer: true }, content: localStorage.getItem(key) }))
            else if (file_type === 'css')
                document.querySelector('head').append(Tag({ tag: 'style', content: localStorage.getItem(key) }))
            return true
        }
        return false
    }
}