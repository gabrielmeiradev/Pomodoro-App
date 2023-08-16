import { startTimerButton } from "./index.js"
import { startTimer, pauseTimer, stopTimer } from "./timer.js"
import { switchMode } from "./timer.js"
import { timeOptionPomodoro, timeOptionShortBreak, timeOptionLongBreak } from "./index.js"

export function changeStartButtonVisualState(buttonType){
    class Button {
        constructor(label, className, icon){
            this.label = label
            this.className = className,
            this.icon = icon
        }
    }

    const button = new Button

    switch(buttonType){
        case 'pause':
            button.label = 'Start'
            button.className = 'play'
            button.icon = 'play_arrow'
            startTimerButton.dataset.status = 'play'
            startTimerButton.classList.remove('pause')
            pauseTimer()
            break
        case 'play':
            button.label = 'Pause'
            button.className = 'pause'
            button.icon = 'pause'
            startTimerButton.dataset.status = 'pause'
            startTimerButton.classList.remove('play')
            startTimer()
            break
    }

    startTimerButton.classList.add(button.className)
    startTimerButton.innerHTML = `
    <span class="material-symbols-outlined" translate="no">
        ${button.icon}
    </span>
    ${button.label}`

}

export function updateUIOnStop(){
    startTimerButton.classList.remove('pause')
    startTimerButton.classList.add('play')
    startTimerButton.innerHTML =  `
    <span class="material-symbols-outlined" translate="no">
        play_arrow
    </span>
    Start
    `
    startTimerButton.dataset.status = 'play';
    stopTimer()
}

export function startPauseToggle(){
    changeStartButtonVisualState(startTimerButton.dataset.status)
}


export function updateButton(currentActive){
    const timeOptions = document.querySelectorAll('.time-option');
    timeOptions.forEach((timeOption) => {
        timeOption.classList.remove('active')
    })
    currentActive.classList.add('active')
}


