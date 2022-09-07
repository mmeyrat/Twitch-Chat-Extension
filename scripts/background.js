let api;

if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
	api = chrome;
}
else if (typeof browser !== "undefined" && typeof browser.runtime !== "undefined") {
	api = browser;
}

api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.url === "https://www.twitch.tv/aruten_") {
		api.scripting.executeScript({
			target: { tabId: tabId },
			files: ["./scripts/foreground.js"]
		}).then(() => {
			console.log("foreground script started");
		}).catch(err => console.log(err));
	}
});
