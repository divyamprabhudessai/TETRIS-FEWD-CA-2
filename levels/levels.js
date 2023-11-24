const openingAudio = new Audio("../audio/mainpage audio.mp3")
window.onload = function(){
    openingAudio.pause()
    openingAudio.currentTime = 0;
    openingAudio.play();    
}

// mute functionality
const audio = document.querySelector(".mute")

let sound = localStorage.getItem("sound")
console.log(sound)

audio.onclick = function(){
    if(sound)
    {
        audio.src = "../audio/mainpage audio.mp3"
        localStorage.setItem("sound",false)
        sound = false
        openingAudio.pause()
    }
    else{
        audio.src = "../Images/Audio.png"
        localStorage.setItem("sound",true)
        sound = true
        openingAudio.currentTime = 0
        openingAudio.play()
    }
}