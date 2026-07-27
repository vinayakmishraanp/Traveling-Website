const filters = document.querySelectorAll(".filter");

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        const category = filter.dataset.category;

        window.location.href = `/listings?category=${encodeURIComponent(category)}`;
    });
});


let priceSwitch=document.getElementById("switchCheckDefault");
priceSwitch.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info");
    for(info of taxInfo){
        if(info.style.display!="inline"){
            info.style.display="inline";
        }
        else
        {
        info.style.display="none";
        }
      
    }
})