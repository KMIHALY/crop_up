// timer code
let score = "unknown";
let rank = 1;
function countdown() {
    let min = 15;
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
            console.log("t1");
        }
        if (min < 10 && sec > 9) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + sec;
        }
        if (min < 10 && sec < 10) {
            document.getElementById("timernumber").innerHTML = "0" + min + " : " + "0" + sec;
            console.log("t2");
        }
        if (sec === 0) {
            min--;
            sec = 59;
        } else {
            sec--;
        }
        console.log(sec);
    }
}



/*    console.log(sec);
 

    

    
    console.log(test);
    if (sec < 10 && min > 9) {
        document.getElementById("timer").innerHTML = min + " : " + "0" + sec;
        test = "csakmásodperckevés";
    }
    console.log(test);
     else {
        document.getElementById("timer").innerHTML = min + " : " + sec;
        test = "sok-sok";
    }
    console.log(test);
  
}
}
}

*/

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
    console.log(cellInfo);
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


    // developField();
}

function deSelectField(p_fieldName) {
    let selectThisField = document.getElementById(p_fieldName);
    selectThisField.style.width = "100px";
    selectThisField.style.height = "100px";
    selectThisField.classList.remove("fieldBorder");
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
    let idToMarker = p_currentFieldId.slice(6, 8);
    Number(idToMarker);
    idToMarker--;
    console.log(idToMarker);
    cellsNumber[idToMarker].state = "grass";
    console.log(cellsNumber[idToMarker].state);
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
*/



