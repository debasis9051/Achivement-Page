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
// Authorization flow
firebase.auth().onAuthStateChanged(function(user) {
    if (user) 
    {
      $("#signIn").modal('hide')
      console.log(user.displayName)
      displayData()    
    } else
    {
      let elem = document.querySelector('#orginal');
      elem.style.display="none"
      accountUi()
      document.querySelector('.userStat').innerHTML="Sign IN"
      console.log("not")
    }
  });
// Account ui
function accountUi(){
  $("#signIn").modal('show')
  document.querySelector('.sign-up').addEventListener('click',signUp);
  document.querySelector('.log-in').addEventListener('click',signIn);
      let elem = document.querySelector('#orginal');
      elem.style.display="none"
      let acData = document.querySelector('.userData')
      acData.style.display="none"
}
function signUp(){
  document.querySelector(".userForm-signUp").style.display="block"
  document.querySelector(".userForm-logIn").style.display="none"
  let email=document.querySelectorAll('[data-user="userEmail"]')
  let password =document.querySelectorAll('[data-user="userPassword"]')  
  let firstName =document.querySelectorAll('[data-user="first-name"]')[0].value
  let lastName =document.querySelectorAll('[data-user="last-name"]')[0].value 
  firebase.auth().createUserWithEmailAndPassword(email[0].value, password[0].value)
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
    $("#signIn").modal('hide')
  })
  .catch((error)=>{
    if(error.message=="The email address is badly formatted.")
    {
    alertBox.style.display="none"
    }
    let errorMSg = error.message
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML=errorMSg;
    let alertBox=document.querySelector(".errorMessage")
    alertBox.style.display="block"
    console.log(errorMSg)
    if(error.message=="The email address is badly formatted.")
    {
    alertBox.style.display="none"
    }
  })
}
async function signIn(){
  try{
    document.querySelector(".userForm-logIn").style.display="block"
    document.querySelector(".userForm-signUp").style.display="none"
    let email=document.querySelectorAll('[data-user="userEmail"]')[1].value
    let password =document.querySelectorAll('[data-user="userPassword"]')[1].value
    let user= await firebase.auth().signInWithEmailAndPassword(email, password)
     console.log(user.user.uid)
     document.querySelector('.userStat').innerHTML="Sign Out"
     $("#signIn").modal('hide')  
  }
  catch(error){
    if(error.message=="The email address is badly formatted.")
    {
      document.querySelector(".errorMessage").style.display="none"
    }
    let errorMSg = error.message
    let errorTxt = document.querySelector(".error-message")
    errorTxt.innerHTML=errorMSg;
    let alertBox=document.querySelector(".errorMessage")
    alertBox.style.display="block"
    console.log(errorMSg)
    if(error.message=="The email address is badly formatted.")
    {
    alertBox.style.display="none"
    }
      
  }
}
// sign in/sign out button
document.querySelector('.userStat').addEventListener('click',()=>{
    firebase.auth().signOut().then((a)=>{
        console.log(a)
        document.querySelector('.userStat').classList.add('signIN')
        window.location.href="/index.html"
        }
    )
})
// User has to sign in for the page
document.querySelector('.signIN').addEventListener('click',accountUi)
function refresh(){
    window.location.reload();
}
document.body.addEventListener('click',(click)=>{
    if(click.target.classList.contains('modal')){
        console.log(click)
        console.log("CLiocck")
        window.location.reload();
    }
})
// Display all student data
function displayData()
{  
  let elem = document.querySelector('.student-profile');
  let acData = document.querySelector('.userData')
  acData.style.display="none"
  elem.style.display="block"
  let studentDatabase;
  let p= document.getElementById('out')
  let user =  firebase.auth().currentUser;
  let acName=document.querySelector('.accountName'); 
  let acEmail=document.querySelector('.accountEmail'); 
  if(user)
  {
    acEmail.innerHTML=`Account Email ID : ${user.email}`;
    acName.innerHTML=`Account Name : ${user.displayName}`;
    acData.style.display="block"
    firebase.database().ref(`Users/${user.uid}`).get(`Students`)
    .then((value)=>{value.forEach((values)=>{
            studentDatabase=values.val()
            p.innerHTML=JSON.stringify(values.val())
            p.style.display="none"
        })
        let students;
        if(studentDatabase){
          students = Object.keys(studentDatabase)
        }
        for ( let j=0;j<students.length;j++)
        {
            let stu = students[j]
            var clone = elem.cloneNode(true);
            clone.querySelector(".fullname").innerHTML=`${studentDatabase[stu].Firstname} ${studentDatabase[stu].Lastname}`
            clone.querySelector(".stream").innerHTML=`${studentDatabase[stu].Stream}`
            clone.querySelector(".year").innerHTML=`${studentDatabase[stu].Year}`
            clone.querySelector(".company").innerHTML=`${studentDatabase[stu].Company}`
            clone.querySelector(".package").innerHTML=`${studentDatabase[stu].AnnualPackage}`
            pic(clone.querySelector(".profileImg"),stu,user,studentDatabase,clone)
            elem.after(clone);
       }
       let orginal=document.querySelector("#orginal")
       orginal.style.display="none"
       deleteStudent(students,user.uid)
    })
    .catch(error=>{
      console.log(error)
      document.querySelector(".delete-toast").classList.toggle("hidden",false)
      document.querySelector(".delete-toast").innerHTML=`<h4 class="text-center pt-2 pb-2">No Student Data available!</h4>`
      setTimeout(()=>   document.querySelector(".delete-toast").classList.toggle("hidden",true),15000)
    })
  }
}
function pic(img,stu,user,studentDatabase,clone){
  var studentPhotos=firebase.storage().ref(`Users/${user.uid}/Students`)
  studentPhotos.listAll().then( (files)=>
  {
    files.items.forEach((file)=>
    {
      if(file.name===`${studentDatabase[stu].Firstname}`)
      {
        clone.classList.add(`${studentDatabase[stu].Firstname}`.trim())
        clone.querySelector(".delete").id=studentDatabase[stu].Firstname
        file.getDownloadURL()
        .then((link)=>img.src=link)
      }
    }) 
  })
  .catch((error)=>{
    console.log(error)
  })
}
function deleteStudent(students,uid)
{
  for(let i=0;i<=students.length;i++)
  {
    document.querySelectorAll(".student-profile")[i].addEventListener('click',(event)=>{
        if(event.target.classList.contains("delete")==true)
        {
            if(event.path[2].classList.contains(event.target.id.trim())==true)
            {
              event.path[2].remove()
              let stu=event.target.id.trim()
              firebase.database().ref(`Users/${uid}/Students/${stu}`).remove()
                .then(()=>{
                  console.log("Data Deleted")
                  return firebase.storage().ref(`Users/${uid}/Students/${stu}`).delete()
                })
                .then(deleteToast())
            }
        }
    })
  }
}
// delete-profile-toast
function deleteToast(){
  console.log("Student Picture Deleted")
  document.querySelector(".delete-toast").classList.toggle("hidden",false)
  document.querySelector(".delete-toast").innerHTML=`<h4 class="text-center pt-2 pb-2">Student profile Deleted !</h4>`
  setTimeout(()=>   document.querySelector(".delete-toast").classList.toggle("hidden",true),3000)
}