// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
var tRef;

function orgData() {
    var name = document.getElementById("name").value;
    var roll = document.getElementById("roll").value;
    var desc = document.getElementById("desc").value;
    var pass = document.getElementById("pass").value;

    addData("techies", roll, name, desc, md5(pass));
}

function addData(collection, roll, name, desc, pass) {
    var docData = {
        roll: roll, name: name, desc: desc, pass: pass, dev: false, design:false, comp:false, others: "", projects:"<p></p>"  
    };
    db.collection(collection).add(docData)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("registered").innerHTML = "Registerd!";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

function getSkillsOf(techie){
    var htm = "";
    //console.log(techie.dev)
    if(techie.dev) htm += "Software/Web Development";
    if(techie.design) htm += ", UX/UI/Graphics Design";
    if(techie.comp) htm += ", Competitive Programming";
    //console.log(htm);
    
    return htm;
}

function orgetData() {
    var roll = document.getElementById("query").value;

    getData(roll);
}

function getData(roll) {
    var queryName = document.getElementById("queryName");
    var queryDesc = document.getElementById("queryDesc");
    var queryProj = document.getElementById("queryProjects");
    var querySkills = document.getElementById("querySkills");

    queryName.innerHTML = "No one found! Probably, you are not registered yet";
    queryDesc.innerHTML = "Could not show a description";

    var techiesRef = db.collection("techies");

    techiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((docu) => {
            if (docu.data().roll == roll) {
                queryName.innerHTML = docu.data().name;
                queryDesc.innerHTML = docu.data().desc;
                queryProj.innerHTML = docu.data().projects;
                querySkills.innerHTML = getSkillsOf(docu.data());
            }
            //console.log(docu.id + ` => ` + docu.data().roll);
        });
    });
}

function disCreds(docu){
    var nameRef = document.getElementById("formName");
    var descRef = document.getElementById("formDesc");
    var devRef = document.getElementById("dev");
    var designRef = document.getElementById("design");
    var compRef = document.getElementById("comp");
    var othersRef = document.getElementById("others");
    var projectsRef = document.getElementById("projects");

    var dataRef = docu.data();
    tRef = docu.id;
    //console.log(tRef, "donedone!");

    nameRef.value = dataRef.name;
    descRef.value = dataRef.desc;
    devRef.checked = dataRef.dev;
    designRef.checked = dataRef.design;
    compRef.checked = dataRef.comp;
    othersRef.value = dataRef.others;
    projectsRef.value = dataRef.projects;

    //console.log(dataRef.dev);
    //console.log(docu.id);
}

function orgCreds(roll){
    var techiesRef = db.collection("techies");
    var a;

    techiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((docu) => {
            if (docu.data().roll == roll) {
                disCreds(docu);
                a = docu.id;
                //console.log(a, "bigdone");
            }
            //console.log(docu.id + ` => ` + docu.data().roll);
        });
    });
    //console.log(a, "done!");
}

function submitAll(docData){
    db.collection("techies").doc(tRef).update(docData).then(function(){
        document.getElementById("done").innerHTML = "Updated!";
        console.log("Written stuff *sighs*");
    });
}