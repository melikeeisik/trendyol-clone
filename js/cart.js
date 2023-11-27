const warningBox = document.querySelector(".warning-box")
const productContainer = document.querySelector(".product-container")
const confirmCart = document.querySelector(".confirm-cart")
const myCartText = document.querySelector(".my-cart-text")
const myCartProducts = document.querySelector(".my-cart-produts")
const cartContainer = document.querySelector(".cart-container")
const productId = document.querySelector(".product-part")
const productImg = document.querySelector(".product-img img")
const productBrand = document.querySelector(".product-brands-name")
const productName = document.querySelector(".product-full-name")
const productPrice = document.querySelector(".product-price")
const deleteProduct = document.querySelector(".delete-product")
let cartProductAmount = document.querySelector(".amount")
const brandsName = document.querySelector(".brands-name")
const decreaseBtn = document.querySelector(".decrease-amount-button")
const increaseBtn = document.querySelector(".increasa-amount-button")
const totalOfProduct = document.getElementById("total-price")
const confirmList = document.querySelector(".confirm-list")
const confirmTotal = document.querySelector(".confirm-total")
const cargoFree = document.querySelector(".cargo-free")
const startShopping = document.querySelector(".start-shopping")
const loadProcess = document.querySelector(".load-process")
const updateCart = document.querySelector(".update-cart")
const favoritesProductBox = document.querySelector(".my-favorites-box")
const favoritesProductContainer = document.querySelector(".my-favorites-container")
const cartCount = document.querySelector(".count")
const blackScreen= document.querySelector(".black-screen")
const userBtn = document.getElementById("user-button")
const userContainer = document.querySelector(".user-container")
const userMailBox= document.querySelector(".user-mail-box")
const favBtn= document.getElementById("favories-button")
let productsAll = JSON.parse(localStorage.getItem("productsAll")) || [];
let userList = JSON.parse(localStorage.getItem("userList")) || []
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []

