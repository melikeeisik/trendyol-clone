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
const countCart = document.querySelector(".count") 
const productBoxsImg = document.querySelectorAll(".product-box img")
const productBoxsDetail = document.querySelectorAll(".product-container")
const productGrid = document.querySelector(".product-grid")
const productBox = document.querySelector(".product-box")
const productAll= JSON.parse(localStorage.getItem("productsAll"))
const productLeft = document.querySelector(".product-scroll-left")
const productRight = document.querySelector(".product-scroll-right")

let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []
const userList = JSON.parse(localStorage.getItem("userList")) || []


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
    if(user){
        const favorites = user.userFavorites.find(item => item == productId)
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
function createUrl(id){
    if (!id) {
        window.location.href="./notFound.html"
    }else{
        let url = new URL(window.location.href);
        let path = url.pathname.split("/")
        path.pop()
        let newUrl = path.join("/")+"/product-detail.html?id=" + id;
        window.location.href= newUrl;
        console.log(newUrl)
    }
}


function showProductBox(products, productBox){

    const user = userList.find(item => item.userMail == activeUser)

    const productImg = productBox.querySelector(".product-img-container img")
    const productBrand = productBox.querySelector(".brands-name")
    const productName = productBox.querySelector(".full-name")
    const productPrice = productBox.querySelector(".product-discount-price")
    const productDetail = productBox.querySelector(".product-detail")
    const addFavoritesBtn = productBox.querySelectorAll(".product-icon-contanier ")
    const iTags = productBox.querySelectorAll(".product-icon-contanier i ")

    productBox.setAttribute('style', 'display:flex')

    productBox.id = products.productId
    productImg.src=products.productImg;
    productBrand.innerHTML = products.productTilte 
    productName.innerHTML= products.productName 
    productPrice.innerHTML=products.productPrice+" TL"
    
    productImg.addEventListener("click", e=>{
        createUrl(e.target.closest(".product-box").id)
    })
    productDetail.addEventListener("click", e=>{
        createUrl(e.target.closest(".product-box").id)
    })
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
    iTags.forEach(iTag => {
        if(user){
            user.userFavorites.forEach(fav =>{ 
                if(fav == iTag.closest(".product-box").id){
                    iTag.classList.remove("fa-regular","fa-heart")
                    iTag.classList.add("fa-solid", "fa-heart")
                    iTag.setAttribute("style", "color:#ffa500")
                }
            })
        }else{
            iTag.addEventListener("click",e =>{
                window.location.href="./login.html"
            })
        }
    })  
}
productGrid.addEventListener("scroll", (e) => {
    if (e.target.scrollLeft >= 440) {
        productRight.style.display="none"
    } else if (e.target.scrollLeft == 0) {
        productLeft.style.display="none"
    } else {
        productRight.style.display="flex"
        productLeft.style.display="flex"
    }
});
productLeft.addEventListener("click", e=>{
    productGrid.scrollLeft -=400
})
productRight.addEventListener("click", e=>{
    productGrid.scrollLeft +=400
})
function loadPage(){
    productAll.forEach(item =>{
        let newProductBox = productBox.cloneNode(true)                      
        showProductBox(item, newProductBox)
        productGrid.append(newProductBox)
    })
    productBox.setAttribute("style","display:none")
    const user = userList.find(item => item.userMail == activeUser)
    if(user){
        liText.textContent="Hesabım"
        cartCount();
    }
           
}
window.addEventListener("load", loadPage)