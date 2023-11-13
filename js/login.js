const email = document.getElementById("email")
const password = document.getElementById("password")
const loginBtn = document.getElementById("login-button")
const form = document.getElementById("form")
const errorBox = document.querySelector(".error-box")
const passwordVisibility = document.querySelector(".eye-icon")
const closeEye=document.getElementById("close-eye")

let userList = JSON.parse(localStorage.getItem("userList")) || []

loginBtn.addEventListener("click", e=>{
    e.preventDefault()
    const findMail = userList.find(item => item.userMail == email.value)
    console.log(findMail)
    const findPassword = userList.find(item => item.userPassword == password.value)
    if(findMail && findPassword){
        sessionStorage.setItem("currentloggedin", JSON.stringify(findMail.userMail))
        form.submit()
    }else if(findMail && !findPassword){
        errorBox.style.display="flex"
        let pTag = errorBox.querySelectorAll("p")
        //console.log(pTag)
        if(pTag.length==0){
            let errorMessage = document.createElement("p")
            errorMessage.innerHTML="Hatalı şifre"
            errorBox.appendChild(errorMessage)
        }else{
            pTag[0].innerHTML= "Hatalı şifre"
        }
    }else if(!findMail){
        errorBox.style.display="flex"
        let pTag = errorBox.querySelectorAll("p")
        if(pTag.length==0){
            let errorMessage = document.createElement("p")
            errorMessage.innerHTML="Böyle bir mail bulunmamaktadır"
            errorBox.appendChild(errorMessage)
        }else{
            pTag[0].innerHTML= "Böyle bir mail bulunmamaktadır"
        }
}})

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
