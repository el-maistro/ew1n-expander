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
const ew1nregex = /-\w+/g;

async function expandirTrigger(trigger){
    return new Promise( (doneomar) => {
        chrome.runtime.sendMessage( {action: "getData"}, (response) => {
            const textoExpandido = response.find( (item) => item.trigger === trigger);
            doneomar(textoExpandido ? textoExpandido.text : "");
        });
    });
}

document.addEventListener("keydown", async (e) => {
    const target = e.target;
    if(target.matches("input[type='text'], textarea, div[contenteditable='true']")){
        const texto = target.value || target.innerText;
        const triggersEncontrados = texto.match(ew1nregex);

        if(!triggersEncontrados){ return;}

        for(const trigger of triggersEncontrados) {
            let textoExpandido = await expandirTrigger(trigger);
            console.log("found: ", trigger, " expandido: ", textoExpandido);
            if(textoExpandido !== ""){
                const nuevoTexto = texto.replace(trigger, textoExpandido);
                if(target.tagName === "DIV"){
                    target.innerText = nuevoTexto;
                } else {
                    target.value = nuevoTexto;
                }
            }
        }
    }
});


