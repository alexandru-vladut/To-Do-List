let currentList = "all";

let all = [];
let completed = [];
let incompleted = [];

function chooseAll() {
    currentList = "all";

    document.getElementById('taskList').innerHTML = `<h3>All Tasks</h3><br>`;

    if (all.length == 0) {
        document.getElementById('taskList').innerHTML += `<div>Nothing to see here.</div>`;
        return;
    }

    for (let i = 0; i < all.length; i++) {
        document.getElementById('taskList').innerHTML += all[i];
    }
}

function chooseCompleted() {
    currentList = "completed";

    document.getElementById('taskList').innerHTML = `<h3>Completed Tasks</h3><br>`;

    if (completed.length == 0) {
        document.getElementById('taskList').innerHTML += `<div>Nothing to see here.</div>`;
        return;
    }

    for (let i = 0; i < completed.length; i++) {
        document.getElementById('taskList').innerHTML += completed[i];
    }
}

function chooseIncompleted() {
    currentList = "incompleted";
    
    document.getElementById('taskList').innerHTML = `<h3>Incompleted Tasks</h3><br>`;

    if (incompleted.length == 0) {
        document.getElementById('taskList').innerHTML += `<div>Nothing to see here.</div>`;
        return;
    }

    for (let i = 0; i < incompleted.length; i++) {
        document.getElementById('taskList').innerHTML += incompleted[i];
    }
}

// Cand introducem un task nou:
function saveInput(event) {
    var taskName = document.getElementById('task').value;

    let alreadyExists = false;
    for (let i = 0; i < all.length; i++) {
        if (all[i] === `<div><div class="taskListElementName" onclick="complete(event)">${taskName}</div><div class="taskListElementName" onclick="remove(event)">X</div></div><br>`
        || all[i] === `<div><div class="taskListElementNameCompleted">${taskName}</div><div class="taskListElementName" onclick="remove(event)">X</div></div><br>`) {
            alreadyExists = true;
            break;
        }
    }

    if (alreadyExists) {
        window.alert("Task already exists!");
        return;
    }

    // Il adaugam in lista mare
    all.push(`<div><div class="taskListElementName" onclick="complete(event)">${taskName}</div><div class="taskListElementName" onclick="remove(event)">X</div></div><br>`);

    // Il adaugam in lista de necompletate
    incompleted.push(`<div><div class="taskListElementName" onclick="complete(event)">${taskName}</div><div class="taskListElementName" onclick="remove(event)">X</div></div><br>`);
    
    // Display lista mare daca ne aflam pe ea la mom submit-ului
    if (currentList === "all") {
        chooseAll();
    }

    // Display lista de necompletate daca ne aflam pe ea la mom submit-ului
    if (currentList === "incompleted") {
        chooseIncompleted();
    }

    // Resetam input field-ul
    document.getElementById('task').value = "";

    event.preventDefault();
}

// Cand completam un task:
function complete(event) {

    // Il adaugam in lista de completate
    // TODO: eliminat taietura(?)
    completed.push(`<div><div class="taskListElementNameCompleted">${event.target.innerHTML}</div><div class="taskListElementName" onclick="remove(event)">X</div></div><br>`);

    // Actualizam forma lui in lista mare
    // (Taiem titlul lui si nu mai e click-able (schimband clasa))
    for (let i = 0; i < all.length; i++) {
        if (all[i] === `${event.target.parentElement.outerHTML}<br>`) {
            all[i] = `<div><div class="taskListElementNameCompleted">${event.target.innerHTML}</div><div class="taskListElementName" onclick="remove(event)">X</div></div><br>`;
            break;
        }
    }

    // Il scoatem din lista de necompletate
    for (let i = 0; i < incompleted.length; i++) {
        if (incompleted[i] === `${event.target.parentElement.outerHTML}<br>`) {
            incompleted.splice(i, 1);
            break;
        }
    }


    if (currentList === "all") {
        chooseAll();
    }

    if (currentList === "incompleted") {
        chooseIncompleted();
    }

    
}

function remove(event) {

    for (let i = 0; i < all.length; i++) {
        if (all[i] === `${event.target.parentElement.outerHTML}<br>`) {
            all.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < completed.length; i++) {
        if (completed[i] === `${event.target.parentElement.outerHTML}<br>`) {
            completed.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < incompleted.length; i++) {
        if (incompleted[i] === `${event.target.parentElement.outerHTML}<br>`) {
            incompleted.splice(i, 1);
            break;
        }
    }

    if (currentList === "all") {
        chooseAll();
    }

    if (currentList === "completed") {
        chooseCompleted();
    }

    if (currentList === "incompleted") {
        chooseIncompleted();
    }
}

function clearAll() {

    all.splice(0, all.length);
    completed.splice(0, completed.length);
    incompleted.splice(0, incompleted.length);

    if (currentList === "all") {
        chooseAll();
    }

    if (currentList === "completed") {
        chooseCompleted();
    }

    if (currentList === "incompleted") {
        chooseIncompleted();
    }
}
