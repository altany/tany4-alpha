$( document ).ready(function() {
	
    $('body').addClass(isTouchDevice()?'touch':'no-touch');
	/*var mainContentHeight = $('.wrapper').outerHeight()-$('footer').outerHeight() - $('header').outerHeight();
	console.log(mainContentHeight);
    if ($('.pageContent').outerHeight() < mainContentHeight) {
		$('.pageContent').css('margin-top', (mainContentHeight - $('.pageContent').height())/4)
	}*/
});

function isTouchDevice() {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};