let currentPage ='Project1';

let projectMap = new Map();

let timeNow = new Date().toISOString().trim();
let year = timeNow.substring(0,4);
let month = timeNow.substring(5,7);
let day = timeNow.substring(8,10);
let daytime = timeNow.substring(11,19);

const proj1={
    description: "Watch 23 videos of uncle Bob",
    employeeName: "Christian",
    dueDate:new Date('2023/11/10').toISOString().trim(),
    projectName: "Se Factory",
    isDone:false,
}

const proj2={
    description: "Build a nasa rocket using html cc no flexbox",
    employeeName: "Ameer",
    projectName: "html css",
    dueDate:new Date('2023-11-02T23:00:00').toISOString().trim(),
    isDone:true
}

const proj3={
    description: "I Dont Know what this task is",
    employeeName: "Ramzi",
    projectName: "failure",
    dueDate:new Date('2023-11-09T23:00:00').toISOString().trim(),
    isDone:false
}

projectMap.set('Project1',proj1);
projectMap.set('Project2',proj2);
projectMap.set('Project3',proj3);

const projectbtn=document.getElementById("project1");
const projectbtn2=document.getElementById("project2");
const projectCreateElement = document.getElementById("project-create");
const projectDetailElement = document.getElementById("project-detail");
const createTaskBtn = document.getElementById('create-task-btn');
const addTaskBtnElement = document.getElementById("add-task-btn");
const projectListBtnsElement = document.getElementsByClassName("project-list-btns");
const employeeNameInputElement = document.getElementById("employee-name-input");
const taskTitleInputElement = document.getElementById("task-title-input");
const projectNameInputElement = document.getElementById("project-name-input");
const inputDescriptionElement = document.getElementById("input-description");
const projectdueDateInputElement = document.getElementById("project-dueDate-input");  
const projectDetailSmallElement = document.getElementById("project-detail-small");
const projectTitleElement = document.getElementById('project-title');
const employeeNameOutputElemenet = document.getElementById('employee-Name-Output');
const projectNameOutput = document.getElementById('project-name-Output');
const dueDateOutputElement = document.getElementById('due-date-Output');
const descriptionOutpuElement = document.getElementById('description-Output');
const taskDoneBtnElement = document.getElementById('task-done-btn');
const editBtnElement = document.getElementById('edit-btn');
const deleteBtnElement = document.getElementById('delete-btn');
const errorModalElement = document.getElementById("error-modal"); 
const newTaskEntryHeaderElement = document.getElementById("new-task-entry-header"); 
const inputSectionTaskTitleElement = document.getElementById("input-section-task-title");
const projectCreateTitleSectionElement = document.getElementById("project-create-title-section");
const taskTitleTagElement = document.getElementById("task-title-tag");
const yesNoCheckboxElement = document.getElementById("yesNoCheckbox");
const inputSectionCheckboxElement = document.getElementById("input-section-checkbox");
const saveChangesEditBtn = document.getElementById("save-changes-edit-btn");
const errorMessageElement = document.getElementById("error-message");
const searchElement = document.getElementById("search");
const projectListElement = document.getElementById("project-list");


createTaskBtn.addEventListener("click",function(){
    projectDetailElement.classList.add("project-detail-display-none");
    projectCreateElement.classList.remove("project-create-display-none");
    errorModalElement.style.display = "none";
})

