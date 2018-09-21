function showHide(vis) {
    //document.getElementById(vis).style.display = "block";
    //document.getElementById(hid).style.display = "none";
    var divs = document.getElementsByClassName("pageDiv");
    for (i = 0; i < divs.length; i++) {
        div = divs[i]
        if (div.classList.contains(vis)) div.style.display = "block";
        else div.style.display = "none";
    }
}

/*function showReg() {
    swapToggle("reg", "prof");
}

function showProf() {
    swapToggle("prof", "reg");
}*/

function throwPassError() {
    var passErr = document.getElementById("passError");

    passErr.innerHTML = 'Invalid Password Format!';
    passErr.style.color = 'red';
}

function showGoodPass() {
    var passErr = document.getElementById("passError");

    passErr.innerHTML = 'Nice Password';
    passErr.style.color = 'green';
}

function passwordMatch() {
    var a = document.getElementById("pass").value;
    var b = document.getElementById("confPass").value;
    var c = document.getElementById("click");
    if (a == b && (a && b)) {
        c.disabled = false;
        showGoodPass();
    } else {
        c.disabled = true;
        throwPassError();
    }
}

function addedBasicStuff() {
    var a = document.getElementsByClassName("passfield");

    var name = document.getElementById("name").value;
    var roll = document.getElementById("roll").value;
    var desc = document.getElementById("desc").value;

    if (name && roll && desc) {
        //console.log("not null");
        for (i = 0; i < a.length; i++) {
            a[i].disabled = false;
        }
    }
    else {
        for (i = 0; i < a.length; i++) {
            a[i].disabled = true;
        }
    }
}

function updateMatch() {
    var roll = document.getElementById("updQuery").value;
    var pass = document.getElementById("updPass").value;
    var enter = document.getElementById("updEnter");

    if (roll && pass) {
        enter.disabled = false;
    }
    else {
        enter.disabled = true;
    }
}

function displayFormBox(){
    var modal = document.getElementById("modalMain");

    modal.style.display = "block";

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function showForm(){
    var roll = document.getElementById("updQuery").value;
    var pass = md5(document.getElementById("updPass").value);
    var upErr = document.getElementById("updateErr");
    var techies = db.collection("techies");
    techies.get().then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            if(doc.data().roll == roll && doc.data().pass == pass){
                upErr.style.color = "green";
                upErr.innerHTML = "Success!"
                displayFormBox();
                orgCreds(doc.data().roll);
                //return true;
            }
            else{
                upErr.style.color = "red";
                upErr.innerHTML = "Failed!"
            }
            //console.log(doc.id, " => ", doc.data());
        });
    });
}

function updateEverything(){
    var nameRef = document.getElementById("formName").value;
    var descRef = document.getElementById("formDesc").value;
    var devRef = document.getElementById("dev").checked;
    var designRef = document.getElementById("design").checked;
    var compRef = document.getElementById("comp").checked;
    var othersRef = document.getElementById("others").value;
    var projectsRef = document.getElementById("projects").value;

    var docData = {
        name: nameRef, desc: descRef, dev: devRef, design:designRef, comp:compRef, others: othersRef, projects:projectsRef
    };

    submitAll(docData);
}

document.addEventListener('input', function (evt) {
    if (evt.target.parentNode.classList.contains("addBasic")) {
        addedBasicStuff();
    } else if (evt.target.classList.contains("passfield")) {
        passwordMatch();
    } else if (evt.target.parentNode.classList.contains("updateStuff")) {
        updateMatch();
    }
});






















//// card anims
let cards = document.getElementsByClassName('techie');
for(let i=0; i<cards.length; i++){
	cards[i].addEventListener('click', function(e){
		
		let card = (function(){
			let path = e.composedPath();
			for(let i=0; i<path.length; i++){
				if(path[i].classList.contains('techie')){
				   return path[i];
				}
			}
			console.log("couldn't find techie in event propagation path");
		})();
		
		let bio_container = card.querySelector('.bio-container');
		let dp_container = card.querySelector('.dp');
		
		card.classList.add('onFocus');
		dp_container.classList.add('hidden');
		bio_container.classList.add('focused');
		//console.log(card);
	})
}

window.addEventListener('click', function(e){
	const path = e.composedPath();
	let found = false;
	for(let i=0; i<path.length; i++){
		if(path[i].classList){
			if(path[i].classList.contains('techie') && path[i].classList.contains('onFocus')){
				found = true;
				return;
			}	
		}
	}
	
	if(!found){
		let cards =	document.getElementsByClassName('onFocus');
		while(cards.length > 0){
			let card = cards[0];
			let bio_container = card.querySelector('.bio-container');
			let dp_container = card.querySelector('.dp');

			card.classList.remove('onFocus');
			dp_container.classList.remove('hidden');
			bio_container.classList.remove('focused');	
		}
		return;	
	}
})


console.log("loaded");






