// String care indica lista de task-uri pe care ne aflam.
let currentList = "all";

// Variabile care memoreaza task-urile in functie de statusul lor.
// (Liste de outerHTML-uri).
let all = [];
let completed = [];
let incompleted = [];

// Gestionarea afisarii butoanelor
// "Mark all as done" si "Clear All".
function showBottomButtons() {
    let myMarkButton = document.getElementById('markButton');
    let myClearButton = document.getElementById('clearButton');

    // Daca nu exista task-uri introduse, nu afisam niciun buton.
    if (all.length == 0) {
        myMarkButton.style.display = 'none';
        myClearButton.style.display = 'none';
    // Daca toate task-urile au fost completate, afisam doar "Clear All".
    } else if (all.length == completed.length) {
        myMarkButton.style.display = 'none';
        myClearButton.style.display = 'inline-block';
    // Daca exista task-uri necompletate, afisam ambele butoane.
    } else {
        myMarkButton.style.display = 'inline-block';
        myClearButton.style.display = 'inline-block';
    }
}

// Legaturi catre butoanele prin care user-ul selecteaza
// ce lista de task-uri va fi afisata.
let myAllButton = document.getElementById('allButton');
let myCompletedButton = document.getElementById('completedButton');
let myIncompletedButton = document.getElementById('incompletedButton');

// Functie de populare a div-ului cu id "taskList" cu elemente din lista aleasa.
function populateTaskList(chosenList) {
    document.getElementById('taskList').innerHTML = ``;

    if (chosenList.length == 0) {
        document.getElementById('taskList').innerHTML += `<div class="nothing">Nothing to see here.</div>`;
        return;
    }

    for (let i = 0; i < chosenList.length; i++) {
        document.getElementById('taskList').innerHTML += chosenList[i];
    }
}

// Functii specifice selectarii unei liste de task-uri.
function chooseAll() {
    // Ingrosarea border-ului listei selectate.
    myAllButton.style.border = '2px solid black';
    myCompletedButton.style.border = '0px solid black';
    myIncompletedButton.style.border = '0px solid black';

    // Indicam noua lista pe care ne aflam.
    currentList = "all";

    // Actualizam display-ul butoanelor "Mark all as done" si "Clear All".
    showBottomButtons();

    // Populam div-ul aferent cu elementele listei selectate.
    populateTaskList(all);
}

function chooseCompleted() {
    myAllButton.style.border = '0px solid black';
    myCompletedButton.style.border = '2px solid black';
    myIncompletedButton.style.border = '0px solid black';

    currentList = "completed";
    showBottomButtons();
    populateTaskList(completed);
}

function chooseIncompleted() {
    myAllButton.style.border = '0px solid black';
    myCompletedButton.style.border = '0px solid black';
    myIncompletedButton.style.border = '2px solid black';

    currentList = "incompleted";
    showBottomButtons();
    populateTaskList(incompleted);
}

// Gestionarea input-ului oferit de user.
function saveInput(event) {
    // Memoram input-ul.
    var taskName = document.getElementById('task').value;

    // Cream legaturi catre posibilele erori care pot fi afisate.
    let myErrorEmpty = document.getElementById('errorEmpty');
    let myErrorAlreadyExists = document.getElementById('errorAlreadyExists');

    // Verificam daca input field-ul a fost trimis gol.
    if (taskName === "") {
        // Afisam eroarea aferenta.
        myErrorEmpty.style.display = 'block';
        myErrorAlreadyExists.style.display = 'none';

        event.preventDefault();
        return;
    }

    myErrorEmpty.style.display = 'none';

    // Cream un div pentru task-ul nou introdus.
    var newTaskListElement = `<div class="taskListElement"><div class="taskListElementName" onclick="complete(event)">${taskName}</div><div class="taskListElementX" onclick="remove(event)">x</div></div>`;

    // Cream si codul HTML pentru acelasi task, dar completat
    // (pentru a putea verifica daca acesta exista deja in lista, indiferent de statusul sau).
    var temp = document.createElement('div');
    temp.innerHTML = newTaskListElement;
    temp.firstChild.firstChild.style.cursor = 'auto';
    temp.firstChild.firstChild.style.textDecoration = 'line-through';
    temp.firstChild.firstChild.removeAttribute("onclick");

    var newTaskListElementCompleted = temp.firstChild.outerHTML;

    // Verificam daca task-ul introdus exista deja.
    for (let i = 0; i < all.length; i++) {
        if (all[i] === newTaskListElement || all[i] === newTaskListElementCompleted) {
            // Afisam eroarea aferenta.
            myErrorAlreadyExists.style.display = 'block';

            event.preventDefault();
            return;
        }
    }
    
    myErrorAlreadyExists.style.display = 'none';

    // Adaugam task-ul in listele "All" si "Incompleted".
    all.push(newTaskListElement);
    incompleted.push(newTaskListElement);
    
    // In functie de lista selectata la momentul introducerii noului task,
    // actualizam continutul div-ului "taskList".
    if (currentList === "all") {
        chooseAll();
    }

    if (currentList === "incompleted") {
        chooseIncompleted();
    }

    // Resetam input field-ul.
    document.getElementById('task').value = "";

    event.preventDefault();

}

