let loginbox = document.getElementById('loginbox');
let glassfield = document.getElementById('glassfield');

document.getElementById('loginl').addEventListener('click', () => {
    loginbox.style.display = 'flex';
    glassfield.style.display = 'flex';
});

document.getElementById('logoutl').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log('Success!')
    })
});

document.getElementById('loginclose').addEventListener('click', () => {
    loginbox.style.display = 'none';
    glassfield.style.display = 'none';
});

document.querySelectorAll('.navbar li').forEach((elem) => {
    elem.addEventListener('click', () => {
        document.querySelectorAll('.navbar li').forEach((elem) => {
            elem.classList.remove('active');
        });
        elem.classList.add('active');
    });
});

document.getElementById('login-submit').addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).finally(() => {
        loginbox.style.display = 'none';
        glassfield.style.display = 'none';
        console.log('Signed in!');
    }).catch((err) => {
        document.getElementById('pass-error').innerHTML = err.message;
    })
});

let loginbtn = document.getElementById('loginl')
let logoutbtn = document.getElementById('logoutl')

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loginbtn.style.display = 'none';
        logoutbtn.style.display = 'block';
    } else {
        loginbtn.style.display = 'block';
        logoutbtn.style.display = 'none';
    }
});
