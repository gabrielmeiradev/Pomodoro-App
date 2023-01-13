import { addTask, formHandler, deleteTask } from './tasks.js'
import { startTimer, pauseTimer, stopTimer, switchMode } from './timer.js'

// Time options
export const timeOptionLongBreak = document.querySelector('.time-option.long-break')
export const timeOptionShortBreak = document.querySelector('.time-option.short-break')
export const timeOptionPomodoro = document.querySelector('.time-option.pomodoro')

// Timer
export const minutes = document.querySelector('#minutes')
export const seconds = document.querySelector('#seconds')

// Start/Stop timer
export const startTimerButton = document.querySelector('#start-timer')
export const stopTimerButton = document.querySelector('#stop-timer')

// Tasks
export const tasksElement = document.querySelector('#tasks');

// Add Task
// export const addTaskButton = document.querySelector('#add-task')
export const addTaskForm = document.querySelector('#task-form')
export const addTaskInput = document.querySelector('#task-input')

// Add task button
export const addTaskButton = document.querySelector('.add-task-button')

// Delete Task
window.deleteTask = deleteTask

addTaskForm.addEventListener('submit', formHandler)

function startPauseToggle(startTimer, pauseTimer){
    
    class Button {
        constructor(label, className, icon){
            this.label = label
            this.className = className,
            this.icon = icon
        }
    }

    const button = new Button

    switch(startTimerButton.dataset.status){
        case 'pause':
            button.label = 'Play'
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

    // Filling info
    startTimerButton.classList.add(button.className)
    startTimerButton.innerHTML = `
    <span class="material-symbols-outlined">
        ${button.icon}
    </span>
    ${button.label}
    `


}

startTimerButton.addEventListener('click', () => { 
    startPauseToggle(startTimer, pauseTimer)
})


stopTimerButton.addEventListener('click', () => {
    startPauseToggle(startTimer, pauseTimer)
    stopTimer()
})

// addTaskButton.addEventListener('click', addTask)

export function updateButton(currentActive){
    const timeOptions = document.querySelectorAll('.time-option');
    timeOptions.forEach((timeOption) => {
        timeOption.classList.remove('active')
    })
    currentActive.classList.add('active')
}

export function switchModeDom(mode){
    switchMode(mode) 
    let button
    switch(mode){
        case 'short-break':
            button = timeOptionShortBreak
            break
        case 'long-break':
            button = timeOptionLongBreak
            break
        case 'pomodoro':
            button = timeOptionPomodoro
            break
    }


    updateButton(button)
}

addTaskButton.addEventListener('click', () => {
    if (!addTaskInput.style.display || addTaskInput.style.display == "none") {
        addTaskInput.style.display = "inherit";
        addTaskInput.focus()
    }
    else {
        addTaskInput.style.display = "none";
    }
})


// Timer options events
timeOptionShortBreak.addEventListener('click', () => { 
    switchModeDom('short-break')
})
timeOptionLongBreak.addEventListener('click', () => {
    switchModeDom('long-break')
})
timeOptionPomodoro.addEventListener('click', () => { 
    switchModeDom('pomodoro')
})