addTaskBtnElement.addEventListener("click",function(){
    const employeeNameInput= employeeNameInputElement.value;
    const taskTitleInput = taskTitleInputElement.value;
    const projectNameInput = projectNameInputElement.value;
    const inputDescription = inputDescriptionElement.value;
    const projectdueDateInput = projectdueDateInputElement.value;
    
    if(employeeNameInput === '' || taskTitleInput === '' || projectNameInput === ''  ||
     inputDescription === '' || projectdueDateInput === '' ){
        errorModalElement.style.display = "block";
        errorMessageElement.innerHTML= "Please fill in all fields."
        return;
     }

     if(projectMap.has(taskTitleInput)){
        errorModalElement.style.display = "block";
        errorMessageElement.innerHTML= "This Task Name is already is use."
        return;
     }

     errorModalElement.style.display = "none";
    const proj={
        description: inputDescription,
        employeeName: employeeNameInput,
        dueDate: projectdueDateInput,
        projectName: projectNameInput, 
        isDone:false
    }
    projectMap.set(taskTitleInput, proj)

    let projectListElement = document.getElementById("project-list");
    let new_item_event = document.createElement("button");
    new_item_event.className = "project-btn"; 
    new_item_event.innerText = taskTitleInput;
    new_item_event.id = taskTitleInput;
    projectListElement.appendChild(new_item_event)
    const projectListBtn = document.getElementsByClassName("project-btn");
})

yesNoCheckboxElement.addEventListener('change', function(){
    yesNoCheckboxElement.value = yesNoCheckboxElement.checked;
})

projectListElement.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("project-btn")) {
        const button = event.target;
        tasktitle = button.innerHTML;
        displayProjectDetail();
        removeClasses(tasktitle);
        finishedTask(tasktitle);

        errorModalElement.style.display = "none";
        projectTitleElement.innerText = button.innerHTML;
        employeeNameOutputElemenet.innerText = "Employee Name: " + projectMap.get(tasktitle).employeeName;
        projectNameOutput.innerText = "Project Name: " + projectMap.get(tasktitle).projectName;
        dueDateOutputElement.innerText = "Due Date: " + projectMap.get(tasktitle).dueDate;
        descriptionOutpuElement.innerText = "Description: " + projectMap.get(tasktitle).description;
    }
});


function removeClasses(){
    projectDetailSmallElement.classList.remove("project-detail-small-red")
    projectTitleElement.classList.remove('color-red');
    taskDoneBtnElement.classList.remove('project-detail-btn-red');
    deleteBtnElement.classList.remove('project-detail-btn-red');
    editBtnElement.classList.remove('project-detail-btn-red')
    projectDetailSmallElement.classList.remove("project-detail-small-green")
    projectTitleElement.classList.remove('color-green');
    taskDoneBtnElement.classList.remove('project-detail-btn-green');
    deleteBtnElement.classList.remove('project-detail-btn-green');
    editBtnElement.classList.remove('project-detail-btn-green')
}

function displayProjectDetail(){
    if(projectDetailElement.classList.contains("project-detail-display-none")){
        projectDetailElement.classList.remove("project-detail-display-none");
        projectCreateElement.classList.add("project-create-display-none")
    }
}

function finishedTask(taskTitleInput){  
    const btnElement =document.getElementById(taskTitleInput);
    if(projectMap.get(taskTitleInput).isDone===true){
        projectDetailSmallElement.classList.add("project-detail-small-green")
        projectTitleElement.classList.add('color-green');
        taskDoneBtnElement.classList.add('project-detail-btn-green');
        deleteBtnElement.classList.add('project-detail-btn-green');
        editBtnElement.classList.add('project-detail-btn-green')
        btnElement.classList.add("project-btn-checkmark")
        if(btnElement.classList.contains("project-btn-xmark")){
            btnElement.classList.remove("project-btn-xmark") 
            btnElement.classList.add("project-btn-checkmark")  
        }
    }else{
        projectDetailSmallElement.classList.add("project-detail-small-red")
        projectTitleElement.classList.add('color-red');
        taskDoneBtnElement.classList.add('project-detail-btn-red');
        deleteBtnElement.classList.add('project-detail-btn-red');
        editBtnElement.classList.add('project-detail-btn-red')
        btnElement.classList.add("project-btn-xmark")
    }
}

