// STRUCTURE OF THE GAME
//click on start/reset button - are we playing?
// yes - reload page
// no - 
    // show trials left
    // change button text to reset
    // 1. create a random fruit
    // define a random step size (speed of the fruit moving down)
    // 2. move fruit down by 1 step - loops every 30 seconds
        // is the fruit too low? (is the top position of the fruit greater than the height of the container)
            // no - move down another step
            // yes - are there any trials?
                // yes - remove one heart, create new random fruit (go back to stage 1.)
                // no - show game over, change button to start game
// if we slice the fruit - sound in background, explode the fruits

// define the playing variable which will be true or false
var playing = false;
// set the score variable to 0
var score = 0;
// set the trials variable to store three trials
var trials = 3;
// array of fruits
var fruits = ["banana","cherry","grapes","greenapple", "kiwi", "lemon", "orange", "pear", "redapple", "strawberry", "watermelon"];
// variable for the step the fruits will move down with, the bigger the step the quicker the fruits will get to the bottom
var step;
// var for time interval the fruit will move down a step
var action;

$(function(){
    //click on start/reset button
    $("#start-reset").click(function(){
        // if we are playing
        if(playing == true){
            // reload page (reset button)
            location.reload();
        } else {
            // we are not playing
            // start the game
            playing = true;
            // reset score to 0
            score = 0;
            // display score in html with jquery
            $("#scoreValue").html(score);
            // show the trials left box with three hearts
            $("#trials-left").show();
            trials = 3;
            // show hearts
            addHearts();

            // hide game over box
            $("#gameOver").hide();

            // change button name to reset
            $("#start-reset").html("Reset Game");

            // starts the fruits falling down
            startAction();
            

        }

    });



// DEFINED FUNCTIONS 

// slice fruits
$(".fruit").mouseover(function(){
    // first when we hover on the fruit we need to increase the score by 1 and update the html element
    score++;
    $("#scoreValue").html(score);

    // play sound on hover
    document.getElementById("sliceSound").play();
    // OR
    // $("#sliceSound")[0].play();

    // stop fruit going down and hiding it
    clearInterval(action);

    // hide fruit with animation
    $("#fruit1").hide("explode", 500);

    // send a new fruid
    // need to wait 500 miliseconds to start this to give time for animation to finish
    setTimeout(startAction, 500);

});


// replace numbers with heart images in trials box

function addHearts(){
    // first we have to empty the box so hearts don't accumulate
    $("#trials-left").empty();
    // append the hearts to numbers
    for(i = 0; i < trials; i++){
        $("#trials-left").append("<img src='images/heart.png' class='heart'>");
    }
};

// start sending the fruits down

function startAction(){
    // show the image element
    $("#fruit1").show();
    // choose a random fruit to add to the img src
    chooseFruit();
    // position the fruit randomly in the container top and left positions
    $("#fruit1").css({"left": Math.round(Math.random()*40) + "vw","top": -50});

    // moving the fruits down
    // generate random step (speed)
    // a step between 1 and 6 px
    step = 1 + Math.round(Math.random()*5);

    // move fruit down one step every 10ms
    action = setInterval(function(){
        // css property sets the top position of fruits original value plus the random step
        // $("#fruit1").position().top - selects the top position
        $("#fruit1").css("top", $("#fruit1").position().top + step);

        // check if fruit too low, if yes then check trials
        if ($("#fruit1").position().top > $("#fruitContainer").height()){
            // do we have trials remaining?
            // if yes
            if(trials > 1){
                // show the image element
                $("#fruit1").show();
                // choose a random fruit to add to the img src
                chooseFruit();
                // position the fruit randomly in the container top and left positions
                $("#fruit1").css({"left": Math.round(Math.random()*40) + "vw","top": -50});

                // moving the fruits down
                // generate random step (speed)
                // a step between 1 and 6 px
                step = 1 + Math.round(Math.random()*5);

                // because the fruit was too low, reduce trials by 1
                trials --;

                // populate the correct number of hearts in html
                addHearts();
            } else { // game over
                playing = false; // we are not playing anymore
                $("#start-reset").html("Start Game");
                $("#gameOver").show();
                $("#gameOver").html("<p>Game Over!</p><p>Your score is: " + score + "</p>");
                stopAction();
                $("#trials-left").hide();
            }

        }

    }, 10);


};

// stop dropping fruits 
function stopAction(){
    clearInterval(action);
    $("fruit1").hide();
}

// randomly pick which fruit to display
function chooseFruit(){
    // use array of images to choose randomly from that array
    // attach the formed src string to the html <img> element
    $("#fruit1").attr("src", "images/" + fruits[Math.round(Math.random()*10)] + ".png");
}

});