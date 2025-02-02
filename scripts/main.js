var objData = [];

const editDiv = document.querySelector(".editar-div");
const divTextos = document.getElementById("textos");

function getData(){
    chrome.storage.local.get( ["ew1n-expander"]).then(async (result) => {
        objData = result["ew1n-expander"] || [];
        if(!Array.isArray(objData)){
            objData = [];
        }
        if(objData.length > 0){
            document.body.classList.remove("body-default");
        } else {
            document.body.classList.add("body-default");
        }
        const html = objData.map( (item) => {
            return `<tr>
                        <td style="width:30%">
                            <input style="width:95%" type="text" value="${item["trigger"]}" disabled>
                        </td>
                        <td style="width:50%">
                            <input type="text" id="${item["trigger"]}" value="${item["text"]}" disabled>
                        </td>
                        <td style="width:20%">
                            <a id="btn-del" data-id="${item["trigger"]}" title="Borrar">
                              <img class="icon-dark" src="./icons/del-dark.png"/>
                            </a>&nbsp;
                            <a id="btn-edit" data-id="${item["trigger"]}" title="Editar">
                              <img class="icon-dark" src="./icons/edit-dark.png"/>
                            </a>
                        </td>
                        </tr>`;
        }).join("");
        divTextos.innerHTML = `<table>
                                <thead>
                                    <th align="left">Disparador</th>
                                    <th colspan="2" align="left">Texto</th>
                                </thead>
                                <tbody>
                                    ${html}
                                </tbody>
                            </table>`;
        listenEvents();
    });
}

function updateTrigger(viejoTrigger, nuevoTrigger, nuevoTexto){
    const index = objData.findIndex( (item) => item.trigger === viejoTrigger);

    if(index != -1){
        objData[index].trigger = nuevoTrigger;
        objData[index].text = nuevoTexto;
        chrome.storage.local.set( {"ew1n-expander" : objData}).then( () => {
            console.log("Guardado!!!");
        });
    } else {
        console.log("No existe el trigger viejo");
    }

    getData();
}

function addTrigger(trigger, texto){
    if(!trigger || !texto){
        window.alert("No se puede agregar datos vacios");
        return;
    }
    
    //Buscar si existe
    const obFind = objData.find( (item) => item.trigger === trigger);
    
    if(!obFind){
        objData.push({"trigger" : trigger, "text" : texto});
        chrome.storage.local.set( {"ew1n-expander" : objData}).then( () => {
            console.log("Agregado!!!");
            document.getElementById("new_trigger").value = "";
            document.getElementById("new_text").value = "";
        });
    } else {
        window.alert("Ya existe el disparador");
    }
    getData();
}

function listenEvents(){
    document.querySelectorAll("#btn-del").forEach( (btn) => {
        btn.addEventListener("click", (e) => {
            const trigger = e.currentTarget.dataset.id;
            delTrigger(trigger);
        });
    });

    document.querySelectorAll("#btn-edit").forEach( (btn) => {
        btn.addEventListener("click", (e) => {
            const trigger = e.currentTarget.dataset.id;
            
            if(trigger){
                
                //Cargar info del trigger
                document.getElementById("trigger_viejo").innerText = trigger;
                document.getElementById("new_trigger_edit").value = trigger;
                
                //Cargar info del array ya que no considera saltos de linea
                const triggerText = objData.find( (item) => item.trigger === trigger);
                if(triggerText.text !== ""){
                    document.getElementById("new_text_edit").textContent = triggerText.text;
                }

                const winHeight = document.body.clientHeight;
                const textoHeight = divTextos.clientHeight;
                let headerHeight = winHeight - textoHeight;
                headerHeight += 100;
                
                editDiv.style.height = `${headerHeight}px`;

                divTextos.innerHTML = "";
                divTextos.style.height = `${headerHeight - 150}px`;
                
                editDiv.classList.remove("editar-div-oculto");                
            }
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

    document.getElementById("done-edit-cancel").addEventListener("click", () => {
        getData();
        editDiv.classList.add("editar-div-oculto");
    });

    document.getElementById("done-edit").addEventListener("click", () => {
        //Guardar nuevos datos de disparador
        const viejoTrigger =  document.getElementById("trigger_viejo").innerHTML;
        const nuevoTrigger = document.getElementById("new_trigger_edit").value;
        const nuevoTexto = document.getElementById("new_text_edit").value;
        
        updateTrigger(viejoTrigger, nuevoTrigger, nuevoTexto);

        editDiv.classList.add("editar-div-oculto");
    })

});