const form = document.getElementById("form")
const email = document.getElementById("email");
const password = document.getElementById("password");
const checkbox1 = document.getElementById("example-1");
const checkbox2 = document.getElementById("example-2");
const checkbox3 = document.getElementById("cbx-43");
const gender = document.querySelectorAll(".gender-button button")
const submitBtn = document.querySelector(".last-button")
const errorBox = document.querySelector(".error-box")
const passwordVisibility = document.querySelector(".eye-icon")
const closeEye=document.getElementById("close-eye")

console.log(passwordVisibility)
let userList = JSON.parse(localStorage.getItem("userList")) || []
//localStorage.removeItem("userList")


function msg (eleman){
    if(eleman.validity.typeMismatch) {
        return "Lütfen mailinizi adresinizi kontrol edin"      
    }else if (eleman.validity.patternMismatch) {
        return "Şifreniz en az 1 harf ve en az 1 rakam içermelidir." 
    }else if (eleman.validity.valueMissing) {
        return "Lütfen bilgileri eksiksiz doldurunuz" 
    }else if (eleman.validity.tooLong) {
        return "Şifreniz en fazla 64 karakter olmalıdır" 
    } else if (eleman.validity.tooShort) {
        return "Şifreniz en az 7 karakter olmalıdır" 
    }else if (eleman.validity.patternMismatch) {
        return "Şifreniz en az 1 rakam ve en az 1 harf içermelidir" 
    }
}
function checkValidity(eleman){
    errorBox.style.display="flex"
    let pTag = errorBox.querySelectorAll("p")
    if(pTag.length==0){
        let errorMessage= document.createElement("p")
        errorMessage.innerHTML= msg(eleman)
        errorBox.appendChild(errorMessage)  
    }else{
        pTag[0].innerHTML = msg(eleman)
    }}

function setUser(){
    const userMail = email.value;
    const userPassword = password.value;
    userFavorites = []
    console.log(userMail, userPassword)

    const user ={
        userMail : userMail,
        userPassword : userPassword,
        userFavorites : userFavorites,
    }

    const mailAddres = userList.find(item => item.userMail == email.value)
    console.log(mailAddres)
        if(mailAddres){
            errorBox.style.display="flex"
            let pTag = errorBox.querySelectorAll("p")
            if(pTag.length==0){
                let errorMessage= document.createElement("p")
                errorMessage.innerHTML= "Bu maile ait kullanıcı bulunmaktadır. Yeni mail deneyiniz."
                email.setAttribute("style", "background-color:#fff4f6;border: 1px solid #d0021b;")
                errorBox.appendChild(errorMessage)  
            }else{
                "style", "background-color:#fff4f6;border: 1px solid #d0021b;"
                pTag[0].innerHTML = "Bu maile ait kullanıcı bulunmaktadır. Yeni mail deneyiniz."
            }
        }else{
            userList.push(user)
            localStorage.setItem("userList" ,JSON.stringify(userList))
            sessionStorage.setItem("currentloggedin", JSON.stringify(userMail))
            form.submit()

        }
}

passwordVisibility.addEventListener("click", e=>{
    console.log(closeEye.classList)
    if(password.type=="password"){
        password.type="text"
        closeEye.classList.remove("fa-solid","fa-eye-slash")
        closeEye.classList.add("fa-solid","fa-eye")
    }else{
        password.type="password"
        closeEye.classList.remove("fa-solid","fa-eye")
        closeEye.classList.add("fa-solid","fa-eye-slash")
    }
})
submitBtn.addEventListener("click" ,e=>{
    e.preventDefault();
    [...form.elements].forEach(e=> {
        if(!e.checkValidity()){
            e.setAttribute("style", "background-color:#fff4f6;border: 1px solid #d0021b;")
            checkValidity(e)
        }else{
            e.removeAttribute("style")
            setUser();
           
        }
    })

})


var userGender;
gender.forEach(button => button.addEventListener("click", e=>{
    e.preventDefault()
    gender.forEach(genderBtn => genderBtn.classList.remove("genderClass"))
    //console.log(e.target.id)
    e.target.classList.add("genderClass")
    /*
    if(e.target.id == 1){
        userGender = "Kadin"
    }else{
        userGender = "Erkek"
        }
    }*/
}
))

