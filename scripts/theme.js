//Theme
 let themeTogg=document.getElementById('theme')
 let themeCheck=document.querySelector('.theme-text')
//  let themeChoice = localStorage.getItem("UserTheme");
document.querySelector('#themeToggele').addEventListener('click',()=>{
  if(themeTogg.href==="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css")
  {
   themeTogg.href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/sketchy/bootstrap.min.css"
   themeCheck.innerText="Switch to Dark mode"
   window.localStorage.setItem('UserTheme',  themeTogg.href);
   window.localStorage.setItem('ThemeChoice',  "light");


  }
  else{
    themeTogg.href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css"
    themeCheck.innerText="Switch to Light mode"
    window.localStorage.setItem('UserTheme',  themeTogg.href);
    window.localStorage.setItem('ThemeChoice',  "dark");


  }
})