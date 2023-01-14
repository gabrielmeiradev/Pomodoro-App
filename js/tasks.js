import { 
    tasksElement as container,
    addTaskInput as input
} from './index.js'

export let tasks = [];

export function formHandler(event) {
    event.preventDefault()
    addTask()
}

export function renderTasks(){
    container.innerHTML = '';
    for(let [i, task] of tasks.entries()){
        const taskElement = document.createElement('div');
        taskElement.classList.add('task')

        taskElement.innerHTML = `
            <div class="task-details">
                <span class="task-position">#${i+1}</span>
                <p>${task}</p>
            </div>
            <div class="task-aside">
                <button onclick="deleteTask(${i})" class="task-ready" disabled>
                <span class="material-symbols-outlined">
                    task_alt
                </span>
                </button>
            </div>
        `

        container.appendChild(taskElement)
    }

    const currentTask = document.querySelector('.task');
    currentTask.classList.add('active');

    const currentTaskReadyButton = document.querySelector('.task-ready');
    currentTaskReadyButton.disabled = false;
    input.value = ''
}

export function addTask(){
    let taskDescription = input.value;

    if(taskDescription.length <= 0 || taskDescription == ' ') return

    tasks.push(taskDescription);

    renderTasks()

    container.scrollTop = container.scrollHeight
}

export function deleteTask(index){
    tasks.splice(index, 1)
    
    renderTasks()
    
    container.scrollTop = 0
}
