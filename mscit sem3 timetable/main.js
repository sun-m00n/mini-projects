const
    days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
    TT_data = {
        data: {
            staff: {
                TWED: 'DIVYA',
                OS: 'GAURI',
                MA: 'NEETA',
                SBC: 'JYOTI',
                AAI: 'SWAPNA',
                RPA: 'NEEDHU',
                ML: 'PRAJAKTA'
            },
            link: {
                TWED: 'https://meet.google.com/jxd-ntmp-pvi',
                OS: 'https://meet.google.com/ryk-ojkf-qtr',
                MA: 'https://meet.google.com/nkf-zyrc-eqo',
                SBC: 'https://meet.google.com/xft-ymqg-quq',
                AAI: 'https://meet.google.com/brr-fvbw-pwj',
                RPA: 'https://meet.google.com/ixg-acvk-zrj',
                ML: 'https://meet.google.com/ikw-jiwj-dei?hs=122&authuser=1'
            },
            time: ['7.30 - 8.18', '8.18 - 9.06', '9.06 - 9.36', '9.36 - 10.24', '10.24 - 11.12', '11.12 - 12.00', '12.00 - 12.48', '12.48 - 1.36', '1.36 - 2.24']
        },
        AI: {
            mon: ['TWED/L2', 'TWED/L2'],
            tue: ['AAI/404', 'AAI/404'],
            wed: ['RPA/L3', 'RPA/L3'],
            thu: ['TWED/L4', 'ML/112'],
            fri: ['AAI/L6', 'ML/L6'],
            sat: ['RPA/404', 'TWED/404', 'BREAK', 'RPA/L5', 'ML/L5', 'AAI/404', 'ML/404', 'BREAK', 'AAI/L3']
        },
        SECURITY: {
            mon: ['TWED/L2', 'TWED/L2'],
            tue: ['OS/201', 'MA/201'],
            wed: ['SBC/L5', 'SBC/L5'],
            thu: ['TWED/L4', 'OS/L4'],
            fri: ['OS/L1', 'MA/L1'],
            sat: ['MA/404', 'TWED/404', 'BREAK', 'MA/L3', 'BREAK', 'SBC/404', 'OS/404', 'SBC/L3']
        }
    }

function add_lecture(arg = { specialization: 'AI', time: undefined, subject: undefined, staff: undefined, room: undefined }) {
    let container = document.querySelector(`#${arg.specialization.toLowerCase()}_container .lectures`),
        tr = ''

    for (let key in arg)
        if (key != 'specialization')
            tr += `<tr><td>${key}</td><td>${arg[key]}</td></tr>`

    container.innerHTML += `<a href="${TT_data.data.link[arg.subject]}" target="_blank"><table><tbody>${tr}</tbody></table><span>attend</span></a></br>`
}

document.querySelector('#datetime').innerHTML = (new Date()).toDateString()

Array('AI', 'SECURITY').forEach(function (specialization) {
    let
        now = new Date(),
        day = days[now.getDay()],
        lectures = TT_data[specialization][day]

    lectures.forEach(function (lecture, i) {
        let
            subject = lecture.split('/')[0],
            room = lecture.split('/')[1],
            staff = `Ms. ${TT_data.data.staff[subject]}`,
            time = TT_data.data.time[i]

        add_lecture({
            specialization: specialization,
            time: time,
            subject: subject,
            staff: staff,
            room: room
        })
    })
})