function cartProduct(products ,productBox, productAmount){
    console.log("calisti")
    const cargoFree = productBox.querySelector(".cargo-free")
    const productId = productBox.querySelector(".product-part")
    const productImg = productBox.querySelector(".product-img img")
    const productBrand = productBox.querySelector(".product-brands-name")
    const productName = productBox.querySelector(".product-full-name")
    let productPrice = productBox.querySelector(".product-price")
    const deleteProduct = productBox.querySelector(".delete-product")
    let cartProductAmount = productBox.querySelector(".amount")
    const brandsName = productBox.querySelector(".brands-name")
    const increaseBtn = productBox.querySelector(".increasa-amount-button")
    const decreaseBtn = productBox.querySelector(".decrease-amount-button")
    
    let cartProductPrice = productAmount * products.productPrice

    productBox.setAttribute('style', 'display:flex')
    productId.id = products.productId
    productImg.src=products.productImg;
    brandsName.innerHTML = products.productTilte 
    productBrand.innerHTML = products.productTilte 
    productName.innerHTML= products.productName 
    productPrice.innerHTML=cartProductPrice+" TL"
    cartProductAmount.innerHTML=productAmount

    deleteProduct.addEventListener("click", e=>{
        loadProcess.style.display = "flex";
        updateCart.style.display = "flex";
        blackScreen.style.display="block"
        document.body.style.overflow = "hidden"
        setTimeout(()=> {
            loadProcess.removeAttribute("style");
            updateCart.removeAttribute("style");
            document.body.style.overflow = "" 
            blackScreen.style.display=""
            },3000);
        const user = userList.find(item => item.userMail == activeUser)
        const index = user.userCart.findIndex(item => item.productId == products.productId)
        user.userCart.splice(index,1)
        localStorage.setItem("userList", JSON.stringify(userList))
        productBox.remove()
        let favoritesBox = favoritesProductBox.cloneNode(true)                      
        favoritesProduct(products, favoritesBox)
        favoritesProductContainer.append(favoritesBox)
        if(user.userCart.length== 0){
            warningBox.setAttribute("style", "display:flex")
            confirmCart.setAttribute("style", "display:none")
        }
        calculateTotalPrice();
        findCartCount()
    })
    increaseBtn.addEventListener("click", e=>{
        loadProcess.setAttribute("style","display:flex")
        updateCart.setAttribute("style", "display:flex")
        document.body.style.overflow = "hidden"
        blackScreen.style.display="block"
        setTimeout(()=> {loadProcess.removeAttribute("style"),updateCart.removeAttribute("style"),document.body.style.overflow = "",blackScreen.style.display=""}, 3000);
        decreaseBtn.removeAttribute("disabled")
        decreaseBtn.removeAttribute("style")

        const user = userList.find(item => item.userMail == activeUser)
        let countProduct = user.userCart.findIndex(item => item.productId == products.productId)
        user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount +1 
        localStorage.setItem("userList", JSON.stringify(userList))
        cartProductAmount.innerHTML=user.userCart[countProduct].productAmount
        cartProductPrice = user.userCart[countProduct].productAmount * products.productPrice
        productPrice.innerHTML=cartProductPrice+" TL"
        if(user.userCart[countProduct].productAmount == 10){
            increaseBtn.setAttribute("disabled", "")
            increaseBtn.setAttribute("style","color:#999")
        }
        calculateTotalPrice();
        findCartCount()
    })

    decreaseBtn.addEventListener("click", e=>{
        loadProcess.setAttribute("style","display:flex; background-color:#fff")
        updateCart.setAttribute("style", "display:flex")
        blackScreen.style.display="block"
        document.body.style.overflow = "hidden"

        setTimeout(()=> {loadProcess.removeAttribute("style"),updateCart.removeAttribute("style"),document.body.style.overflow = "",blackScreen.style.display=""}, 3000);
        increaseBtn.removeAttribute("disabled")
        increaseBtn.removeAttribute("style")

        const user = userList.find(item => item.userMail == activeUser)
        let countProduct = user.userCart.findIndex(item => item.productId == products.productId)
        user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount  - 1 
        localStorage.setItem("userList", JSON.stringify(userList))
        cartProductAmount.innerHTML=user.userCart[countProduct].productAmount
        cartProductPrice = user.userCart[countProduct].productAmount * products.productPrice
        productPrice.innerHTML=cartProductPrice+" TL"
        if(user.userCart[countProduct].productAmount == 1){
            decreaseBtn.setAttribute("disabled", "disabled")
            decreaseBtn.setAttribute("style","color:#999")
        }
        calculateTotalPrice();
        findCartCount()
    })
}
function favoritesProduct(products ,productBox){
    const user = userList.find(item => item.userMail == activeUser)
    const productId = productBox.querySelector(".add-carts-button")
    const productImg = productBox.querySelector(".my-favorites-img img")
    const productBrand = productBox.querySelector(".my-favorites-brands")
    const productName = productBox.querySelector(".my-favorites-name")
    const productPrice = productBox.querySelector(".my-favorites-price")
    const deleteProduct = productBox.querySelector(".delete-or-add-button i")

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
    const addCartBtn = productBox.querySelector(".add-carts-button")
    addCartBtn.addEventListener("click" , e=>{
        loadProcess.setAttribute("style","display:flex; background-color:#fff")
        updateCart.setAttribute("style", "display:flex")
        blackScreen.style.display="block"
        document.body.style.overflow = "hidden"
        setTimeout(()=> {loadProcess.removeAttribute("style"),updateCart.removeAttribute("style"),document.body.style.overflow = "",blackScreen.style.display=""}, 3000);
        
        const productId= e.target.id 
        const isProduct = productsAll.find(item => item.productId == productId)
        const productAmount = 1
        const productAdd = {
            productId : isProduct.productId,
            productAmount : productAmount 
        }
        user.userCart.push(productAdd)
        localStorage.setItem("userList", JSON.stringify(userList))
        let productBox = productContainer.cloneNode(true)                      
        cartProduct(isProduct, productBox, productAmount)
        myCartProducts.append(productBox)
    })
}
function findCartCount(){
    const user = userList.find(item => item.userMail == activeUser)
    if(user){
        const cartProductAmount = document.querySelectorAll(".amount")

    let totalProductAmount = 0
    for(let i = 0 ; i < cartProductAmount.length ; i ++){
        if(!cartProductAmount[i].textContent){
            continue
        }
        totalProductAmount += parseInt(cartProductAmount[i].textContent)
    }
    cartCount.innerHTML="("+ totalProductAmount+ " Ürün) "
    user.cartAmount = totalProductAmount
    localStorage.setItem("userList",JSON.stringify(userList))
    }
}  
function calculateTotalPrice(){
    let cargoPrice = 0
    let liList = confirmList.querySelectorAll("li")
    const productPrice = document.querySelectorAll(".product-price");

    let totalPrice = 0;
    productPrice.forEach(item => {
        totalPrice += parseFloat(item.textContent.split(" "));
    });
    totalOfProduct.innerHTML = totalPrice + " TL"
    let li = document.createElement("li")
    if(totalPrice > 300 ){
        let p = document.createElement("p")
        p.innerHTML="300 TL Üzeri Kargo Bedava"
        let span = document.createElement("span")
        span.innerHTML= "-29,99TL"
        span.classList.add("cargo-price")
        li.append(p , span)
        if(liList.length <3){
            confirmList.appendChild(li)
        } 
    }else{
        cargoPrice = 29,99;
        if (liList.length === 3) {
            liList[2].remove();
        }
    }
    confirmTotal.innerHTML = totalPrice + cargoPrice + " TL"
}
  
startShopping.addEventListener("click", e=>{
    if(activeUser.length == 0){
        window.location.href="./login.html"
       
    }else{
        console.log("kullanici var")
        window.location.href="./index.html"
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
favBtn.addEventListener("click" , e=>{
    window.location.href="./favorites.html"
})

function loadPage(){
    const user = userList.find(item => item.userMail == activeUser)
    if(user){
        if(user.userCart.length == 0){
            productContainer.setAttribute("style", "display:none")
            confirmCart.setAttribute("style", "display:none")
            myCartText.setAttribute("style", "display:none")
            warningBox.setAttribute("style","display:flex")
            cartContainer.setAttribute("style","display: block")
        }else{
            warningBox.removeAttribute("style")
            user.userCart.forEach(userCartProduct=>{
                const matchProduct = productsAll.filter(product => product.productId == userCartProduct.productId)
                matchProduct.forEach(item => {
                    let productBox = productContainer.cloneNode(true)                      
                    cartProduct(item, productBox, userCartProduct.productAmount)
                    myCartProducts.append(productBox)
                })  
            });
            user.userFavorites.forEach(userFavorite=>{
                const matchProduct = productsAll.filter(product => product.productId == userFavorite)
                const isUserCart = user.userCart.find(isProduct => isProduct.productId == userFavorite)
                if(isUserCart){
                    return-1   
                }else{
                    matchProduct.forEach(item => {
                        let productBox = favoritesProductBox.cloneNode(true)                      
                        favoritesProduct(item, productBox)
                        favoritesProductContainer.append(productBox)
                        
                    }) 
                }
         })
            calculateTotalPrice()
            findCartCount()

        }
        productContainer.setAttribute('style', 'display:none')
        favoritesProductBox.setAttribute("style", "display:none")
    }
}



window.addEventListener("load", loadPage)