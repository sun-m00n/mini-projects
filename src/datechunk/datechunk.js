const monthsFullName = [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const monthsShortName = [, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const alpha_nth = ['Zeroth', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']


function DateChunks(year, month, date) {

    function getWeekNo(year, monthNo, date) {
        let startDay = (new Date(year, monthNo - 1, 1)).getDay(),
            noOfDays = new Date(year, monthNo, 0).getDate(),
            weekNo = 0,
            day = 1;

        if (date < startDay || date > noOfDays || monthNo < 1 || monthNo > 12) {
            throw Error('invalid params')
        }

        for (let i = 0; i <= 41; i++) {
            if (i % 7 === 0) weekNo++;
            if (i >= startDay && day <= noOfDays) {
                if (date === day) {
                    return weekNo
                }
                day++
            }
        }
    }
    let weekNo = getWeekNo(year, month, date);

    return {
        date: date,
        year: year,

        week: {
            no: weekNo,
            name: alpha_nth[weekNo] + " Week"
        },

        month: {
            no: month,
            fullname: monthsFullName[month],
            shortname: monthsShortName[month],
        },

        quarter: {
            no: Math.ceil((month) / 3),
            name: alpha_nth[Math.ceil(month / 3)] + " Quarter",
        },

        halfYear: {
            no: Math.ceil(month / 6),
            name: alpha_nth[Math.ceil(month / 6)] + " Half",
        }
    }
}
