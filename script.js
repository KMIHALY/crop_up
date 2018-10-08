'use strict'

function init() {
    showMoney();
    createIdAttribute();
    addListenerToFields();
}

let bankAccount = 100,
    topMoney = 100,
    rank = 'Nobody',
    fieldNumber = 1,
    cellInfo = [],
    currentFieldId = "Field_1",
    previousFieldName = "",
    //lastSowablePlant = "",
    min,
    sec = 1,
    automationEnabled = false;
;

let messages = {
    outOfMoney: "I've told you to keep your eye on your GKT money, ehh?",
    boughtField: "You have already bought this field.",
    wrongField: "Choose an irrigated field or buy and irrigate a new one.",
    notRipe: "Only ripe crop can be harvested.",
    doItOnGrassfield: "Automation is allowed only on grassfield.",
    alreadyAutomated: "There is an other ongoing automated process in this field.",
    finalMessage: function () {
        let text = "The time is over. Congratulation for finishing the game. In your bank account you've managed to collect " + topMoney + " GKT. Your rank is " + rank + ".";
        return text;
    }
};

let fieldTable = document.getElementById('table25').getElementsByTagName("TD");

let ranks = {
    200: 'Newbie',
    400: "Honourable Peasant",
    600: "Mighty Merchant",
    1000: "Dainty Dealer",
    2500: "Ruler of the Underworld",
    10000: "Briliant Borgia",
};

const plants = [
    {
        name: "wheat",
        growingPic: "url('\Pictures/growing_wheat.png')",
        pic: "url('\Pictures/wheat.jpg')",
        animation: "notyet",
        sowingCost: 5,
        harvestingIncome: 10,
        ripeningTime: 10000,
        tresholdMoney: 100,
        sowable: false
    },
    {
        name: "potato",
        growingPic: "url('\Pictures/growing_potato.png')",
        pic: "url('\Pictures/potato.jpg')",
        animation: "notyet",
        sowingCost: 8,
        harvestingIncome: 16,
        ripeningTime: 15000,
        tresholdMoney: 180,
        sowable: false
    },
    {
        name: "corn",
        growingPic: "url('\Pictures/growing_corn.gif')",
        pic: "url('\Pictures/corn.jpg')",
        animation: "notyet",
        sowingCost: 15,
        harvestingIncome: 30,
        ripeningTime: 20000,
        tresholdMoney: 300,
        sowable: false
    },
    {
        name: "tomato",
        growingPic: "url('\Pictures/growing_tomato.gif')",
        pic: "url('\Pictures/tomato.jpg')",
        animation: "notyet",
        sowingCost: 30,
        harvestingIncome: 50,
        ripeningTime: 30000,
        tresholdMoney: 600,
        sowable: false
    },
    {
        name: "marijuana",
        growingPic: "url('\Pictures/growing_marijuana.gif')",
        pic: "url('\Pictures/marijuana.jpg')",
        animation: "notyet",
        sowingCost: 50,
        harvestingIncome: 100,
        ripeningTime: 45000,
        tresholdMoney: 1000,
        sowable: false
    },
    {
        name: "poppy",
        growingPic: "url('\Pictures/growing_poppy.gif')",
        pic: "url('\Pictures/poppy.jpg')",
        animation: "notyet",
        sowingCost: 100,
        harvestingIncome: 200,
        ripeningTime: 50000,
        tresholdMoney: 2000,
        sowable: false
    }
];

function showMoney() {
    setTopMoney();
    setRank();
    lookForNewPlant();
    setAutomation();
    document.getElementById("account").innerText = bankAccount;
}

function setTopMoney() {
    if (bankAccount > topMoney) {
        topMoney = bankAccount;
    }
}

function setRank() {
    //find method-dal megoldani + arrow function
    let item;
    for (item in ranks) {
        if (topMoney > item) {
            rank = ranks[item];
        }
    }
}

const lookForNewPlant = () => {
    plants.map(
        (plant) => {
            if (topMoney >= plant.tresholdMoney && plant.sowable === false) {
                plant.sowable = true;
                createAPlantsTableRow(plant);
                createSelectionOption(plant);
            }
        }
    );
};

function setAutomation() {
    if (topMoney > 1200) {
        automationEnabled = true;
        setStyleDisplay("displayAutomation", "block");
        setStyleDisplay("autoLabel", "block");
        setStyleDisplay("displayStopAutomation", "block");
        setStyleDisplay("stopAutoLabel", "block");
    }
}

function createAPlantsTableRow(plant) {
    const plantsRow = document.createElement('TR');

    function addPlantsRowCell(cellValue) {
        const cell = document.createElement('TD');
        const cellContent = document.createTextNode(cellValue);
        cell.appendChild(cellContent);
        plantsRow.appendChild(cell);
    };

    ['name', 'sowingCost', 'harvestingIncome', 'ripeningTime'].forEach((key) => {
        if (key === 'ripeningTime') {
            let newKeyName = String(plant[key]).slice(0, 2) + "s";
            addPlantsRowCell(newKeyName);
        } else {
            addPlantsRowCell(plant[key]);
        }
    });

    document.getElementById("tableOfCostAndIncome").appendChild(plantsRow);
}

