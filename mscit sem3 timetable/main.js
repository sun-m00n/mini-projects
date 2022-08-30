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
            time: ['07:30 - 08:18', '08:18 - 09:06', '09:06 - 09:36', '09:36 - 10:24', '10:24 - 11:12', '11:12 - 12:00', '12:00 - 12:48', '12:48 - 01:36', '01:36 - 02:24']
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
    },
    share_svg_tag = `<svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 509 511.54"><path fill-rule="nonzero" d="M447.19 347.03c0-17.06 13.85-30.91 30.91-30.91 17.05 0 30.9 13.85 30.9 30.91v87.82c0 21.08-8.63 40.29-22.51 54.18-13.88 13.88-33.09 22.51-54.18 22.51H76.69c-21.09 0-40.3-8.63-54.18-22.51C8.63 475.14 0 455.93 0 434.85V76.69c0-21.09 8.63-40.3 22.51-54.18C36.39 8.63 55.6 0 76.69 0h86.98c17.06 0 30.9 13.85 30.9 30.9 0 17.06-13.84 30.91-30.9 30.91H76.69c-4.07 0-7.82 1.69-10.51 4.37-2.68 2.69-4.37 6.44-4.37 10.51v358.16c0 4.06 1.69 7.82 4.37 10.5 2.69 2.68 6.44 4.38 10.51 4.38h355.62c4.07 0 7.82-1.7 10.51-4.38 2.68-2.68 4.37-6.44 4.37-10.5v-87.82zm0-243.56L308.15 244.28c-11.91 12.12-31.45 12.28-43.56.37-12.11-11.91-12.28-31.45-.37-43.56L401.77 61.81H309.7c-17.06 0-30.9-13.85-30.9-30.91 0-17.05 13.84-30.9 30.9-30.9h168.4C495.15 0 509 13.85 509 30.9v165.04c0 17.06-13.85 30.9-30.9 30.9-17.06 0-30.91-13.84-30.91-30.9v-92.47z"/></svg>`,
    toInt = (num) => parseInt(num)

function add_lecture(arg = { specialization: 'AI', time: undefined, subject: undefined, staff: undefined, room: undefined }) {
    let time = (((arg.time).split(' '))[0]).split(':')
    document.querySelector(`#${arg.specialization.toLowerCase()}_container .lectures`).innerHTML += `
    <a href="${TT_data.data.link[arg.subject]}" target="_blank" class="card">
    <span class="left">${time[0]}<br>${time[1]}</span>
    <hr>
    <span class="right">
    <span class="subject">${arg.subject}</span>
    <span class="staff">${arg.staff}</span>
    <span><span class="room">${arg.room}</span><span>${share_svg_tag}</span></span>
    </span>
    </a></br>
    `
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

function scroll_subject() {
    let current_time = (((((new Date()).toString()).split(' '))[4]).split(':'))
    current_time = toInt(current_time[0] + current_time[1])

    document.querySelectorAll('span.left').forEach(ele => {
        let subject_time = toInt((ele.innerText).replace('\n', ''))
        if (Math.abs(current_time - subject_time) <= 10)
            (ele.parentNode).scrollIntoView({ behavior: 'smooth' })

    })


}
let refresh_subject_position = setInterval(scroll_subject(), 1000 * 60)