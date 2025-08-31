# 📌 JSL04 – Kanban Task Board

## 🚀 Project Overview

This project builds on my JSL03 work by moving the task board into the browser. Instead of prompts and console logs, tasks are now shown directly on the page in three columns: **TODO, DOING, DONE**.

Each task is stored as an object with its own **id, title, description, and status**. Clicking a task opens a **modal (pop-up)** where I can view and edit the details. Changes are saved in memory, and the task is re-rendered in the correct column.

---

## ✨ Features

- Tasks stored as objects in an array (`initialTasks`)
- Board dynamically renders all tasks (no hard-coded HTML cards)
- Tasks automatically appear in the correct column based on status
- Click on a task to open a pop-up with editable fields
- Edit and save task **title, description, and status**
- Modal can be closed with ✕, backdrop click, or **Esc**
- Inline error messages show if required fields are empty
- Responsive layout: 3 columns on desktop → 2 on tablet → 1 on mobile

---

## 🛠️ Technologies Used

- **HTML5** – structure for sidebar, header, board, and modal
- **CSS3** – board layout, card styles, modal design, responsive tweaks
- **JavaScript (ES6)** – one file (`scripts.js`) handling data, rendering, editing, and validation

---

## 📁 Project Structure

── index.html # page structure (sidebar, header, board, modal)
├── styles.css # base styles + modal/backdrop + responsive rules
├── JS/
│ └── scripts.js # tasks → render board → open/edit/save modal
├── assets/ # logos, icons, favicon
└── README.md

---

## ▶️ How to Use

1. Open `index.html` in your browser
2. The board will load with starter tasks from `scripts.js`
3. Click a task card to open the pop-up
4. Edit the title, description, or status
5. Click **Save** → board updates immediately
6. Close the pop-up with ✕, backdrop, or **Esc**

---

## ✅ JSL04 User Stories Covered

- Tasks come from `initialTasks` and display dynamically
- Tasks show in the correct column by status (todo/doing/done)
- Clicking a task opens a modal with that task’s info
- Editable inputs for title and description
- Select dropdown for status (todo/doing/done)
- Save updates the correct task in memory and redraws the board
- Close modal using ✕, backdrop, or Esc
- Inline validation: required fields show error messages
- CSS keeps the board responsive for desktop, tablet, and mobile

---

## 👤 Author

**Lazio Barnett**
