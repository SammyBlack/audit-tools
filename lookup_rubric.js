(async () => {
    try {
        const data = await chrome.storage.sync.get(["lookupMode", "projectDays"]);
        const lookupMode = data.lookupMode || "clipboard";
        let text = "";

        if (lookupMode === "clipboard") {
            text = await navigator.clipboard.readText();
        } else {
            text = getSelectedText();
        }

        if (text.match(/[A-Za-z0-9]/g) && text.length === 24) {
            const urlBase = "https://app.outlier.ai/en/expert/outlieradmin/tools/audit_rubric_approval/";
            window.open(`${urlBase}${text}`, "_blank");
        } else {
            alert(`Not a valid ID: ${text}`);
        }

    } catch (err) {
        console.error("Failed to read ID:", err);
        alert("Error fetching rubric. Make sure you have a valid ID copied or highlighted.");
    }
})();

function getSelectedText() {
    return window.getSelection().toString().trim();
}
