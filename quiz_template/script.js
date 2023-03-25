const
    doc = document,
    $ = (selector) => doc.querySelector(selector),
    $all = (selector) => doc.querySelectorAll(selector),
    to2Digit = (str) => (str < 10) ? '0' + str : str,
    text = (selector, str, flag = 'o') => {
        /* flag
        ** a - append
        ** o - overwrite
        */
        if (typeof str == Number) str = (str < 10) ? '0' + str : str
        str = (str == undefined) ? undefined : str.toString()
        if ((selector.trim().length > 0) && (str == undefined)) { return $(selector).innerText }
        else if (flag === 'a' && str != undefined && str.trim().length > 0) { $(selector).innerText += str; return }
        else if (str != undefined && str.trim().length > 0) { $(selector).innerText = str; return }
    },
    ClassUtil = {
        switch: (selector, oldClass, newClass) => {
            if (oldClass.trim().length > 0) $(selector).classList.remove(oldClass)
            if (newClass.trim().length > 0) $(selector).classList.add(newClass)
        }
    };


// FullScreen
const FullScreen = {
    init: () => {
        $('#enterFullScreenBtn').onclick = FullScreen.open
        $('#exitFullScreenBtn').onclick = FullScreen.close
    },
    open: () => {
        let e = doc.documentElement

        if (e.requestFullscreen) e.requestFullscreen()
        else if (e.webkitRequesstFullScreen) e.webkitRequesstFullScreen()
        else if (e.msRequestFullScreen) e.msRequestFullScreen()

        ClassUtil.switch('#fullscreen', 'off', 'on')
    },
    close: () => {

        if (doc.exitFullscreen) doc.exitFullscreen()
        else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen()
        else if (doc.msExitFullscreen) doc.msExitFullscreen()

        ClassUtil.switch('#fullscreen', 'on', 'off')
    }
}


/* Countdown
** max hours = 24
** max minutes = 60
** max seconds = 60
*/
let
    countdown_interval_loop = undefined,
    countdown_status = 'off'
const months = (num) => { arr = 'jan feb mar apr may jun jul aug sep oct nov dec'.split(' '); return arr[num] }

const Countdown = {
    start: () => {
        if (countdown_status === 'on') return
        countdown_status = 'on'

        let
            h = parseInt(text('#hours')),
            m = parseInt(text('#minutes')),
            s = parseInt(text('#seconds')),
            d = new Date(),
            deadline = new Date(`${months(d.getMonth())} ${d.getDate()}, ${d.getFullYear()} ${d.getHours() + h}:${d.getMinutes() + m}:${d.getSeconds() + s}`).getTime()

        countdown_interval_loop = setInterval(() => {
            let
                now = new Date().getTime(),
                t = deadline - now,
                // days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)),
                seconds = Math.floor((t % (1000 * 60)) / 1000)

            if (t < 0) Countdown.stop()
            else {

                if (minutes <= 5) ClassUtil.switch('#countdown', '', 'warn')

                $('#hours').innerText = to2Digit(hours)
                $('#minutes').innerText = to2Digit(minutes)
                $('#seconds').innerText = to2Digit(seconds)
            }
        }, 1000)

        console.log('Countdown START')
    },
    stop: () => {
        clearInterval(countdown_interval_loop)
        ClassUtil.switch('#countdown', 'warn', 'timeout')
        countdown_status = 'off'
        $('#submitBtn').remove()
        console.log('Countdown OFF')
    }
}


// QUIZ
let collect_answers = {}
const Quiz = {
    init: () => {
        $('#startBtn').onclick = Quiz.start
        $('#confirmBtn').onclick = Overview.open

        $('#overview').style.display = 'none'
    },
    start: () => {
        $('#overview').style.display = 'initial'
        FullScreen.open()
        Scroll.enable()
        Scroll.firstQuestion()
        Countdown.start()
    },
    collect_answers: () => {
        let collected_answers = {}
        $all('#questions .question').forEach((qn) => {
            let
                qn_no = qn.getAttribute('data-qn'),
                question = qn.querySelector('h3').innerText

            collected_answers[qn_no] = {
                'question': question,
                'option': marked_options[qn_no]
            }
        })
        return collected_answers
    },
    end: () => {
        if (Input.check_all_attempted()) {

            console.log('all attempted')

            Countdown.stop()
            Overview.close()
            FullScreen.close()
            Input.disableAll()

            // ans
            let ans = JSON.stringify(Quiz.collect_answers())
            $('form input[name="overview"]').value = ans
            console.log(ans)
            console.log(
                "answers submitted by user :\n",
                JSON.parse($('form input').value)
            )
            // $('form').submit()
        } else {
            Overview.close()

            let unattempted_qn_no = $('#questionStatus button.unattempted').getAttribute('data-qn')
            $(`#questions div.question[data-qn="${unattempted_qn_no}"]`).scrollIntoView()
        }
    }
}


