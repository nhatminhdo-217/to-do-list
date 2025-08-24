import { Project, ProjectManager, Task } from "./todo";

export function save(projectManager) {
    localStorage.setItem("todoData", JSON.stringify(projectManager)); //stringify is convert js to json and parse is opposite
}

export function load() {
    const data = localStorage.getItem("todoData");
    if (!data) return null;

    const parseData = JSON.parse(data);
    const manager = new ProjectManager();

    parseData.projectList.forEach(p => {
        const project = new Project(p.name);
        project.id = p.id;

        p.listTodo.forEach(t => {
            const task = new Task(t.title, t.description, t.dueDate, t.priority);
            task.id = t.id;
            task.completed = t.completed;
            project.addTodo(task);
        });

        manager.addProject(project);
    });

    // Restore current project
    if (parseData.currProject) {
        const curr = manager.projectList.find(pr => pr.id === parseData.currProject.id);
        manager.setCurrProject(curr);
    }

    return manager;
}