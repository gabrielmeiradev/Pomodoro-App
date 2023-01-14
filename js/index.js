import { addTask, formHandler, deleteTask } from './tasks.js'
import { startTimer, pauseTimer } from './timer.js'
import { startPauseToggle, updateUIOnStop, switchModeDom } from './buttons.js'
import { playSound } from './sounds.js'

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

// Mute button
export const muteButton = document.querySelector('.mute-sound');
export const muteIcon = document.querySelector('.mute-sound-icon');

// Delete Task
window.deleteTask = deleteTask

addTaskForm.addEventListener('submit', formHandler)

startTimerButton.addEventListener('click', () => { 
    startPauseToggle(startTimer, pauseTimer)
})

stopTimerButton.addEventListener('click', updateUIOnStop)

// addTaskButton.addEventListener('click', addTask)


addTaskButton.addEventListener('click', () => {
    if (!addTaskInput.style.display || addTaskInput.style.display == "none") {
        addTaskInput.style.display = "inherit";
        addTaskInput.focus()
    }
    else {
        addTaskInput.style.display = "none";
    }
})

const buttons = document.querySelectorAll('.click');
buttons.forEach((button) => {
    button.onclick = () => { 
        playSound('click').then(() => {
            console.log('click audio played')
        }).catch((error) => {
            console.log('click audio error: ', error)
        })
    }
})

muteButton.addEventListener('click', () => { toggleMuteSound() })

export let muted = false

const toggleMuteSound = () => {
    muted = !muted

    if(muted){
        muteIcon.innerText = 'volume_up'
    } else {
        muteIcon.innerText = 'volume_off'
    }
}

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

