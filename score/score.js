

var score = localStorage.getItem("scoreValue");

var scoreboard = document.getElementById("scoreboard");

var numscore = parseInt(score);

if(numscore==0){
    scoreboard.innerHTML = score  +  "<br>Noob!";
}

if(numscore>0 && numscore<50){
    scoreboard.innerHTML = score  +  "<br>Amateur!";
}

if(numscore>50 && numscore<100){
    scoreboard.innerHTML = score  +  "<br>Pro!";
}

if(numscore>100){
    scoreboard.innerHTML = score  +  "<br>Legendary!";
}


// AUDIO
const endAudio = new Audio("../audio/game over.mp3")

window.onload = function(){
    endAudio.pause()
    endAudio.currentTime = 0;
    endAudio.play()
}


    