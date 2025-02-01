chrome.runtime.onMessage.addListener( (request, sender, sendRespose) => {
    if(request.action === "getData"){
        console.log("Sending data...");
        chrome.storage.local.get(["ew1n-expander"]).then(async (result) => {
            let data = await result["ew1n-expander"] || [];
            console.log(data);
            sendRespose(data);
        });

        return true;
    }
});