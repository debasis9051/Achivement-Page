import {authErrors} from './authError.js'

setInterval(()=>{
  let userState = localStorage.getItem("UserSignedIn");
  console.log(userState)
  if(userState=="true")
{
  setTimeout(()=>{
    window.location="/index.html"
  },1300)
}
},300)

var firebaseConfig = {
    apiKey: "AIzaSyCioJHhlLepp9vwUzatt4p4t8yitJ1oMMM",
    authDomain: "achievement-page.firebaseapp.com",
    databaseURL : "https://achievement-page-default-rtdb.firebaseio.com",
    projectId: "achievement-page",
    storageBucket: "achievement-page.appspot.com",
    messagingSenderId: "776120110700",
    appId: "1:776120110700:web:751039064e94ba9bac5249",
    clientId :"776120110700-7r7fpn892e6cnspibpigeuigbsrr2qf3.apps.googleusercontent.com",
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

  document.querySelector(".signIn").addEventListener("click",signIn)
  document.querySelector(".signUp").addEventListener("click",newUser)
  document.querySelector(".resetPassword").addEventListener('click',returningReset)
  document.querySelector(".googleAuth").addEventListener("click",googleAuth)


// Authorization flow
let userState = localStorage.getItem("UserSignedIn");
if(userState=="true")
{
  console.log("true",userState)
  let login=document.querySelector('.login')
    login.innerHTML=`<i class="fas fa-sign-out-alt mr-2"></i>Log Out`
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
 async function  signUp()
{
  let email=document.querySelector('#email').value
  let password =document.querySelector('#password').value 
  let firstName =document.querySelector('#fname').value
  let lastName =document.querySelector('#lname').value 
  if(!firstName && !lastName)
  {
    console.log("non")
    let alertBox=document.querySelector(".errorMessage")
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML+=`<p>Please Enter your name</p>`;
      alertBox.style.display="block"
      setTimeout(()=>{
        console.log("time")
        errorTxt.innerHTML=``
        alertBox.style.display="none"
      },2500)
      throw {}
  }
  try{
    let pt = await firebase.auth().createUserWithEmailAndPassword(email, password)
    console.log(`Name : ${firstName} ${lastName}`)
    pt.user.updateProfile({displayName: `${firstName} ${lastName}` })
    let alertBox=document.querySelector(".errorMessage")
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML+=`<p><i class="fas fa-spinner mr-2"></i>    Creating User Account</p>`;
      alertBox.style.display="block"

  }
  catch(error)
  {
    errHandler(error)
    }
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
    errHandler(error)
    }
}
    let forms=document.querySelector(".formFeilds")
    function returningReset()
    {
      console.log("return reset")
      forms.innerHTML=``
      document.querySelectorAll(".spacer")[1].style.display="none"
      document.querySelectorAll(".spacer")[2].style.display="none"
      forms.innerHTML+=`
      <div class="content mt-5 ">
      <input class="input" id="email" type="text" placeholder="Account Email ID">
          <span class="border"></span>
     </div>
       <a class="btn btn-danger reset-password mt-3" style="color :#222222; font-weight:bold;" ><i class="fas fa-link mr-2"></i>Send Reset Password link</a>
       <div class="errorMessage mt-3 bg-danger theme">
            <h5 class="error-message p-2"></h5>
          </div> 
     `
      document.querySelector(".reset-password").addEventListener("click",resetPassword)
    }
    function newUser()
    {
      console.log("new user")
      forms.innerHTML=``
      document.querySelectorAll(".spacer")[1].style.display="none"
      document.querySelectorAll(".spacer")[2].style.display="none"
      forms.innerHTML+=`
      <div class="content mt-5 ">
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
      <a class="btn btn-info mt-3 signUp" style="color :#222222; font-weight:bold;"> <i class="fas fa-user-plus mr-2"></i>      Sign Up</a>
     <div class="newUser pt-3">
          <h5>Returning User? Log In</h3>
              <a class="btn btn-success returnUser" style="color :#222222; font-weight:bold;"> <i class="fas fa-sign-in-alt mr-2"></i>  LogIn</a>
          </div> 
          <div class="errorMessage mt-3 bg-danger theme">
            <h5 class="error-message p-2"></h5>
          </div> 
          `
            console.log(forms)
            document.querySelector(".returnUser").addEventListener('click',returningUser)
            document.querySelector(".signUp").addEventListener("click",signUp)

    }

    function returningUser()
    {
      console.log("return")
      forms.innerHTML=``
      document.querySelectorAll(".spacer")[1].style.display="block"
      document.querySelectorAll(".spacer")[2].style.display="block"
      forms.innerHTML+=`
      <div class="content mt-5 ">
      <input class="input" id="email" type="text" placeholder="Email ID / Username">
          <span class="border"></span>
     </div>
      <div class="content mt-5">
       <input class="input" id="password" type="password" placeholder="Password">
         <span class="border"></span>
      </div>
      <div class="errorMessage mt-3 bg-danger theme">
       <h5 class="error-message p-2"></h5>
     </div> 
      <a class="btn btn-info mt-3 signIn" style="color :#222222; font-weight:bold;"> <i class="fas fa-sign-in-alt mr-2"></i>
      Log In</a>
      <div class="additionalLogin">
        <div class="google-btn theme mt-3 googleAuth">
         <div class="google-icon-wrapper">
           <img class="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
         </div>
         <p class="btn-text"><b>Sign in with Google</b></p>
       </div>
      </div>
      <div class="forgotUser pt-3">
       <p class="">Forget Password? Reset your password</p>
           <a class="btn btn-danger resetPassword" style="color :#222222; font-weight:bold;" > <i class="fas fa-trash-restore mr-2"></i>
             Reset</a>
       </div>
     <div class="newUser pt-3">
          <p class="">New User? Sign Up</p>
              <a class="btn btn-success signUp" style="color :#222222; font-weight:bold;" > <i class="fas fa-user-plus mr-2"></i>                  SignUp</a>
          </div> 
          `
          document.querySelector(".signIn").addEventListener("click",signIn)
          document.querySelector(".signUp").addEventListener("click",newUser)
          document.querySelector(".resetPassword").addEventListener("click",returningReset)
          document.querySelector(".googleAuth").addEventListener("click",googleAuth)

      }

      function googleAuth()
      {
        var googleProvider = new firebase.auth.GoogleAuthProvider();
        googleProvider.addScope('profile');
        googleProvider.addScope('email');
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(googleProvider)
        .then((result) => {
          var user = result.user;
          console.log(user);
        }).catch((error) => {
          errHandler(error)
        });
      }

    function resetPassword()
    {
      
      let email=document.querySelector('#email').value.trim()
      console.log("reset",email)
      let pt=firebase.auth().sendPasswordResetEmail(email,
        {url:'https://achivement-page.netlify.app/index.html',canHandleCodeInAp:false})
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
        console.log(error.code)
        errorTxt.innerHTML=`<p>${authErrors[error.code]}</p>`;
        let alertBox=document.querySelector(".errorMessage")
        alertBox.classList.add("bg-danger")
        alertBox.style.display="block"
        setTimeout(()=>{
          console.log("time")
          alertBox.style.display="none"
        },2500)
      })
    }
       
   function errHandler(error)
   {
    let errorMSg = error.message
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML=`<p>${authErrors[error.code]}</p>`;
    let alertBox=document.querySelector(".errorMessage")
    alertBox.style.display="block"
    setTimeout(()=>{
      console.log("time")
      alertBox.style.display="none"
    },4500)
    console.log(errorMSg)
   }

   




