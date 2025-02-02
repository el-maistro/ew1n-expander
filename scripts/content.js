async function expandirTrigger(trigger){
    return new Promise( (doneomar) => {
        chrome.runtime.sendMessage( {action: "getData"}, (response) => {
            const textoExpandido = response.find( (item) => item.trigger === trigger);
            doneomar(textoExpandido ? textoExpandido.text : "");
        });
    });
}

document.addEventListener("keyup", async (e) => {
    const ew1nregex = /-\w+/g;
    const target = e.target;
    if(target.matches("input[type='text'], textarea, div")){
        let texto = target.value || target.innerText;
        texto += ' ';
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


