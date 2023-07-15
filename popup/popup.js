document.addEventListener("DOMContentLoaded", async function() {
	let navbarCategories = document.getElementsByClassName("navbar-element");

	for (let i = 0; i < navbarCategories.length; i++) {
		navbarCategories[i].addEventListener("click", () => {
			selectCategory(navbarCategories, i);
		})
	}
	
	let respEmotes = await fetch("https://maximemeyrat.fr/api/emotelist");
	let dataEmotes = await respEmotes.json();
	let emotesContainer = document.getElementById("emotes-container");

	for (let emote of dataEmotes) {
		let elem = document.createElement("div");
		elem.classList.add("emote", "preview");

		let img  = document.createElement("img");
		img.src = `https://maximemeyrat.fr/api/emote/${emote}`;

		let title = document.createElement("span");
		title.textContent = emote.substr(0, emote.indexOf("."))

		elem.appendChild(img);
		elem.appendChild(title);		
		emotesContainer.appendChild(elem);
	}

	let respBanners = await fetch("https://maximemeyrat.fr/api/bannerlist");
	let dataBanners = await respBanners.json();
	let bannersContainer = document.getElementById("banners-container");

	for (let banner of dataBanners) {
		let elem = document.createElement("div");
		elem.classList.add("banner", "preview");

		let img  = document.createElement("img");
		img.src = `https://maximemeyrat.fr/api/banner/${banner}`;

		let title = document.createElement("span");
		title.textContent = banner.substr(0, banner.indexOf("."))

		elem.appendChild(img);
		elem.appendChild(title);		
		bannersContainer.appendChild(elem);
	}

	let previews = document.getElementsByClassName("preview");

	for (let p of previews) {
		p.addEventListener("click", () => {
			navigator.clipboard.writeText(p.textContent.trim());
		});
	}
});


function selectCategory(navbarCategories, id) {
	for (let i = 0; i < navbarCategories.length; i++) {
		if (i == id) {
			navbarCategories[i].classList.add("active-category");
			document.getElementById("main").children[i].style.display = "";
		} else if (navbarCategories[i].classList.contains("active-category")) {
			navbarCategories[i].classList.remove("active-category");
			document.getElementById("main").children[i].style.display = "none";
		}
	}
}