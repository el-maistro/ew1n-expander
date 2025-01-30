// const footer = document.createElement("div");
// footer.innerHTML = `<marquee style="position:fixed; top:0px"><h1>Injected on ${window.location.host}</h1></marquee>`;

// document.body.append(footer);

const elementos = document.querySelectorAll("input, textarea, div");

elementos.forEach( (elem) => {
    if(elem.contentEditable){
        elem.addEventListener("keyup", (e) => {
            if(e.key === "-"){
                //Inicio del trigger
                elem.value = elem.value + "trigger";
            }
        });
    }
})
