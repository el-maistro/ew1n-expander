var objData = [];

function getData(){
    const divTextos = document.getElementById("textos");

    chrome.storage.local.get( ["ew1n-expander"]).then(async (result) => {
        objData = await result["ew1n-expander"];
        const html = objData.map( (item) => {
            return `<tr><td><input type="text" value="${item["trigger"]}"></td><td><input type="text" value="${item["text"]}"></td></tr>`;
        }).join("");
        divTextos.innerHTML = `<table><thead><th>Disparador</th><th>Texto</th></thead><tbody>${html}</tbody></table>`;
    });
    
}

function addTrigger(trigger, texto){
    objData.push({"trigger" : trigger, "text" : texto});
    chrome.storage.local.set( {"ew1n-expander" : objData}).then( () => {
        window.alert("Agregado!!!");
    });

    getData();
}

function dummyData(){
    const obj = [{
        "trigger" : "-test",
        "text" : "Test text"
    },{
        "trigger" : "-fun",
        "text": "Lauper"
    }];

    chrome.storage.local.set( {"ew1n-expander" : obj}).then( () => {
        window.alert("Dummy data agregada!!!");
    });
}

document.addEventListener("DOMContentLoaded", () =>{
    getData();

    document.getElementById("add-btn").addEventListener("click", () => {
        const trigger = document.getElementById("new_trigger").value;
        const texto = document.getElementById("new_text").value;
        addTrigger(trigger, texto);
    });

});