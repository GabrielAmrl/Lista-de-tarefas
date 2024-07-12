document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo(input.value);
        input.value = '';
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeTodo(e.target.parentElement);
        } else if (e.target.tagName === 'LI') {
            toggleComplete(e.target);
        }
    });

    loadTodos();

    function addTodo(todoText) {
        const todoItem = document.createElement('li');
        todoItem.textContent = todoText;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
        saveTodos();
    }

    function removeTodo(todoItem) {
        todoItem.remove();
        saveTodos();
    }

    function toggleComplete(todoItem) {
        todoItem.classList.toggle('completed');
        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(todoItem => {
            todos.push({
                text: todoItem.firstChild.textContent,
                completed: todoItem.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            todoItem.textContent = todo.text;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            todoItem.appendChild(deleteButton);
            todoList.appendChild(todoItem);
        });
    }
});
