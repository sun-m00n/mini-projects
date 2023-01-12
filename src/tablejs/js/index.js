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
    constructor(headers, options = this.options) {
        //    
        if (!options.containerId)
            options.containerId = this.containerId

        // update variables
        this.headers = headers
        this.containerId = options.containerId
        delete options.containerId
        this.options = { ...this.options, ...options }

        // add table

    }

    add(data) {


    }


}
