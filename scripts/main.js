var objData = [];

function getData(){
    const divTextos = document.getElementById("textos");

    chrome.storage.local.get( ["ew1n-expander"]).then(async (result) => {
        objData = await result["ew1n-expander"];
        const html = objData.map( (item) => {
            return `<tr>
                        <td>
                            <input type="text" value="${item["trigger"]}">
                        </td>
                        <td>
                            <input type="text" value="${item["text"]}">
                        </td>
                        <td>
                            <button id="btn-del" data-id="${item["trigger"]}">X</button>
                        </td>
                        </tr>`;
        }).join("");
        divTextos.innerHTML = `<table>
                                <thead>
                                    <th>Disparador</th>
                                    <th>Texto</th>
                                    <th>-</th>
                                </thead>
                                <tbody>
                                    ${html}
                                </tbody>
                            </table>`;
        listenEvents();
    });
}

function addTrigger(trigger, texto){
    objData.push({"trigger" : trigger, "text" : texto});
    chrome.storage.local.set( {"ew1n-expander" : objData}).then( () => {
        console.log("Agregado!!!");
    });

    getData();
}

function listenEvents(){
    document.querySelectorAll("#btn-del").forEach( (btn) => {
        btn.addEventListener("click", (e) => {
            const trigger = e.currentTarget.dataset.id;
            delTrigger(trigger);
        });
    });
}

function delTrigger(trigger){
    console.log("Borrando ", trigger);
    const tempData = objData.filter( (item) => item.trigger != trigger);
    chrome.storage.local.set( {"ew1n-expander" : tempData}).then( () => {
        console.log("Borrado");
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