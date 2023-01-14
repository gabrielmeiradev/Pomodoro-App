import {
    minutes as minutesElement,
    seconds as secondsElement,
    timeOptionLongBreak,
    timeOptionPomodoro,
    timeOptionShortBreak
} from './index.js';
import {
   updateButton
} from './buttons.js';
import {
    playSound
} from './sounds.js';


export function timeMask(time, type) {
    switch (type) {
        case 'minutes':
            time = Math.floor(time / 60)
            break

        case 'seconds':
            time = time - (Math.floor(time / 60) * 60)
            break
    }
    return (time > 9) ? time : '0' + time
}

export let timeInSeconds = [25 * 60, 25 * 60]; // [0] modified state - [1] backup state
export let modeInResume = 'pomodoro'
export let lastBreakChoose = 'short-break'

export function switchMode(mode) {
    let button
    switch (mode) {
        case 'pomodoro':
            timeInSeconds[0] = 25 * 60 // 25 minutes
            modeInResume = 'pomodoro';
            button = timeOptionPomodoro
            break
        case 'short-break':
            timeInSeconds[0] = 5 * 60 // 5 minutes
            modeInResume = 'break'
            button = timeOptionShortBreak
            break
        case 'long-break':
            timeInSeconds[0] = 10 * 60 // 10 minutes
            modeInResume = 'break'
            button = timeOptionLongBreak
            break
    }
    lastBreakChoose = mode == 'pomodoro' ? lastBreakChoose : mode
    timeInSeconds[1] = timeInSeconds[0]
    updateButton(button)
    renderTimer()

}

export function renderTimer() {
    let minutes = timeMask(timeInSeconds[0], 'minutes')
    let seconds = timeMask(timeInSeconds[0], 'seconds')

    minutesElement.innerText = minutes
    secondsElement.innerText = seconds


    document.title = `${minutes}:${seconds} | Pomodoro`
}

let timer;

export function startTimer() {
    if (timer) return
    timer = setInterval(() => {
        if (timeInSeconds[0] > 0) timeInSeconds[0]--
        else if (timeInSeconds[0] == 0) {
            modeInResume = modeInResume == 'pomodoro' ? 'break' : 'pomodoro'
            console.log(modeInResume)
            if (modeInResume == 'pomodoro') {
                playSound('step').then(() => {
                    switchMode('pomodoro')
                    console.log('step audio played')
                })
            } else {
                playSound('complete').then(() => {
                    switchMode(lastBreakChoose)
                    console.log('complete audio played')
                })
            }
        }
        return renderTimer()
    }, 1000)
}

export function restartTimer() {
    timeInSeconds[0] = timeInSeconds[1]
    renderTimer()
    startTimer()
}

export function stopTimer() {
    clearInterval(timer)
    timer = null
    timeInSeconds[0] = timeInSeconds[1]
    switchMode('pomodoro')
    renderTimer()
}

export function pauseTimer() {
    clearInterval(timer)
    timer = null
    renderTimer()
}