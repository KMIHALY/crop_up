// timer code
let score = "unknown";
let rank = 1;
function countdown() {
    let min = 50;
    let sec = 0;
    let timeToDisplay = setInterval(cdowncode, 1000);
    let test = "semmi";
    function cdowncode() {
        if (min === 0 && sec === 0) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + "0" + sec;
            clearInterval(timeToDisplay);
            alert("The time is over. Congratulation for finishing the game. Your score is " + score + ". Your rank is " + rank + ".");
            location.reload();
        }

        if (min > 9 && sec > 9) {
            document.getElementById("timernumber").innerHTML = min + " : " + sec;
        }
        if (min > 9 && sec < 10) {
            document.getElementById("timernumber").innerHTML = min + " : " + "0" + sec;
        }
        if (min < 10 && sec > 9) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + sec;
        }
        if (min < 10 && sec < 10) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + "0" + sec;
        }
        if (sec === 0) {
            min--;
            sec = 59;
        } else {
            sec--;
        }
    }
}

let bankAccount = 100;

let previousFieldName = "";
let cellInfo = [];

let fieldNumber = 1;

function createId() {
    let fieldId = "Field_" + fieldNumber;
    ++fieldNumber;
    return fieldId;
}

let cellsNumber = document.getElementsByTagName("TD");

function createIdAttribute() {
    let i = 0;
    while (i < cellsNumber.length) {
        let addId = document.createAttribute("ID");
        cellsNumber[i].setAttributeNode(addId);
        addId.value = createId();
        let objectMaker = new FieldInfo_obj(addId.value, "empty");
        cellInfo.push(objectMaker);
        i++;
    }
}

function moneyCheck() {
    if (bankAccount < 0) {
        err();
        location.reload();
    }
}

function showMoney() {
    document.getElementById("account").innerHTML = bankAccount;
}

function err() {
    alert("You have run out of money and lost the game. Nice work, moron.");
}

let currentFieldId = "";

function addingListener() {
    let i;
    for (i = 0; i < cellsNumber.length; i++) {
        cellsNumber[i].addEventListener("click", function () {
            currentFieldId = this.id;
            selectField(currentFieldId);
        }, false);
        cellsNumber[i].classList.add("cursor");
    }
}

function FieldInfo_obj(p_fieldId, p_state) {
    this.marker = p_fieldId;
    this.state = p_state;
}

function selectField(p_fieldId) {
    if (previousFieldName != "") {
        deSelectField(previousFieldName);
    }
    let selectThisField = document.getElementById(p_fieldId);
    selectThisField.classList.add("fieldBorder");
    selectThisField.style.width = "96px";
    selectThisField.style.height = "96px";
    currentFieldId = p_fieldId;
    previousFieldName = p_fieldId;
}

function deSelectField(p_fieldName) {
    let selectThisField = document.getElementById(p_fieldName);
    selectThisField.style.width = "100px";
    selectThisField.style.height = "100px";
    selectThisField.classList.remove("fieldBorder");
}

function makingIdToMarker(p_id) {
    let idToMarker = p_id.slice(6, 8);
    Number(idToMarker);
    idToMarker--;
    console.log(idToMarker);
    return idToMarker;
}


function newField(p_currentFieldId) {
    // pénz levonása
    bankAccount = bankAccount - 20;
    //ellenőrizzük a pénzt
    moneyCheck();
    //ha megvan, kiiratjuk
    showMoney();
    //új mező stílusformázása
    document.getElementById(p_currentFieldId).classList.add("fieldsize", "grassfield");
    // kezdőállapotot elmentünk a state objektumba !! A tömb megfelelő objektumának a mezőjére hivatkozni
    makingIdToMarker(p_currentFieldId);
    cellsNumber[makingIdToMarker].state = "grass";
    console.log(cellsNumber[makingIdToMarker].state);
    developField();
}

function imgChanger(p_currentFieldId) {
    document.getElementById(p_currentFieldId).classList.add("fieldsize", "grassfield");
}

function developField() {
    document.getElementById("displayButton").style.display = "block";
    document.getElementById("seed").style.display = "block";
    if (bankAccount > 100) {
        document.getElementById("displayOptionPotato").style.display = "block";
    }
    if (bankAccount > 120) {
        document.getElementById("displayOptionCorn").style.display = "block";
    }
    if (bankAccount > 140) {
        document.getElementById("displayOptionTomato").style.display = "block";
    }
    if (bankAccount > 160) {
        document.getElementById("displayOptionMarijuana").style.display = "block";
    }
    if (bankAccount > 180) {
        document.getElementById("displayOptionPoppy").style.display = "block";
    }
    if (bankAccount > 200) {
        // document.getElementById("displayOptionCorn").style.display = "block"; 
        // AUTOMATION
    }
}

function sowSomething() {
    sowSeed(previousFieldName);
}
/*
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
} */

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




