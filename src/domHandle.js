import { toggleCompleted, updatePriority } from "./controller";
import "./obj_styles.css";

export function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-element");

  taskDiv.innerHTML = `
    <div>
        <div class="check-btn">
            <button type="checkbox" data-id="${task.id}" class="complete">
                ${task.completed ? "Undo" : "Done"}
            </button>
        </div>
        <div class="task-body">
            <h1 style="text-decoration:${
              task.completed ? "line-through" : "none"
            }">
                ${task.title}
            </h1>
            <span>${task.description}</span>
            <span class="priority">Priority: ${task.priority}</span>
            <span>Due date: ${task.dueDate}</span>
        </div>
    </div>
    `;

  return taskDiv;
}

export function renderTaskList(project) {
  const container = document.getElementById("task-list");
  container.innerHTML = "";

  if (!project) {
    console.error("Invalid project passed into renderTaskList", project);
    return;
  }

  project.listTodo.forEach((task) => {
    const taskElement = renderTask(task);

    container.appendChild(taskElement);
  });

  container.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", () => {

        const id = btn.getAttribute("data-id");
        const task = project.listTodo.find((t) => t.id == id);

      if (btn.classList.contains("complete")) {

        toggleCompleted(task);

      } else {
        const newPriority = 
        updatePriority(newPriority);
      }

        renderTaskList(project);
    });
  });
}

export function renderProject(project) {
  const projectDiv = document.createElement("div");
  projectDiv.classList.add("project-element");

  projectDiv.innerHTML = `
    <div>
        <div class="project-container" data-id="${project.id}">
            <div class="project-header">
                <h1>${project.name}</h1>
            </div>
        </div>
    </div>
    `;

  return projectDiv;
}

export function renderProjectList(projectManager) {
  const container = document.getElementById("project-list");
  container.innerHTML = "";

  projectManager.projectList.forEach((project) => {
    const projectElement = renderProject(project);
    container.appendChild(projectElement);
    if (projectManager.currProject === project) {
      projectElement.style.backgroundColor = "red";
    }
  });

  container.querySelectorAll("div[data-id]").forEach((e) => {
    e.addEventListener("click", () => {
      const project_id = e.getAttribute("data-id");
      const project = projectManager.projectList.find(
        (p) => p.id == project_id
      );
      projectManager.setCurrProject(project);

      renderTaskList(project);

      renderProjectList(projectManager);
    });
  });
}
