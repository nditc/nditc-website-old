
function divSelectorClassRemover(hoveredDivIndex, divIndexToRemove=4){
	if(divIndexToRemove > hoveredDivIndex){
		$('.navbar li:first-child').removeClass('div'+(divIndexToRemove+1));
		divSelectorClassRemover(hoveredDivIndex, divIndexToRemove-1);
	}else{
		return 0;
	}
}

$(document).ready(function(){
	$('.navbar li').hover(function(){
		let divIndex = $('.navbar li').index(this);
		divSelectorClassRemover(divIndex);
		$('.navbar li:first-child').addClass('div'+(divIndex+1));
	})
})
