chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(["hideEnabled", "lookupMode", "projectEnabled"], (data) => {
        if (data.hideEnabled === undefined) chrome.storage.sync.set({ hideEnabled: true });
        if (!data.lookupMode) chrome.storage.sync.set({ lookupMode: "highlighted" });
        if (data.projectEnabled === undefined) chrome.storage.sync.set({ projectEnabled: true });
    });
});

chrome.commands.onCommand.addListener((command) => {
    chrome.storage.sync.get("projectEnabled", (data) => {
        if (command === "lookup_task") {
            executeScript("lookup_task.js");
        } else if (command === "lookup_project" && data.projectEnabled) {
            executeScript("lookup_project.js");
        }
    });
});

function executeScript(scriptFile) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: [scriptFile]
        });
    });
}
