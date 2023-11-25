// function for levels
function submit() {

   
    
    var username = document.getElementById("username").value;
    var nickname = document.getElementById("nname").value;

    var userDetails = {
        username: username,
        nickname: nickname
    };

    // storing user data
    localStorage.setItem("n",userDetails.username);
    
    localStorage.setItem("nick",userDetails.nickname);

    



    // condition to proceed
    if(username==""||nickname==""){
        alert("please enter your details to proceed:)");
    }
    else{
        window.location.href= "../levels/levels.html"
    }
    
};

// function for instructions 
function save() {

   
    
    var username = document.getElementById("username").value;
    var nickname = document.getElementById("nname").value;

    var userDetails = {
        username: username,
        nickname: nickname
    };

    // storing user data
    localStorage.setItem("n",userDetails.username);
    
    localStorage.setItem("nick",userDetails.username);

    



    // condition to proceed
    if(username==""||nickname==""){
        alert("please enter your details to proceed:)");
    }
    else{
        window.location.href= "../instructions/instruction.html"
    }
}

// mute button
const mute = document.getElementById("mute");
const unmute = document.getElementById("unmutemute");
// AUDIO
const openingAudio = new Audio("../audio/mainpage audio.mp3")

    





window.onload = function(){
    openingAudio.pause()
    openingAudio.currentTime = 0;
    openingAudio.loop=true;
    openingAudio.play();

    

}

// mute functionality
const audio = document.querySelector(".mute")

let sound = localStorage.getItem("sound")
console.log(sound)

audio.onclick = function(){
    if(sound)
    {
        audio.src = "../images/mute.png"
        localStorage.setItem("sound",false)
        sound = false
        openingAudio.pause()
    }
    else{
        audio.src = "../audio/unmute.png"
        localStorage.setItem("sound",true)
        sound = true
        openingAudio.currentTime = 0
        openingAudio.play()
    }
}


