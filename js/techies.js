function classListOf(className){
	return document.querySelector('.' + className).classList;
}

firestore.collection('techies').get()
    .then((all_techies) => {
        let template = document.querySelector('.techie.template').outerHTML;
        let output = '';
        all_techies.forEach((techie) => {
            output += Mustache.render(template, techie.data())
        })
        document.querySelector('.techies-container').innerHTML = output;
    })
	.then(() => {
		for(let i=0; i<document.getElementsByClassName('techie').length; i++){
			document.getElementsByClassName('techie')[i].addEventListener('click', () => {
				if(classListOf('techie-details-container').contains('hidden')){
					classListOf('techie-details-container').remove('hidden');
				}
			})
		}
		document.getElementsByClassName('go-back')[0].addEventListener('click',function(){
			console.log("gg");
			if(!classListOf('techie-details-container').contains('hidden')){
				classListOf('techie-details-container').add('hidden');
			}
		})
	})