import { Pig } from "./Pigclass"

let j: number = 0;

if (localStorage.getItem("number") == null) {
    localStorage.setItem("number", `${j}`);
} else {
    j = parseInt(localStorage.getItem("number")!);
}

export function updateWithLocalStorageData() {
    for (let k: number = 0; k < localStorage.length; k++) {
        updateTable(k);
    }
}

export function addToStorage() {
    const pig: Pig = new Pig();
    saveToLocalStorage(pig);
    updateTable(j);
    j++;
}

export function updateTable(i: number) {
    if (localStorage.getItem(`Name${i}`) == null) {
        return;
    }

    const name: string = localStorage.getItem(`Name${i}`)!;
    const category: string = localStorage.getItem(`Category${i}`)!;

    const tableRow = createTableRow();
    appendTableEntry(tableRow, name, "td1");
    appendTableEntry(tableRow, category, "td1");
    appendMoreInfo(tableRow, name, category, i);
    appendDeleteButton(tableRow, i);

    const tab1 = document.getElementById('tab1');
    tab1?.appendChild(tableRow);

    localStorage.setItem("number", `${j + 1}`);
}

function createTableRow(): HTMLTableRowElement {
    return document.createElement("tr");
}

function appendTableEntry(row: HTMLTableRowElement, data: string, id: string): void {
    const tableEntry = createTableEntry(data, id);
    row.appendChild(tableEntry);
}

function createTableEntry(data: string, id: string): HTMLTableDataCellElement {
    const tableEntry = document.createElement("td");
    tableEntry.setAttribute("id", id);
    const updateData = document.createTextNode(data);
    tableEntry.appendChild(updateData);
    return tableEntry;
}

function appendMoreInfo(row: HTMLTableRowElement, name: string, category: string, i: number): void {
    const height: string = localStorage.getItem(`Height${i}`)!;
    const weight: string = localStorage.getItem(`Weight${i}`)!;
    const personality: string = localStorage.getItem(`Personality${i}`)!;

    const moreInfo = createMoreInfoElement(name, category, height, weight, personality);
    row.appendChild(moreInfo);
}

function createMoreInfoElement(name: string, category: string, height: string, weight: string, personality: string): HTMLTableDataCellElement {
    const moreInfo = document.createElement("td");
    moreInfo.setAttribute("class", "hovertext");
    moreInfo.setAttribute("data-hover", `Name: ${name}\nCategory: ${category}\nHeight: ${height}\nWeight: ${weight}\nPersonality: ${personality}`);

    const details = document.createTextNode("More Info");
    moreInfo.appendChild(details);

    return moreInfo;
}

function appendDeleteButton(row: HTMLTableRowElement, i: number): void {
    const deleteButton = createDeleteButton(i);
    const dataEntry = createDataEntry(deleteButton);
    row.appendChild(dataEntry);
}

function createDeleteButton(i: number): HTMLButtonElement {
    const deleteButton = document.createElement("button");
    const updateText = document.createTextNode("Delete");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id", `${i}`);
    deleteButton.appendChild(updateText);
    deleteButton.onclick = function () { deleteProcedure(`${i}`); };
    return deleteButton;
}

function createDataEntry(element: HTMLElement): HTMLTableDataCellElement {
    const dataEntry = document.createElement("td");
    dataEntry.appendChild(element);
    return dataEntry;
}

function saveToLocalStorage(pig: Pig): void {
    localStorage.setItem(`Name${j}`, pig.name);
    localStorage.setItem(`Height${j}`, pig.height);
    localStorage.setItem(`Weight${j}`, pig.weight);
    localStorage.setItem(`Personality${j}`, pig.personality);
    localStorage.setItem(`Category${j}`, pig.category);
}

function deleteProcedure(string: string): void {
    localStorage.removeItem(`Name${string}`);
    localStorage.removeItem(`Height${string}`);
    localStorage.removeItem(`Weight${string}`);
    localStorage.removeItem(`Personality${string}`);
    localStorage.removeItem(`Category${string}`);

    const el = document.getElementById(`tRow${string}`);
    if (el) {
        el.remove();
    }
}