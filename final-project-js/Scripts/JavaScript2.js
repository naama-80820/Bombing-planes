//page2

var WinWidth, WinHeight;
var numOfImages = 0;
var Mouse;
var points;
var MyImg = [];
var Dir1 = [], Dir2 = [];
var ImgSize = [];
var TheLeft = [], TheTop = [];
var objGame;

function Player(PName, PPoints, PLevel) {
    this.playerName = PName;
    this.playerPoints = PPoints;
    this.playerLevel = PLevel;
}



function putDetails() {

    objGame = JSON.parse(sessionStorage.getItem('Game'));



    document.querySelector("#PlayerName").textContent = objGame.gamePlayerName;

    var numElements = objGame.gameNumElements;

    var numPic = objGame.gameNumPic;
    if (numPic == -1) {

        numPic = Math.floor(Math.random() * 3);
    }
    var TheElement = "../img/" + numPic + ".jpg";

    var points = Math.floor(Math.random() * 100) + 10;

}

function Game(playerName, numElements, level, numPic) {
    this.gamePlayerName = playerName;
    this.gameNumElements = numElements;
    this.gameLevel = level;
    this.gameNumPic = numPic;
}

function addImg() {
    var endPic = document.createElement("img");
    endPic.setAttribute("src", "../img/end_2.jpg");
    document.querySelector("#finish").appendChild("endPic");
    document.body.style.backgroundImage = "url('../img/end_2.jpg')";
}



function changeColors() {
    var blockElements = document.getElementsByClassName("block");
    var buttonElements = document.getElementsByClassName("button");
    //var score = document.getElementById("score");
    //score.style.backgroundColor = "#c9370b";
    for (var i = 0; i < blockElements.length; i++) {
        blockElements[i].style.backgroundColor = "#c9370b";
    }

    for (var j = 0; j < buttonElements.length; j++) {
        buttonElements[j].style.backgroundColor = "#c9370b";
    }
}

function Init() {

    // fun for inited where the page is inlaoud
    WinWidth = window.innerWidth;
    WinHeight = window.innerHeight;

    points = 0;

    putDetails();
    document.querySelector("#PlayerName").textContent = objGame.gamePlayerName;
    document.querySelector("#Points").textContent = points;

    var numPic = objGame.gameNumPic;
    if (numPic == -1) {

        numPic = Math.floor(Math.random() * 10);
    }


    var inter = setInterval(function () {
        WinWidth = window.innerWidth;
        WinHeight = window.innerHeight;

        numOfImages++;

        MyImg[numOfImages] = document.createElement("img");

        var TheElement = "../img/" + numPic + ".jpg";

        MyImg[numOfImages].src = TheElement;

        document.body.appendChild(MyImg[numOfImages]);

        ImgSize[numOfImages] = Math.floor(Math.random() * 80) + 50;
        MyImg[numOfImages].style.width = ImgSize[numOfImages] + "px";
        MyImg[numOfImages].style.height = ImgSize[numOfImages] + "px";
        MyImg[numOfImages].style.position = "absolute";

        TheLeft[numOfImages] = Math.floor(Math.random() * (WinWidth - ImgSize[numOfImages]));
        MyImg[numOfImages].style.left = TheLeft[numOfImages] + "px";

        TheTop[numOfImages] = Math.floor(Math.random() * (WinHeight - ImgSize[numOfImages]));
        MyImg[numOfImages].style.top = TheTop[numOfImages] + "px";

        MyImg[numOfImages].classList.add("NewImages");

        Dir1[numOfImages] = Math.floor(Math.random() * 2);
        if (Dir1[numOfImages] == 0)
            Dir1[numOfImages] = -1;
        Dir2[numOfImages] = Math.floor(Math.random() * 2);
        if (Dir2[numOfImages] == 0)
            Dir2[numOfImages] = -1;

        MyImg[numOfImages - 1].onclick = function (e) {
            document.body.removeChild(e.target);
            points+=10;
            document.querySelector("#Points").textContent = points;

        }




        var numElements = objGame.gameNumElements;
        if (numOfImages >= numElements) {
            clearInterval(inter);// stopping the clock
            var TheImages = document.querySelectorAll("img");
            for (var i = 0; i < TheImages.length; i++) {
                TheImages[i].onclick = null;

                document.body.removeChild(TheImages[i]);
                document.querySelector("#finish").textContent = "The Game Is Over";
                document.body.style.backgroundImage = "url('../img/end.jpg')";
                changeColors();
            }
        }
    }, 500);


    var interMove = setInterval(function () {
        for (var i = 1; i < numOfImages; i++) {


            TheLeft[i] = parseInt(MyImg[i].style.left, 10);
            TheLeft[i] += 3 * Dir1[i];

            MyImg[i].style.left = TheLeft[i] + "px";
            if ((TheLeft[i] <= 0) || (TheLeft[i] + ImgSize[i] + 10 >= WinWidth + 3))
                Dir1[i] = -Dir1[i];


            TheTop[i] = parseInt(MyImg[i].style.top, 10);
            TheTop[i] += 3 * Dir2[i];

            MyImg[i].style.top = TheTop[i] + "px";
            if ((TheTop[i] <= 0) || (TheTop[i] + ImgSize[i] >= WinHeight + 3))
                Dir2[i] = -Dir2[i];

        }
    }, 50);

}

function goChampions() {
    var playerName = document.querySelector("#PlayerName").textContent;
    // num points
    var points = document.querySelector("#Points").textContent;
    //level
    var level = objGame.gameLevel;
    var objPlayer = new Player(playerName, points, level);
    sessionStorage.Player = JSON.stringify(objPlayer);

    window.location = "thirdPage.html";
}


function P2toP3() {
    window.location = "HtmlPage3.html";
}

function P2toP1() {
    window.location = "HtmlPage1.html";

}

