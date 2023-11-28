const bodyId = document.body.id
const addCart= document.getElementById("add-cart")
const addFavorites=document.getElementById("add-favorites")
const addCartText = document.getElementById("add-cart-text")
const favoritesBtn = document.getElementById("favorites-button")
const cartBtn = document.getElementById("cart-button")
const userBtn = document.getElementById("user-button")
const accountContainer =document.getElementById("account-container")
const userContainer = document.querySelector(".user-container")
const userMailBox= document.querySelector(".user-mail-box")
const liText = document.getElementById("li-text")
const countCart = document.querySelector(".count") 

let userList = JSON.parse(localStorage.getItem("userList")) || []
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []

function control(){
  const user = userList.find(item => item.userMail == activeUser)
  if(user){
    const match = user.userCart.find(item => item.productId == bodyId)
    if(match){
      addCart.setAttribute("style", "background-color:#0bc15c;color:#fff;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 600;font-size: 18px;letter-spacing: 0.8px")
      addCart.textContent="Sepete Eklendi"
    }else{
      addCart.addEventListener("click", e=>{
        if(activeUser.length == 0){
            window.location.href="./login.html"
          }else{
            addCart.setAttribute("style", "background-color:#0bc15c;color:#fff;font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-weight: 600;font-size: 18px;letter-spacing: 0.8px")
            changeText(addCartText, "Sepete Eklendi")
            const productAmount = 1
            const productAdd = {
              productId : bodyId,
              productAmount : productAmount 
            }
            user.userCart.push(productAdd)
            localStorage.setItem("userList", JSON.stringify(userList))
          }
          cartCount()
      }) 
    }
  
  }
}
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
favoritesBtn.addEventListener("click", e=>{
  if(activeUser.length == 0){
      window.location.href="./login.html"
     
  }else{
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
      accountContainer.style.display="none"
      userContainer.style.display="flex"
      userMailBox.innerHTML=`${activeUser}`    
  }
})
function cartCount(){
  let user = userList.find(item => item.userMail == activeUser)
  console.log(user.userCart)
  if(user.userCart.length == 0){
      countCart.removeAttribute("style")
      return -1
  }else{
      let totalCount = 0
      for(let i = 0; i < user.userCart.length ; i++){
          totalCount += user.userCart[i].productAmount
      }
      console.log(totalCount)
      countCart.setAttribute("style","display:flex")
      countCart.innerHTML=`${totalCount}`

  }
}

userBtn.addEventListener('mouseout', () => {
  userContainer.style.display="none"
});
function loadPage() {
  let user = userList.find(item => item.userMail == activeUser)
  if(user){
    liText.textContent="Hesabım"
    let favori = user.userFavorites.find(item => item == bodyId)
    if(favori){
      addFavorites.querySelector("i").classList.remove("fa-regular", "fa-heart")
      addFavorites.querySelector("i").classList.add("fa-solid","fa-heart")
      addFavorites.querySelector("i").setAttribute("style","color:#ffa500;")
    }
    control()
    cartCount()
  }
}

window.addEventListener("load", loadPage)