// Completarea unui task la apasarea numelui lui.
function complete(event) {
    // Cream o copie a formei initiale a unui task.
    let initialDivForm = event.target.parentElement.outerHTML;
    
    // Taiem titlul si eliminam proprietatea de "onlick".
    event.target.style.cursor = 'auto';
    event.target.style.textDecoration = 'line-through';
    event.target.removeAttribute("onclick");

    // Adaugam in lista "Completed".
    completed.push(event.target.parentElement.outerHTML);

    // Actualizam forma task-ului in lista "All".
    for (let i = 0; i < all.length; i++) {
        if (all[i] === initialDivForm) {
            all[i] = event.target.parentElement.outerHTML;
            break;
        }
    }

    // Stergem task-ul din lista "Incompleted".
    for (let i = 0; i < incompleted.length; i++) {
        if (incompleted[i] === initialDivForm) {
            incompleted.splice(i, 1);
            break;
        }
    }

    // In functie de lista selectata la momentul completarii task-ului,
    // actualizam continutul div-ului "taskList".
    if (currentList === "all") {
        chooseAll();
    }

    if (currentList === "incompleted") {
        chooseIncompleted();
    }

    
}

// Stergerea unui task la apasarea butonului "x" din dreptul numelui lui.
function remove(event) {
    // Stergem task-ul din fiecare lista in parte.
    for (let i = 0; i < all.length; i++) {
        if (all[i] === event.target.parentElement.outerHTML) {
            all.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < completed.length; i++) {
        if (completed[i] === event.target.parentElement.outerHTML) {
            completed.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < incompleted.length; i++) {
        if (incompleted[i] === event.target.parentElement.outerHTML) {
            incompleted.splice(i, 1);
            break;
        }
    }

    // In functie de lista selectata la momentul stergerii task-ului,
    // actualizam continutul div-ului "taskList".
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

// Stergerea tuturor task-urilor la apasarea butonului "Clear All".
function clearAll() {
    // Golim fiecare lista in parte.
    all.splice(0, all.length);
    completed.splice(0, completed.length);
    incompleted.splice(0, incompleted.length);

    // In functie de lista selectata la momentul stergerii tuturor task-urilor,
    // actualizam continutul div-ului "taskList".
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

// Completarea tuturor task-urilor la apasarea butonului "Mark all as done".
function markAll() {
    // Iteram prin task-urile din lista "All".
    for (let i = 0; i < all.length; i++) {
        // Verificam daca task-ul curent a fost sau nu completat.
        // (Proprietate determinata din formatul outerHTML-ului).
        if (all[i].charAt(87) == '>') {
            // Convertim outerHTML-ul in HTML/DOM Node/Element.
            var temp = document.createElement('div');
            temp.innerHTML = all[i];

            // Modificam proprietatile aferente completarii unui task.
            temp.firstChild.firstChild.style.cursor = 'auto';
            temp.firstChild.firstChild.style.textDecoration = 'line-through';
            temp.firstChild.firstChild.removeAttribute("onclick");

            all[i] = temp.firstChild.outerHTML;
            completed.push(temp.firstChild.outerHTML);
        }
    }

    // Stergem toate task-urile din lista "Incompleted".
    incompleted.splice(0, incompleted.length);

    // In functie de lista selectata la momentul completarii tuturor task-urilor,
    // actualizam continutul div-ului "taskList".
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
