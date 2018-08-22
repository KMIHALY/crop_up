'use strict'

// welcome message starts here
function opacityReducer() {
    opac = opac - 0.1;
    document.getElementById('translucentBackground').style.opacity = opac;
    console.log(document.getElementById('translucentBackground').style.opacity);
    if (opac > 0.2) {
        fogReducer();
    };
    if (opac < 0.15) {
        removeFog();
    }
}

function fogReducer() {
    let mySetTimeOut = setTimeout(opacityReducer, 150);
}

let opac;
let fog;
function welcome() {
    let welcomeText = document.getElementById('welcomeDivID');
    welcomeText.parentNode.removeChild(welcomeText);
    fog = document.getElementById('translucentBackground');
    opac = Number(window.getComputedStyle(fog).getPropertyValue("opacity"));
    fogReducer();
}

function removeFog() {
    fog.parentNode.removeChild(fog);
}

function makeStyleDisplay(elementId, displayType) {
    document.getElementById(elementId).style.display = displayType;
}

function controlOn() {
    // document.getElementById("controlpanelRight").style.display = "block";
    //  document.getElementById("controlpanelLeft").style.display = "block";
    makeStyleDisplay("controlpanelRight", "block");
    makeStyleDisplay("controlpanelLeft", "block");
}

let rank = 'Nobody';

// timer starts here
let min;
let sec = 1;

function countdown() {
    const timeToDisplay = setInterval(cdowncode, 1000);

    function cdowncode() {
        if (min === 0 && sec === 0) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + "0" + sec;
            clearInterval(timeToDisplay);
            alert("The time is over. Congratulation for finishing the game. In your bank account you've managed to collect " + record + " GKT. Your rank is " + rank + ".");
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
        if (min < 1 && sec < 10) {
            document.getElementById("timer").classList.add("timerBackgroundAnimation");
        }
        if (sec === 0) {
            min--;
            sec = 59;
        } else {
            sec--;
        }
    }
}

function showTime() {
    min = Number(document.getElementById('gametime').value);
}

//money at the beginning

let bankAccount = 100;

//creation of fields and their properties

let previousFieldName = "";
let cellInfo = [];
let fieldNumber = 1;


function createId() {
    const fieldId = "Field_" + fieldNumber;
    ++fieldNumber;
    return fieldId;
}

let cellsNumber = document.getElementById('table25').getElementsByTagName("TD");

class FieldInfo_obj {
    constructor(p_fieldId, p_state) {
        this.marker = p_fieldId;
        this.state = p_state;
        this.isAutomationON = false;
        //this means there is an ongoing automation process and you cannot start anything else in the given field
    }
}

function createIdAttribute() {
    let i = 0;
    while (i < cellsNumber.length) {
        const addId = document.createAttribute("ID");
        cellsNumber[i].setAttributeNode(addId);
        addId.value = createId();
        const objectField = new FieldInfo_obj(addId.value, "empty");
        cellInfo.push(objectField);
        i++;
    }
}

let record = 100;

function showMoney() {
    if (bankAccount > record) {
        record = bankAccount;
        if (record > 200) {
            rank = "Newbie";
        }
        if (record > 400) {
            rank = "Honourable Peasant";
        }
        if (record > 600) {
            rank = "Mighty Merchant";
        }
        if (record > 1000) {
            rank = "Dainty Dealer";
        }
        if (record > 2500) {
            rank = "Ruler of the Underworld";
        }
        if (record > 10000) {
            rank = "Briliant Borgia";
        }
    }
    document.getElementById("account").innerHTML = bankAccount;
}

function err() {
    // alert("You have run out of money and lost the game. Nice work, moron.");
    alert("I've told you to keep your eye on your GKT money, ehh?");
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

function selectField(p_fieldId) {

    if (previousFieldName != "") {
        deSelectField(previousFieldName);
    }
    const selectThisField = document.getElementById(p_fieldId);
    selectThisField.classList.add("fieldBorder");
    selectThisField.style.width = "96px";
    selectThisField.style.height = "96px";
    currentFieldId = p_fieldId;
    console.log("SELECTED: " + currentFieldId + ". State: " + cellInfo[makingIdToMarker(currentFieldId)].state);
    previousFieldName = p_fieldId;
}

function deSelectField(p_fieldName) {
    const deselectThisField = document.getElementById(p_fieldName);
    deselectThisField.style.width = "100px";
    deselectThisField.style.height = "100px";
    deselectThisField.classList.remove("fieldBorder");
}

function makingIdToMarker(p_currentFieldId) {
    let idToMarker = Number(p_currentFieldId.slice(6, 8));
    idToMarker--;
    return idToMarker;
}

function newField(p_currentFieldId) {
    if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'empty') {
        if (bankAccount >= 20) {
            bankAccount = bankAccount - 20;
            showMoney();
            makeItGrass(p_currentFieldId);
            //document.getElementById("pppWheat").style.display = "table-row";
            makeStyleDisplay("pppWheat", "table-row");
            developField();
        } else {
            err();
        }
    } else {
        alert("You have already bought this field.");
    }
}

