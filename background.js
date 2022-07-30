chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
		chrome.scripting.executeScript({
			target: { tabId: tabId },
			files: ["./foreground.js"]
		}).then(() => {
			console.log("Foreground script OK.");
		}).catch(err => console.log(err));
	}
});