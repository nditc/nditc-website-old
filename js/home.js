//Declaring login and register popup boxes as variables
let loginbox = document.getElementById('loginbox');
let glassfield = document.getElementById('glassfield');
let regbox = document.getElementById('regbox');

//declaring login, logout, register buttons of nav as variables
let loginbtn = document.getElementById('loginl')
let logoutbtn = document.getElementById('logoutl')
let regbtn = document.getElementById('register1')

//--------------------------------------------------------------------

//what happens if the user clicks on login
document.getElementById('loginl').addEventListener('click', () => {
    loginbox.style.display = 'flex';    //add flex display, basically un-hiding the loginbox
    glassfield.style.display = 'flex';  //shanta knows what glassfield is
});

//what happens if the user clicks on register
document.getElementById('register1').addEventListener('click', () => {
    document.querySelector('.sign_up_mother_container').classList.remove('hidden'); //remove a class called 'hidden', explained later in the file
    regbox.style.display = 'flex';  //add flex display, basically un-hiding the signup box; signup == register ;-;
});

//what happens if the user clicks on logout
document.getElementById('logoutl').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {  //use the firebase api to kick out the user
        console.log('Success!')
    })
});

//---------------------------------------------------------------------

//the close button for signup box. i used a onclick function. shanta used an event listener for the login box. the latter one is preferred always
let closeTech = () => {
    document.querySelector('.sign_up_mother_container').classList.add('hidden');    //i add a 'hidden' class to the container. thats why i removed this class previously to be able to actually view the signup box
}

//the close button for login box
document.getElementById('loginclose').addEventListener('click', () => {
    loginbox.style.display = 'none';
    glassfield.style.display = 'none';
});

document.querySelector('.popup .cross').addEventListener('click', function(){
	document.querySelector('.sign_up_mother_container').classList.add('hidden');
    document.querySelector('.sign_up_mother_container').classList.remove('shown');
})

function showHide(vis) {
	if(vis=='SignUp'){
		console.log("gg");
		document.getElementsByClassName('sign_up_mother_container')[0].classList.remove('hidden');
		document.getElementsByClassName('sign_up_mother_container')[0].classList.add('shown');
	}
}

document.querySelectorAll('.navbar li').forEach((elem) => {
    elem.addEventListener('click', () => {
        document.querySelectorAll('.navbar li').forEach((elem) => {     //select all elements on the 'navbar' with a 'li' tag
            elem.classList.remove('active');                            //remove the 'active' class from all of them, if there was any
        });
        elem.classList.add('active');                                   //set 'active' class to the current element (link of the current page)
    });
});

//------------------------------------------------------------------------

//what happens when the user logs in
document.getElementById('login-submit').addEventListener('click', (e) => {
    e.preventDefault();             //prevent 'actually' submitting the credentials, define our own actions
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).finally(() => {
        loginbox.style.display = 'none';            //hiding the login box as we don't need it now
        glassfield.style.display = 'none';
        console.log('Signed in!');
    }).catch((err) => {
		if(err){
			//bringing back the login window again if error happens
			loginbox.style.display = 'flex';
        	glassfield.style.display = 'block';
		}
        document.getElementById('pass-error').innerHTML = err.message;
    })
});

//--------------------------------------------------------------------------

//the following code is triggered when the 'authentication status' changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {                             //see if the user is now logged in
        regbtn.style.display = 'none';      //hide register button
        loginbtn.style.display = 'none';    //hide login button
        logoutbtn.style.display = 'block';  //shoe logout button
    } else {
        //do the exact opposite if the user is now logged out
        regbtn.style.display = 'block';
        loginbtn.style.display = 'block';
        logoutbtn.style.display = 'none';
    }
});
