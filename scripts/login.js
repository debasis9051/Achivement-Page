setInterval(()=>{
  let userState = localStorage.getItem("UserSignedIn");
  if(userState=="true")
{
  console.log(userState)
window.location="/index.html"
}
},500)
var firebaseConfig = {
    apiKey: "AIzaSyCioJHhlLepp9vwUzatt4p4t8yitJ1oMMM",
    authDomain: "achievement-page.firebaseapp.com",
    databaseURL : "https://achievement-page-default-rtdb.firebaseio.com",
    projectId: "achievement-page",
    storageBucket: "achievement-page.appspot.com",
    messagingSenderId: "776120110700",
    appId: "1:776120110700:web:751039064e94ba9bac5249",
    measurementId: "G-MCLZLBCH1Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
      //theme
  let themeChoice = localStorage.getItem("UserTheme");
  let theme=document.getElementById('theme')
  if (themeChoice)
  theme.href=themeChoice;

// Authorization flow
let userState = localStorage.getItem("UserSignedIn");
let userUid = localStorage.getItem("UserUid");
if(userState=="true")
{
  console.log("true",userState)
  let login=document.querySelector('.login')
    login.innerHTML="Log Out"
    login.href="/student-db.html"
}
else
{
  console.log("false",userState)
  let login=document.querySelector('.login')
  login.innerHTML="Log In"
  login.href="/login.html"
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {
        window.localStorage.setItem('UserSignedIn', true);
        window.localStorage.setItem('UserUid', user.uid);
      let login=document.querySelector('.login')
      login.innerHTML="Student Database"
      login.href="/student-db.html"
      console.log(user.email)
       
    } else
    {
        window.localStorage.setItem('UserSignedIn', false);
      let login=document.querySelector('.login')
      login.innerHTML="Log In"
      login.href="/login.html"
      console.log("not")
    }
  });