function makeItGrass(p_currentFieldId) {
    document.getElementById(p_currentFieldId).style.backgroundImage = "url('Pictures/grass_texture.jpg')";
    cellInfo[makingIdToMarker(p_currentFieldId)].state = "grass";
}

function developField() {
    //document.getElementById("displayButton").style.display = "block";
    //document.getElementById("sowLabel").style.display = "block";
    //document.getElementById("seed").style.display = "block";
    makeStyleDisplay("displayButton", "block");
    makeStyleDisplay("sowLabel", "block");
    makeStyleDisplay("seed", "block");
    if (bankAccount > 100) {
        //  document.getElementById("displayOptionPotato").style.display = "block";
        makeStyleDisplay("displayOptionPotato", "block");
        //document.getElementById("pppPotato").style.display = "table-row";
        makeStyleDisplay("pppPotato", "table-row");
    }
    if (bankAccount > 140) {
        //document.getElementById("displayOptionCorn").style.display = "block";
        makeStyleDisplay("displayOptionCorn", "block");
        //document.getElementById("pppCorn").style.display = "table-row";
        makeStyleDisplay("pppCorn", "table-row");
    }
    if (bankAccount > 180) {
        // document.getElementById("displayOptionTomato").style.display = "block";
        makeStyleDisplay("displayOptionTomato", "block");
        //document.getElementById("pppTomato").style.display = "table-row";
        makeStyleDisplay("pppTomato", "table-row");
    }
    if (bankAccount > 250) {
        //document.getElementById("displayOptionMarijuana").style.display = "block";
        makeStyleDisplay("displayOptionMarijuana", "block");
        //document.getElementById("pppMarijuana").style.display = "table-row";
        makeStyleDisplay("pppMarijuana", "table-row");
    }
    if (bankAccount > 500) {
        //document.getElementById("displayOptionPoppy").style.display = "block";
        makeStyleDisplay("displayOptionPoppy", "block");
        //document.getElementById("pppPoppy").style.display = "table-row";
        makeStyleDisplay("pppPoppy", "table-row");
    }
    if (bankAccount > 1500) {
        //document.getElementById("displayAutomation").style.display = "block";
        makeStyleDisplay("displayAutomation", "block");
        //document.getElementById("autoLabel").style.display = "block";
        makeStyleDisplay("autoLabel", "block");
        //document.getElementById("displayStopAutomation").style.display = "block";
        makeStyleDisplay("displayStopAutomation", "block");
        //document.getElementById("stopAutoLabel").style.display = "block";
        makeStyleDisplay("stopAutoLabel", "block");
    }
}

let subtrahend;
function subtrahendSowingCalculation(p_seedName) {
    if (p_seedName === "wheat") { subtrahend = plantInfo[0].sowingCost };
    if (p_seedName === "potato") { subtrahend = plantInfo[1].sowingCost; };
    if (p_seedName === "corn") { subtrahend = plantInfo[2].sowingCost; };
    if (p_seedName === "tomato") { subtrahend = plantInfo[3].sowingCost; };
    if (p_seedName === "marijuana") { subtrahend = plantInfo[4].sowingCost; };
    if (p_seedName === "poppy") { subtrahend = plantInfo[5].sowingCost; };
}

function makeItPlant(p_seedName, p_fieldId) {
    if (p_seedName === "wheat") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[0].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'wheat';
    };
    if (p_seedName === "potato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[1].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'potato';
    };
    if (p_seedName === "corn") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[2].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'corn';
    };
    if (p_seedName === "tomato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[3].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'tomato';
    };
    if (p_seedName === "marijuana") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[4].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'marijuana';
    };
    if (p_seedName === "poppy") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[5].pic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'poppy';
    };
}

