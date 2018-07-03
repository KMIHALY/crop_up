'use strict'
// timer code
let score = "unknown";
let rank = 1;
function countdown() {
    let min = 30;
    let sec = 0;
    let timeToDisplay = setInterval(cdowncode, 1000);

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

let bankAccount = 500;

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
        console.log(objectMaker);
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

let currentFieldId = "Field_1";

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

function makingIdToMarker(p_currentFieldId) {
    let idToMarker = Number(p_currentFieldId.slice(6, 8));
    idToMarker--;
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
    // állapotot elmentjük a objektumba !! A tömb megfelelő objektumának a mezőjére hivatkozni
    cellsNumber[makingIdToMarker(p_currentFieldId)].state = "grass";
    developField();
}

function developField() {
    document.getElementById("displayButton").style.display = "block";
    document.getElementById("seed").style.display = "block";
    if (bankAccount > 100) { document.getElementById("displayOptionPotato").style.display = "block"; }
    if (bankAccount > 120) { document.getElementById("displayOptionCorn").style.display = "block"; }
    if (bankAccount > 140) { document.getElementById("displayOptionTomato").style.display = "block"; }
    if (bankAccount > 160) { document.getElementById("displayOptionMarijuana").style.display = "block"; }
    if (bankAccount > 180) { document.getElementById("displayOptionPoppy").style.display = "block"; }
    if (bankAccount > 200) {
        // document.getElementById("displayOptionCorn").style.display = "block"; 
        // AUTOMATION
    }
}

function imgChanger(p_seedName, p_fieldId) {
    if (p_seedName === "wheat") { document.getElementById(p_fieldId).style.backgroundImage = wheat.pic; };
    if (p_seedName === "potato") { document.getElementById(p_fieldId).style.backgroundImage = potato.pic; };
    if (p_seedName === "corn") { document.getElementById(p_fieldId).style.backgroundImage = corn.pic; };
    if (p_seedName === "tomato") { document.getElementById(p_fieldId).style.backgroundImage = tomato.pic; };
    if (p_seedName === "marijuana") { document.getElementById(p_fieldId).style.backgroundImage = marijuana.pic; };
    if (p_seedName === "poppy") { document.getElementById(p_fieldId).style.backgroundImage = poppy.pic; };
}

function moneyReduction(p_seedName) {
    let subtrahend;
    if (p_seedName === "wheat") { subtrahend = wheat.sowingCost };
    if (p_seedName === "potato") { subtrahend = potato.sowingCost; };
    if (p_seedName === "corn") { subtrahend = corn.sowingCost; };
    if (p_seedName === "tomato") { subtrahend = tomato.sowingCost; };
    if (p_seedName === "marijuana") { subtrahend = marijuana.sowingCost; };
    if (p_seedName === "poppy") { subtrahend = poppy.sowingCost; };
    bankAccount = bankAccount - subtrahend;
}

function stateChanger(p_seedName, p_fieldId) {
    if (p_seedName === "wheat") { cellsNumber[makingIdToMarker(p_fieldId)].state = 'wheat'; };
    if (p_seedName === "potato") { cellsNumber[makingIdToMarker(p_fieldId)].state = 'potato'; };
    if (p_seedName === "corn") { cellsNumber[makingIdToMarker(p_fieldId)].state = 'corn'; };
    if (p_seedName === "tomato") { cellsNumber[makingIdToMarker(p_fieldId)].state = 'tomato'; };
    if (p_seedName === "marijuana") { cellsNumber[makingIdToMarker(p_fieldId)].state = 'marijuana'; };
    if (p_seedName === "poppy") { cellsNumber[makingIdToMarker(p_fieldId)].state = 'poppy'; };
    console.log(cellsNumber[makingIdToMarker(p_fieldId)].state);
}

function sowSomething(p_seedName, p_fieldId) {
    if (cellsNumber[makingIdToMarker(p_fieldId)].state === "grass") {
        moneyReduction(p_seedName);
        moneyCheck();
        showMoney();
        setTimeout(
            function () { imgChanger(p_seedName, p_fieldId) },
            4000);
        stateChanger(p_seedName, p_fieldId);
    } else {
        alert("Choose an irrigated field or buy and irrigate a new one.");
    }
}

let wheat = {
    growingPic: "url('\Pictures/growing_wheat.png')",
    pic: "url('\Pictures/wheat.jpg')",
    animation: "not yet",
    sowingCost: 5,
    harvestingIncome: 10,
};

let potato = {
    growingPic: "url('\Pictures/growing_potato.png')",
    pic: "url('\Pictures/potato.jpg')",
    animation: "notyet",
    sowingCost: 8,
    harvestingIncome: 20,
};

let corn = {
    growingPic: "url('\Pictures/growing_corn.gif')",
    pic: "url('\Pictures/corn.jpg')",
    animation: "notyet",
    sowingCost: 15,
    harvestingIncome: 35,
};

let tomato = {
    growingPic: "url('\Pictures/growing_tomato.gif')",
    pic: "url('\Pictures/tomato.jpg')",
    animation: "notyet",
    sowingCost: 20,
    harvestingIncome: 50,
};

let marijuana = {
    growingPic: "url('\Pictures/growing_marijuana.gif')",
    pic: "url('\Pictures/marijuana.jpg')",
    animation: "notyet",
    sowingCost: 30,
    harvestingIncome: 70,
};

let poppy = {
    growingPic: "url('\Pictures/growing_poppy.jpg')",
    pic: "url('\Pictures/poppy.jpg')",
    animation: "notyet",
    sowingCost: 20,
    harvestingIncome: 100,
};

/* let plants = [];
 plants.push(wheat, potato, corn, tomato, marijuana, poppy); */
