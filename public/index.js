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
})



function editTaskButtonClicked(aTaskEditButton, aTaskContent) {
  if (aTaskEditButton.innerText === "Edit") {
    aTaskContent.removeAttribute('readonly');
    aTaskContent.focus();
    aTaskEditButton.innerText = "Save";
    aTaskEditButton.classList.replace("taskEdit", "taskSave");
  } else {
    aTaskContent.readOnly = true;
    aTaskEditButton.innerText = "Edit";
    aTaskEditButton.classList.replace("taskSave", "taskEdit");
  }
}

function addTaskButtonClicked() {
  const input = document.getElementById("newTask");
  console.log('a button clicked ', input.value);

  let aTask = document.createElement("div");
  aTask.classList.add("task");

  let aTaskCheckbox = document.createElement("input");
  aTaskCheckbox.type = "checkbox";
  aTask.appendChild(aTaskCheckbox);

  let aTaskContent = document.createElement("input");
  aTaskContent.classList.add("taskContent");
  // can also use aTaskContent.setAttribute("readonly", "readonly")
  aTaskContent.readOnly = true;
  aTaskContent.value = input.value;
  input.value = "";
  input.dispatchEvent(new Event('input'));
  input.focus();
  aTask.appendChild(aTaskContent);

  let aTaskEditButton = document.createElement("button");
  aTaskEditButton.classList.add("taskEdit");
  // innerText/inderHTML/textContent all work
  aTaskEditButton.innerText = "Edit";
  aTaskEditButton.addEventListener("click", () => {
    editTaskButtonClicked(aTaskEditButton, aTaskContent);
  });
  aTask.appendChild(aTaskEditButton);

  let aTaskDeleteButton = document.createElement("button");
  aTaskDeleteButton.classList.add("taskDelete");
  aTaskDeleteButton.innerText = "Delete";
  aTaskDeleteButton.addEventListener("click", () => {
    tasksList.removeChild(aTask);
  });

  aTask.appendChild(aTaskDeleteButton);

  tasksList.appendChild(aTask);
}