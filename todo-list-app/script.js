'use strict'
const database = [
    {'task':'study JS', 'status':''},
    {'task':'do dishes', 'status':'checked'}
];

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" id="check1" ${status} data-indice=${index}>
        <span>${task}</span>
        <input type="button" value="X" id="erase" data-indice=${index}>
    `;
    document.getElementById('todoList').appendChild(item);
}
// Don't let the continuous use of the render function create unecessary items.
const clearTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const render = () => {
    clearTasks();
    database.forEach((element, index) => createItem(element.task, element.status, index));
}

const createNewTask = (event) => {
    const keycap = event.key;
    let userInput = document.getElementById('input');
    if (keycap === 'Enter') {
        database.push(
            {'task':userInput.value, 'status':''}
        );
        userInput.value = '';    
    }
    render();    
}

const eraseItem = (index) => {
    database.splice(index, 1);
    render();
}

const checkItem = (index) => {
    database[index].status = database[index].status === '' ? 'checked' : '';
    render();
}

const clickItem = (event) => {
    const element = event.target;
    const index = element.dataset.index;
    if (element.type === 'button'){
        eraseItem(index);
    } else if (element.type === 'checkbox'){
        checkItem(index);
    }
}

document.getElementById('input').addEventListener('keypress', createNewTask);
document.getElementById('todoList').addEventListener('click', clickItem);

render();
