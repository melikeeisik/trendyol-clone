function loadFav(){
    const products=[
        {
            productId:1,
            productImg:"https://cdn.dsmcdn.com/ty915/product/media/images/20230530/0/370596801/65990686/1/1_org.jpg",
            productTilte:"Avon",
            productName:"Wish Of Love Kadın Parfüm Edt 50 Ml. 1193492",
            productPrice : 300,
            otherProductImg : [
                "./images/avon1.webp","./images/avon2.webp"
            ]
           
        },
        {
            productId:2,
            productImg:"https://cdn.dsmcdn.com/ty949/product/media/images/20230612/13/385007856/123408601/4/4_org.jpg" ,
            productTilte:"TRENDYOLMİLLA ",
            productName:"Siyah Straight Yüksek Bel Nervür Dikişli Dokuma Pantolon TWOSS21PL0093",
            productPrice : 150,
            otherProductImg : [
                "https://cdn.dsmcdn.com/mnresize/1200/1800/ty948/product/media/images/20230612/13/385007856/123408601/7/7_org_zoom.jpg",
                "https://cdn.dsmcdn.com/ty950/product/media/images/20230612/13/385007856/123408601/6/6_org_zoom.jpg"
            ]
        },
        {
            productId:3,
            productImg:"https://cdn.dsmcdn.com/ty983/product/media/images/20230808/19/401323368/61116150/1/1_org.jpg",
            productTilte:"Bargello",
            productName:"122 Oriental Edp 50 Ml Kadın Parfüm 8691841304622 BRGL122",
            productPrice : 250,
            otherProductImg : [
                "https://cdn.dsmcdn.com/ty983/product/media/images/20230808/20/401324008/113997666/3/3_org_zoom.jpg",
            ]
            
        },
        {
            productId:4,
            productImg:"https://cdn.dsmcdn.com/ty955/product/media/images/20230623/11/388488526/78226671/1/1_org.jpg",
            productTilte:"The Purest Solutions",
            productName:"Leke Karşıtı Arbutin Cilt Bakım Serumu 30 Ml (arbutin %2 + Hyaluronic Acid) TPS103",
            productPrice : 100,
            otherProductImg:[]
        },
        {
            productId:5,
            productImg:"https://cdn.dsmcdn.com/ty998/product/media/images/prod/SPM/PIM/20230910/01/a127fa19-2821-3a88-aeca-ecb1fc3671fd/1_org.jpg",
            productTilte:"DR TAYYARÖZ",
            productName:"Cilt Beyazlatıcı Leke Kremi 30+Spf DRTAYYARÖZBLEMİSHCREAM",
            productPrice : 50,
            otherProductImg : [
                "https://cdn.dsmcdn.com/ty1029/product/media/images/prod/SPM/PIM/20231102/23/0dd7df66-46ce-30d8-8bda-c6c249abb89d/1_org_zoom.jpg",
                "https://cdn.dsmcdn.com/ty1029/product/media/images/prod/SPM/PIM/20231102/23/7c9237dc-ecf8-3e59-9477-c00afc6aa555/1_org_zoom.jpg"
            ]
            
            
        },
        {
            productId:6,
            productImg:"https://cdn.dsmcdn.com/ty955/product/media/images/20230623/11/388488512/78225778/1/1_org.jpg",
            productTilte:"The Purest Solutions",
            productName:"Canlandırıcı Ve Gözenek Sıkılaştırıcı Tüm Ciltler Için Glikolik Asit Tonik 200 Ml TPS104",
            productPrice : 200,
            otherProductImg : [
                "https://cdn.dsmcdn.com/ty956/product/media/images/20230623/11/388488512/78225778/3/3_org_zoom.jpg",
                "https://cdn.dsmcdn.com/ty954/product/media/images/20230623/11/388488512/78225778/2/2_org_zoom.jpg",
                "https://cdn.dsmcdn.com/ty954/product/media/images/20230623/11/388488512/78225778/5/5_org_zoom.jpg"
            ]
        },
    ]
    let productsAll = JSON.parse(localStorage.getItem("productsAll")) || []
    if(productsAll.length == 0){
        products.forEach(element =>{
            productsAll.push(element)
            localStorage.setItem("productsAll" ,JSON.stringify(productsAll))
        
        })
    }
}


window.addEventListener("load", loadFav)