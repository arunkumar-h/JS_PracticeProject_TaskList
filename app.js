//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

function loadEventListeners(){

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    //Add Task Event
    form.addEventListener('submit', addTask);

    //Remove Task Event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from local storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));   
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';
        //Create Text Node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link (delete x icon)
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);

        //Append li to the ul
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task')
    }

    //Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create Text Node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link (delete x icon)
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //Append li to the ul
    taskList.appendChild(li);
    
    //Store in Local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear the input
    taskInput.value = '';
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));   
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure ?')){
            e.target.parentElement.parentElement.remove();

            //Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    e.preventDefault();
}

//Remove task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));   
    }
    
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e){
    //taskList.innerHTML = '';
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    e.preventDefault();

    //Clear tasks from local storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){

    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    )
    e.preventDefault();
}