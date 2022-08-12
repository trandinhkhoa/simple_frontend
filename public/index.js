// TODO:
// - save on enter
// - persistent data
// - strike through text once checked
// - refactor
// - disable Enter on empty input (Safari)
// - disable Edit on empty input
// - wrap form around input

// why do I need to wait for load ???
// because code outside of this listener be executed before the one inside
// at that time var `input` is still undefined
window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];

  localStorage.setItem('todos', JSON.stringify(todos));
  const input = document.getElementById("newTask");
  let addTaskButtonEl = document.getElementById("addTaskButton");
  addTaskButtonEl.setAttribute("disabled", "disabled");
  input.addEventListener("input", () => {
    if (!input.value) {
      addTaskButtonEl.setAttribute("disabled", "disabled");
    } else {
      addTaskButtonEl.removeAttribute("disabled");
    }
  });

  displayTodos();
})



function editTaskButtonClicked(aTaskEditButton, aTaskContentInput, todo) {
  if (aTaskEditButton.innerText === "Edit") {
    aTaskContentInput.removeAttribute('readonly');
    aTaskContentInput.focus();
    aTaskEditButton.innerText = "Save";
    aTaskEditButton.classList.replace("taskEdit", "taskSave");
  } else {
    aTaskContentInput.readOnly = true;
    todo.value = aTaskContentInput.value;
    localStorage.setItem('todos', JSON.stringify(todos));
    aTaskEditButton.innerText = "Edit";
    aTaskEditButton.classList.replace("taskSave", "taskEdit");
  }
}

function addTaskButtonClicked() {
  const input = document.getElementById("newTask");

  let todo = {
    "id": Date.now(),
    "value": input.value,
    "done": false
  };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayATask(todo);

  input.value = "";
  input.dispatchEvent(new Event('input'));
  input.focus();
}

function displayTodos() {

  // https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing
  // TLDR: reassign todo to another object will not change todos. only modifying properties of todo will
  todos.forEach(todo => {
    displayATask(todo);
  });
}

function displayATask(todo) {
  let aTask = document.createElement("div");
  aTask.classList.add("task");

  let aTaskCheckbox = document.createElement("input");
  aTaskCheckbox.type = "checkbox";
  aTaskCheckbox.checked = todo.done;
  aTask.appendChild(aTaskCheckbox);

  let aTaskContentInput = document.createElement("input");
  aTaskContentInput.classList.add("taskContent");
  // can also use aTaskContentInput.setAttribute("readonly", "readonly")
  aTaskContentInput.style.backgroundColor = todo.done ? "lightgreen" : "";
  aTaskContentInput.readOnly = true;
  aTaskContentInput.value = todo.value;
  aTask.appendChild(aTaskContentInput);

  aTaskCheckbox.addEventListener("click", () => {
    aTaskContentInput.style.backgroundColor = aTaskCheckbox.checked ? "lightgreen" : "";
    todo.done = aTaskCheckbox.checked ? true : false;
    localStorage.setItem('todos', JSON.stringify(todos));
  })

  let aTaskEditButton = document.createElement("button");
  aTaskEditButton.classList.add("taskEdit");
  // innerText/inderHTML/textContent all work
  aTaskEditButton.innerText = "Edit";
  aTaskEditButton.addEventListener("click", () => {
    editTaskButtonClicked(aTaskEditButton, aTaskContentInput, todo);
  });
  aTask.appendChild(aTaskEditButton);

  let aTaskDeleteButton = document.createElement("button");
  aTaskDeleteButton.classList.add("taskDelete");
  aTaskDeleteButton.innerText = "Delete";
  aTaskDeleteButton.addEventListener("click", () => {
    tasksList.removeChild(aTask);
    // filter by reference
    todos = todos.filter(iter => iter !== todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  aTask.appendChild(aTaskDeleteButton);

  tasksList.appendChild(aTask);
}