// Account ui
function signUp(){
  let email=document.querySelector('#email').value
  let password =document.querySelector('#password').value 
  let firstName =document.querySelector('#fname').value
  let lastName =document.querySelector('#lname').value 
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((user)=>{
    console.log(user)
    let Curuser =  firebase.auth().currentUser;
    console.log(`${firstName} ${lastName}`)
    Curuser.updateProfile({displayName: `${firstName} ${lastName}` })
    .then(()=>{
      window.location.href="/index.html"
      console.log(`User updated with name ${Curuser.displayName}`)
    })
    console.log(user.uid)
  })
  .catch((error)=>{ 
    let alertBox=document.querySelector(".errorMessage")
    if(error.message=="The email address is badly formatted.")
    {
    alertBox.style.display="none"
    }
    let errorMSg = error.message
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML=errorMSg;
      alertBox.style.display="block"
    console.log(errorMSg)
    if(error.message=="The email address is badly formatted.")
    {
    alertBox.style.display="none"
    }
  })
}
async function signIn()
{
    console.log("fdd")
  try{
    let email=document.querySelector('#email').value.trim()
    let password =document.querySelector('#password').value.trim()
    let user= await firebase.auth().signInWithEmailAndPassword(email, password)
    window.location.href="/index.html"
     console.log(user.user.uid)
  }
  catch(error)
  {
    if(error.message=="The email address is badly formatted.")
    {
      document.querySelector(".errorMessage").style.display="none"
    }
    let errorMSg = error.message
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML=errorMSg;
    let alertBox=document.querySelector(".errorMessage")
    alertBox.style.display="block"
    setTimeout(()=>{
      console.log("time")
      alertBox.style.display="none"
    },2500)
    console.log(errorMSg)
    if(error.message=="The email address is badly formatted.")
    {
    alertBox.style.display="none"
    }
      
  }
}
// sign in/sign out button

    // firebase.auth().signOut().then((a)=>{
    //     console.log(a)
    //     // document.querySelector('.userStat').classList.add('signIN')
    //     window.location.href="/index.html"
    //     }
    // )
    let forms=document.querySelector(".formFeilds")
    function newUser()
    {
     
      forms.innerHTML=``
      document.querySelectorAll(".spacer")[1].style.display="none"
      document.querySelectorAll(".spacer")[2].style.display="none"
      forms.innerHTML+=`<div class="content mt-5 ">
      <input class="input" id="fname" type="text" placeholder="First Name">
          <span class="border"></span>
     </div>
     <div class="content mt-5 ">
      <input class="input" id="lname" type="text" placeholder="Last Name">
          <span class="border"></span>
     </div>
     <div class="content mt-5 ">
      <input class="input" id="email" type="text" placeholder="Email ID">
          <span class="border"></span>
     </div>
      <div class="content mt-5">
       <input class="input" id="password" type="password" placeholder="Password">
         <span class="border"></span>
      </div>
      <a class="btn btn-info mt-3" onclick="signUp()">Sign Up</a>
     <div class="newUser pt-3">
          <h5>Returning User? Log In</h3>
              <a class="btn btn-success resetform">LogIn</a>
          </div> 
          <div class="errorMessage mt-3 bg-danger theme">
            <h5 class="error-message p-2"></h5>
          </div> `

            console.log(forms)

          document.querySelector(".resetform").addEventListener('click',()=>{
            forms.innerHTML=``
      document.querySelectorAll(".spacer")[1].style.display="block"
      document.querySelectorAll(".spacer")[2].style.display="block"
      forms.innerHTML+=`<div class="content mt-5 ">
      <input class="input" id="email" type="text" placeholder="Email ID / Username">
          <span class="border"></span>
     </div>
      <div class="content mt-5">
       <input class="input" id="password" type="password" placeholder="Password">
         <span class="border"></span>
      </div>
      <a class="btn btn-info mt-3" onclick="signIn()">Log In</a>
      <div class="forgotUser pt-3">
       <p class="">Forget Password? Reset your password</p>
           <a class="btn btn-danger" onclick="newUser()">Reset</a>
       </div>
     <div class="newUser pt-3">
          <p class="">New User? Sign Up</p>
              <a class="btn btn-success" onclick="newUser()">SignUp</a>
          </div> 
          <div class="errorMessage mt-3 bg-danger theme">
            <h5 class="error-message p-2"></h5>
          </div>  `
          })
            



    }

   document.querySelector(".resetPassword").addEventListener('click',()=>{
     console.log("reset")
     forms.innerHTML=``
      document.querySelectorAll(".spacer")[1].style.display="none"
      document.querySelectorAll(".spacer")[2].style.display="none"
      forms.innerHTML+=`<div class="content mt-5 ">
      <input class="input" id="email" type="text" placeholder="Account Email ID">
          <span class="border"></span>
     </div>
       <a class="btn btn-danger reset-password mt-3" >Send Reset Password link</a>
       <div class="errorMessage mt-3 bg-danger theme">
            <h5 class="error-message p-2"></h5>
          </div> 
     `

      document.querySelector(".reset-password").addEventListener("click",()=>{
        let email=document.querySelector('#email').value.trim()
        console.log("reset",email)
        let pt=firebase.auth().sendPasswordResetEmail(email)
        pt.then(()=>{
          let errorTxt = document.querySelector(".error-message")
          errorTxt.innerHTML=`<p>Password Reset link had been sent to your Registered Email ID successfully</p>`;
          let alertBox=document.querySelector(".errorMessage")
          alertBox.style.display="block"
          alertBox.classList.remove("bg-danger")
          alertBox.classList.add("bg-success")
          setTimeout(()=>{
            console.log("time")
            alertBox.style.display="none"
          },2500)
        })
        pt.catch((error)=>{
          let errorTxt = document.querySelector(".error-message")
          errorTxt.innerHTML=`<p>${error.message}</p>`;
          let alertBox=document.querySelector(".errorMessage")
          alertBox.style.display="block"
          setTimeout(()=>{
            console.log("time")
            alertBox.style.display="none"
          },2500)
        })

      })

    //  
   })