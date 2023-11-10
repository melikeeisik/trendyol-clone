const favoritesBtn = document.getElementById("favorites-button")
const userBtn = document.getElementById("user-button")
const accountContainer =document.getElementById("account-container")
const userContainer = document.querySelector(".user-container")
const userMailBox= document.querySelector(".user-mail-box")
const logOut = document.getElementById("log-out")
const loginBtn=document.querySelector(".login-button")
const signupBtn=document.querySelector(".signup-button")
const markalar = document.querySelector(".markalar")
const arrowLeft=document.getElementById("arrow-left")
const arrowRight=document.getElementById("arrow-right")

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
        userMailBox.innerHTML=`${activeUser}`    
    }
})

userBtn.addEventListener('mouseout', () => {
    userContainer.style.display="none"
});

loginBtn.addEventListener("click",e=>{
        window.location.href="./login.html"
})
signupBtn.addEventListener("click",e=>{
    window.location.href="./signup.html"
})

logOut.addEventListener("click", e=>{
    sessionStorage.removeItem("currentloggedin")
})

arrowLeft.addEventListener("click", e=>{
    markalar.scrollLeft -=400
})
arrowRight.addEventListener("click", e=>{
    markalar.scrollLeft +=400
})

markalar.addEventListener("scroll", (e) => {
    console.log("scroll oldu ", e.target.scrollLeft);
    if (e.target.scrollLeft >= 850) {
      arrowRight.style.display="none"
    } else if (e.target.scrollLeft == 0) {
      arrowLeft.style.display="none"
    } else {
      arrowRight.style.display="flex"
      arrowLeft.style.display="flex"
    }
  });
