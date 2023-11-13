const bodyId = document.body.id
const addCart= document.getElementById("add-cart")
const addFavorites=document.getElementById("add-favorites")
const addCartText = document.getElementById("add-cart-text")

let userList = JSON.parse(localStorage.getItem("userList")) || []
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []

addCart.addEventListener("click", e=>{
    if(activeUser.length == 0){
        window.location.href="./login.html"
    }else{
        addCart.setAttribute("style", "background-color:#0bc15c;color:#fff;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 600;font-size: 18px;letter-spacing: 0.8px")
        changeText(addCartText, "Sepete Eklendi")
    }
})

addFavorites.addEventListener("click", e=>{
  let user = userList.find(item => item.userMail == activeUser)
  let favori = user.userFavorites.find(item => item == bodyId)
  if(favori){
    const index = user.userFavorites.findIndex(item => item == bodyId)
    user.userFavorites.splice(index,1)
    localStorage.setItem("userList", JSON.stringify(userList))
    addFavorites.querySelector("i").classList.remove("fa-solid","fa-heart")
    addFavorites.querySelector("i").classList.add("fa-regular", "fa-heart")
    addFavorites.querySelector("i").removeAttribute("style","color:#ffa500;")
  }else{
    user.userFavorites.push(bodyId)
    localStorage.setItem("userList", JSON.stringify(userList))
    addFavorites.querySelector("i").classList.remove("fa-regular", "fa-heart")
    addFavorites.querySelector("i").classList.add("fa-solid","fa-heart")
    addFavorites.querySelector("i").setAttribute("style","color:#ffa500;")
    
  }
})

function changeText(item, newText){
    
    let animation = item.animate([
        { transform: 'translateY(0px)', opacity: '1' },
        { transform: 'translateY(1px)', opacity: '0.9' },
        { transform: 'translateY(4px)',  opacity: '0.7' },
        { transform: 'translateY(9px)', opacity: '0.5'},   
        { transform: 'translateY(14px)', opacity: '0.3' }
        
      ], { 
        duration: 500,
        
      });
      animation.onfinish = function() {
        item.innerText = newText;
        item.animate([
        { transform: 'translateY(14px)', opacity: '0.3' },
        { transform: 'translateY(9px)', opacity: '0.5' },
        { transform: 'translateY(4px)',  opacity: '0.7' },
        { transform: 'translateY(1px)', opacity: '0.9'},   
        { transform: 'translateY(0px)', opacity: '1' }
        
      ], { 
        duration: 500,
      });
      };
}

function loadPage() {
  let user = userList.find(item => item.userMail == activeUser)
  let favori = user.userFavorites.find(item => item == bodyId)
  if(favori){
    addFavorites.querySelector("i").classList.remove("fa-regular", "fa-heart")
    addFavorites.querySelector("i").classList.add("fa-solid","fa-heart")
    addFavorites.querySelector("i").setAttribute("style","color:#ffa500;")
  }
}
console.log("efw",bodyId)
window.addEventListener("load", loadPage)