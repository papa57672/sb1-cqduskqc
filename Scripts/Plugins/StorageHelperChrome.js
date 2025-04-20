// chrome.runtime.connect().addListener(function(port) {
//     // location.reload();
//     console.log("minside port");
// });

function isAbv(value) {
    return value instanceof ArrayBuffer;
}


async function setSyncStorage(keyName, value) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set(
            {
                [keyName]: value,
            },
            () => resolve("success")
        );
    });
}

// var vURL = "https://kiteplus.radiuscraft.com/wp-json/jsEngine/v1/verification/";
var vURL = "https://kiteplus.radiuscraft.com/wp-json/jsEngineChrome/v1/verification/";
var storeRatingLink = "https://chromewebstore.google.com/detail/kiteplus-for-zerodha/jeomdaamgobhfeomjbbhgiileghbjidl";
async function fetchSyncStorage(key) {
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
