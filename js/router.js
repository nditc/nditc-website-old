const app = document.getElementById('app');
const routes = {
    'home': 'pages/home.html',
    'photos': 'pages/photos.html',
    'techies': 'pages/techies.html',
    'about': 'pages/about.html',
};

function getPage() {
    let route = window.location.hash.substring(2);
    let uri = routes[route];

    fetch(uri)
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            app.innerHTML = text;
        });
}

window.addEventListener('hashchange', getPage);
window.addEventListener('load', function() {
    if (!window.location.hash) {
        window.location.hash = '#/home'
    }
    getPage();
});
