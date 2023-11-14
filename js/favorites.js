const favoritesContainer = document.querySelector(".favorites-product")
const productContainer = document.querySelector(".product-container")
const productImg = document.querySelector(".product-image-container img")
const productName = document.querySelector(".product-full-name")
const productBrand = document.querySelector(".product-brans")
const productPrice = document.querySelector(".product-price")
const warningBox = document.querySelector(".warning-box")
let productsAll = JSON.parse(localStorage.getItem("products")) || [];
let activeUser = JSON.parse(sessionStorage.getItem("currentloggedin")) || []
const userList = JSON.parse(localStorage.getItem("userList")) || []


const products=[
    {
        productId:1,
        productImg:"https://cdn.dsmcdn.com/ty915/product/media/images/20230530/0/370596801/65990686/1/1_org.jpg",
        productTilte:"Avon",
        productName:"Wish Of Love Kadın Parfüm Edt 50 Ml. 1193492",
        productPrice : "150 TL",
    },
    {
        productId:2,
        productImg:"https://cdn.dsmcdn.com/ty949/product/media/images/20230612/13/385007856/123408601/4/4_org.jpg" ,
        productTilte:"TRENDYOLMİLLA ",
        productName:"Siyah Straight Yüksek Bel Nervür Dikişli Dokuma Pantolon TWOSS21PL0093",
        productPrice : "150 TL",
    },
    {
        productId:3,
        productImg:"https://cdn.dsmcdn.com/ty983/product/media/images/20230808/19/401323368/61116150/1/1_org.jpg",
        productTilte:"Bargello",
        productName:"122 Oriental Edp 50 Ml Kadın Parfüm 8691841304622 BRGL122",
        productPrice : "150 TL",
    },
    {
        productId:4,
        productImg:"https://cdn.dsmcdn.com/ty955/product/media/images/20230623/11/388488526/78226671/1/1_org.jpg",
        productTilte:"The Purest Solutions",
        productName:"Leke Karşıtı Arbutin Cilt Bakım Serumu 30 Ml (arbutin %2 + Hyaluronic Acid) TPS103",
        productPrice : "150 TL",
    },
    {
        productId:5,
        productImg:"https://cdn.dsmcdn.com/ty998/product/media/images/prod/SPM/PIM/20230910/01/a127fa19-2821-3a88-aeca-ecb1fc3671fd/1_org.jpg",
        productTilte:"DR TAYYARÖZ",
        productName:"Cilt Beyazlatıcı Leke Kremi 30+Spf DRTAYYARÖZBLEMİSHCREAM",
        productPrice : "150 TL",
    },
    {
        productId:6,
        productImg:"https://cdn.dsmcdn.com/ty955/product/media/images/20230623/11/388488512/78225778/1/1_org.jpg",
        productTilte:"The Purest Solutions",
        productName:"Canlandırıcı Ve Gözenek Sıkılaştırıcı Tüm Ciltler Için Glikolik Asit Tonik 200 Ml TPS104",
        productPrice : "150 TL",
    },
]

products.forEach(element =>{
    productsAll.push(element)
    localStorage.setItem("productsAll" ,JSON.stringify(productsAll))

})

function favoritesProduct(products ,productBox){
    const productImg = productBox.querySelector(".product-image-container img")
    const productBrand = productBox.querySelector(".product-brans")
    const productName = productBox.querySelector(".product-full-name")
    const productPrice = productBox.querySelector(".product-price")
    const deleteProduct = productBox.querySelector(".delete-product-icon")

    productBox.setAttribute('style', 'display:flex')

    productImg.src=products.productImg;
    productBrand.innerHTML = products.productTilte 
    productName.innerHTML= products.productName 
    productPrice.innerHTML=products.productPrice
    
    deleteProduct.addEventListener("click", function(e) {
            const user = userList.find(item => item.userMail == activeUser)
            console.log("civciv" ,user.userFavorites.length)
            
                const index = user.userFavorites.findIndex(item => item == products.productId)
                user.userFavorites.splice(index,1)
                localStorage.setItem("userList", JSON.stringify(userList))
                productBox.remove()
                if(user.userFavorites.length== 0){
                    warningBox.setAttribute("style", "display:flex")
                }
    })
}
    
    



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
}}
   



window.addEventListener("load" ,loadPage)
