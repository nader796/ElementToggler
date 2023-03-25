(() => {

    // prevent script from running twice
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    console.log("Element Toggler Enabled");

    function selectBtn() {
        // create box
        var hoverBox = document.createElement("div");
        hoverBox.style.position = "absolute";
        hoverBox.style.background = "lightblue";
        hoverBox.style.zIndex = "-9999"; // avoid blocking elements
        // hoverBox.style.transition = "all 200ms ease-out"
        // hoverBox.style.border = "5px solid red";
        document.body.appendChild(hoverBox);

        //repositions hoverbox to show selection
        document.addEventListener("mouseover", function boxListener(e) {
            if (e.target.id.indexOf('selector') !== -1
                || e.target.tagName === 'BODY'
                || e.target.tagName === 'HTML')
                return;

            const target = e.target;
            const targetOffset = target.getBoundingClientRect();
            const targetHeight = targetOffset.height;
            const targetWidth = targetOffset.width;

            const boxBorder = 5;
            hoverBox.style.width = targetWidth + boxBorder * 2 + "px";
            hoverBox.style.height = targetHeight + boxBorder * 2 + "px";
            
            // need scrollX and scrollY to account for scrolling
            hoverBox.style.top = targetOffset.top + window.scrollY - boxBorder + "px";
            hoverBox.style.left = targetOffset.left + window.scrollX - boxBorder + "px";

        });
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