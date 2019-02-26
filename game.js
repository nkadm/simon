var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//start game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//when a button is clicked a trigger handler function
$(".btn").click(function() {
  //used to store the ID of the button clicked
  var userChosenColour = $(this).attr("id");
  //this appends the clicked button to the array userClickedPattern
  userClickedPattern.push(userChosenColour);

  //play clicked sounds
  playSound(userChosenColour);

  //put shadow on the clicked button
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//check user answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    console.log("success");

    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart!");

    startOver();
  }
}

// function creating a random number and selcting a colour from the array list and pushing into the gamepattern array.
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //fashing buttons
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound on button flash
  var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
  sound.play();
}

// function to play sound when button is clicked
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//to animate a shodow when a button is clicked
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    });
}

//function to restart the game and reset all the values
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
