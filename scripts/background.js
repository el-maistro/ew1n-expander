chrome.runtime.onMessage.addListener( (request, sender, sendRespose) => {
    if(request.action === "getData"){
        chrome.storage.local.get(["ew1n-expander"]).then(async (result) => {
            let data = await result["ew1n-expander"] || [];
            sendRespose(data);
        });

        return true;
    }
});