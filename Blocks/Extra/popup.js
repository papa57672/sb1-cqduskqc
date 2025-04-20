window.onload = onWindowLoad;
function onWindowLoad() {
    let keyName = "kiteGlobalStatus";
    chrome.storage.local.get(keyName, function (result) {
        if (result[keyName] === undefined) {
            toggleSwitch.checked = true;
        } else {
            toggleSwitch.checked = result[keyName];
        }
    });

    let toggleSwitch = document.querySelector("#toggle");
    toggleSwitch.addEventListener("change", async function () {
        console.log("setting status");
        chrome.storage.local.set({
            kiteGlobalStatus: toggleSwitch.checked,
        });
        chrome.tabs.reload();
    });  
}
async function ProcessRadioChange() {
    console.log("setting status");
    chrome.storage.local.set({
        kiteGlobalStatus: true,
    });
}
