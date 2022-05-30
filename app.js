var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var incompleteTaskHolder = document.getElementById('incompleted-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');
  var checkBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  var deleteButtonImg = document.createElement('img');
  listItem.className = 'section__item';
  label.innerText = taskString;
  label.className = 'section__task-txt';
  checkBox.type = 'checkbox';
  checkBox.className = 'section__input section__checkbox';
  editInput.type = 'text';
  editInput.className = 'item__input section__input_text section__input_hidden';
  editButton.innerText = 'Edit';
  editButton.className = 'section__btn section__btn_edit';
  deleteButton.className = 'section__btn section__btn_delete button';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'Delete';
  deleteButtonImg.className = 'btn-img';
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var editBtn = listItem.querySelector('.section__btn_edit');
  var containsClass = listItem.classList.contains('section__item_edit-mode');
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
    editInput.classList.remove('section__input_visible');
    editInput.classList.add('section__input_hidden');
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
    editInput.classList.remove('section__input_hidden');
    editInput.classList.add('section__input_visible');
  }
  listItem.classList.toggle('section__item_edit-mode');
  label.classList.toggle('section__task-txt_hidden');
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  listItem.querySelector('label').classList.add('section__task-txt_complete');
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  listItem
    .querySelector('label')
    .classList.remove('section__task-txt_complete');
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

addButton.onclick = addTask;
addButton.addEventListener('click', addTask);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.section__btn_edit');
  var deleteButton = taskListItem.querySelector('button.section__btn_delete');
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
