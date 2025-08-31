const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },

  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

// make a copy we can change (leave the original alone)
let tasks = [];
for (let i = 0; i < initialTasks.length; i++) {
  tasks.push(initialTasks[i]);
}

// grab the columns
const todoList = document.getElementById("todo-list");
const doingList = document.getElementById("doing-list");
const doneList = document.getElementById("done-list");

// grab the pop-up + form stuff
const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("taskModal");
const form = document.getElementById("taskForm");
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const statusSelect = document.getElementById("statusSelect");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

// error lines under the inputs
const titleError = document.getElementById("titleError");
const descError = document.getElementById("descError");

// which task is open right now (null = none)
let activeTaskId = null;

// make a little clickable card for a task
function makeTaskCard(task) {
  const card = document.createElement("div");
  card.className = "task-div";
  card.textContent = task.title; // show title only
  card.setAttribute("data-task-id", String(task.id)); // tag with id

  // open the pop-up when this card is clicked
  card.addEventListener("click", function () {
    openModal(task.id);
  });

  return card;
}

// clear all three columns (fresh start)
function clearColumns() {
  todoList.innerHTML = "";
  doingList.innerHTML = "";
  doneList.innerHTML = "";
}

// tidy up status names so we only use: todo / doing / done
function normalizeStatus(raw) {
  if (!raw) return "todo";
  const cleaned = String(raw).toLowerCase().trim();
  if (
    cleaned === "in-progress" ||
    cleaned === "in progress" ||
    cleaned === "inprogress"
  ) {
    return "doing";
  }
  if (cleaned === "todo" || cleaned === "doing" || cleaned === "done") {
    return cleaned;
  }
  return "todo";
}

// draw all tasks into the right columns
function renderBoard() {
  clearColumns();

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const card = makeTaskCard(task);
    const status = normalizeStatus(task.status);

    if (status === "todo") {
      todoList.appendChild(card);
    } else if (status === "doing") {
      doingList.appendChild(card);
    } else if (status === "done") {
      doneList.appendChild(card);
    }
  }
}

// first paint
renderBoard();

// show an error under a field
function showError(inputEl, errorEl, message) {
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.hidden = false;
  }
  if (inputEl) {
    inputEl.classList.add("input-error");
    inputEl.setAttribute("aria-invalid", "true");
  }
}

// hide an error for a field
function clearError(inputEl, errorEl) {
  if (errorEl) errorEl.hidden = true;
  if (inputEl) {
    inputEl.classList.remove("input-error");
    inputEl.removeAttribute("aria-invalid");
  }
}

// clear all current errors
function clearErrors() {
  clearError(titleInput, titleError);
  clearError(descInput, descError);
}

// open the pop-up with this task’s data
function openModal(taskId) {
  let found = null;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      found = tasks[i];
      break;
    }
  }
  if (!found) return;

  activeTaskId = taskId;
  titleInput.value = found.title;
  descInput.value = found.description;
  statusSelect.value = normalizeStatus(found.status);

  clearErrors();
  backdrop.hidden = false;

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

// close the pop-up
function closeModal() {
  activeTaskId = null;
  backdrop.hidden = true;

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
}

// save changes → redraw → close
function onSave(e) {
  e.preventDefault();
  if (activeTaskId == null) return;

  const newTitle = titleInput.value.trim();
  const newDesc = descInput.value.trim();
  const newStatus = statusSelect.value;

  clearErrors();
  let hasError = false;

  if (!newTitle) {
    showError(titleInput, titleError, "Title is required.");
    if (!hasError) titleInput.focus();
    hasError = true;
  }
  if (!newDesc) {
    showError(descInput, descError, "Description is required.");
    if (!hasError) descInput.focus();
    hasError = true;
  }
  if (hasError) return;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === activeTaskId) {
      tasks[i].title = newTitle;
      tasks[i].description = newDesc;
      tasks[i].status = newStatus;
      break;
    }
  }

  renderBoard();
  closeModal();
}
