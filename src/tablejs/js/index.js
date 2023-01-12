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
        search_align: 'top-left', // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right
        tableId: ''
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

        // generate header
        let ths = []
        this.headers.forEach(function (th) {
            ths.push(['th', th])
        })

        // generate table
        // let table = _TAG_({ "table": { "thead": { 'tr': '' }, "tbody": '' } })
        // let table = $tv3("table", [["thead", ['tr', [['th', 'siru'], ['th', 's2']]]], ['tbody']])
        // let table = $tv3(["table", [["thead", ['tr', [['th', 'siru'], ['th', 's2']]]], ['tbody']]])
        let param = [`table${(this.options.tableId) ? '@' + this.options.tableId : ''}`, [
            ['thead', [
                ['tr',
                    // [['th', 'a'],
                    // ['th', 'b'],
                    // ['th', 'c']]
                    ths
                ]]],
            ['tbody']
        ]]

        let table = $tv3(param)
        // add headers
        // table.querySelector('thead tr').append(...ths)
        // add table
        this._('#' + this.containerId).append(table)
    }

    add(datas) {
        let tbody = this._('#' + this.containerId + ' tbody')
        datas.forEach(data => {
            let tds = new Array(this.headers.length)
            for (let key in data) {
                let column_index = this.headers.indexOf(key)
                tds[column_index] = $tv3(['td', data[key]])
            }
            let tr = $tv3(['tr'])
            for (let i = 0; i < tds.length; i++) {
                tds[i] = (typeof tds[i] === 'undefined') ? $tv3(['tr']) : tds[i]
            }
            tr.append(...tds)
            tbody.append(tr)
        })
    }


}
