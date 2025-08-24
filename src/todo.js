export class Task {
    constructor (title, description, dueDate, priority) {
        this.id = Date.now + Math.random();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }
}

export class Project {
    constructor(name) {
        this.id = Date.now() + Math.random();
        this.name = name;
        this.listTodo = [];
    }

    addTodo(todo) {
        this.listTodo.push(todo);
    }

    removeTodo(index) {
        this.listTodo.splice(index, 1); //At 'index' position remove 1 item
    }
}

export class ProjectManager {
    constructor() {
        this.projectList = [];
        this.currProject = null;
    }

    addProject(project) {
        this.projectList.push(project);
        if (!this.currProject) {
            this.currProject = project;
        }
    }

    setCurrProject(project) {
        this.currProject = this.projectList.find(p => p.id === project.id);
    }
}