deleteBtnElement.addEventListener("click", function(){
    const taskTitle = projectTitleElement.innerText;
    projectMap.delete(taskTitle);

    const  buttonToRemoveElement = document.getElementById(taskTitle);
    buttonToRemoveElement.remove();
    displayCreateProject();
})

function displayCreateProject(){

    addTaskBtnElement.classList.remove("display-none");
    saveChangesEditBtn.classList.add("display-none");
    newTaskEntryHeaderElement.innerHTML = "New Task Entry:";
    taskTitleTagElement.classList.remove("display-none");
    taskTitleInputElement.classList.remove("display-none")
    inputSectionCheckboxElement.classList.add("display-none");

    taskTitleInputElement.value = "";
    employeeNameInputElement.value = "";
    projectNameInputElement.value = "";
    projectdueDateInputElement.value = "";
    inputDescriptionElement.value = "";
    yesNoCheckboxElement.value = false;

    projectDetailElement.classList.add("project-detail-display-none");
    projectCreateElement.classList.remove("project-create-display-none")
}

editBtnElement.addEventListener("click", function(){
    const taskTitle = projectTitleElement.innerText;
    const valueTaskTitle = projectMap.get(taskTitle);
    displayEditPage(taskTitle, valueTaskTitle);    
})

function displayEditPage(taskTitle, valueTaskTitle){
    displayCreateProject();

    addTaskBtnElement.classList.add("display-none");
    saveChangesEditBtn.classList.remove("display-none");
    newTaskEntryHeaderElement.innerHTML = taskTitle;
    taskTitleTagElement.classList.add("display-none");
    taskTitleInputElement.classList.add("display-none")
    inputSectionCheckboxElement.classList.remove("display-none");

    employeeNameInputElement.value = valueTaskTitle.employeeName;
    projectNameInputElement.value = valueTaskTitle.projectName;
    projectdueDateInputElement.value = valueTaskTitle.Date;
    inputDescriptionElement.value = valueTaskTitle.description;
    yesNoCheckboxElement.value = valueTaskTitle.isDone;
}

createTaskBtn.addEventListener("click", displayCreateProject);

saveChangesEditBtn.addEventListener("click", function(){

    if(projectdueDateInputElement.value === ""){
        errorModalElement.style.display = "block";
        errorMessageElement.innerHTML= "Please fill Due Date field."
        return;
    }
    errorModalElement.style.display = "none";
    const projectObj = projectMap.get(newTaskEntryHeaderElement.innerHTML);
    projectObj.employeeName = employeeNameInputElement.value ;
    projectObj.projectName = projectNameInputElement.value;
    projectObj.dueDate = projectdueDateInputElement.value;
    projectObj.description = inputDescriptionElement.value ;
    projectObj.isDone = yesNoCheckboxElement.value === "true" ? true : false;

    projectMap.set(newTaskEntryHeaderElement.innerHTML, projectObj);
    const tasktitle = newTaskEntryHeaderElement.innerHTML
    displayProjectDetail();
    removeClasses(tasktitle);
    finishedTask(tasktitle);

    employeeNameOutputElemenet.innerText = "Employee Name: " + projectMap.get(tasktitle).employeeName;
    projectNameOutput.innerText = "Project Name: " + projectMap.get(tasktitle).projectName;
    dueDateOutputElement.innerText = "Due Date: " + projectMap.get(tasktitle).dueDate;
    descriptionOutpuElement.innerText = "Description: " + projectMap.get(tasktitle).description;
})

searchElement.addEventListener('change', function(event){
    const list= projectListElement.textContent.split('\n')
    let arr=new Set();
    let len = this.value.length;
    for(let l of list){
        arr.add(l.trim())
    }
    for(let ar of arr){
        if (ar===""){
            continue
        }
        const arElement = document.getElementById(ar);      
        arElement.classList.remove("display-none");
        if(ar.substring(0,len).toLowerCase()!= this.value.toLowerCase()){
            arElement.classList.add("display-none");
        }
    }
    
})



