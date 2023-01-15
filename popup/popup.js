document.addEventListener('DOMContentLoaded', async function() {
	let navbarCategories = document.getElementsByClassName("navbar-element");

	for (let i = 0; i < navbarCategories.length; i++) {
		navbarCategories[i].addEventListener('click', event => {
			selectCategory(navbarCategories, i);
		})
	}
	
	let respEmotes = await fetch("https://maximemeyrat.fr/api/emotes");
	let dataEmotes = await respEmotes.json();
	let emotesContainer = document.getElementById("emotes-container");

	for (let i = 0; i < dataEmotes.length; i++) {
		let elem = document.createElement('div');
		elem.classList.add("emote", "preview");
		elem.innerHTML = `<img src="https://maximemeyrat.fr/api/emotes/${dataEmotes[i]}">
						  <span>${dataEmotes[i].substr(0, dataEmotes[i].indexOf('.'))}</span>`
		emotesContainer.appendChild(elem);
	}

	let respBanners = await fetch("https://maximemeyrat.fr/api/bannerlist");
	let dataBanners = await respBanners.json();
	let bannersContainer = document.getElementById("banners-container");

	for (let i = 0; i < dataBanners.length; i++) {
		let elem = document.createElement('div');
		elem.classList.add("banner", "preview");
		elem.innerHTML = `<img src="https://maximemeyrat.fr/api/banners/${dataBanners[i]}">
						  <span>${dataBanners[i].substr(0, dataBanners[i].indexOf('.'))}</span>`
		bannersContainer.appendChild(elem);
	}

	let previews = document.getElementsByClassName('preview');

	for (let i = 0; i < previews.length; i++) {
		previews.item(i).addEventListener('click', function() {
			navigator.clipboard.writeText(this.textContent.trim());
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