document.addEventListener('DOMContentLoaded', function() {
	let keywords = document.getElementsByClassName('keyword');

	for (let i = 0; i < keywords.length; i++) {
		keywords.item(i).addEventListener('click', function() {
			navigator.clipboard.writeText(this.textContent);
		});
	}
});
