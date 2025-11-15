// Tambah todo
        function addTodo() {
            const taskInput = document.getElementById('taskInput');
            const dateInput = document.getElementById('dateInput');
            const task = taskInput.value.trim();
            const date = dateInput.value;

            // Validasi
            if (!task) {
                taskInput.classList.add('error');
                setTimeout(() => taskInput.classList.remove('error'), 300);
                return;
            }

            if (!date) {
                dateInput.classList.add('error');
                setTimeout(() => dateInput.classList.remove('error'), 300);
                return;
            }

            // Buat todo baru
            const newTodo = {
                id: generateId(),
                task: task,
                date: date,
                status: 'pending'
            };

            todos.unshift(newTodo);
            
            // Reset input
            taskInput.value = '';
            dateInput.value = '';
            
            // Reset filter
            isFiltering = false;
            document.getElementById('filterInput').value = '';
            
            renderTodos();
        }

        // Toggle status
        function toggleStatus(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.status = todo.status === 'pending' ? 'done' : 'pending';
                renderTodos();
            }
        }

        // Delete todo
        function deleteTodo(id) {
            todos = todos.filter(t => t.id !== id);
            if (isFiltering) {
                filteredTodos = filteredTodos.filter(t => t.id !== id);
            }
            renderTodos();
        }

        // Delete all
        function deleteAll() {
            if (todos.length === 0) return;
            
            if (confirm('Yakin ingin menghapus semua task?')) {
                todos = [];
                filteredTodos = [];
                isFiltering = false;
                document.getElementById('filterInput').value = '';
                renderTodos();
            }
        }

        // Filter todos
        function filterTodos() {
            const filterInput = document.getElementById('filterInput');
            const filterText = filterInput.value.trim().toLowerCase();

            if (!filterText) {
                isFiltering = false;
                renderTodos();
                return;
            }

            isFiltering = true;
            filteredTodos = todos.filter(todo => {
                return todo.task.toLowerCase().includes(filterText) || 
                       todo.date.includes(filterText) ||
                       formatDate(todo.date).toLowerCase().includes(filterText);
            });

            renderTodos();
        }

        // Event listeners
        document.getElementById('addBtn').addEventListener('click', addTodo);

        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        document.getElementById('dateInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        document.getElementById('filterBtn').addEventListener('click', filterTodos);

        document.getElementById('filterInput').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                filterTodos();
            } else if (e.target.value === '') {
                isFiltering = false;
                renderTodos();
            }
        });

        document.getElementById('deleteAllBtn').addEventListener('click', deleteAll);

        // Event delegation untuk delete dan toggle status
        document.getElementById('taskList').addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            
            if (e.target.classList.contains('btn-delete')) {
                deleteTodo(id);
            } else if (e.target.classList.contains('status')) {
                toggleStatus(id);
            }
        });

        // Set minimum date ke hari ini
        document.getElementById('dateInput').min = new Date().toISOString().split('T')[0];

        // Initial render
        renderTodos();
    