// console.log(array_2d)

class Tag {
    constructor() { }
}

class Table {

    $s = (e) => document.querySelector(a)
    $all = (e) => document.querySelectorAll(e)
    $c = (e) => document.createElement(e)

    cols = []
    rows = []
    options = {
        tableId: 'myTable'
    }

    constructor(header, data, options = {}) {
        this.cols = header
        this.rows = data
        this.options = { ...this.options, ...options }

        document.createElement('table')
        let { $c } = this
        let table = $c('table')
        //     .append(
        //     $c('tbody').append(
        //         $c('tr')
        //     )
        // )

        console.log(table)
    }

    addColumn(columnName) {
        let thead_row = document.querySelector('table thead tr')
        thead_row
    }

}

// console.log(
new Table([], [])
// )
