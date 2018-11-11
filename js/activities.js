function classListOf(className){
	return document.querySelector('.' + className).classList;
}

for(let i=0; i<document.getElementsByClassName('read_more').length; i++){
	document.getElementsByClassName('read_more')[i].addEventListener('click', () => {
		if(classListOf('event-details-container').contains('hidden')){
			classListOf('event-details-container').remove('hidden');
		}
	})
}
document.getElementsByClassName('go-back')[0].addEventListener('click',function(){
	console.log("gg");
	if(!classListOf('event-details-container').contains('hidden')){
		classListOf('event-details-container').add('hidden');
	}
})