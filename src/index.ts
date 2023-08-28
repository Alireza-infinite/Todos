import "./style.css";

// DOM element that contains todo list
const listContainer = document.querySelector(".list-container");
// contains form for adding new todo item
const createTodoForm = document.querySelector("form");

// todo items object interface
interface TodoItem {
  title: string;
  description: string;
  dateCreated: Date;
  dateUpdated: Date;
  done: boolean;
}

// list containing all todo items
const todos: TodoItem[] = [];

// creates a new todo and sets it's creation and modification date to now
function createTodo(title: string, description: string): TodoItem {
  const todo: TodoItem = {
    title,
    description,
    dateCreated: new Date(Date.now()),
    dateUpdated: new Date(Date.now()),
    done: false,
  };

  return todo;
}

// deletes a todo item from todos list given an index number
function deleteItem(i: number): void {
  delete todos[i];
  printTodos();
}

// toggles an item's done status. takes todo's index as parameter
function toggleDone(i: number): void {
  todos[i].done = !todos[i].done;
  todos[i].dateUpdated = new Date(Date.now());
  printTodos();
}

// for a given Date object returns a predefined formated string
function formatDate(d: Date): string {
  const t = d.toLocaleString("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  });
  const day = d.toLocaleString("en-US", {
    day: "numeric",
  });
  const mAndY = d.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${t} - ${day}. ${mAndY}`;
}

// creates and adds elements to the DOM
function printTodos(): void {
  listContainer.innerHTML = "";
  todos.forEach((t, i) => {
    const li = document.createElement("li");
    const titleEl = document.createElement("h2");
    const descriptionEl = document.createElement("p");
    descriptionEl.className = "description";
    const dateCreatedEl = document.createElement("p");
    dateCreatedEl.className = "date";
    const dateUpdatedEl = document.createElement("p");
    dateUpdatedEl.className = "date";
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "todo-actions";
    const deleteBtn = document.createElement("button");
    const toggleBtn = document.createElement("input");
    toggleBtn.type = "checkbox";

    if (t.done) {
      li.classList.add("done");
      toggleBtn.checked = true;
    }

    titleEl.innerText = t.title;
    descriptionEl.innerText = t.description;
    dateCreatedEl.innerText = `Created at: ${formatDate(t.dateCreated)}`;
    dateUpdatedEl.innerText = `Updated at: ${formatDate(t.dateUpdated)}`;
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", (e) => {
      deleteItem(i);
    });

    toggleBtn.addEventListener("change", (e) => {
      toggleDone(i);
    });

    li.appendChild(titleEl);
    li.appendChild(descriptionEl);
    li.appendChild(dateCreatedEl);
    li.appendChild(dateUpdatedEl);
    actionsDiv.appendChild(deleteBtn);
    actionsDiv.appendChild(toggleBtn);
    li.appendChild(actionsDiv);
    listContainer.appendChild(li);
  });
}

// on submiting the new todo createTodo() is called and
// the new todo object gets added to the global todo list
createTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const target = e.target as typeof e.target & {
    title: { value: string };
    description: { value: string };
  };

  const newItem = createTodo(target.title.value, target.description.value);
  todos.push(newItem);
  printTodos();
});
