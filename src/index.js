import { addProject, addTodoFromForm } from "./controller";
import "./styles.css"

const projectPopup = document.getElementById("project-popup");
document.getElementById("open-project-form").addEventListener("click", () => {
  projectPopup.classList.remove("hidden");
});
document.getElementById("close-project-form").addEventListener("click", () => {
  projectPopup.classList.add("hidden");
});

const todoPopup = document.getElementById("todo-popup");
document.getElementById("open-todo-form").addEventListener("click", () => {
  todoPopup.classList.remove("hidden");
});
document.getElementById("close-todo-form").addEventListener("click", () => {
  todoPopup.classList.add("hidden");
});

document.getElementById("project-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const projectData = {
    name: document.getElementById("project-name").value
  }

  addProject(projectData);
  projectPopup.classList.add("hidden");
  e.target.reset();
});

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const todoData = {
    title: document.getElementById("todo-title").value,
    description: document.getElementById("todo-description").value,
    dueDate: document.getElementById("todo-date").value,
    priority: document.getElementById("todo-priority").value
  };
  addTodoFromForm(todoData);
  todoPopup.classList.add("hidden");
  e.target.reset();
});

console.log("I'm here");
