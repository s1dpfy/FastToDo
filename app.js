function saveTodo() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!title || !content) {
    alert("내용을 입력하셔야 합니다.");
    return;
  }

  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push({
    title,
    content,
    dueDate,
    createdAt: Date.now()
  });

  localStorage.setItem("todos", JSON.stringify(todos));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("dueDate").value = "";

  renderTodos();
}


function deleteTodo(createdAt) {
  if (confirm("선택하신 게시물을 정말 삭제하시겠습니까?")) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(todo => todo.createdAt !== createdAt);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

function getDday(date) {
  if (!date) return "-";

  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);

  const diff = target - today;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return `<span class="text-[#ff0000] font-bold">D-${days}</span>`;
  if (days === 0) return `<span class="text-[#ff0000] font-bold">D-Day</span>`;
  return `D+${Math.abs(days)}`;
}

function formatDate(timestamp) {
  const d = new Date(timestamp);
  return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function renderTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const todoList = document.getElementById("todoList");

  todoList.innerHTML = "";

  todos.sort((a, b) => b.createdAt - a.createdAt);

  if (todos.length === 0) {
    todoList.innerHTML = `
      <tr>
        <td colspan="5" class="py-10 text-[#888888]">등록된 게시물이 없습니다.</td>
      </tr>
    `;
    return;
  }

  todos.forEach((todo) => {
    todoList.innerHTML += `
      <tr class="border-b border-[#eeeeee] hover:bg-[#f8f9fa] transition-colors duration-75">
        <td class="py-2 text-[11px] sm:text-[12px]">${getDday(todo.dueDate)}</td>
        <td class="py-2 px-2 sm:px-3 text-left">
          <div class="text-[#0000cc] hover:underline cursor-pointer text-[12px] sm:text-[13px]">
            ${todo.title}
          </div>
          <div class="text-[#777777] mt-[2px] truncate max-w-[120px] sm:max-w-[220px] md:max-w-[380px] text-[11px] sm:text-[12px]">
            ${todo.content}
          </div>
        </td>
        <td class="py-2 text-[#555555] text-[11px] sm:text-[12px]">${todo.dueDate ? todo.dueDate.replace(/-/g, '.') : "-"}</td>
        <td class="py-2 text-[#888888] text-[11px] sm:text-[12px]">${formatDate(todo.createdAt)}</td>
        <td class="py-2 text-[11px] sm:text-[12px]">
          <span onclick="deleteTodo(${todo.createdAt})" class="text-[#ff0000] hover:underline cursor-pointer font-normal">[삭제]</span>
        </td>
      </tr>
    `;
  });
}

renderTodos();