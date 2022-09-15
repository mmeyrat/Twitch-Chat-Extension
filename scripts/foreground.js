var messageContainer = document.getElementsByClassName("chat-scrollable-area__message-container")[0];
var messages = document.getElementsByClassName("text-fragment");
var authors = document.getElementsByClassName("chat-author__display-name");

function replaceTextToEmote() {
	for (let j = 0; j < messages.length; j++) {
		for (let i = 0; i < emotes.length; i++) {
			oldMsg = messages[j].innerHTML;
			if (oldMsg.indexOf(emotes[i][0]) !== -1) {
				emote = `<div class="chat-line__message--emote-button" data-test-selector="emote-button">
							<div class="InjectLayout-sc-588ddc-0 kUvjun">
								<span data-a-target="emote-name" aria-describedby="d891b00247c0ba4ed3c1c3ef712ed2a8">
									<div class="Layout-sc-nxg1ff-0 kBZvCW chat-image__container">
										<img alt="emote" class="chat-image chat-line__message--emote" src="${emotes[i][1]}" srcset="${emotes[i][1]} 1x,${emotes[i][1]} 2x,${emotes[i][1]} 4x">
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
			if (oldName.toLowerCase().indexOf(self.badges[i][0]) !== -1 && oldName.indexOf(self.badges[i][1]) === -1) {
				authors[j].textContent = self.badges[i][1] + oldName;
			}
		}
	}
}

replaceTextToEmote();
addBadges()

var observer = new MutationObserver(mutation => {
	replaceTextToEmote();
	addBadges();
});

observer.observe(messageContainer, { 
	childList: true 
});
