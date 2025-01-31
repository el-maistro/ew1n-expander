// const footer = document.createElement("div");
// footer.innerHTML = `<marquee style="position:fixed; top:0px"><h1>Injected on ${window.location.host}</h1></marquee>`;

// document.body.append(footer);

// const elementos = document.querySelectorAll("input[type='text'], textarea, div[contenteditable='true']");
// elementos.forEach( (elem) => {
//     if(elem.contentEditable){
//         elem.addEventListener("keydown", (e) => {
//             if(e.key === "-"){
//                 //Inicio del trigger
//                 e.preventDefault();
//                 elem.value = "-";
//                 elem.value = elem.value + "trigger";
//             }
//         });
//     }
// });

document.addEventListener("keydown", (e) => {
    const target = e.target;
    if(target.matches("input[type='text'], textarea, div[contenteditable='true']")){
        //Contenido editable
        console.log(target);
    }
});


