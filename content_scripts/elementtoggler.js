(() => {

    // prevent script from running twice
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    console.log("Element Toggler Enabled");

    var storedElements = []; //temp storage
    var turnOffBox = false;
    var elementIsHidden = false;

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

            //hide box and disable
            if (turnOffBox) {
                document.removeEventListener("mouseover", boxListener);
                hoverBox.remove();
                turnOffBox = false;
            }
        });

        //listens for selection
        document.addEventListener("click", function attributeListener(e) {
            if (e.target.id.indexOf('selector') !== -1
                || e.target.tagName === 'BODY'
                || e.target.tagName === 'HTML')
                return;

            if (e.target.getAttribute('id') != null) {
                storedElements.push("#" + CSS.escape(e.target.getAttribute('id')));
            } else if (e.target.classList[0] != null) {
                storedElements.push("." + CSS.escape(e.target.classList[0]));
            } else {
                console.log("No attributes");
            }

            turnOffBox = true;
            document.removeEventListener("click", attributeListener);
        });
    }

    function toggleBtn() {
        if (elementIsHidden) {
            for (let i = 0; i < storedElements.length; i++)
                document.querySelector(storedElements[i]).style.display = "block";
            elementIsHidden = false;
        } else {
            for (let i = 0; i < storedElements.length; i++)
                document.querySelector(storedElements[i]).style.display = "none";
            elementIsHidden = true;
        }
    }

    function resetBtn() {
        if (elementIsHidden)
            toggleBtn();
        storedElements = [];
    }

    //listen for background messages
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "Select") {
            selectBtn();
        } else if (message.command === "Toggle") {
            toggleBtn();
        } else if (message.command === "Reset") {
            resetBtn();
        } else if (message.command === "Save") {
            return Promise.resolve({ response: storedElements })
        } else if (message.command === "Load") {
            storedElements = message.data;
        }
    });

})();