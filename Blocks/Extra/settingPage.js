window.onload = onWindowLoad;
function onWindowLoad() {
    let toggleSwitch = document.querySelector("#toggle");
    let keyName = "kiteGlobalStatus";
    chrome.storage.local.get(keyName, function (result) {
        if (result[keyName] === undefined) {
            toggleSwitch.checked = true;
        } else {
            toggleSwitch.checked = result[keyName];
        }
    });
    toggleSwitch.addEventListener("change", async function () {
        console.log("setting status");
        chrome.storage.local.set({
            kiteGlobalStatus: toggleSwitch.checked,
        });
        chrome.tabs.reload();
    });


    let exportLogBtn = document.querySelector("#exportLogBtn");
    exportLogBtn.addEventListener("click", async function () {
        let logMessageDataKey = "logMessageDataKey";

        chrome.storage.local.get(logMessageDataKey, function (result) {
            if (result[logMessageDataKey] != undefined && result[logMessageDataKey] != null) {
                let csvContent = "data:text/csv;charset=utf-8,";
                let headerRow = "Time,Counter,Message";
                csvContent += headerRow + "\r\n";

                let messages = result[logMessageDataKey];

                for (let i = 0; i < messages.length; i++) {
                    csvContent += messages[i] + "\n";
                }
                let d = new Date();
                let displayString = "Logs_" + d.getFullYear() + "_" + (d.getMonth() + 1) + "_" + d.getDate() + "_" + d.getHours() + "_" + d.getMinutes();
                let encodedUri = encodeURI(csvContent);
                let CSVlink = document.createElement("a");
                CSVlink.setAttribute("href", encodedUri);
                CSVlink.setAttribute("download", displayString + ".csv");
                CSVlink.click();

            }
        });
    });

    async function loadToggleSet(params) {
        let settingToggleSet = [];
        settingToggleSet.push({
            title: "Basket Delta",
            keyName: "prefBasketDeltaKey",
            defaultValue: false,
        });

        settingToggleSet.push({
            title: "No Tiled Window",
            keyName: "prefNoTiledWindowKey",
            defaultValue: false,
        });

        settingToggleSet.push({
            title: "Keep Basket Window Open",
            keyName: "prefKeepBasketWindowKey",
            defaultValue: false,
        });

        settingToggleSet.push({
            title: "All Indices chart",
            keyName: "prefAllIndicesKey",
            defaultValue: false,
        });

        settingToggleSet.push({
            title: "Log Messages",
            keyName: "prefLogMessageKey",
            defaultValue: false,
        });


        let toggleSetParent = document.querySelector(".toggleSetParent");
        let toggleHTML = `<div class="settingToggleParent" style="display: flex;justify-content: center;align-items: center;">
                    <div class="settingToggleLabel" style=" font-weight: bolder;font-size: 14px; color: #2c6592 ;">HEADER_TEXT </div>
                    <div class="toggle-switch" style="scale: 0.8;">
                        <input class="toggle-input" id="INPUT_ID" type="checkbox">
                        <label class="toggle-label" for="INPUT_ID"></label>
                    </div>
                </div>`;
        let finalHTML = "";
        for (let i = 0; i < settingToggleSet.length; i++) {
            const settingToggleObject = settingToggleSet[i];
            let block = toggleHTML.replaceAll("INPUT_ID", "Toggle_" + i.toString());
            block = block.replace("HEADER_TEXT", settingToggleObject.title);
            finalHTML += block;
        }
        toggleSetParent.innerHTML = finalHTML;

        for (let i = 0; i < settingToggleSet.length; i++) {
            const settingToggleObject = settingToggleSet[i];
            let toggle = document.querySelector("#" + "Toggle_" + i.toString());
            let loadedValue = await loadSettingValue(settingToggleObject.keyName, settingToggleObject.defaultValue);
            toggle.checked = loadedValue;
            toggle.addEventListener("change", async function () {
                chrome.storage.local.set({
                    [settingToggleObject.keyName]: toggle.checked,
                });
            });
        }
    }
    loadToggleSet();

    // let noTiledWindow = document.querySelector("#noTiledWindowToggle");
    // let keyNoTiledWindow = "prefNoTiledWindowKey";
    // chrome.storage.local.get(keyNoTiledWindow, function (result) {
    //     if (result[keyNoTiledWindow] === undefined) {
    //         noTiledWindow.checked = false;
    //     } else {
    //         noTiledWindow.checked = result[keyNoTiledWindow];
    //     }
    // });
    // noTiledWindow.addEventListener("change", async function () {
    //     chrome.storage.local.set({
    //         prefNoTiledWindowKey: noTiledWindow.checked,
    //     });
    //     // chrome.tabs.reload();
    // });

    // let logMessageToggle = document.querySelector("#logMessageToggle");
    // let keyLogMessage = "prefLogMessageKey";
    // chrome.storage.local.get(keyLogMessage, function (result) {
    //     if (result[keyLogMessage] === undefined) {
    //         logMessageToggle.checked = false;
    //     } else {
    //         logMessageToggle.checked = result[keyLogMessage];
    //     }
    // });
    // logMessageToggle.addEventListener("change", async function () {
    //     chrome.storage.local.set({
    //         prefLogMessageKey: logMessageToggle.checked,
    //     });
    //     // chrome.tabs.reload();
    // });

    // let keepBasketWindowToggle = document.querySelector("#keepBasketWindowToggle");
    // let keyKeepBasketWindow = "prefKeepBasketWindowKey";
    // chrome.storage.local.get(keyKeepBasketWindow, function (result) {
    //     if (result[keyKeepBasketWindow] === undefined) {
    //         keepBasketWindowToggle.checked = false;
    //     } else {
    //         keepBasketWindowToggle.checked = result[keyKeepBasketWindow];
    //     }
    // });
    // keepBasketWindowToggle.addEventListener("change", async function () {
    //     chrome.storage.local.set({
    //         prefKeepBasketWindowKey: keepBasketWindowToggle.checked,
    //     });
    //     // chrome.tabs.reload();
    // });


    // let allIndicesToggle = document.querySelector("#allIndicesToggle");
    // let keyAllIndices = "prefAllIndicesKey";
    // chrome.storage.local.get(keyAllIndices, function (result) {
    //     if (result[keyAllIndices] === undefined) {
    //         allIndicesToggle.checked = false;
    //     } else {
    //         allIndicesToggle.checked = result[keyAllIndices];
    //     }
    // });
    // allIndicesToggle.addEventListener("change", async function () {
    //     chrome.storage.local.set({
    //         prefAllIndicesKey: allIndicesToggle.checked,
    //     });
    //     // chrome.tabs.reload();
    // });



    // let basketDeltaToggle = document.querySelector("#basketDeltaToggle");
    // let keyBasketDelta = "prefBasketDeltaKey";
    // chrome.storage.local.get(keyBasketDelta, function (result) {
    //     if (result[keyBasketDelta] === undefined) {
    //         basketDeltaToggle.checked = false;
    //     } else {
    //         basketDeltaToggle.checked = result[keyBasketDelta];
    //     }
    // });
    // basketDeltaToggle.addEventListener("change", async function () {
    //     chrome.storage.local.set({
    //         prefBasketDeltaKey: basketDeltaToggle.checked,
    //     });
    //     // chrome.tabs.reload();
    // });

}

async function setSettingSyncStorage(keyName, value) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(
            {
                [keyName]: value,
            },
            () => resolve("success")
        );
    });
}
async function fetchSettingSyncStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                resolve(null);
            } else {
                resolve(result[key]);
            }
        });
    });
}
async function loadSettingValue(keyName, defaultValue) {
    return new Promise(async (resolve, reject) => {
        let keyValue = await fetchSettingSyncStorage(keyName);
        if (keyValue == null) {
            setSettingSyncStorage(keyName, defaultValue);
            keyValue = defaultValue;
        }
        resolve(keyValue);
    });
}
async function ProcessRadioChange() {
    console.log("setting status");
    chrome.storage.local.set({
        kiteGlobalStatus: true,
    });
}