function makeItGrowingPlant(p_seedName, p_fieldId) {
    // document.getElementById("displayHarvest").style.display = "block";
    makeStyleDisplay("displayHarvest", "block");
    //document.getElementById("harvestLabel").style.display = "block";
    makeStyleDisplay("harvestLabel", "block");
    if (p_seedName === "wheat") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[0].growingPic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'growingWheat';
    };
    if (p_seedName === "potato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[1].growingPic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'growingPotato';
    };
    if (p_seedName === "corn") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[2].growingPic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'growingCorn';
    };
    if (p_seedName === "tomato") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[3].growingPic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'growingTomato';
    };
    if (p_seedName === "marijuana") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[4].growingPic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'growingMarijuana';
    };
    if (p_seedName === "poppy") {
        document.getElementById(p_fieldId).style.backgroundImage = plantInfo[5].growingPic;
        cellInfo[makingIdToMarker(p_fieldId)].state = 'growingPoppy';
    };
    document.getElementById(p_fieldId).style.backgroundImage += ", " + "url('Pictures/grass_texture.jpg')";
    document.getElementById(p_fieldId).classList.add("growingCropAnimation");
}

function sowSomething(p_seedName, p_fieldId) {
    // if (cellInfo[makingIdToMarker(p_fieldId)].isAutomationON === false) {
    if (cellInfo[makingIdToMarker(p_fieldId)].state === "grass") {
        subtrahendSowingCalculation(p_seedName);
        if (subtrahend <= bankAccount) {
            bankAccount = bankAccount - subtrahend;
            showMoney();
            makeItGrowingPlant(p_seedName, p_fieldId);
            setTimeout(
                function () {
                    document.getElementById(p_fieldId).classList.remove("growingCropAnimation");
                    makeItPlant(p_seedName, p_fieldId);
                },
                waitingTime(p_seedName));
        } else {
            err();
        }
    } else {
        alert("Choose an irrigated field or buy and irrigate a new one.");
    }
    // } else {
    //     alert("There is an ongoing automated process in this field.");
    // }
}

function waitingTime(p_seedName) {
    let ripeTime;
    if (p_seedName === "wheat") {
        ripeTime = plantInfo[0].ripeningTime;
    }
    if (p_seedName === "potato") {
        ripeTime = plantInfo[1].ripeningTime;
    }
    if (p_seedName === "corn") {
        ripeTime = plantInfo[2].ripeningTime;
    }
    if (p_seedName === "tomato") {
        ripeTime = plantInfo[3].ripeningTime;
    }
    if (p_seedName === "marijuana") {
        ripeTime = plantInfo[4].ripeningTime;
    }
    if (p_seedName === "poppy") {
        ripeTime = plantInfo[5].ripeningTime;
    }
    return (ripeTime);
}

class PlantInfo_obj {
    constructor(p_name, p_growingPic, p_pic, p_animation, p_sowingCost, p_harvestingIncome, p_ripeningTime) {
        this.name = p_name;
        this.growingPic = p_growingPic;
        this.pic = p_pic;
        this.animation = p_animation;
        this.sowingCost = p_sowingCost;
        this.harvestingIncome = p_harvestingIncome;
        this.ripeningTime = p_ripeningTime;
    }
}

let plantInfo = [];

function createPlants() {
    let objectPlant;
    objectPlant = new PlantInfo_obj("wheat", "url('\Pictures/growing_wheat.png')", "url('\Pictures/wheat.jpg')", "notyet", 5, 10, 10000);
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("potato", "url('\Pictures/growing_potato.png')", "url('\Pictures/potato.jpg')", "notyet", 8, 16, 13000);
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("corn", "url('\Pictures/growing_corn.gif')", "url('\Pictures/corn.jpg')", "notyet", 15, 30, 18000);
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("tomato", "url('\Pictures/growing_tomato.gif')", "url('\Pictures/tomato.jpg')", "notyet", 30, 50, 20000);
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj("marijuana", "url('\Pictures/growing_marijuana.gif')", "url('\Pictures/marijuana.jpg')", "notyet", 50, 70, 25000);
    plantInfo.push(objectPlant);
    objectPlant = new PlantInfo_obj('poppy', "url('\Pictures/growing_poppy.gif')", "url('\Pictures/poppy.jpg')", "notyet", 100, 200, 30000);
    plantInfo.push(objectPlant);
}

const tablePaPIdsPl = ['plWhe', 'plPot', 'plCor', 'plTom', 'plMar', 'plPop'];
const tablePaPIdsPri = ['priWhe', 'priPot', 'priCor', 'priTom', 'priMar', 'priPop'];
const tablePaPIdsPro = ['proWhe', 'proPot', 'proCor', 'proTom', 'proMar', 'proPop'];


function createPaPTableName(item, index) {
    document.getElementById(item).innerText = plantInfo[index].name;
}

function createPaPTablePrice(item, index) {
    document.getElementById(item).innerText = plantInfo[index].sowingCost;
}

