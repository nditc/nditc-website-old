const app = document.getElementById('app');

const routes = {
    'home': {
        'page': 'pages/home.html',
        'styles': ['css/home.css'],
        'scripts': ['js/home.js']
    },
    'photos': {
        'page': 'pages/photos.html', 
        'styles': ['css/photos.css'], 
        'scripts': ['js/photos.js']
    },
    'techies': {
        'page': 'pages/techies/index.html',
        'styles': ['css/techies.css'],
        'scripts': [
            'js/techies.js',
            'https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js',
            'https://www.gstatic.com/firebasejs/5.3.0/firebase-firestore.js',
            'pages/techies/firebase_base.js',
            'pages/techies/cfs.js',
            'pages/techies/minorUX.js',
            'pages/techies/md5.min.js']
    },
    'about': {
        'page': 'pages/about.html',
        'styles': ['css/about.css'],
        'scripts': ['js/about.js']
    },
	'init': {
        'page': 'pages/init.html',
        'styles': ['css/init.css'],
        'scripts': ['js/init.js']
    }
};



let lastPageName = "placeholder";			//this is a global
function applyStyleAndScripts(pageName){
	let head = document.getElementsByTagName("head")[0];
	
	//loads every stylesheet of the specified page using the links stored in the second index of the routes dictionary
	routes[pageName]['styles'].forEach(function(route){
		var StylesheetNode = document.createElement('link');
		StylesheetNode.setAttribute('data-page', pageName);	//set data attribute to the current page name
		StylesheetNode.type = 'text/css';
		StylesheetNode.rel = 'stylesheet';
		StylesheetNode.href = route;
		//StylesheetNode.media = 'screen';
		head.appendChild(StylesheetNode);
	})
	
	//loads every scripts of the specified page using the links stored in the second index of the routes dictionary
	routes[pageName]['scripts'].forEach(function(route){
		var ScriptNode = document.createElement('script');
		ScriptNode.setAttribute('data-page', pageName);		//set data attribute to the current page name
		ScriptNode.type = 'text/javascript';
		ScriptNode.src = route;
		head.appendChild(ScriptNode);
	})
	
	//deletes every node in head that has its data-page set to lastPageName so that stylesheets and scripts of the last page is removed
	document.getElementsByTagName('head')[0].childNodes.forEach(function(elem){
		if(elem.dataset){
			if(elem.dataset.page == lastPageName){
				head.removeChild(elem);
			}	
		} 
	})
	
	window.scrollTo({
		top: 0,
		//behavior: "smooth"
	});
	
	lastPageName = pageName;
}


function getPage() {
    let pageName = window.location.hash.substring(2);   //store the target page name in var route
    let uri = routes[pageName]['page']						//fetch the taget page uri from the 'routes' dicrtionary
	
    fetch(uri)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            app.innerHTML = text;
        });
	
    applyStyleAndScripts(pageName);	
}

window.addEventListener('hashchange', getPage);
window.addEventListener('load', function() {
    if (!window.location.hash) {
        window.location.hash = '#/home'
    }
    getPage();
});
