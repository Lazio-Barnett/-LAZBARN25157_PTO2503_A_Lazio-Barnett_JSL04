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
