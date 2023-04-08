const contentBox = document.querySelector("#content-box");

function saveLocally() {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        let contentToStore = JSON.parse(contentBox.textContent);
        console.log(contentToStore);
        browser.storage.local.set(contentToStore);
    });
}

function updateContent() {
    browser.tabs.query({ windowId: myWindowId, active: true })
        .then((tabs) => {
            return browser.storage.local.get(null);
        })
        .then((storedInfo) => {
            contentBox.textContent = JSON.stringify(storedInfo,null,'\t');
        });
}

document.getElementById("apply-button").addEventListener("click", saveLocally); 
document.getElementById("update-button").addEventListener("click", updateContent); 

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
    myWindowId = windowInfo.id;
    updateContent();
});