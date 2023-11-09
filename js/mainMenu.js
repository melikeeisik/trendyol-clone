const favoritesBtn = document.getElementById("favorites-button")
const userBtn = document.getElementById("user-button")
const accountContainer =document.getElementById("account-container")
const userContainer = document.querySelector(".user-container")
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []

let toggle=false;

const toggleMenu = () => {
    let activeText = document.getElementById('drawer-container');

    if(toggle) {
        activeText.style.display = 'none';
    } else {
        activeText.style.display = 'block';
    }

}

let close = false;
const closeDrawer =()=>{
    let closeText = document.getElementById("drawer-container");

    if(close){
        closeText.style.display ="block";
    } else{
        closeText.style.display="none";
    }
}

favoritesBtn.addEventListener("click", e=>{
    if(activeUser.length == 0){
        window.location.href="./login.html"
       
    }else{
        console.log("kullanici var")
        favoritesBtn.style.color="red"
    }
})

userBtn.addEventListener("mouseover", e=>{
    if(activeUser.length == 0){
        userContainer.style.display="none"
    }else{
        console.log("kullanici var")
        accountContainer.style.display="none"
        userContainer.style.display="flex"
    }
})

userBtn.addEventListener('mouseout', () => {
    userContainer.style.display="none"
  });