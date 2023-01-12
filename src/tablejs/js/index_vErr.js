class ExcelTable {
    // selectors
    _ = (selector) => document.querySelector(selector)
    __ = (selectors) => document.querySelectorAll(selectors)
    // variables declaration
    headers = 'column1,column2,column3'.split(',')
    containerId = 'myTableContainerID'
    options = {
        pagination: true, // true | false
        pagination_align: 'bottom-right', // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
        max_rows_per_page: 100, //  miniumum: 0 | maximum: 100 (default)
        search: true, // true | false
        search_align: 'top-left' // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
    }
    // helper function
    checkInput(input, type, messages, throw_error = true) {
        let should_throw_error = false
        if (type === 'array' && (!input || input.length < 1 || !Array.isArray(input))) should_throw_error = true
        else if (type === 'string' && (typeof input != "string" || input.length < 1)) should_throw_error = true
        else if (type === 'object' && (typeof input != "object" || Object.keys(input).length < 1)) should_throw_error = true

        if (should_throw_error && throw_error) throw new Error(messages)
        return should_throw_error
    }
    // 
    constructor(headers, options = this.options) {
        // check headers
        // if (!headers || headers.length < 1 || !Array.isArray(headers)) throw new Error("Invalid params: thead")
        this.checkInput(headers, 'array', "Invalid params: thead")
        // check options
        this.checkInput(options, 'object', "Invalid params: options")
        // if (typeof options != "object") throw new Error("Invalid params: options")
        // check container id
        // if (typeof options.containerId != "string" || options.containerId.length < 1)
        if (this.checkInput(options.containerId, 'string', "", false))
            if (!this._(`#${this.containerId}`))
                throw new Error(`Table Container Not Found with id="${this.containerId}"`)
            else
                options.containerId = this.containerId
        else if (!this._(`#${options.containerId}`))
            throw new Error(`Table Container Not Found with id="${options.containerId}"`)

        // update variables
        this.headers = headers
        this.containerId = options.containerId
        delete options.containerId
        this.options = { ...this.options, ...options }

        // add table

    }

    add(data) {
        this.checkInput(data, 'array', "Invalid params: data")
        this.checkInput(data[0], 'object', "Invalid params: data")


    }


}
