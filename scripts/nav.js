document.querySelector(".navbar-toggler").addEventListener('click',() =>{
    let nav_ul=document.querySelector(".nav-ul");
    for(let i=0;i<2;i++){
      nav_ul.children[i].style.borderBottom="1px solid #607478" 
      nav_ul.children[i].style.background="#303030"
    }
  document.querySelector(".navbar-collapse").classList.toggle("show")
  })

 