function createPaPTableProfit(item, index) {
    document.getElementById(item).innerText = plantInfo[index].harvestingIncome;
}

function priceAndProfit() {
    createPlants();
    tablePaPIdsPl.forEach(createPaPTableName);
    tablePaPIdsPri.forEach(createPaPTablePrice);
    tablePaPIdsPro.forEach(createPaPTableProfit);
}

function harvest(p_currentFieldId) {
    // we check here if the current field is not a grass, not an empty field 
    //and there is no growing plant on it//
    if (cellInfo[makingIdToMarker(p_currentFieldId)].state != 'grass' &&
        cellInfo[makingIdToMarker(p_currentFieldId)].state != 'empty' &&
        cellInfo[makingIdToMarker(p_currentFieldId)].state.includes('growing') === false) {

        let addend;
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'wheat') {
            addend = plantInfo[0].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'potato') {
            addend = plantInfo[1].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'corn') {
            addend = plantInfo[2].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'tomato') {
            addend = plantInfo[3].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'marijuana') {
            addend = plantInfo[4].harvestingIncome;
        }
        if (cellInfo[makingIdToMarker(p_currentFieldId)].state === 'poppy') {
            addend = plantInfo[5].harvestingIncome;
        }
        console.log("harvesting");
        console.log("got some money for the " + cellInfo[makingIdToMarker(p_currentFieldId)].state);
        makeItGrass(p_currentFieldId);
        console.log(cellInfo[makingIdToMarker(p_currentFieldId)].state);
        bankAccount = bankAccount + addend;
        showMoney();
        developField();
    } else {
        alert("Only ripe crop can be harvested.");
    }
}

function automationChecking(p_seedName, p_fieldId) {
    if (cellInfo[makingIdToMarker(p_fieldId)].isAutomationON === false) {
        if (bankAccount >= 200) {
            bankAccount = bankAccount - 200;
            showMoney();
            cellInfo[makingIdToMarker(p_fieldId)].isAutomationON = true;
            console.log("automation enabled, it's about to begin");
            automationStart(p_seedName, p_fieldId);
        } else {
            alert("You ain't got enough GKT to automate this process.");
        }
    } else {
        alert("There is an other ongoing automated process in this field.");
    }
}

let automationStopper;

function automationStart(p_seedName, p_fieldId) {
    sowSomething(p_seedName, p_fieldId);
    console.log("AUTOM BEGINS! " + cellInfo[makingIdToMarker(p_fieldId)].state);
    automationStopper = setTimeout(function () {
        harvest(p_fieldId);
        showMoney();
        if (cellInfo[makingIdToMarker(p_fieldId)].isAutomationON === true) {
            automationStart(p_seedName, p_fieldId);
        }
    }, waitingTime(p_seedName));
}
// 

function stopAutomation(p_fieldId) {
    if (cellInfo[makingIdToMarker(p_fieldId)].isAutomationON === true) {
        if (bankAccount >= 50) {
            cellInfo[makingIdToMarker(p_fieldId)].isAutomationON = false;
            //clearTimeout(automationStopper);
            bankAccount = bankAccount - 50;
            showMoney();
            document.getElementById(p_fieldId).classList.remove("growingCropAnimation");
            console.log(cellInfo[makingIdToMarker(p_fieldId)].state);
        }
    }
}

const uniKeyCode = (event) => {
    let idToChange = Number(previousFieldName.substring(6));
    console.log(idToChange);
    const key = event.keyCode;
    console.log("switch is on");
    switch (key) {

        case 38: //go up
            idToChange -= 5;
            if (idToChange < 1) {
                idToChange += 25;
            }
            selectField("Field_" + idToChange);
            break;

        case 39: //right
            idToChange++;
            if (idToChange > 25) {
                idToChange -= 25;
            }
            selectField("Field_" + idToChange);
            break;

        case 40: // down
            idToChange += 5;
            if (idToChange > 25) {
                idToChange -= 25;
            }
            selectField("Field_" + idToChange);
            break;

        case 37: // left
            idToChange--;
            if (idToChange < 1) {
                idToChange += 25;
            }
            selectField("Field_" + idToChange);
            break;

        case 81: //Q - buy a field
            newField(currentFieldId);
            break;

        case 87: //W - sow seed
            sowSomething(document.getElementById('seed').value, currentFieldId);
            break;

        case 69: //E - harvest
            harvest(currentFieldId);
            break;

        case 65: //A - automation
            automationChecking(document.getElementById('seed').value, currentFieldId)
            break;

        case 83: //S - stop automation
            stopAutomation(currentFieldId)
            break;
    }
}
