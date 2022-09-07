var emotes = [["Edab", "https://cdn.discordapp.com/attachments/336995258875379715/1002225356574576640/chika-dab.png"],
			  ["Epet", "https://cdn.discordapp.com/attachments/336995258875379715/1002255919519891516/1659026811536.gif"],
			  ["Esweat", "https://cdn.discordapp.com/attachments/336995258875379715/1002225464074567770/mario.PNG"],
			  ["Edance", "https://cdn.discordapp.com/attachments/336995258875379715/1002226014266609685/kirbydance.gif"],                  
			  ["Elove", "https://cdn.discordapp.com/attachments/336995258875379715/1002257152490098748/1659027117988.png"],
			  ["Ebern", "https://cdn.discordapp.com/attachments/336995258875379715/1002261965734953040/bernard.png"],
			  ["Epog", "https://cdn.discordapp.com/attachments/336995258875379715/1002350472771932210/pogofgreed.png"],
			  ["Estyle", "https://cdn.discordapp.com/attachments/336995258875379715/1002240017885843516/picardia-small.png"]];

var messageContainer = document.getElementsByClassName("chat-scrollable-area__message-container")[0];
var messages = document.getElementsByClassName("chat-line__message");

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

replaceTextToEmote();

var observer = new MutationObserver(mutation => {
	replaceTextToEmote();
});

observer.observe(messageContainer, { 
	childList: true 
});
