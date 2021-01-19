var gamePattern = [];
var userPattern = [];
var level = 0;
var buttonColors = ["red","blue","green","yellow"];


$(document).keypress(function() {
    if(level === 0) {
        nextSequence();
    }
});

function nextSequence() {
    var randomNo = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNo];
    
    $("."+randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);

    $("h1").text("Level " + ++level);

    gamePattern.push(randomColor);
    userPattern = [];
}


$(".btn").click(clickHandle);

function clickHandle() {
    if(level > 0) {
        userColor = this.id;

        playSound(userColor);
        animate(userColor);
    
        userPattern.push(userColor);
    
        check();
    }
}

function check() {
    var i = 0;
    while(i < userPattern.length) {
        if(userPattern[i] !== gamePattern[i]) {
            gameOver();
            return;
        }
        i++;
    }

    if(i === level) {
        setTimeout(nextSequence, 1000);
    }
}


function playSound(color) {
    var buttonSound = "sounds/" + color + ".mp3";
    var audio = new Audio(buttonSound);
    audio.play();
}

function animate(color) {
    $("."+color).addClass("pressed");

    setTimeout(function() {
        $("."+color).removeClass("pressed");
    }, 100);
}


function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over. Press Any Key To Restart");
    playSound("wrong");

    gamePattern = [];
    level = 0;
}