$(function()
{	
	// FONT REPLACING FOR NORMAL WEIGHTED TEXT
	Cufon
		.set('fontFamily', 'Geometric Slabserif')
		.set('fontWeight', '500')
		.set('hover', 'true')
		.replace('p')('details');
		
	// FONT REPLACEMENT FOR BOLD TEXT	
	Cufon
		.set('fontFamily', 'Geometric Slabserif')
		.set('fontWeight', '700')
		.set('hover', 'true')
		.replace('#biography cite')('a')('span')('h1')('h2')('address');
	

	function updateOrientation()
	{
		
		var window_h = $(window).height();
		var content_h = $('header').outerHeight(true) + 
						$('section').outerHeight(true) + 
						$('footer').outerHeight(true);
		
		if(window_h > content_h)		
			$('footer').css({
				'bottom': 0,
				'position': 'absolute'
			});
		else
			$('footer').css({
				'position': 'relative'
			});
	};
	
	updateOrientation();
	window.addEventListener('orientationchange', updateOrientation, false);

});