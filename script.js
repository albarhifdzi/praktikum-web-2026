
 // File: script.js

document.addEventListener("DOMContentLoaded", () => {

    // 1. Ambil elemen DOM
    const todoForm = document.querySelector("#todoForm");
    const taskInput = document.querySelector("#taskInput");
    const inputError = document.querySelector("#inputError");
    const todoList = document.querySelector("#todoList");

    // 2. Fungsi membaca dan menyimpan ke LocalStorage
    const getTasks = () => {
        return JSON.parse(localStorage.getItem("todo_tasks")) || [];
    };

    const saveTasks = (tasks) => {
        localStorage.setItem("todo_tasks", JSON.stringify(tasks));
    };

    // 3. Fungsi menampilkan daftar tugas ke layar
    const renderTasks = () => {
        const tasks = getTasks();

        // Kosongkan daftar tugas sebelum ditampilkan
        todoList.innerHTML = "";

        // Jika belum ada tugas
        if (tasks.length === 0) {
            todoList.innerHTML = `
                <p style="text-align:center; color:#64748b; font-size:13px; padding:10px;">
                    Belum ada tugas tersimpan.
                </p>
            `;
            return;
        }

        // Tampilkan setiap tugas
        tasks.forEach((task, index) => {
            const li = document.createElement("li");

            li.className = `todo-item ${task.completed ? "completed" : ""}`;

            const taskText = document.createElement("span");
            taskText.className = "todo-text";
            taskText.textContent = task.text;

            const actions = document.createElement("div");
            actions.className = "todo-actions";

            const completeBtn = document.createElement("button");
            completeBtn.className = "action-btn complete-btn";
            completeBtn.dataset.index = index;
            completeBtn.textContent = task.completed ? "Batal" : "Selesai";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "action-btn delete-btn";
            deleteBtn.dataset.index = index;
            deleteBtn.textContent = "Hapus";

            actions.appendChild(completeBtn);
            actions.appendChild(deleteBtn);

            li.appendChild(taskText);
            li.appendChild(actions);

            todoList.appendChild(li);
        });
    };

    // 4. Tambah tugas saat formulir dikirim
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const taskText = taskInput.value.trim();

        // Validasi input sederhana
        if (taskText.length < 3) {
            taskInput.classList.add("error");
            inputError.style.display = "block";
            return;
        }

        // Jika valid, hilangkan pesan error
        taskInput.classList.remove("error");
        inputError.style.display = "none";

        // Simpan tugas baru ke LocalStorage
        const tasks = getTasks();

        tasks.push({
            text: taskText,
            completed: false
        });

        saveTasks(tasks);

        // Kosongkan input
        taskInput.value = "";

        // Tampilkan daftar terbaru
        renderTasks();
    });

    // 5. Tangani klik tombol Selesai dan Hapus
    todoList.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (index === undefined) return;

        const tasks = getTasks();

        // Tombol Selesai atau Batal
        if (e.target.classList.contains("complete-btn")) {
            tasks[index].completed = !tasks[index].completed;

            saveTasks(tasks);
            renderTasks();

        // Tombol Hapus
        } else if (e.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);

            saveTasks(tasks);
            renderTasks();
        }
    });

    // 6. Render pertama kali saat halaman selesai dimuat
    renderTasks();

});
