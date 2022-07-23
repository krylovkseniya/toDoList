const todoControl = document.querySelector(".todo-control");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const todoCompleted = document.querySelector(".todo-completed");
const clearButton = document.querySelector('.clear-button');

let toDoData = [];


const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach (function(item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
        '<div class="todo-buttons">' +
        '<button class="todo-remove"></button>' +
        '<button class="todo-complete"></button>' +
        '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function() {
            toDoData.splice(index, 1);
            render();
        });

    });

    localStorage.setItem("toDoData", JSON.stringify(toDoData));

};

if (JSON.parse(localStorage.getItem('toDoData'))) {
    toDoData = JSON.parse(localStorage.getItem('toDoData'));
    render();
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDo = {
        text: todoInput.value,
        completed: false
    };

    if (todoInput.value !== '' && todoInput.value.match(/[^\s]/g)) {
        toDoData.push(newToDo);
        todoInput.value = '';
    }

    render();
});

clearButton.addEventListener('click', function() {
    toDoData.length = 0;
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';
    localStorage.clear();
});
