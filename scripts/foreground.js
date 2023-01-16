var messageContainer = document.getElementsByClassName("chat-scrollable-area__message-container")[0];
var messageBackgrounds = document.getElementsByClassName("chat-line__message-container");
var messages = document.getElementsByClassName("text-fragment");
var authors = document.getElementsByClassName("chat-author__display-name");

var badgesNb = 0;
var bannersNb = 0;

function replaceTextToEmote() {
	for (let j = 0; j < messages.length; j++) {
		for (let i = 0; i < emotes.length; i++) {
			oldMsg = messages[j].textContent;
			if (oldMsg.indexOf(emotes[i][0]) !== -1) {
				emote = `<div class="chat-line__message--emote-button" data-test-selector="emote-button">
							<div class="InjectLayout-sc-588ddc-0 kUvjun">
								<span data-a-target="emote-name" aria-describedby="d891b00247c0ba4ed3c1c3ef712ed2a8">
									<div class="Layout-sc-nxg1ff-0 kBZvCW chat-image__container">
										<img alt="emote" class="chat-image chat-line__message--emote" src="${emotes[i][1]}">
									</div>
								</span>
							</div>
						</div>`;
				messages[j].innerHTML = oldMsg.split(emotes[i][0]).join(emote);
			}
		}
	}
}

function addBadges() {
	for (let j = 0; j < authors.length; j++) {
		for (let i = 0; i < self.badges.length; i++) {
			oldName = authors[j].textContent;
			if (oldName.toLowerCase().indexOf(self.badges[i][0]) !== -1 && oldName.length == self.badges[i][0].length) {
				authors[j].textContent = self.badges[i][1] + oldName;
			}
		}
	}
}

function addBanners() {
	for (let i = 0; i < self.banners.length; i++) {
		for (let j = 0; j < messageBackgrounds.length; j++) {
			if (messageBackgrounds[j].parentNode.getElementsByClassName("chat-author__display-name")[0].innerHTML.toLowerCase().indexOf(self.banners[i][0]) !== -1) {
				messageBackgrounds[j].classList.add(self.banners[i][0]);
			}
		}

		for (let j = 0; j < document.getElementsByClassName(self.banners[i][0]).length; j++) {
			document.getElementsByClassName(self.banners[i][0])[j].style.cssText = `background-image: url("https://maximemeyrat.fr/api/banners/${banners[i][1]}.jpg");
																					background-size: cover;
																					background-position: center;
																					background-color: rgb(77, 77, 77);
																					background-blend-mode: multiply;
																					box-shadow: inset 0px 0px 10px 1px var(--color-hinted-grey-2);`;
		}
	}
}

async function updateBadges() {
		let respBadges = await fetch("https://maximemeyrat.fr/api/badges");
		let dataBadges = await respBadges.json();
		let newBadges = [["coeurbot", "💗"]];

		for (let key in dataBadges) {
			newBadges.push([key, dataBadges[key]]);
		}
		
		self.badges = newBadges;
}

async function updateBanners() {
		let respBanners = await fetch("https://maximemeyrat.fr/api/banners");
		let dataBanners = await respBanners.json();
		let newBanners = [];

		for (let key in dataBanners) {
			newBanners.push([key, dataBanners[key]]);
		}
		
		self.banners = newBanners;
}

function checkUpdates() {
	currentBadgesNb = 0;
	currentBannersNb = 0;

	for (let j = 0; j < messages.length; j++) {
		let currentMsg = messages[j].textContent;
		
		if (currentMsg.indexOf("badge") !== -1) {
			currentBadgesNb++;
		}

		if (currentMsg.indexOf("banner") !== -1) {
			currentBannersNb++;
		}
	}

	if (currentBadgesNb > badgesNb) {
		setTimeout(updateBadges, 1000);
	}

	if (currentBannersNb > bannersNb) {
		setTimeout(updateBanners, 1000);
	}

	badgesNb = currentBadgesNb;
	bannersNb = currentBannersNb;
}

replaceTextToEmote();
addBadges();
addBanners();

var observer = new MutationObserver(mutation => {
	checkUpdates();
	replaceTextToEmote();
	addBadges();
	addBanners();
});

observer.observe(messageContainer, { 
	childList: true 
});
