const contentBox = document.querySelector("#content-box");

function updateContent() {
    browser.tabs.query({ windowId: myWindowId, active: true })
        .then((tabs) => {
            return browser.storage.local.get(null);
        })
        .then((storedInfo) => {
            contentBox.textContent = JSON.stringify(storedInfo,null,'\t');
        });
}

document.getElementById("update-button").addEventListener("click", updateContent); 

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    myWindowId = windowInfo.id;
    updateContent();
});