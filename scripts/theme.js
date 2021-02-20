//Theme
let theme=document.getElementById('theme')
let themeCheck=document.querySelector('.theme-text')
document.querySelector('#themeToggele').addEventListener('click',()=>{
  if(theme.href==="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css")
  {
   theme.href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/superhero/bootstrap.min.css"
   themeCheck.innerText="Switch to Dark mode"
  }
  else{
    theme.href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css"
    themeCheck.innerText="Switch to Light mode"
  }
})