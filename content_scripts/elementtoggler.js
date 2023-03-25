(() => {

    // prevent script from running twice
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    console.log("Element Toggler Enabled");

    function selectBtn() {
        
    }

    function toggleBtn() {
        
    }

    function editBtn() {
        
    }

    function resetBtn() {
        
    }

    //listen for background messages
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "Select") {
            selectBtn();
        } else if (message.command === "Toggle") {
            toggleBtn();
        } else if (message.command === "Edit") {
            editBtn();
        } else if (message.command === "Reset") {
            resetBtn();
        }
    });

})();