function onError(error) {
    console.error(`Error: ${error}`);
}

//send message to background script
function togglerMessage(msg) {
    browser.tabs.query({ active: true, currentWindow: true })
        .then(function (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: msg,
            });
        })
        .catch(onError);
}

//assign button functions
function listenForClicks() {
    var buttons = document.querySelector("#popup-content").children;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
            togglerMessage(buttons[i].textContent);
        })
    }
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