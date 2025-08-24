import { renderProjectList, renderTaskList } from "./domHandle.js";
import { save, load } from "./storage.js";
import { Project, ProjectManager, Task } from "./todo.js";

const manager = load() || new ProjectManager();

if (manager.projectList.length === 0) {
  const defaultProject = new Project("Default");
  manager.addProject(defaultProject);

  manager.setCurrProject(defaultProject);
  save(manager);
} else {
  if (!manager.currProject) {
    manager.setCurrProject(manager.projectList[0]);
  }
}

export function addTodoFromForm(formData) {
  const todo = new Task(
    formData.title,
    formData.description,
    formData.dueDate,
    formData.priority
  );
  manager.currProject.addTodo(todo);
  save(manager);

  renderTaskList(manager.currProject);
}

export function addProject(project) {
  const project1 = new Project(project.name);
  manager.addProject(project1);
  save(manager);

  renderProjectList(manager);
}

export function toggleCompleted(task) {
    task.toggleComplete();
    save(manager)
}

export function updatePriority(newPriority, task) {

  task.updatePriority(newPriority);
  save(manager);
}

console.log("Loaded manager:", manager);
console.log("Current project:", manager.currProject);

renderProjectList(manager);
renderTaskList(manager.currProject);
