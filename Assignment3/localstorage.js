var piggy = 0;
initializeLocalStorage();
updateWithLocalStorageData();
function initializeLocalStorage() {
    var storedNumber = localStorage.getItem("number");
    piggy = storedNumber !== null ? parseInt(storedNumber) : 0;
    if (storedNumber === null) {
        localStorage.setItem("number", "".concat(piggy));
    }
}
function updateWithLocalStorageData() {
    for (var k = 0; k < piggy; k++) {
        updateTable(k);
    }
}
function stylingAdd() {
    var showButton = document.getElementById('show');
    showButton === null || showButton === void 0 ? void 0 : showButton.addEventListener("click", function () {
        var sect = document.getElementById("sect");
        var bod = document.getElementById("bod");
        if (sect && bod) {
            sect.style.display = "block";
            sect.style.backgroundColor = "grey";
            bod.style.backgroundColor = "grey";
        }
    });
    var crossButton = document.getElementById('cross');
    crossButton === null || crossButton === void 0 ? void 0 : crossButton.addEventListener('click', function () {
        var sect = document.getElementById('sect');
        var bod = document.getElementById("bod");
        if (sect && bod) {
            sect.style.display = "none";
            bod.style.backgroundColor = "white";
        }
    });
}
var PorkCreate2 = /** @class */ (function () {
    function PorkCreate2() {
        this.name = getInputValue('name');
        this.height = getInputValue('height');
        this.weight = getInputValue('weight');
        this.personality = getInputValue('personality');
        this.category = getInputValue('select');
        this.ability = getInputValue('ability');
    }
    return PorkCreate2;
}());
function getInputValue(id) {
    var _a;
    return ((_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.value) || '';
}
function beforeAddToStorage() {
    var selectInput = document.getElementById("select");
    selectInput === null || selectInput === void 0 ? void 0 : selectInput.addEventListener('change', function () {
        var input = selectInput;
        var changeElement = document.getElementById("change");
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
    var _a;
    var pig = new PorkCreate2();
    localStorage.setItem("Name".concat(piggy), pig.name);
    localStorage.setItem("Height".concat(piggy), pig.height);
    localStorage.setItem("Weight".concat(piggy), pig.weight);
    localStorage.setItem("Personality".concat(piggy), pig.personality);
    localStorage.setItem("Category".concat(piggy), pig.category);
    var input = ((_a = document.getElementById("change")) === null || _a === void 0 ? void 0 : _a.innerText) || '';
    switch (input) {
        case "Language":
            localStorage.setItem("Language".concat(piggy), pig.ability);
            break;
        case "Strength":
            localStorage.setItem("Strength".concat(piggy), pig.ability);
            break;
        case "Swimming":
            localStorage.setItem("Swimming".concat(piggy), pig.ability);
            break;
        case "Racing":
            localStorage.setItem("Racing".concat(piggy), pig.ability);
            break;
    }
    updateTable(piggy);
    piggy++;
}
function updateTable(i) {
    if (!localStorage.getItem("Name".concat(i))) {
        return;
    }
    var name = localStorage.getItem("Name".concat(i));
    var tableRow = document.createElement("tr");
    tableRow.setAttribute('id', "tRow".concat(i));
    var tableEntry1 = createTableEntry("td1", name);
    tableRow.appendChild(tableEntry1);
    var category = localStorage.getItem("Category".concat(i));
    var tableEntry2 = createTableEntry("td1", category);
    tableRow.appendChild(tableEntry2);
    var tab1 = document.getElementById('tab1');
    tab1 === null || tab1 === void 0 ? void 0 : tab1.appendChild(tableRow);
    var moreInfo = createTableEntry("hovertext", "", true, "Name: ".concat(name, ",Category: ").concat(category, ",Height: ").concat(localStorage.getItem("Height".concat(i)), ",Weight: ").concat(localStorage.getItem("Weight".concat(i)), ",Personality: ").concat(localStorage.getItem("Personality".concat(i)), ",").concat(getAbilityText(i)));
    tableRow.appendChild(moreInfo);
    var deleteButton = createDeleteButton(i);
    tableRow.appendChild(deleteButton);
    localStorage.setItem("number", "".concat(piggy + 1));
}
function createTableEntry(className, text, isHoverText, hoverTextContent) {
    if (isHoverText === void 0) { isHoverText = false; }
    if (hoverTextContent === void 0) { hoverTextContent = ''; }
    var tableEntry = document.createElement(isHoverText ? "td" : "td");
    tableEntry.setAttribute("class", className);
    if (isHoverText) {
        tableEntry.classList.add("hovertext");
        tableEntry.setAttribute("data-hover", hoverTextContent);
        tableEntry.appendChild(document.createTextNode("More Info"));
    }
    else {
        tableEntry.appendChild(document.createTextNode(text));
    }
    return tableEntry;
}
function createDeleteButton(i) {
    var dataEntry = document.createElement("td");
    var deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "deleteButton");
    deleteButton.setAttribute("id", "".concat(i));
    deleteButton.appendChild(document.createTextNode("Delete"));
    deleteButton.onclick = function () { deleteProcedure("".concat(i), getAbilityText(i)); };
    dataEntry.appendChild(deleteButton);
    return dataEntry;
}
function getAbilityText(i) {
    var inputText = getInputValue('change');
    if (!inputText) {
        return '';
    }
    switch (inputText) {
        case "Language":
            return localStorage.getItem("Language".concat(i));
        case "Strength":
            return localStorage.getItem("Strength".concat(i));
        case "Swimming":
            return localStorage.getItem("Swimming".concat(i));
        case "Racing":
            return localStorage.getItem("Racing".concat(i));
        default:
            return '';
    }
}
function deleteProcedure(string, inputText) {
    localStorage.removeItem("Name".concat(string));
    localStorage.removeItem("Height".concat(string));
    localStorage.removeItem("Weight".concat(string));
    localStorage.removeItem("Personality".concat(string));
    localStorage.removeItem("Category".concat(string));
    localStorage.removeItem("".concat(inputText).concat(string));
    var el = document.getElementById("tRow".concat(string));
    if (el) {
        el.remove();
    }
}
stylingAdd();
var btnClick = document.getElementById('add');
beforeAddToStorage();
btnClick.addEventListener("click", function () { addToStorage(); });
