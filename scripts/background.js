let api;
let emotes = [];
let banners = [];
let badges = [["coeurbot", "💗"]];

(async () => {
	let respEmotes = await fetch("https://maximemeyrat.fr/api/emotes");
	let dataEmotes = await respEmotes.json();
		
	for (let i = 0; i < dataEmotes.length; i++) {
		let text = dataEmotes[i].substr(0, dataEmotes[i].indexOf('.'));
		let image = `https://maximemeyrat.fr/api/emotes/${dataEmotes[i]}`;
		emotes.push([text, image]);
	}

	let respBadges = await fetch("https://maximemeyrat.fr/api/badges");
	let dataBadges = await respBadges.json();

	for (let key in dataBadges) {
		badges.push([key, dataBadges[key]]);
	}

	let respBanners = await fetch("https://maximemeyrat.fr/api/banners");
	let dataBanners = await respBanners.json();

	for (let key in dataBanners) {
		banners.push([key, dataBanners[key]]);
	}
})();

if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
	api = chrome;
} else if (typeof browser !== "undefined" && typeof browser.runtime !== "undefined") {
	api = browser;
}

api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && (tab.url === "https://www.twitch.tv/aruten_" || 
		tab.url === "https://www.twitch.tv/moderator/aruten_" || tab.url === "https://dashboard.twitch.tv/u/aruten_/stream-manager")) {
		api.scripting.executeScript({
			target: {tabId},
			args: [{badges: badges, banners: banners, emotes: emotes}],
			func: vars => Object.assign(self, vars),
		}, () => {
			api.scripting.executeScript({
				target: {tabId}, 
				files: ["./scripts/foreground.js"],
			}).then(() => {
				console.log("Foreground script started.");
			}).catch(err => console.log(err));
		});
	}
});
