let bodyId = document.body.id
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
const otherPicContainer = document.querySelector(".other-product-pictures")
const result = document.querySelector("#myresult")
let userList = JSON.parse(localStorage.getItem("userList")) || []
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []
let productsAll = JSON.parse(localStorage.getItem("productsAll")) || [];

function otherPicture(){
  let otherImg= productsAll.find(item => item.productId == bodyId)
  if(otherImg.otherProductImg.length == 0){
    otherPicContainer.setAttribute("style", "display:none")
  }else{
    otherPicContainer.removeAttribute("style")
    console.log(otherImg.otherProductImg.length)
    for (let i = -1; i< otherImg.otherProductImg.length ; i++){
      let otherPicBox = document.createElement("div")
      otherPicBox.classList.add("other-picture")
      otherPicContainer.append(otherPicBox)

      let otherPic =  document.createElement("img")
      otherPic.classList.add("other-picture-img")
      
      if(i == -1){
        otherPic.src = otherImg.productImg
      }else{
        otherPic.src = otherImg.otherProductImg[i]
      }
      otherPicBox.append(otherPic)
      createClickBox()
    }
  }
}
function createClickBox(){
  const btn = document.querySelectorAll(".other-picture-img")
  btn.forEach(item => {
    item.addEventListener("click", e => {
        console.log(item)
        const myImage = document.getElementById("myimage")
        myImage.src = item.src;
        let result = document.getElementById("myresult");
        result.style.backgroundImage = "url('" + myImage.src + "')";
    });
  });
}
function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("div");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = 2.51;
  cy = 3.285;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (lens.offsetWidth / 2);
    y = pos.y - (lens.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
  }
  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

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
  console.log(bodyId)
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
  if(user.userCart.length == 0){
      countCart.removeAttribute("style")
      return -1
  }else{
      let totalCount = 0
      for(let i = 0; i < user.userCart.length ; i++){
          totalCount += user.userCart[i].productAmount
      }
      countCart.setAttribute("style","display:flex")
      countCart.innerHTML=`${totalCount}`

  }
}
function showProductDetail(productId){
  let product = productsAll.find(item => item.productId == productId)
  bodyId = product.productId
  document.getElementById('brands').textContent = product.productTilte;
  document.getElementById('fullname').textContent = product.productName;
  document.querySelector(".product-price").innerHTML = product.productPrice + " TL"
  const zoomImg = document.createElement("img")
  zoomImg.id="myimage"
  zoomImg.classList.add("product-img-size")
  zoomImg.src= product.productImg
  console.log(result)
  result.before(zoomImg)
  imageZoom("myimage", "myresult")
}

userBtn.addEventListener('mouseout', () => {
  userContainer.style.display="none"
});
function loadPage() {
  let productId = window.location.href.split('?id=')[1] 
  let isProductId= productsAll.find(item =>item.productId == productId)
  console.log(productId)
  if (!isProductId) {
    window.location.href="./notFound.html"
  }else{
    showProductDetail(productId)
  }
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
  otherPicture()
}

window.addEventListener("load", loadPage)