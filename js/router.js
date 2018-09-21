const app = document.getElementById('app');

const routes = {
    'home': ['pages/home.html', ['css/home.css'], ['js/home.js'] ],
    'photos': ['pages/photos.html', ['css/photos.css'], ['js/photos.js'] ],
    'techies': ['pages/techies/index.html', ['css/techies.css'], ['js/minorUX.js',
                                                                  'js/techies.js'] ],
    'about': ['pages/about.html', ['css/about.css'], ['js/about.js'] ],
	'init': ['pages/init.html', ['css/init.css'], ['js/init.js'] ],
	'login': ['pages/login.html', ['css/login.css'], [''] ]
};



let lastPageName = "placeholder";			//this is a global
function applyStyleAndScripts(pageName){
	let head = document.getElementsByTagName("head")[0];
	
	//loads every stylesheet of the specified page using the links stored in the second index of the routes dictionary
	routes[pageName][1].forEach(function(route){
		var StylesheetNode = document.createElement('link');
		StylesheetNode.setAttribute('data-page', pageName);	//set data attribute to the current page name
		StylesheetNode.type = 'text/css';
		StylesheetNode.rel = 'stylesheet';
		StylesheetNode.href = route;
		//StylesheetNode.media = 'screen';
		head.appendChild(StylesheetNode);
	})
	
	//loads every scripts of the specified page using the links stored in the second index of the routes dictionary
	routes[pageName][2].forEach(function(route){
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
    let uri = routes[pageName][0];						//fetch the taget page uri from the 'routes' dicrtionary
	
	applyStyleAndScripts(pageName);	
	
    fetch(uri)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            app.innerHTML = text;
        })
	
}

window.addEventListener('hashchange', getPage);
window.addEventListener('load', function() {
    if (!window.location.hash) {
        window.location.hash = '#/home'
    }
    getPage();
});
