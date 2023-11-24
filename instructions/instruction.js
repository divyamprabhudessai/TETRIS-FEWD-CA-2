var getname = localStorage.getItem("n")
var getnick = localStorage.getItem("nick")
const start = document.getElementById("startgame")
if(getname!= null|| getnick!= null ){
    start.onclick = function(){
        window.location.href = "../levels/levels.html"
    }
}
else {
    alert("please enter your details on the previous page:)")
}