const createSelectionOption = (plant) => {
    const newOption = document.createElement('OPTION');
    const newAttribute = document.createAttribute("value");
    newAttribute.value = plant.name;
    newOption.setAttributeNode(newAttribute);
    newOption.innerText = plant.name;
    document.getElementById("seed").appendChild(newOption);
}

function createIdAttribute() {
    let i = 0;
    while (i < fieldTable.length) {
        const addId = document.createAttribute("ID");
        fieldTable[i].setAttributeNode(addId);
        addId.value = createId();
        const objectField = new FieldInfo(addId.value, "empty");
        cellInfo.push(objectField);
        i++;
    }
}

function createId() {
    const fieldId = "Field_" + fieldNumber;
    ++fieldNumber;
    return fieldId;
}

class FieldInfo {
    constructor(fieldId, state) {
        this.marker = fieldId;
        this.state = state;
        this.isAutomationON = false;
        //this means there is an ongoing automation process and you cannot start anything else in the given field
    }
}

function addListenerToFields() {
    for (let i = 0; i < fieldTable.length; i++) {
        fieldTable[i].addEventListener(
            "click",
            function () {
                let currentFieldId = this.id;
                selectField(currentFieldId);
            }, false
        );
        fieldTable[i].classList.add("cursor");
    }
}

function selectField(fieldId) {
    if (previousFieldName != "") {
        deSelectField(previousFieldName);
    }
    const selectThisField = document.getElementById(fieldId);
    selectThisField.style.border = "2px dashed rgba(251, 240, 16, 1.0)";
    selectThisField.style.width = "96px";
    selectThisField.style.height = "96px";
    currentFieldId = fieldId;
    previousFieldName = fieldId;
}

function deSelectField(fieldName) {
    const deselectThisField = document.getElementById(fieldName);
    deselectThisField.style.width = "100px";
    deselectThisField.style.height = "100px";
    deselectThisField.style.border = "2px dashed rgba(165, 42, 42, 0)";
}

function makingIdToMarker(p_currentFieldId) {
    let idToMarker = Number(p_currentFieldId.slice(6, 8));
    idToMarker--;
    return idToMarker;
}

// WHEN CHALLENGE IS ACCEPTED, GAME STARTS
const startGame = () => {
    countdown();
    controlPanelsOn();
    showTime();
    welcome();
}

