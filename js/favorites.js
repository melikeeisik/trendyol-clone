const favoritesContainer = document.querySelector(".favorites-product")
const productContainer = document.querySelector(".product-container")
const productImg = document.querySelector(".product-image-container img")
const productName = document.querySelector(".product-full-name")
const productBrand = document.querySelector(".product-brans")
const productPrice = document.querySelector(".product-price")
const productId = document.querySelector(".buttons-container")
const warningBox = document.querySelector(".warning-box")
const selectPrice = document.getElementById("select-price")
const countCart = document.querySelector(".count") 
const userBtn = document.getElementById("user-button")
const userContainer = document.querySelector(".user-container")
const userMailBox= document.querySelector(".user-mail-box")
const cartBtn= document.getElementById("cart-button")
const btnText = document.querySelector(".btn-text")

let productsAll = JSON.parse(localStorage.getItem("productsAll"));
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []
const userList = JSON.parse(localStorage.getItem("userList")) || []

function favoritesProduct(products ,productBox){
    const productId = productBox.querySelector(".buttons-container")
    const productImg = productBox.querySelector(".product-image-container img")
    const productBrand = productBox.querySelector(".product-brans")
    const productName = productBox.querySelector(".product-full-name")
    const productPrice = productBox.querySelector(".product-price")
    const deleteProduct = productBox.querySelector(".delete-product-icon")
    const addCartBtn = productBox.querySelector(".add-cart-button")
    productBox.setAttribute('style', 'display:flex')

    productId.id = products.productId
    productImg.src=products.productImg;
    productBrand.innerHTML = products.productTilte 
    productName.innerHTML= products.productName 
    productPrice.innerHTML=products.productPrice+" TL"
    
    deleteProduct.addEventListener("click", function(e) {
        const user = userList.find(item => item.userMail == activeUser)
            const index = user.userFavorites.findIndex(item => item == products.productId)
            user.userFavorites.splice(index,1)
            localStorage.setItem("userList", JSON.stringify(userList))
            productBox.remove()
            if(user.userFavorites.length== 0){
                warningBox.setAttribute("style", "display:flex")
            }
    }) 
    addCartBtn.addEventListener("click", e=>{
        const user = userList.find(item => item.userMail == activeUser)
        addCartBtn.innerHTML=""
        const div = document.createElement("div")
        div.classList.add("loader")
        addCartBtn.appendChild(div)
        addCartBtn.setAttribute("style","background-color : #31c458; border: 1px solid #31c458")
        setTimeout(() => {div.remove(),addCartBtn.innerHTML="Sepete Eklendi", addCartBtn.setAttribute("style","color:#fff;background-color : #31c458; border: 1px solid #31c458") },1000)
        setTimeout(() => {addCartBtn.innerHTML="Sepete Ekle", addCartBtn.setAttribute("style","color:rgb(255,165,0);background-color : #fff; border: 1px solid rgb(255,165,0)") }, 3000)
        const productId= addCartBtn.closest(".buttons-container").id    
        const isProduct = user.userCart.find(item => item.productId == productId)
        if(isProduct){
            const countProduct = user.userCart.findIndex(item => item.productId == productId)
            user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount +1 
            localStorage.setItem("userList", JSON.stringify(userList))
        }else{
            const productAmount = 1
            const productAdd = {
                productId : productId,
                productAmount : productAmount 
            }
            user.userCart.push(productAdd)
            localStorage.setItem("userList", JSON.stringify(userList))
        }
        cartCount()  
    })
}
function removeClonesDiv(){
    const cloneContainer = document.querySelectorAll('.product-container');

    cloneContainer.forEach(div => {
        div.parentNode.removeChild(div);
    });
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


selectPrice.addEventListener("change", e=>{
    const user = userList.find(item => item.userMail == activeUser)
    if(user){
        const allMatchProducts = user.userFavorites.reduce((acc, userFavorite) => {
            const matchedProducts = productsAll.filter(product => product.productId == userFavorite);
            return acc.concat(matchedProducts);
        }, []);
        if (selectPrice.value == "cheap" && allMatchProducts.length > 1) {
            allMatchProducts.sort(function(a, b) {
                removeClonesDiv()
                return a.productPrice - b.productPrice;
            });
        }else if (selectPrice.value == "expensive" && allMatchProducts.length > 1) {
                allMatchProducts.sort(function(a, b) {
                    removeClonesDiv()
                    return b.productPrice - a.productPrice;
            });
        }else{
            return -1
        } 
        for (var i = 0; i < allMatchProducts.length; i++) {
            let productBox = productContainer.cloneNode(true)                      
            favoritesProduct(allMatchProducts[i], productBox)
            favoritesContainer.append(productBox)
            console.log(
                'ID: ' + allMatchProducts[i].productId +
                ', Ürün Adı: ' + allMatchProducts[i].productName +
                ', Fiyat: $' + allMatchProducts[i].productPrice
            );
        }
    }         
})   
userBtn.addEventListener("mouseover", e=>{
    if(activeUser.length == 0){
        userContainer.style.display="none"
    }else{
        userContainer.style.display="flex"
        userMailBox.innerHTML=`${activeUser}`    
    }
})   
userBtn.addEventListener('mouseout', () => {
    userContainer.style.display="none"
});
userBtn.addEventListener("click",e=>{
    window.location.href="./index.html"
})
cartBtn.addEventListener("click" , e=>{
    window.location.href="./cart.html"
})
function loadPage(){
    const user = userList.find(item => item.userMail == activeUser)
    if(user){
        if(user.userFavorites.length==0){
            productContainer.setAttribute("style", "display:none")
            warningBox.setAttribute("style", "display:flex")
        }else 
        {
            warningBox.removeAttribute("style")
            user.userFavorites.forEach(userFavorite=>{
                const matchProduct = productsAll.filter(product => product.productId == userFavorite)
                matchProduct.forEach(item => {
                    let productBox = productContainer.cloneNode(true)                      
                    favoritesProduct(item, productBox)
                    favoritesContainer.append(productBox)
                })     
         })
         productContainer.setAttribute('style', 'display:none')
        }
        cartCount()
    }
}
   
window.addEventListener("load" ,loadPage)
