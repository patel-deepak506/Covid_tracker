'use strict'

// This is for Address Automatically Showing
function initAutocomplete() {
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
}

// Fetch signup events 
const fitstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const address = document.getElementById("pac-input");
const password = document.getElementById("password");
const conformPassword = document.getElementById("conformpassword")
const dob = document.getElementById("dob");
const phoneNo = document.getElementById("phone");
const userImage = document.getElementById("profilePicture");

// submit Button event
const submitButton = document.getElementById("submitButton");

// sending user data in LocalStorage
const SendLocalstorage = function (){
    const emailValue = email.value;
    const getUser =  JSON.parse(localStorage.getItem("userDetails"))
    const userDetails = {...getUser}
    const userData = { fitstName:fitstName.value, 
                    lastName:lastName.value , 
                    email:emailValue ,
                    address:address.value,
                    password:password.value , 
                    dob:dob.value ,
                    phoneNo:phoneNo.value,
                    userImage:userImage.value 
                }
    userDetails[emailValue]=userData;
    localStorage.setItem("userDetails" , JSON.stringify(userDetails))
    // window.location.href = "covidpage.html";
}

//  commareDate of birth
const todayDate =  new Date();
const currentDate = todayDate.getFullYear();
let dateofbirth = (dob.value).split("-");
const oldDob = dateofbirth[0];
const currentAge = currentDate-oldDob
console.log(currentAge);


submitButton.addEventListener('click' , function(e) {
    e.preventDefault()
    const compareEmail = JSON.parse(localStorage.getItem("userDetails"));
    console.log(compareEmail);
    const newEmail = email.value;
    let check = false;
    for (let duplicateEmail in compareEmail) {
        if (newEmail ==duplicateEmail) {
            alert('This email alredy exist....')
            check= true;
            break   
        }
    }

    //  For valid Password 
    const str =password.value;
    if (str.match(/[a-z]/g) && str.match(/[A-Z]/g) && str.match(/[0-9]/g)&& str.match(
        /[&@$!._-]/g) && str.match(/[^a-zA-Z\d]/g) && str.length >= 8 
    ){
        if (str == conformPassword.value) {
            if (!check){
                if (currentAge>=18) {
                    // alert("Sign-Up Successful...");
                   
                    SendLocalstorage()
                    window.location.href = "index.html";
                }else{alert("User age must be 18 or above ...") }
            }
        }else {alert(" Your conformPassword is not same as password ")}
    }
    else { alert("Please Enter strong Password...")} 
})