// array to store random winning phrases
const statements = ["Good work champ!", "You are phenomenal!", ];
const randomStatement = statements[Math.floor(Math.random() * statements.length)];
console.log(randomStatement); 

// reteriving player score
var score = localStorage.getItem("scoreValue");

var scoreboard = document.getElementById("scoreboard");

var numscore = parseInt(score);

// statements for different scores
if(numscore==0){
    scoreboard.innerHTML = score  +  "<br>Tough luck!";
}

if(numscore>0 && numscore<50){
    scoreboard.innerHTML = score  +  "<br>Amateur!" + "<br>" +  randomStatement;;
}

if(numscore>50 && numscore<100){
    scoreboard.innerHTML = score  +  "<br>Pro!" + "<br>" +  randomStatement;
}

if(numscore>100){
    scoreboard.innerHTML = score  +  "<br>Legendary!" + "<br>" +  randomStatement;
}


// Audio for gameover
const endAudio = new Audio("../audio/game over.mp3")

window.onload = function(){
    endAudio.pause()
    endAudio.currentTime = 0;
    endAudio.play()
}


    