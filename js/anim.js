function updateStyles() {
	document.querySelectorAll('.navbar ul li').forEach(function (elem) {
		if (elem.className.indexOf('div1') != -1) { continue }
		elem.className = '';
	})

	let route = window.location.hash.substring(2);
	let elem = document.getElementById(route + 'l');
	elem.className = 'active';
}

window.addEventListener('load', updateStyles);
window.addEventListener('hashchange', updateStyles);
