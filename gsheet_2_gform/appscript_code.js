const alphabetArray = "abcdefghijklmnopqrstuvwxyz".split("");
let required = true,
    points = 10;

const _ = {
    option: (column) => {

        column.shift()
        column.shift()
        column.pop()

        let newColumn = {}

        for (let i = column.length - 1; i >= 0; i--) {
            let on = (column.length - 1) - i
            newColumn[alphabetArray[on]] = column[on]
        }
        return newColumn
    },
    question: (column) => {
        return {
            q: column[0] + ' ' + column[1],
            a: column[column.length - 1],
            o: _.option(column)
        }
    }
}

const form = {
    create: () => {
        return FormApp.create(SpreadsheetApp.getActive().getName()).setIsQuiz(true)
    },
    add: {
        multipleChoiceItem: (newForm, _data) => {
            let item = newForm.addMultipleChoiceItem()
            item.setTitle(_data['q'])
                .setRequired(required)
                .setPoints(points)

            // generate choices
            let choices = []
            for (let i in _data['o']) {
                if ((_data['o'][i]).trim() == '--') continue
                if ((_data['o'][i]).trim() == '') continue
                choices.push(
                    item.createChoice(
                        i + ') ' + _data['o'][i],
                        (i.toLocaleLowerCase() == _data['a'].toLocaleLowerCase()) ? true : false
                    )
                )
            }

            item.setChoices(choices)    //  set choices
            return true
        }
    }
}

function createFormfromSheet() {
    let activeSheet = SpreadsheetApp.getActiveSheet()       //  get active sheet
    const columns = activeSheet.getDataRange().getValues()  //  get data from sheet

    let f = form.create()                              //  create new form
    for (let i = columns.length - 1; i >= 0; i--) {
        //  add quiz choice question
        form.add.multipleChoiceItem(
            f,
            (_.question(columns[(columns.length - 1) - i]))
        )
    }
}
