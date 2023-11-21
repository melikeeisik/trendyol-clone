const favoritesBtn = document.getElementById("favorites-button")
const cartBtn = document.getElementById("cart-button")
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
const markaContainer =document.querySelector(".marka-container")
const markaKonum = document.querySelectorAll(".konumlama")
const addFavoritesBtn = document.querySelectorAll(".product-icon-contanier ")
const iTags = document.querySelectorAll(".product-icon-contanier i ")
const liText = document.getElementById("li-text")



let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []
const userList = JSON.parse(localStorage.getItem("userList")) || []


console.log(activeUser)
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
        window.location.href="./favorites.html"
    }
})

cartBtn.addEventListener("click", e=> {
    if(activeUser.length == 0){
        window.location.href="./login.html"
       
    }else{
        console.log("kullanici var")
        window.location.href="./cart.html"
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
    markalar.scrollLeft -=380
})
arrowRight.addEventListener("click", e=>{
    markalar.scrollLeft +=380
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


let count =3
imgCount(count);
console.log(markaContainer.scrollWidth,markaContainer.clientWidth)
function imgCount (count) {
    markaKonum.forEach(e=>{
        if(count ==3){
            //markaContainer.style.display="grid"
            //markaContainer.style.gridTemplateColumns="1fr 1fr 1fr"
            let imgWidth =markaContainer.scrollWidth/3
            //e.style.width=imgWidth+"px"
            e.style.marginRight=imgWidth/3+"px"
            e.style.marginLeft=imgWidth/2.5+"px"
            //console.log( e.style.marginLeft, e.style.marginRight)
        }
        if(count ==4){
            //markaContainer.style.display="grid"
            //markaContainer.style.gridTemplateColumns="1fr 1fr 1fr"
            let imgWidth =markaContainer.scrollWidth/4
            e.style.width=imgWidth+"px"
            //e.style.marginRight=imgWidth/2+"px"
            //e.style.marginLeft=imgWidth/2+"px"
            //console.log( e.style.marginLeft, e.style.marginRight)
        }
    })
}

function addFavorites(productId){
    let user = userList.find(item => item.userMail == activeUser)
    console.log(user)
    if(user){
        const favorites = user.userFavorites.find(item => item == productId)
        console.log(favorites)
        if(favorites){
            const index = user.userFavorites.findIndex(item => item == productId)
            user.userFavorites.splice(index,1)
            localStorage.setItem("userList", JSON.stringify(userList))
            return false
        }else{
            user.userFavorites.push(productId)
            localStorage.setItem("userList", JSON.stringify(userList))
            return true
        }
        
    }
}
addFavoritesBtn.forEach(item=>
    item.addEventListener("click", e=>{
        e.preventDefault()
        const productId = e.target.closest(".product-box").id
        let isFavorites = addFavorites(productId)
        if(isFavorites){
            item.querySelector("i").classList.remove("fa-regular","fa-heart")
            item.querySelector("i").classList.add("fa-solid", "fa-heart")
            item.setAttribute("style", "color:#ffa500")
        }else{
            item.querySelector("i").classList.remove("fa-solid","fa-heart")
            item.querySelector("i").classList.add("fa-regular","fa-heart")
            item.removeAttribute("style", "color:#ffa500")
        }
    } )
)
function loadPage(){
    const user = userList.find(item => item.userMail == activeUser)
    if(user){
        liText.textContent="Hesabım"
        iTags.forEach(iTag => {
            user.userFavorites.forEach(fav =>{ 
                if(fav == iTag.closest(".product-box").id){
                    iTag.classList.remove("fa-regular","fa-heart")
                    iTag.classList.add("fa-solid", "fa-heart")
                    iTag.setAttribute("style", "color:#ffa500")
                    console.log("VAR ", fav)
                }})
                }
            )
    }
           
    }
window.addEventListener("load", loadPage)