// question scroll next & previous btn functions
const Scroll = {
    init: () => {
        $all('button[data-btn-type="next"]').forEach(btn => btn.onclick = Scroll.nextQuestion)
        $all('button[data-btn-type="prev"]').forEach(btn => btn.onclick = Scroll.previousQuestion)

        Scroll.disable()
    },
    firstQuestion: () => {
        $('div[data-qn="01"]').scrollIntoView()

        Progress.update()
    },
    nextQuestion: (e) => {
        let
            parent_node = ((e.target).parentNode).parentNode,
            next_sibling = parent_node.nextElementSibling

        next_sibling.scrollIntoView()
        Progress.update()
    },
    previousQuestion: (e) => {
        let
            parent_node = ((e.target).parentNode).parentNode,
            prev_sibling = parent_node.previousElementSibling

        prev_sibling.scrollIntoView()
        Progress.update()
    },
    disable: () => $('#questions').style.display = 'none',
    enable: () => $('#questions').style.display = 'initial',
}


// page/quiz progress bar
const Progress = {
    init: () => doc.onscroll = Progress.update,
    update: () => Progress.update_bar(),
    update_bar: () => {
        const bar = $('#progressBar span')
        let percent = (doc.body.scrollTop || doc.documentElement.scrollTop) / (doc.documentElement.scrollHeight - doc.documentElement.clientHeight) * 100
        bar.style.width = percent + '%'
    }
}


// input radio buttons event listners
let marked_options = {}
const
    questions = $all('#questions .question'),
    questions_count = ($all('#questions .question')).length,
    a_to_z = 'abcdefghijklmnopqrstuvwxyz'.split('')

const Input = {
    init: () => {
        let all_radio_inputs = $all('.options label input[type="radio"]')
        all_radio_inputs.forEach(input => input.onclick = Input.mark)
    },
    mark: (e) => {
        let
            qn_no = ((((e.target).parentNode).parentNode).parentNode).getAttribute('data-qn'),
            opt_val = ((e.target).parentNode).innerText,
            otp_no = 1, //  default
            index = 1,  //  default
            span = (((e.target).parentNode).parentNode)

        span.querySelectorAll('label').forEach(label => (label.innerText === opt_val) ? otp_no = index : index++);

        let
            opt_char = a_to_z[otp_no - 1]

        marked_options[qn_no] = {
            'option no': otp_no,
            'option char': opt_char,
            'option value': opt_val
        }

        Overview.update_button_status(qn_no)
    },
    check_all_attempted: () => {
        let temp = []
        $all('.options label input[type=radio]').forEach((input) => {
            if (temp.includes(input.name)) return
            let getSelectedValue = $(`.options label input[name="${input.name}"]:checked`)
            if (getSelectedValue != null)
                temp.push(input.name)
        })
        if (questions_count === temp.length)
            return true
        return false
    },
    disableAll: () => $all('.options label input[type=radio]').forEach((input) => input.setAttribute('disabled', true))
}


// overview/status of all questions in quiz
const Overview = {
    init: () => {
        questions.forEach(qn = (qn) => {
            let qn_no = qn.getAttribute('data-qn')

            $('#questionStatus').innerHTML += `<button data-qn="${qn_no}" class="unattempted">${qn_no}</button>`
        })

        $all('#questionStatus button[data-qn]').forEach(btn => btn.onclick = Overview.button_clicked)

        $('#overviewButton').onclick = Overview.open
        $('#close_overview').onclick = Overview.close
        $('#submitBtn').onclick = Quiz.end
    },
    open: () => ClassUtil.switch('#overview', 'close', 'open'),
    button_clicked: (e) => {
        Overview.close()

        let qn_no = (e.target).getAttribute('data-qn')
        $(`#questions div.question[data-qn="${qn_no}"]`).scrollIntoView()
    },
    update_button_status: (qn_no) => ClassUtil.switch(`#questionStatus button[data-qn="${qn_no}"]`, 'unattempted', 'attempted'),
    close: () => ClassUtil.switch('#overview', 'open', 'close')
}


// theme selector
const ThemeSwitcher = {
    init: () => {
        $('#themeSwitcherButton').onclick = ThemeSwitcher.open
        $('#close_themeSwitcher').onclick = ThemeSwitcher.close

        $all('#themeSwitcherContainer span button[data-theme-id]').forEach(btn => btn.onclick = ThemeSwitcher.load)

        let
            is_light_theme_mode = window.matchMedia("(prefers-color-scheme: light)").matches,
            system_theme_mode = (is_light_theme_mode) ? "light" : "dark"

        ThemeSwitcher.update(system_theme_mode)

        // view for changes in theme mode
        window
            .matchMedia("(prefers-color-scheme: light)")
            .addEventListener('change', function (e) {
                ThemeSwitcher.update(
                    (e.matches) ? "light" : "dark"
                )
            })
    },
    open: () => ClassUtil.switch('#themeSwitcher', 'close', 'open'),
    load: (e) => {
        let theme_id = (e.target).getAttribute('data-theme-id')

        ThemeSwitcher.update(theme_id)
        ThemeSwitcher.close()
    },
    update: (theme_id) => $('#theme_file').href = `./css/themes/${theme_id}.css`,
    close: () => ClassUtil.switch('#themeSwitcher', 'open', 'close')
}


// init functions
const Init = {
    test: () => {
        Overview.init()
        ThemeSwitcher.init()
        FullScreen.init()
        Scroll.init()
    },
    production: () => {
        Quiz.init()
        Input.init()
        Scroll.init()
        Overview.init()
        Progress.init()
        ThemeSwitcher.init()
        FullScreen.init()
    }
}
Init.production()