function countdown() {
    const timeToDisplay = setInterval(countdownCode, 1000);

    function countdownCode() {
        if (min === 0 && sec === 0) {
            document.getElementById("timernumber").innerText = "0" + min + " : " + "0" + sec;
            clearInterval(timeToDisplay);
            message("finalMessage");
            location.reload();
        }
        if (min > 9 && sec > 9) {
            document.getElementById("timernumber").innerText = min + " : " + sec;
        }
        if (min > 9 && sec < 10) {
            document.getElementById("timernumber").innerText = min + " : " + "0" + sec;
        }
        if (min < 10 && sec > 9) {
            document.getElementById("timernumber").innerText = "0" + min + " : " + sec;
        }
        if (min < 10 && sec < 10) {
            document.getElementById("timernumber").innerText = "0" + min + " : " + "0" + sec;
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

function controlPanelsOn() {
    setStyleDisplay("controlpanelRight", "block");
    setStyleDisplay("controlpanelLeft", "block");
}

function showTime() {
    min = Number(document.getElementById('gametime').value);
}

function welcome() {
    let welcomeText = document.getElementById('welcomeDivID');
    welcomeText.parentNode.removeChild(welcomeText);
    fogReducer();
}

function fogReducer() {
    let fog = document.getElementById('translucentBackground');
    let initialOpacity = Number(window.getComputedStyle(fog).getPropertyValue("opacity"));
    let mySetTimeOut = setTimeout(function () { opacityReducer(initialOpacity, fog); }, 120);
}

function opacityReducer(initialOpacity, fog) {
    initialOpacity = initialOpacity - 0.1;
    document.getElementById('translucentBackground').style.opacity = initialOpacity;
    if (initialOpacity > 0.19) {
        fogReducer();

    };
    if (initialOpacity < 0.15) {
        removeFog(fog);
    };
}

function removeFog(fog) {
    fog.parentNode.removeChild(fog);
}

function setStyleDisplay(elementId, displayType) {
    document.getElementById(elementId).style.display = displayType;
}

function message(warning) {
    if (warning === "finalMessage") {
        alert(messages.finalMessage());
    } else {
        alert(messages[warning]);
    }
}

function newField(currentFieldId) {
    if (cellInfo[makingIdToMarker(currentFieldId)].state === 'empty') {
        if (bankAccount >= 20) {
            bankAccount = bankAccount - 20;
            showMoney();
            makeItGrass(currentFieldId);
            if (document.getElementById("displaySowButton").style.display === "none") {
                addFieldDevelopmentOptions();
            }
        } else {
            message("outOfMoney");
        }
    } else {
        message("boughtField");
    }
}

function makeItGrass(currentFieldId) {
    document.getElementById(currentFieldId).style.backgroundImage = "url('Pictures/grass_texture.jpg')";
    cellInfo[makingIdToMarker(currentFieldId)].state = "grass";
}

function addFieldDevelopmentOptions() {
    setStyleDisplay("displaySowButton", "block");
    setStyleDisplay("sowLabel", "block");
    setStyleDisplay("seed", "block");
}

function sowSomething(p_seedName, p_fieldId) {
    if (cellInfo[makingIdToMarker(currentFieldId)].isAutomationON === false) {
        if (cellInfo[makingIdToMarker(p_fieldId)].state === "grass") {
            const subtrahend = subtrahendSowingCalculation(p_seedName);
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
                message("outOfMoney");
            }
        } else {
            message("wrongField");
        }
    }
}

function subtrahendSowingCalculation(plantName) {
    //V1
    let plant = plants.find(
        (plant) => {
            return plant.name === plantName;
        }
    )
    return plant.sowingCost;

    //V2
    /*
    let subtrahend;
    plants.map((plant) => {
        if (plant.name === plantName) {
           subtrahend = plant.sowingCost;
        }
    });
    return subtrahend;
*/
}

function findThePlant(seedName) {
    let plant = plants.find(
        (plant) => {
            return plant.name === seedName;
        }
    )
    return plant;
}

function makeItGrowingPlant(seedName, fieldId) {
    setStyleDisplay("displayHarvest", "block");
    setStyleDisplay("harvestLabel", "block");

    const plant = findThePlant(seedName);
    document.getElementById(fieldId).style.backgroundImage = plant.growingPic;
    document.getElementById(fieldId).style.backgroundImage += ", " + "url('Pictures/grass_texture.jpg')";

    const growingName = "growing" + seedName[0].toUpperCase() + seedName.slice(1);
    cellInfo[makingIdToMarker(fieldId)].state = growingName;

    document.getElementById(fieldId).classList.add("growingCropAnimation");
}

function makeItPlant(seedName, fieldId) {
    const plant = findThePlant(seedName);
    document.getElementById(fieldId).style.backgroundImage = plant.pic;
    cellInfo[makingIdToMarker(fieldId)].state = seedName;
}

function stateOfCell(fieldId) {
    return cellInfo[makingIdToMarker(fieldId)].state;
}

function harvest(fieldId) {
    if (cellInfo[makingIdToMarker(currentFieldId)].isAutomationON === false) {
        // we check here if the current field is not a grass, not an empty field 
        //and there is no growing plant on it//
        if (stateOfCell(fieldId) != 'grass' &&
            stateOfCell(fieldId) != 'empty' &&
            stateOfCell(fieldId).includes('growing') === false) {

            let plant = findThePlant(stateOfCell(fieldId));
            let addend = plant.harvestingIncome;
            bankAccount += addend;
            showMoney();

            makeItGrass(fieldId);
        } else {
            message("notRipe");
        }
    }
}

function automationChecking(seedName, fieldId) {
    if (automationEnabled === true) {
        if (stateOfCell(fieldId) === 'grass') {
            if (cellInfo[makingIdToMarker(fieldId)].isAutomationON === false) {
                if (bankAccount >= 200) {
                    bankAccount = bankAccount - 200;
                    showMoney();
                    cellInfo[makingIdToMarker(fieldId)].isAutomationON = true;
                    automationStart(seedName, fieldId);
                } else {
                    message("outOfMoney");
                }
            } else {
                message("alreadyAutomated");
            }
        } else {
            message("doItOnGrassfield");
        }
    }
}

function automationStart(seedName, fieldId) {
    sowSomething(seedName, fieldId);
    cellInfo[makingIdToMarker(fieldId)]['automationHandler'] = setTimeout(
        function () {
            harvest(fieldId);
            if (cellInfo[makingIdToMarker(fieldId)].isAutomationON === true) {
                automationStart(seedName, fieldId);
            }
        }, waitingTime(seedName)
    );
}

function waitingTime(seedName) {
    const plant = findThePlant(seedName);
    return plant.ripeningTime;
}

function stopAutomation(fieldId) {
    if (cellInfo[makingIdToMarker(fieldId)].isAutomationON === true) {
        if (bankAccount >= 50) {
            cellInfo[makingIdToMarker(fieldId)].isAutomationON = false;
            clearTimeout(cellInfo[makingIdToMarker(fieldId)]['automationHandler']);
            bankAccount = bankAccount - 50;
            showMoney();
            document.getElementById(fieldId).classList.remove("growingCropAnimation");
        }
    }
}

//keyboard shortcuts
const uniKeyCode = (event) => {    
    let idToChange = Number(previousFieldName.substring(6));
    const key = event.keyCode;
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
            event.preventDefault();
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
