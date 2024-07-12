let piggy: number = 0;

initializeLocalStorage();

updateWithLocalStorageData();

function initializeLocalStorage() {
    const storedNumber = localStorage.getItem("number");
    piggy = storedNumber !== null ? parseInt(storedNumber) : 0;

    if (storedNumber === null) {
        localStorage.setItem("number", `${piggy}`);
    }
}

function updateWithLocalStorageData() {
    for (let k: number = 0; k < piggy; k++) {
        updateTable(k);
    }
}

function stylingAdd() {
    const showButton = document.getElementById('show');
    showButton?.addEventListener("click", function () {
        const sect = document.getElementById("sect");
        const bod = document.getElementById("bod");

        if (sect && bod) {
            sect.style.display = "block";
            sect.style.backgroundColor = "grey";
            bod.style.backgroundColor = "grey";
        }
    });

    const crossButton = document.getElementById('cross');
    crossButton?.addEventListener('click', function () {
        const sect = document.getElementById('sect');
        const bod = document.getElementById("bod");

        if (sect && bod) {
            sect.style.display = "none";
            bod.style.backgroundColor = "white";
        }
    });
}

class PorkCreate2 {
    name: string;
    height: string;
    weight: string;
    personality: string;
    category: string;
    ability: string;

    constructor() {
        this.name = getInputValue('name');
        this.height = getInputValue('height');
        this.weight = getInputValue('weight');
        this.personality = getInputValue('personality');
        this.category = getInputValue('select');
        this.ability = getInputValue('ability');
    }
}

function getInputValue(id: string): string {
    return (<HTMLInputElement>document.getElementById(id))?.value || '';
}

function beforeAddToStorage() {
    const selectInput = document.getElementById("select");
    selectInput?.addEventListener('change', function () {
        const input = <HTMLInputElement>selectInput;
        const changeElement = document.getElementById("change");

        if (changeElement) {
            switch (input.value) {
                case "Chestnut":
                    changeElement.innerText = "Language";
                    break;
                case "Black":
                    changeElement.innerText = "Strength";
                    break;
                case "Grey":
                    changeElement.innerText = "Swimming";
                    break;
                case "White":
                    changeElement.innerText = "Racing";
                    break;
            }
        }
    });
}

function addToStorage() {
    const pig: PorkCreate2 = new PorkCreate2();
    localStorage.setItem(`Name${piggy}`, pig.name);
    localStorage.setItem(`Height${piggy}`, pig.height);
    localStorage.setItem(`Weight${piggy}`, pig.weight);
    localStorage.setItem(`Personality${piggy}`, pig.personality);
    localStorage.setItem(`Category${piggy}`, pig.category);

    const input = (<HTMLInputElement>document.getElementById("change"))?.innerText || '';

    switch (input) {
        case "Language":
            localStorage.setItem(`Language${piggy}`, pig.ability);
            break;
        case "Strength":
            localStorage.setItem(`Strength${piggy}`, pig.ability);
            break;
        case "Swimming":
            localStorage.setItem(`Swimming${piggy}`, pig.ability);
            break;
        case "Racing":
            localStorage.setItem(`Racing${piggy}`, pig.ability);
            break;
    }

    updateTable(piggy);
    piggy++;
}

function updateTable(i: number) {
    if (!localStorage.getItem(`Name${i}`)) {
        return;
    }

    const name: string = localStorage.getItem(`Name${i}`)!;
    const tableRow = document.createElement("tr");
    tableRow.setAttribute('id', `tRow${i}`);
    const tableEntry1 = createTableEntry("td1", name);
    tableRow.appendChild(tableEntry1);

    const category: string = localStorage.getItem(`Category${i}`)!;
    const tableEntry2 = createTableEntry("td1", category);
    tableRow.appendChild(tableEntry2);

    const tab1 = document.getElementById('tab1');
    tab1?.appendChild(tableRow);

    const moreInfo = createTableEntry("hovertext", "", true, `Name: ${name},Category: ${category},Height: ${localStorage.getItem(`Height${i}`)},Weight: ${localStorage.getItem(`Weight${i}`)},Personality: ${localStorage.getItem(`Personality${i}`)},${getAbilityText(i)}`);
    tableRow.appendChild(moreInfo);

    const deleteButton = createDeleteButton(i);
    tableRow.appendChild(deleteButton);

    localStorage.setItem("number", `${piggy + 1}`);
}

function createTableEntry(className: string, text: string, isHoverText: boolean = false, hoverTextContent: string = ''): HTMLElement {
    const tableEntry = document.createElement(isHoverText ? "td" : "td");
    tableEntry.setAttribute("class", className);

    if (isHoverText) {
        tableEntry.classList.add("hovertext");
        tableEntry.setAttribute("data-hover", hoverTextContent);
        tableEntry.appendChild(document.createTextNode("More Info"));
    } else {
        tableEntry.appendChild(document.createTextNode(text));
    }

    return tableEntry;
}

function createDeleteButton(i: number): HTMLElement {
    const dataEntry = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id", `${i}`);
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.onclick = function () { deleteProcedure(`${i}`, getAbilityText(i)); };
    dataEntry.appendChild(deleteButton);

    return dataEntry;
}

function getAbilityText(i: number): string {
    const inputText = getInputValue('change');

    if (!inputText) {
        return '';
    }

    switch (inputText) {
        case "Language":
            return localStorage.getItem(`Language${i}`)!;
        case "Strength":
            return localStorage.getItem(`Strength${i}`)!;
        case "Swimming":
            return localStorage.getItem(`Swimming${i}`)!;
        case "Racing":
            return localStorage.getItem(`Racing${i}`)!;
        default:
            return '';
    }
}

function deleteProcedure(string: string, inputText: string) {
    localStorage.removeItem(`Name${string}`);
    localStorage.removeItem(`Height${string}`);
    localStorage.removeItem(`Weight${string}`);
    localStorage.removeItem(`Personality${string}`);
    localStorage.removeItem(`Category${string}`);
    localStorage.removeItem(`${inputText}${string}`);

    const el = document.getElementById(`tRow${string}`);
    if (el) {
        el.remove();
    }
}

stylingAdd();
var btnClick = document.getElementById('add');
beforeAddToStorage();
btnClick!.addEventListener("click", function () { addToStorage() });