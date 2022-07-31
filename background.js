chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.url == "https://www.twitch.tv/aruten_") {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ["./foreground.js"]
		}).then(() => {
			console.log("foreground script started");
		}).catch(err => console.log(err));
	}
});