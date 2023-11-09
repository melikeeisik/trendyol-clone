const favoritesBtn = document.getElementById("favorites-button")


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
        favoritesBtn.setAttribute("style" ,"color:red")
    }
})

