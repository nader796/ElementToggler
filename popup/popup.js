function onError(error) {
    console.error(`Error: ${error}`);
}

function saveLocally(data) {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        let contentToStore = {};
        contentToStore[tabs[0].url] = data;
        browser.storage.local.set(contentToStore);
    });
}

function loadLocally() {
    browser.tabs.query({ active: true, currentWindow: true })
        .then((tabs) => {
            return browser.storage.local.get(tabs[0].url);
        })
        .then((storedInfo) => {
            togglerMessage("Load", storedInfo[Object.keys(storedInfo)[0]]);
        });
}

function responseMessage(msg, data) {
    browser.tabs.query({ active: true, currentWindow: true })
        .then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: msg,
                data: data,
            })
            .then((response) => {
                saveLocally(response.response);
            })
        })
        .catch(onError);
}

//send message to background script
function togglerMessage(msg, data) {
    browser.tabs.query({ active: true, currentWindow: true })
        .then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: msg,
                data: data,
            });
        })
        .catch(onError);
}

function listenForClicks() {
    document.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON" || !e.target.closest("#popup-content")) {
            return;
        } else if (e.target.textContent === "Edit") {
            browser.runtime.openOptionsPage();
        } else if (e.target.textContent === "Save") {
            responseMessage(e.target.textContent, null);
        } else if (e.target.textContent === "Load") {
            loadLocally();
        } else {
            togglerMessage(e.target.textContent, null);
        }
    });
};

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

//When the popup loads, inject a content script
browser.tabs
    //.executeScript({ file: "/thirdparty/jquery-3.6.4.min.js" })
    .executeScript({ file: "/content_scripts/elementtoggler.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);