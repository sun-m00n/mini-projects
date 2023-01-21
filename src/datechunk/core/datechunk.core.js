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
        },

        month: {
            no: month,
        },

        quarter: {
            no: Math.ceil((month) / 3),
        },

        halfYear: {
            no: Math.ceil(month / 6),
        }
    }
}
