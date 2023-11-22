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
const cartProductAmount = document.querySelector(".product-amount input")
const brandsName = document.querySelector(".brands-name")
const decreaseBtn = document.querySelector(".decrease-amount-button")
const increaseBtn = document.querySelector(".increasa-amount-button")
const totalOfProduct = document.getElementById("total-price")
const confirmList = document.querySelector(".confirm-list")
let productsAll = JSON.parse(localStorage.getItem("productsAll")) || [];
let userList = JSON.parse(localStorage.getItem("userList")) || []
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []

function cartProduct(products ,productBox, productAmount){
    const productId = productBox.querySelector(".product-part")
    const productImg = productBox.querySelector(".product-img img")
    const productBrand = productBox.querySelector(".product-brands-name")
    const productName = productBox.querySelector(".product-full-name")
    let productPrice = productBox.querySelector(".product-price")
    const deleteProduct = productBox.querySelector(".delete-product")
    const cartProductAmount = productBox.querySelector(".product-amount input")
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
    cartProductAmount.value=productAmount
    
    deleteProduct.addEventListener("click", e=>{
        const user = userList.find(item => item.userMail == activeUser)
        const index = user.userCart.findIndex(item => item.productId == products.productId)
        user.userCart.splice(index,1)
        localStorage.setItem("userList", JSON.stringify(userList))
        productBox.remove()
        if(user.userCart.length== 0){
            warningBox.setAttribute("style", "display:flex")
            confirmCart.setAttribute("style", "display:none")
        }
        calculateTotalPrice();
       
    })
    increaseBtn.addEventListener("click", e=>{
        decreaseBtn.removeAttribute("disabled")
        decreaseBtn.removeAttribute("style")

        const user = userList.find(item => item.userMail == activeUser)
        let countProduct = user.userCart.findIndex(item => item.productId == products.productId)
        user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount +1 
        localStorage.setItem("userList", JSON.stringify(userList))
        cartProductAmount.value=user.userCart[countProduct].productAmount
        cartProductPrice = user.userCart[countProduct].productAmount * products.productPrice
        productPrice.innerHTML=cartProductPrice+" TL"
        if(user.userCart[countProduct].productAmount == 10){
            increaseBtn.setAttribute("disabled", "")
            increaseBtn.setAttribute("style","color:#999")
        }
        calculateTotalPrice();
    })

    decreaseBtn.addEventListener("click", e=>{
        increaseBtn.removeAttribute("disabled")
        increaseBtn.removeAttribute("style")

        const user = userList.find(item => item.userMail == activeUser)
        let countProduct = user.userCart.findIndex(item => item.productId == products.productId)
        user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount  - 1 
        localStorage.setItem("userList", JSON.stringify(userList))
        cartProductAmount.value=user.userCart[countProduct].productAmount
        cartProductPrice = user.userCart[countProduct].productAmount * products.productPrice
        productPrice.innerHTML=cartProductPrice+" TL"
        if(user.userCart[countProduct].productAmount == 1){
            decreaseBtn.setAttribute("disabled", "disabled")
            decreaseBtn.setAttribute("style","color:#999")
        }
        calculateTotalPrice();
    })  
}

function calculateTotalPrice(){
    let liList = confirmList.querySelectorAll("li")
    const productPrice = document.querySelectorAll(".product-price");

    let totalPrice = 0;
    productPrice.forEach(item => {
        totalPrice += parseFloat(item.textContent.split(" "));
    });
    totalOfProduct.innerHTML = totalPrice + " TL"
    let li = document.createElement("li")
    if(totalPrice > 250 ){
        let p = document.createElement("p")
        p.innerHTML="250 TL Üzeri Kargo Bedava"
        let span = document.createElement("span")
        span.innerHTML= "-29,99TL"
        span.classList.add("cargo-price")
        li.append(p , span)
        if(liList.length <3){
            confirmList.appendChild(li)
        } 
    }else{
        if (liList.length === 3) {
            liList[2].remove();
        }
    }
}

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
            calculateTotalPrice()
        }
        productContainer.setAttribute('style', 'display:none')
    }
}



window.addEventListener("load", loadPage)