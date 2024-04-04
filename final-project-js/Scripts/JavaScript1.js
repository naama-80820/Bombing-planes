var numPic = 1;
var selName;
var playerName;


function Game(playerName, numElements, level, numPic) {
    this.gamePlayerName = playerName;
    this.gameNumElements = numElements;
    this.gameLevel = level;
    this.gameNumPic = numPic;
}


function Champion(CName, CPoints) {
    this.championName = CName;
    this.championPoints = CPoints;
}


function DuplicateNames(currentName) {

    var duplicate = false;

    var theOption = document.querySelectorAll("#selectName>option");

    for (var i = 0; i < theOption.length; i++) {
        if (theOption[i].text == currentName) {
            duplicate = true;
        }
    }
    return duplicate;
}

function putNames() {
    selName = document.querySelector("#selectName");

    for (var level = 1; level <= 3; level++) {
        var key = "Level" + level;
        var Champions = JSON.parse(localStorage.getItem(key));
        if (Champions != null) {
            for (var i = 0; i < Champions.length; i++) {

                Duplicate = DuplicateNames(Champions[i].championName);

                if (Duplicate == false) {
                    var theOption = document.createElement("option");
                    theOption.textContent = Champions[i].championName;
                    selName.appendChild(theOption);

                }
            }

            document.querySelector("#PlayerName").style.display = "none"
        }
    }
}

function showText() {

    document.querySelector("#PlayerName").style.display = "inline";

    selName.selectedIndex = 0;
}

function HideText() {

    document.querySelector("#PlayerName").style.display = "none";
}

function RemoveImages() {

    numPic = 1;
    var ArrImg = document.querySelectorAll(".imgElements");
    var parentImg = document.querySelector("#ParentImages");
    for (var i = 0; i < ArrImg.length; i++) {
        parentImg.removeChild(ArrImg[i]);
    }
}

function CreateImages() {

    var parentImg = document.querySelector("#ParentImages");
    var ArrImg = [];
    for (var i = 0; i < 6; i++) {
        ArrImg[i] = document.createElement("img");
        parentImg.appendChild(ArrImg[i]);
        ArrImg[i].src = "../img/" + i + ".JPG";
        ArrImg[i].setAttribute("class", "imgElements");
        ArrImg[i].onclick = function (e) {
            chooseImg(e.target);
        }
    }
    ArrImg[0].style.border = "2px dotted #000000"
    numPic = 0;
}

function chooseImg(obj) {

    var ArrImg = document.querySelectorAll(".imgElements");
    for (var i = 0; i < ArrImg.length; i++) {
        if (ArrImg[i] == obj) {
            ArrImg[i].style.border = "2px dotted #000000";
            numPic = i;
        }
        else {

            ArrImg[i].style.border = "none";
        }
    }
}

function goNext() {

    selName = document.querySelector("#selectName");
    if (selName.selectedIndex == 0) {

        playerName = document.querySelector("#PlayerName").value;
    }
    else {

        playerName = selName.options[selName.selectedIndex].textContent;
    }


    var numElements = document.querySelector("#NumElements").value;

    var level = document.querySelector("#level").value;


    var objGame = new Game(playerName, numElements, level, numPic);

    sessionStorage.Game = JSON.stringify(objGame);

    window.location = "HtmlPage2.html";
}


