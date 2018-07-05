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

let cellsNumber = document.getElementById('table25').getElementsByTagName("TD");

function createIdAttribute() {
    let i = 0;
    while (i < cellsNumber.length) {
        let addId = document.createAttribute("ID");
        cellsNumber[i].setAttributeNode(addId);
        addId.value = createId();
        let objectField = new FieldInfo_obj(addId.value, "empty");
        cellInfo.push(objectField);
        i++;
        console.log(objectField);
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
    //document.getElementById(p_currentFieldId).classList.add('fieldsize', 'grassfield');
    document.getElementById(p_currentFieldId).style.backgroundImage = "url('Pictures/grass_texture.jpg')";
    // állapotot elmentjük a objektumba !! A tömb megfelelő objektumának a mezőjére hivatkozni
    cellsNumber[makingIdToMarker(p_currentFieldId)].state = "grass";
    console.log(cellsNumber[makingIdToMarker(p_currentFieldId)].state);
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
    if (p_seedName === "wheat") { document.getElementById(p_fieldId).style.backgroundImage = plantInfo[0].pic; };
    if (p_seedName === "potato") { document.getElementById(p_fieldId).style.backgroundImage = plantInfo[1].pic; };
    if (p_seedName === "corn") { document.getElementById(p_fieldId).style.backgroundImage = plantInfo[2].pic; };
    if (p_seedName === "tomato") { document.getElementById(p_fieldId).style.backgroundImage = plantInfo[3].pic; };
    if (p_seedName === "marijuana") { document.getElementById(p_fieldId).style.backgroundImage = plantInfo[4].pic; };
    if (p_seedName === "poppy") { document.getElementById(p_fieldId).style.backgroundImage = plantInfo[5].pic; };
}


function moneyReduction(p_seedName) {
    let subtrahend;
    if (p_seedName === "wheat") { subtrahend = plantInfo[0].sowingCost };
    if (p_seedName === "potato") { subtrahend = plantInfo[1].sowingCost; };
    if (p_seedName === "corn") { subtrahend = plantInfo[2].sowingCost; };
    if (p_seedName === "tomato") { subtrahend = plantInfo[3].sowingCost; };
    if (p_seedName === "marijuana") { subtrahend = plantInfo[4].sowingCost; };
    if (p_seedName === "poppy") { subtrahend = plantInfo[5].sowingCost; };
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

function PlantInfo_obj(p_name, p_growingPic, p_pic, p_animation, p_sowingCost, p_harvestingIncome, p_ripeningTime) {
    this.name = p_name;
    this.growingPic = p_growingPic;
    this.pic = p_pic;
    this.animation = p_animation;
    this.sowingCost = p_sowingCost;
    this.harvestingIncome = p_harvestingIncome;
    this.ripeningTime = p_ripeningTime;
}

let plantInfo = [];

function createPlants() {
let objectPlant;
objectPlant = new PlantInfo_obj("wheat", "url('\Pictures/growing_wheat.png')", "url('\Pictures/wheat.jpg')", "notyet", 5, 10, 10000, );
plantInfo.push(objectPlant);
objectPlant = new PlantInfo_obj("potato", "url('\Pictures/growing_potato.png')", "url('\Pictures/potato.jpg')", "notyet", 8, 20, 10000, );
plantInfo.push(objectPlant);
objectPlant = new PlantInfo_obj("corn", "url('\Pictures/growing_corn.gif')", "url('\Pictures/corn.jpg')", "notyet", 15, 35, 10000, );
plantInfo.push(objectPlant);
objectPlant = new PlantInfo_obj("tomato", "url('\Pictures/growing_tomato.gif')", "url('\Pictures/tomato.jpg')", "notyet", 20, 50, 10000, );
plantInfo.push(objectPlant);
objectPlant = new PlantInfo_obj("marijuana", "url('\Pictures/growing_marijuana.gif')", "url('\Pictures/marijuana.jpg')", "notyet", 30, 70, 10000, ); 
plantInfo.push(objectPlant);
objectPlant = new PlantInfo_obj('poppy', "url('\Pictures/growing_poppy.jpg')", "url('\Pictures/poppy.jpg')", "notyet", 20, 100, 10000, );
plantInfo.push(objectPlant);
}

function priceAndProfit() {
    createPlants();
    document.getElementById('plWhe').innerHTML = plantInfo[0].name;
    document.getElementById('plPot').innerHTML = plantInfo[1].name;
    document.getElementById('plCor').innerHTML = plantInfo[2].name;
    document.getElementById('plTom').innerHTML = plantInfo[3].name;
    document.getElementById('plMar').innerHTML = plantInfo[4].name;
    document.getElementById('plPop').innerHTML = plantInfo[5].name;

    document.getElementById('priWhe').innerHTML = plantInfo[0].sowingCost;
    document.getElementById('priPot').innerHTML = plantInfo[1].sowingCost;
    document.getElementById('priCor').innerHTML = plantInfo[2].sowingCost;
    document.getElementById('priTom').innerHTML = plantInfo[3].sowingCost;
    document.getElementById('priMar').innerHTML = plantInfo[4].sowingCost;
    document.getElementById('priPop').innerHTML = plantInfo[5].sowingCost;

    document.getElementById('proWhe').innerHTML = plantInfo[0].harvestingIncome;
    document.getElementById('proPot').innerHTML = plantInfo[1].harvestingIncome;
    document.getElementById('proCor').innerHTML = plantInfo[2].harvestingIncome;
    document.getElementById('proTom').innerHTML = plantInfo[3].harvestingIncome;
    document.getElementById('proMar').innerHTML = plantInfo[4].harvestingIncome;
    document.getElementById('proPop').innerHTML = plantInfo[5].harvestingIncome;
}
