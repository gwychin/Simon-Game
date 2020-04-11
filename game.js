
// Initiating variables
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

// Initiates the game

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
})

$(document).click(function() {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
})


//Plays sound of clicked button and keeps track of user's choices
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  $(`#${userChosenColor}`).fadeTo(100, 0.3, function() {
    $(this).fadeTo(100, 1.0);
  });

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
})

// Checks to see if the patterns match
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio(`sounds/wrong.mp3`);
    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}

// Picks a random button and plays the sound of selected button

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text(`Level ${level}`);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $(`#${randomChosenColor}`).fadeTo(100, 0.3, function() {
    $(this).fadeTo(100, 1.0);
  });

  playSound(randomChosenColor);
}


//Plays sound of the named button
function playSound(name) {
  var selectedColorAudio = new Audio(`sounds/${name}.mp3`);
  selectedColorAudio.play();
}

// Animations for when a button is pressed
function animatePress(currentColor) {
  $(`.${currentColor}`).addClass("pressed");

  setTimeout(function() {
    $(`.${currentColor}`).removeClass("pressed");
  }, 100);
}

// Starts the game over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
