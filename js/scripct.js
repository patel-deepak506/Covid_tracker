'use strict'

// fetch Login events
const loginEmail = document.getElementById("exampleInputEmail1");
const loginPassword = document.getElementById("exampleInputPassword1");
const loginSubmit = document.getElementById("loginButton");
const rememberCheck = document.getElementById('exampleCheck1')

const alredyLogin =sessionStorage.getItem("login");

if (alredyLogin!=null) {
    window.location.href = "covidpage.html";
}

loginSubmit.addEventListener('click' , function(e) {
    e.preventDefault()
    
    // Login Conformation Email and Password verification...
    const loginUserData = JSON.parse(localStorage.getItem("userDetails"));

    let check = false;
    let pcheck = false;
    for (let i in loginUserData ){
        let index= loginUserData[i]
        let getpassword = index["password"] 
        console.log(getpassword);

        if (i == loginEmail.value) {
            check =true
            if(getpassword == loginPassword.value) {
                // document.write("emailverify successfully..")       
                const logindata = {"login":loginEmail.value , "password":loginPassword.value}
                sessionStorage.setItem("login" ,JSON.stringify(logindata))
                window.location.href = "covidpage.html";
                pcheck = true;
                break
            }
        }
    }
    if (!check){
        alert("your email is envalid")    
    }else{
        if (!pcheck ) alert("your Password is envalid") 
    } 
})

// const getLoginData = JSON.parse(sessionStorage.getItem('login'));

// if(getLoginData == {} || getLoginData == null){
//     console.log("its totally null");
// }else{
//     // console.log("Its not null");
//     loginEmail.addEventListener('click' , function(){
//         loginEmail.value = getLoginData.login;
//         loginPassword.value = getLoginData.password;
//         rememberCheck.checked = true ; 
//     });
// }
