document.querySelectorAll(".font").forEach((button)=>{
    button.addEventListener("click",(clicked)=>{
        console.log(clicked.target.classList)
        let el=document.querySelector("*")
        var size = parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'))
        if(clicked.target.classList.contains("font-increase"))
        {
              size = size + 2;
              if (size >= 35) 
                size = 35;
            console.log("font",size)
        }
        else if(clicked.target.classList.contains("font-normal") )
        {
            size=15
        }
        else
        {
            size = size - 2;
            if (size <= 6) 
                size = 6;
        }
        document.querySelector("*").style.fontSize=`${size}px`
        console.log(window.getComputedStyle(el, null).getPropertyValue('font-size'))
        })
})