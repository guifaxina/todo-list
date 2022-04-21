const form = document.querySelector('#new-task-form');
const input = document.querySelector('#new-task-input');
const list_el = document.querySelector('#tasks');
const database = [];

const createTask = function (userInput, index) {
    const task = userInput;  
    
    const task_el = document.createElement('div');
    task_el.classList.add("task");

    const task_content_el = document.createElement('div');
    task_content_el.classList.add('content');

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_actions_el = document.createElement('div');
    task_actions_el.classList.add('actions');

    const task_edit_el = document.createElement('button');
    task_edit_el.classList.add('edit');
    task_edit_el.innerHTML = "Edit";
    task_edit_el.setAttribute("data-index", index);

    const task_delete_el = document.createElement('button');
    task_delete_el.classList.add('delete');
    task_delete_el.innerHTML = "Delete";
    task_delete_el.setAttribute("data-index", index);

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);
    
    list_el.appendChild(task_el);
    input.value = '';
    task_edit_el.addEventListener("click", () => {
        if (task_edit_el.innerText.toLowerCase() == "edit"){
            task_input_el.removeAttribute('readonly');
            task_input_el.focus();
            task_edit_el.innerText = 'save';
        } else {
            task_input_el.setAttribute("readonly","readonly");
            task_edit_el.innerText = "edit";
            const indexEditButton = parseInt(task_edit_el.dataset.index);
            database[indexEditButton] = task_input_el.value;
            localStorage.setItem("tasks", JSON.stringify(database));
        }

    });
    task_delete_el.addEventListener('click', () =>{
        list_el.removeChild(task_el);
        const indexOfThisButton = task_delete_el.dataset.index; 
        database.splice(indexOfThisButton, 1);
        localStorage.setItem("tasks", JSON.stringify(database));
    });
}
onload = function () {
    let taskStorage = localStorage.getItem("tasks");
    let parsed = JSON.parse(taskStorage);
    parsed.forEach(function (item, index){
        database.push(item);
        createTask(item, index);
    });
};
form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value == '') {
        alert('Please fill out the task field.');
        return;
    } 
    database.push(input.value);
    createTask(input.value);
    localStorage.setItem("tasks", JSON.stringify(database));
});
