
let bankAccount = 100;
let currentField;
let previousFieldName = "";
let cellInfo = [];

let fieldNumber = 0;

function createId() {
    let fieldId = "Field_" + fieldNumber;
    ++fieldNumber;
    return fieldId;
    console.log(fieldId);
}

//addclick-et rátesszük minden TD-re
// document.getElementsByTagName("TD").addEventListener("click", function () {     selectField(fieldId); }, false);

function addingListener() {
    let listenObject = document.getElementsByTagName("TD");
    listenObject.addEventListener("click", function () {     selectField(fieldId); }, false);
} 

function moneyCheck() {
    if (bankAccount < 0) {
        err();
        location.reload();
    }
}

function showMoney() {
    document.getElementById("account").innerHTML = bankAccount;
    addingListener();
}

function err() {
    alert("You have run out of money and lost the game. Nice work, moron.");
}

function fieldInfo_obj(p_fieldId, p_state) {
    this.id = p_fieldId;
    this.state = p_state;
}

let objectMaker = new fieldInfo_obj(fieldId, "empty");
cellInfo.push(objectMaker);






function selectField(p_fieldId) {
    if (previousFieldName != "") {
        deSelectField(previousFieldName);
    }
    let selectThisField = document.getElementById(p_fieldId);
    selectThisField.classList.add("fieldBorder");
    selectThisField.style.width = "96px";
    selectThisField.style.height = "96px";
    previousFieldName = p_fieldId;
    developField();

}

function deSelectField(p_fieldName) {
    let selectThisField = document.getElementById(p_fieldName);
    selectThisField.style.width = "100px";
    selectThisField.style.height = "100px";
    selectThisField.classList.remove("fieldBorder");
}
/*
function developField() {
    document.getElementById("displayButton").style.display = "block";
    document.getElementById("seed").style.display = "block";
}
function sowSomething() {
    sowSeed(previousFieldName);
}

function imgChanger(fName) {
    if (state.fName = "empty") {
        document.getElementById(fName).style.backgroundImage = "url('\Pictures/growingwheat.png')";
    }
    if (state.fName = "growingWheat") {
        setTimeout(function () { document.getElementById(fName).style.backgroundImage = "url('\Pictures/wheat.jpg')"; }, 10000);
    }
    if (state.fName = "wheat") {
        document.getElementById(fName).style.backgroundImage = "url('\Pictures/growingwheat.png')";
    }
}

function sowSeed(fName) {
    if (state.fName === "empty") {
        if (document.getElementById("seed").value === "wheat") {
            bankAccount = bankAccount - 5;
            moneyCheck();
            console.log(bankAccount);
            showMoney();
            imgChanger(fName);
            setTimeout()

        }
    }
}



function createIdAttribute(fieldId, fieldElement) {
    let addId = document.createAttribute("ID");
    addId.value = fieldId;
    fieldElement.setAttributeNode(addId);
}


function newField() {
    // pénz levonása
    bankAccount = bankAccount - 20;
    //ellenőrizzük a pénzt
    moneyCheck();
    //ha megvan, kiiratjuk
    showMoney();

    //id-et létrehozzuk
    let fieldId = createId();
    createIdAttribute(fieldId, addField);

    // itt kell bepusholni az objektumot egy tömbbe, amire hivatkozunk a fv végén
    //új mező stílusformázása
    addField.classList.add("fieldsize", "grassfield");



    //kijelöljük az aktuális mezőt
    selectField(fieldId);
    // kezdőállapotot elmentünk a state objektumba !! A tömb megfelelő objektumának a mezőjére hivatkozni
    state.fieldName = "empty";
    console.log(state.fieldName);
}

*/