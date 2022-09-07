browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.url === "https://www.twitch.tv/aruten_") {
		browser.scripting.executeScript({
			target: { tabId: tabId },
			files: ["./scripts/foreground.js"]
		}).then(() => {
			console.log("foreground script started");
		}).catch(err => console.log(err));
	}
});