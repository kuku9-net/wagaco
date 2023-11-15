const totalPages = 5;

function getCurrentPageNo(){
    const hash = document.location.hash.replace("#", "");
    const n = hash[0] - '0';
    return (n > 0 && n <= totalPages) ? n : 0;
}

function setVisibility(el, b){
    if(b){
        el.style.display = "block";
    }else{
        el.style.display = "none";
    }
}

function onPopState(){
    const pageNo = getCurrentPageNo();
    document.querySelectorAll("section").forEach((el, index) => {
        setVisibility(el, index === pageNo);
    });

    for(let i = 1; i <= 5; i++){
        const el = document.getElementById("nav-" + i);
        if(i === pageNo){
            el.classList.add("nav-current");
        }else{
            el.classList.remove("nav-current");
        }
    }

    setVisibility(document.querySelector(".footer"), pageNo !== 0)
    setVisibility(document.querySelector(".header"), pageNo !== 0)
    setVisibility(document.querySelector("#nav-next"), pageNo !== totalPages)
    window.scrollTo(0, 0);
}

function turnPage(direction){
    const nextPage = getCurrentPageNo() + direction;
    console.log(nextPage);
    history.pushState(null, null, "#" + nextPage);
    onPopState();
}

document.querySelector("#nav-prev").addEventListener("click", e => turnPage(-1));
document.querySelector("#nav-next").onclick = e => turnPage(1);

window.addEventListener("popstate", onPopState);
onPopState();
