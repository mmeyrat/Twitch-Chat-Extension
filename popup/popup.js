document.addEventListener('DOMContentLoaded', async function() {
	let respEmotes = await fetch("https://maximemeyrat.fr/api/emotes");
	let dataEmotes = await respEmotes.json();
	let tableBbody = document.getElementsByTagName("tbody")[0];

	for (let i = 0; i < dataEmotes.length; i++) {
		let row = document.createElement('tr');
		row.innerHTML = `<td><span class="keyword">${dataEmotes[i].substr(0, dataEmotes[i].indexOf('.'))}</span></td>
						 <td><img src="https://maximemeyrat.fr/api/emotes/${dataEmotes[i]}"></td>`
		tableBbody.appendChild(row);
	}

	let keywords = document.getElementsByClassName('keyword');

	for (let i = 0; i < keywords.length; i++) {
		keywords.item(i).addEventListener('click', function() {
			navigator.clipboard.writeText(this.textContent);
		});
	}
});
