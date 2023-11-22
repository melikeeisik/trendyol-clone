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


    productBox.setAttribute('style', 'display:flex')

    let cartProductPrice = productAmount * products.productPrice
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
    })

    increaseBtn.addEventListener("click", e=>{
        const user = userList.find(item => item.userMail == activeUser)
        const countProduct = user.userCart.findIndex(item => item.productId == products.productId)
        console.log(user.userCart[countProduct])
        user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount +1 
        localStorage.setItem("userList", JSON.stringify(userList))
        cartProductAmount.value=user.userCart[countProduct].productAmount
        cartProductPrice = user.userCart[countProduct].productAmount * products.productPrice
        productPrice.innerHTML=cartProductPrice+" TL"
    })
    decreaseBtn.addEventListener("click", e=>{
        const user = userList.find(item => item.userMail == activeUser)
        const countProduct = user.userCart.findIndex(item => item.productId == products.productId)
        console.log(user.userCart[countProduct])
        user.userCart[countProduct].productAmount = user.userCart[countProduct].productAmount  - 1 
        localStorage.setItem("userList", JSON.stringify(userList))
        cartProductAmount.value=user.userCart[countProduct].productAmount
        cartProductPrice = user.userCart[countProduct].productAmount * products.productPrice
        productPrice.innerHTML=cartProductPrice+" TL"
    })
    
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
            })
        }
        productContainer.setAttribute('style', 'display:none')
    }
}



window.addEventListener("load", loadPage)