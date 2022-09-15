let api;

let emotes = [["Edab", "https://cdn.discordapp.com/attachments/336995258875379715/1002225356574576640/chika-dab.png"],
			  ["Epet", "https://cdn.discordapp.com/attachments/336995258875379715/1002255919519891516/1659026811536.gif"],
			  ["Esweat", "https://cdn.discordapp.com/attachments/336995258875379715/1002225464074567770/mario.PNG"],
			  ["Edance", "https://cdn.discordapp.com/attachments/336995258875379715/1002226014266609685/kirbydance.gif"],                  
			  ["Elove", "https://cdn.discordapp.com/attachments/336995258875379715/1002257152490098748/1659027117988.png"],
			  ["Ebern", "https://cdn.discordapp.com/attachments/336995258875379715/1002261965734953040/bernard.png"],
			  ["Epog", "https://cdn.discordapp.com/attachments/336995258875379715/1002350472771932210/pogofgreed.png"],
			  ["Estyle", "https://cdn.discordapp.com/attachments/336995258875379715/1002240017885843516/picardia-small.png"]];

let badges = [["coeurbot", "💗"], 
			  ["millca__", "👑"],
			  ["maxome_", "😳"],
			  ["pierrow__", "🕵️‍♂️"]]

if (typeof chrome !== "undefined" && typeof chrome.runtime !== "undefined") {
	api = chrome;
} else if (typeof browser !== "undefined" && typeof browser.runtime !== "undefined") {
	api = browser;
}

api.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete" && tab.url === "https://www.twitch.tv/aruten_") {
		api.scripting.executeScript({
			target: {tabId},
			args: [{badges: badges, emotes: emotes}],
			func: vars => Object.assign(self, vars),
		}, () => {
			api.scripting.executeScript({
				target: {tabId}, 
				files: ["./scripts/foreground.js"],
			});
		}).then(() => {
			console.log("foreground script started");
		}).catch(err => console.log(err));
	}
});
