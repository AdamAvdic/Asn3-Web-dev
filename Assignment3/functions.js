"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTable = exports.addToLocalStorage = exports.updateLocalStorageData = void 0;
var Pigclass_1 = require("./Pigclass");
var pigCounter = 0;
if (localStorage.getItem("pigCounter") == null) {
    localStorage.setItem("pigCounter", "".concat(pigCounter));
}
else {
    pigCounter = parseInt(localStorage.getItem("pigCounter"));
}
function updateLocalStorageData() {
    for (var index = 0; index < localStorage.length; index++) {
        updateTable(index);
    }
}
exports.updateLocalStorageData = updateLocalStorageData;
function addToLocalStorage() {
    var pig = new Pigclass_1.Pig();
    saveToLocalStorage(pig);
    updateTable(pigCounter);
    pigCounter++;
}
exports.addToLocalStorage = addToLocalStorage;
function updateTable(index) {
    if (localStorage.getItem("Name".concat(index)) == null) {
        return;
    }
    var pigName = localStorage.getItem("Name".concat(index));
    var pigCategory = localStorage.getItem("Category".concat(index));
    var tableRow = createTableRow();
    appendTableEntry(tableRow, pigName, "td1");
    appendTableEntry(tableRow, pigCategory, "td1");
    appendMoreInfo(tableRow, pigName, pigCategory, index);
    appendDeleteButton(tableRow, index);
    var table = document.getElementById('tab1');
    table === null || table === void 0 ? void 0 : table.appendChild(tableRow);
    localStorage.setItem("pigCounter", "".concat(pigCounter + 1));
}
exports.updateTable = updateTable;
function createTableRow() {
    return document.createElement("tr");
}
function appendTableEntry(row, data, id) {
    var tableEntry = createTableEntry(data, id);
    row.appendChild(tableEntry);
}
function createTableEntry(data, id) {
    var tableEntry = document.createElement("td");
    tableEntry.setAttribute("id", id);
    var updateData = document.createTextNode(data);
    tableEntry.appendChild(updateData);
    return tableEntry;
}
function appendMoreInfo(row, name, category, i) {
    var height = localStorage.getItem("Height".concat(i));
    var weight = localStorage.getItem("Weight".concat(i));
    var personality = localStorage.getItem("Personality".concat(i));
    var moreInfo = createMoreInfoElement(name, category, height, weight, personality);
    row.appendChild(moreInfo);
}
function createMoreInfoElement(name, category, height, weight, personality) {
    var moreInfo = document.createElement("td");
    moreInfo.setAttribute("class", "hovertext");
    moreInfo.setAttribute("data-hover", "Name: ".concat(name, "\nCategory: ").concat(category, "\nHeight: ").concat(height, "\nWeight: ").concat(weight, "\nPersonality: ").concat(personality));
    var details = document.createTextNode("More Info");
    moreInfo.appendChild(details);
    return moreInfo;
}
function appendDeleteButton(row, i) {
    var deleteButton = createDeleteButton(i);
    var dataEntry = createDataEntry(deleteButton);
    row.appendChild(dataEntry);
}
function createDeleteButton(i) {
    var deleteButton = document.createElement("button");
    var updateText = document.createTextNode("Delete");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id", "".concat(i));
    deleteButton.appendChild(updateText);
    deleteButton.onclick = function () { deleteProcedure("".concat(i)); };
    return deleteButton;
}
function createDataEntry(element) {
    var dataEntry = document.createElement("td");
    dataEntry.appendChild(element);
    return dataEntry;
}
function saveToLocalStorage(pig) {
    localStorage.setItem("Name".concat(pig), pig.name);
    localStorage.setItem("Height".concat(pig), pig.height);
    localStorage.setItem("Weight".concat(pig), pig.weight);
    localStorage.setItem("Personality".concat(pig), pig.personality);
    localStorage.setItem("Category".concat(pig), pig.category);
}
function deleteProcedure(string) {
    localStorage.removeItem("Name".concat(string));
    localStorage.removeItem("Height".concat(string));
    localStorage.removeItem("Weight".concat(string));
    localStorage.removeItem("Personality".concat(string));
    localStorage.removeItem("Category".concat(string));
    var el = document.getElementById("tRow".concat(string));
    if (el) {
        el.remove();
    }
}
