let taskInput = document.getElementById('taskInput');
let addBtn = document.getElementById('addBtn');
let moodImg = document.getElementById('moodImg');
let taskContainer = document.getElementById('taskContainer');


let taskArray;
let mood = 'create';
let tmp;
let isSlider = false;
let openSliderIndex = -1;

if(localStorage.taskStorage != null){
  taskArray = JSON.parse(localStorage.taskStorage);
}else{
  taskArray = [];
}


function addTask(){
  let newTask = {
    task: taskInput.value,
    completed: false,
  };
  if(taskInput.value !== ''){
    if(mood == 'create'){
      taskArray.push(newTask);
    }
    else{
      taskArray[tmp] = newTask;
      mood = 'create';
      moodImg.src = 'img/add.png'
    }
    
    localStorage.setItem('taskStorage', JSON.stringify(taskArray));
    
  }
  else{
    taskInput.focus();
  }
  taskInput.value = '';
  showTasks();
}

addBtn.addEventListener('click', addTask);

function showTasks(){
  let taskBox = '';
  for(let i = 0; i < taskArray.length; i++){
    let completedClass = taskArray[i].completed ? 'completed' : '';
    taskBox += `
      <div class="task ${completedClass}">
        <h3>${taskArray[i].task}</h3>
        <div class="slider">
          <button class="btn slide-btn" onclick="slide(${i})"><img src="img/slide.png" id="sliderImg"></button>
          
          <button class="btn delete-btn" onclick="deleteTask(${i})"><img src="img/delete.png"></button>
          
          <button class="btn edit-btn" onclick="editTask(${i})"><img src="img/edit.png"></button>
          
          <button class="btn done-btn" onclick="taskDone(${i})"><img src="img/done.png"></button>
          
        </div>
      </div>
    `
  }
  taskContainer.innerHTML = taskBox;
}

function deleteTask(i){
  taskArray.splice(i, 1);
  localStorage.taskStorage = JSON.stringify(taskArray);
  closeSlider(openSliderIndex);
  showTasks();
}

function editTask(i){
  taskInput.value = taskArray[i].task;
  taskInput.focus();
  moodImg.src ='img/edit.png'
  mood = 'edit';
  tmp = i;
  closeSlider(openSliderIndex);
}

function taskDone(i) {
  taskArray[i].completed = !taskArray[i].completed;
  localStorage.setItem('taskStorage', JSON.stringify(taskArray));
  closeSlider(openSliderIndex);
  showTasks();
}

function slide(i) {
  
  if (openSliderIndex !== -1 && openSliderIndex !== i) {
    closeSlider(openSliderIndex);
  }
  
  isSlider = !isSlider;
  
  const slider = document.querySelectorAll('.slider')[i];
  const sliderImg = slider.querySelector('.slide-btn img');

  if (isSlider) {
    slider.style.transform = 'translateX(0)';
    sliderImg.style.transform = 'rotate(180deg) translateY(-2px)';
    openSliderIndex = i;
  } else {
    slider.style.transform = 'translateX(150px)';
    sliderImg.style.transform = 'rotate(0) translateY(2px)';
    openSliderIndex = -1;
  }
}

function closeSlider(i) {
  const slider = document.querySelectorAll('.slider')[i];
  const sliderImg = slider.querySelector('.slide-btn img');
  
  slider.style.transform = 'translateX(150px)';
  sliderImg.style.transform = 'rotate(0) translateY(2px)';
  isSlider = false;
  openSliderIndex = -1;
}

showTasks();
