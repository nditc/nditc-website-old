function classListOf(className){
	return document.querySelector('.' + className).classList;
}

firestore.collection('techies').get()
    .then((all_techies) => {
        let template = document.querySelector('.techie.template').outerHTML;
        let output = '';
        all_techies.forEach((techie) => {
            let data = techie.data();
            data['uid'] = techie.id;
            output += Mustache.render(template, data);
        })
        document.querySelector('.techies-container').innerHTML = output;
    })
	.then(() => {
        let template = document.querySelector('.techie-details.template').outerHTML;
		for(let i=0; i<document.getElementsByClassName('techie').length; i++){
			document.getElementsByClassName('techie')[i].addEventListener('click', (e) => {
                let parent = e.target;
                let uid = parent.getAttribute('data-uid');
                while (uid === null) {
                    parent = parent.parentElement;
                    uid = parent.getAttribute('data-uid');
                }
                firestore.collection('techies').doc(uid).get()
                    .then((techie) => {
                        document.querySelector('.techie-details-container').innerHTML = Mustache.render(template, techie.data());
                        if (classListOf('techie-details-container').contains('hidden')) {
                            classListOf('techie-details-container').remove('hidden');
                        }
                        document.getElementsByClassName('go-back')[0].addEventListener('click',function(){
                            if(!classListOf('techie-details-container').contains('hidden')){
                                classListOf('techie-details-container').add('hidden');
                            }
                        })
                    });
			})
		}

	})
