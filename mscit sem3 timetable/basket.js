function Tag(arg = { tag: 'p', attr: {}, content: '' }) {
    let tag = document.createElement(arg.tag)
    for (let attr in arg.attr)
        tag.setAttribute(attr, arg.attr[attr])
    tag.innerHTML = arg.content
    return tag;
}

let config = {
    update: false
}

// export Basket variable
export const Basket = {
    config: function (arg = { updated_on: undefined }) {
        let updated = parseInt(localStorage.getItem('updated_on'))
        if (updated && updated != arg.updated_on) {
            config.update = true
            for (let key in arg) {
                config[key] = arg[key]
                localStorage.setItem(key, arg[key])
            }
        } else if (updated == null) {
            localStorage.setItem('updated_on', arg.updated_on)
            config.update = true
        }
    },
    require: function (...args) {
        for (let arg of args) {
            let key = (arg.key != null) ? arg.key : arg.url;
            let should_refetch = (config.update) ? true : (Basket.load(key)) ? false : true;
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
            if (file_type === 'js') document.querySelector('head').append(Tag({ tag: 'script', attr: { defer: true }, content: localStorage.getItem(key) }))
            else if (file_type === 'css') document.querySelector('head').append(Tag({ tag: 'style', content: localStorage.getItem(key) }))
            return true
        }
        return false
    }
}